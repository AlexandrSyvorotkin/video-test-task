import { useState, useRef } from 'react';
import './App.css'
import TimestampsList from './components/timestamps-list'
import VideoFetcher from './components/video-player'
import { useGetTimeStampsQuery } from './services/timestamps_analytics';

function App() {

	const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const {isFetching} = useGetTimeStampsQuery('')

	const handleJumpToTimestamp = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time; // Переключение на выбранный таймстамп
            videoRef.current.play(); // Запуск воспроизведения после перехода
            setIsPlaying(true);
        }
    };

	if (isFetching) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-800">
                <h1 className="text-2xl font-bold text-gray-700">Загрузка...</h1>
            </div>
        );
    }

	return (
		<main className='flex flex-row items-center p-5 bg-gray-800 overflow-hidden h-dvh w-full justify-start'>
			<VideoFetcher videoUrl={videoUrl} isPlaying={isPlaying} setIsPlaying={setIsPlaying} videoRef={videoRef}/>
			<TimestampsList handleClick={handleJumpToTimestamp}/>
		</main>
	)
}

export default App
