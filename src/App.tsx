import { useState, useRef } from 'react';
import './App.css'
import TimestampsList from './components/timestamps-list'
import VideoFetcher from './components/video-player'

function App() {

	const videoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';


	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const handleJumpToTimestamp = (time: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = time; // Переключение на выбранный таймстамп
            videoRef.current.play(); // Запуск воспроизведения после перехода
            setIsPlaying(true);
        }
    };

	return (
		<main className='flex flex-col items-center p-5 bg-gray-800 overflow-hidden h-dvh'>
			<VideoFetcher videoUrl={videoUrl} isPlaying={isPlaying} setIsPlaying={setIsPlaying} videoRef={videoRef}/>
			<TimestampsList handleClick={handleJumpToTimestamp}/>
		</main>
	)
}

export default App
