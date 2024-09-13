import { FC, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { timeStamps, useGetTimeStampsQuery } from "../services/timestamps_analytics";
import { Timestamp } from "../types/timestamp-type";
import { timestampToTimeFormat } from "../utils/timeStampToTimeFormat";
import { nanoid } from "nanoid";

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

    if (isFetching) {
        return <div>Loading...</div>;
    }


    return (
        <ul
            className="flex flex-col gap-5 p-10 w-full bg-gray-800 rounded-lg shadow-lg overflow-scroll h-1/2" >
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

    );
}

export default TimestampsList;