import { FC, useEffect, useState } from "react";
import { useGetTimeStampsQuery } from "../services/timestamps_analytics";
import { Timestamp } from "../types/timestamp-type";
import { timestampToTimeFormat } from "../utils/timeStampToTimeFormat";


interface TimestampsListProps {
    handleClick: any
}

const TimestampsList: FC<TimestampsListProps> = ({ handleClick }) => {
    const { data, isFetching } = useGetTimeStampsQuery('');
    const [sortedTimestamps, setSortedTimestamps] = useState<Timestamp[]>([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
            setSortedTimestamps(sortedData);
        }
    }, [data]);




    return (
        <div className="flex flex-col justify-center h-3/4 w-1/3">
            <span className="text-2xl font-semibold text-gray-900 mb-4 text-center">Timestamps Analytics</span>
            <ul
                className="flex flex-col gap-5 p-10 bg-gray-800 rounded-lg shadow-lg overflow-scroll " >
                    {sortedTimestamps.map((it, id) =>
                        <li 
                            className="p-4 border border-sky-500 flex gap-3 items-center rounded-md hover:bg-sky-700 hover:text-white transition-all duration-200 cursor-pointer"
                            key={id}
                            onClick={() => handleClick(it.timestamp)}
                        >
                            <span className="text-rose-400 font-semibold">{id + 1}</span>
                            <span className="text-gray-300">{timestampToTimeFormat(it.timestamp)}</span>
                            <span className="text-gray-400">{it.duration.toFixed(2)}</span>
                        </li>
                    )}
            </ul>
        </div>

    );
}

export default TimestampsList;