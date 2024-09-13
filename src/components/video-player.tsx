import React, { useState, useEffect, useCallback } from 'react';
import { useGetTimeStampsQuery } from '../services/timestamps_analytics';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';
import { Timestamp } from '../types/timestamp-type';
import { findCurrentTimeStamp } from '../utils/binarySerch';
import { useDispatch } from 'react-redux';
import { setCurrentPlayerTime, setMaxPlayerTime } from '../redux/video-slice';
import VideoPlayerTimer from './video-player-times';

interface VideoFetcherProps {
    videoUrl: string;
    videoRef: React.RefObject<HTMLVideoElement>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoFetcher: React.FC<VideoFetcherProps> = ({ videoUrl, videoRef, isPlaying, setIsPlaying }) => {
    const { data, isFetching } = useGetTimeStampsQuery('');

    const dispatch = useDispatch()

    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const [el, setEl] = useState<{ zone: { width: number; height: number; left: number; top: number }, duration: number } | null>(null);
    const [sortedTimestamps, setSortedTimestamps] = useState<Timestamp[]>([]);
    const [isElementVisible, setIsElementVisible] = useState(true);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
            setSortedTimestamps(sortedData);
        }
    }, [data]);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const interval = setInterval(() => {
                if (videoElement) {
                    const currentElement = findCurrentTimeStamp(Math.floor(videoElement.currentTime), sortedTimestamps);
                    setEl(currentElement);
                    dispatch(setCurrentPlayerTime(videoElement.currentTime))
                }
            }, 1000);
            
            return () => {
                clearInterval(interval);
            };
        }
    }, [sortedTimestamps, videoRef]);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleLoadedMetadata = () => {
                dispatch(setMaxPlayerTime(videoElement.duration))
            };

            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            return () => {
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [videoRef]);

    useEffect(() => {
        if (el && el.duration) {
            setIsElementVisible(true);
            const timer = setTimeout(() => {
                setIsElementVisible(false);
            }, el.duration * 1000);

            return () => clearTimeout(timer);
        }
    }, [el]);

    const handlePlayPauseHandler = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying, setIsPlaying, videoRef]);
    
    const elStyles = {
        width: el?.zone.width,
        height: el?.zone.height,
        left: el?.zone.left,
        top: el?.zone.top,
        display: isElementVisible ? 'block' : 'none'
    };

    
    

    return (
        <div className='relative'>
            <div
                className='relative'
                onMouseEnter={() => setIsBtnVisible(true)}
                onMouseLeave={() => setIsBtnVisible(false)}
            >
                <video ref={videoRef} controls src={videoUrl} />
                {el && <div style={elStyles} className='absolute bg-green-600 z-20' />}
                {!isPlaying || isBtnVisible ? (
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        {isPlaying ? (
                            <IoPauseCircleOutline
                                size={240}
                                color='white'
                                style={{ opacity: '0.5', cursor: 'pointer' }}
                                onClick={handlePlayPauseHandler}
                            />
                        ) : (
                            <IoPlayCircleOutline
                                size={240}
                                color='white'
                                style={{ opacity: '0.5', cursor: 'pointer' }}
                                onClick={handlePlayPauseHandler}
                            />
                        )}
                    </div>
                ) : null}
            </div>
            <VideoPlayerTimer/>
        </div>
    );
};

export default VideoFetcher;
