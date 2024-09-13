import {FC} from 'react'
import { useAppSelector } from '../redux/store'
import { formatTime } from '../utils/secToMin'


const VideoPlayerTimer:FC = () => {
   
    const timer = useAppSelector(state => state.videoPlayer)

    return (
        <div className="text-indigo-50 mt-4">
            {`${formatTime(Math.floor(timer.currentPlayerTime))} / ${formatTime(Math.floor(timer.maxPlayerTime))}`}
        </div>
    )
} 

export default VideoPlayerTimer