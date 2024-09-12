import React, { useState, useRef, useEffect } from 'react';
import { useGetTimeStampsQuery } from '../api/timestamps_analytics';
import { FaPause, FaPlay } from "react-icons/fa";
import { sec2Min } from '../utils/secToMin';
import { minSec2Timestamp } from '../utils/minSecTotimestamp';
import { IoPauseCircleOutline, IoPlayCircleOutline } from 'react-icons/io5';

interface VideoFetcherProps {
    videoUrl: string;
    videoRef: any,
    isPlaying: any,
    setIsPlaying: any
}

const VideoFetcher: React.FC<VideoFetcherProps> = ({ videoUrl, videoRef, isPlaying, setIsPlaying }) => {

    const { data } = useGetTimeStampsQuery('');

    const [currentTime, setCurrentTime] = useState<[number, number]>([0, 0]);
    const [duration, setDuration] = useState<[number, number]>([0, 0]);
    const [timestamp, setTimestamp] = useState<number>(0);
    const [isBtnVisible, setIsBtnVisible] = useState(false)
    const [styles, setStyles] = useState({
        width: 0,
        height: 0,
        left: 0,
        top: 0,
    });
    const timeStamps = data?.map(it => Math.floor(it.timestamp));

    const handlePlayPauseHandler = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };


    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleLoadedMetadata = () => {
                const { min, sec } = sec2Min(videoElement.duration);
                setDuration([min, sec]);
            };

            videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

            const interval = setInterval(() => {
                if (videoElement) {
                    const { min, sec } = sec2Min(videoElement.currentTime);
                    setCurrentTime([min, sec]);
                    setTimestamp(minSec2Timestamp(min, sec));
                }
            }, 1000);

            return () => {
                clearInterval(interval);
                videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, []);

    useEffect(() => {
        if (timeStamps && data) {
            const index = timeStamps.indexOf(timestamp);
            if (index !== -1) {
                const newStyles = {
                    width: data[index].zone.width,
                    height: data[index].zone.height,
                    left: data[index].zone.left,
                    top: data[index].zone.top,
                };
                if (JSON.stringify(newStyles) !== JSON.stringify(styles)) {
                    setStyles(newStyles);
                }
            }
        }
    }, [timestamp, timeStamps, data, styles]);



    return (
        <div className='relative'>
            <div className='relative'
                onMouseEnter={() => setIsBtnVisible(true)}
                onMouseLeave={(() => setIsBtnVisible(false))}
            >
                <video ref={videoRef} controls src={videoUrl} />
                <div style={styles} className='absolute bg-green-600 z-20' />
                {isPlaying && !isBtnVisible ? null : <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    {isPlaying ?
                        <IoPauseCircleOutline size={240} color='white' style={{ opacity: "0.5", cursor: 'pointer' }} onClick={() => handlePlayPauseHandler()} /> :
                        <IoPlayCircleOutline size={240} color='white' style={{ opacity: "0.5", cursor: 'pointer' }} onClick={() => handlePlayPauseHandler()} />
                    }
                </div>}
            </div>
            {/* <div className="flex justify-center w-full p-2">
                {isPlaying ? <FaPause size={60} onClick={() => handlePlayPauseHandler()} /> : <FaPlay onClick={() => handlePlayPauseHandler()} size={60} />}
            </div> */}
            <div className="text-indigo-50">
                {currentTime[0]}:{currentTime[1].toString().padStart(2, '0')} /
                {duration[0]}:{duration[1].toString().padStart(2, '0')}
            </div>
            <div className="text-indigo-50">
                current time: {timestamp.toFixed(2)} секунд
            </div>
        </div>
    );
}

export default VideoFetcher;
