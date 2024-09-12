import { FC, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { timeStamps, useGetTimeStampsQuery } from "../../api/timestamps_analytics";
import { Timestamp } from "../../types/timestamp-type";
import { timestampToTimeFormat } from "../../utils/timeStampToTimeFormat";
import { nanoid } from "nanoid";

interface TimestampsListProps {
    handleClick: any
}

const TimestampsList: FC<TimestampsListProps> = ({ handleClick }) => {
    const { data, isFetching } = useGetTimeStampsQuery('');
    const [sortedTimestamps, setSortedTimestamps] = useState<Timestamp[]>([]);

    const [scrollTop, setScrollTop] = useState(0)
    const scrollElementRef = useRef<HTMLUListElement>(null)

    const itemHeight = 40
    const containerHeight = 600
    const overscan = 3


    useEffect(() => {
        if (data && Array.isArray(data)) {
            const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
            setSortedTimestamps(sortedData);
            
        }

        
    }, [data]);

    const arr = []
    for (let i = 0; i < sortedTimestamps.length; i ++) {
        const newEl = {
            el: sortedTimestamps[i],
            id: nanoid()
        }
        arr.push(newEl)
        
    }

    // console.log(arr)

    useLayoutEffect(() => {
        const scrollElement = scrollElementRef.current

        if (!scrollElement) {
            return;
        }

        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop
            setScrollTop(scrollTop)
        }

        handleScroll()

        scrollElement.addEventListener('scroll', handleScroll)
        return () => scrollElement.removeEventListener('scroll', handleScroll)
    }, [sortedTimestamps])

    const [startIndex, endIndex] = useMemo(() => {


        const rangeStart = scrollTop
        const rangeEnd = scrollTop + containerHeight

        let startIndex = Math.floor(rangeStart / itemHeight)
        let endIndex = Math.ceil(rangeEnd / itemHeight)

        startIndex = Math.max(0, startIndex - overscan)
        endIndex = Math.min(sortedTimestamps.length - 1, endIndex + overscan)

        return [startIndex, endIndex]
    }, [scrollTop, arr.length, arr])

    const itemsToRender = arr.slice(startIndex, endIndex + 1)

    const listContainerHeight = itemHeight * sortedTimestamps.length

    if (isFetching) {
        return <div>Loading...</div>;
    }
    // console.log({ startIndex, endIndex });
    // console.log(sortedTimestamps)

    return (
        <ul style={{height: containerHeight}}
            className="flex flex-col gap-5 p-10 w-full bg-gray-800 rounded-lg shadow-lg overflow-scroll h-1/2" ref={scrollElementRef}>
                {sortedTimestamps.map((it, id) =>
                    <li 
                    style={{height: itemHeight}}
                        className="p-4 border border-sky-500 flex gap-3 items-center rounded-md hover:bg-sky-700 hover:text-white transition-all duration-200 cursor-pointer"
                        key={id}
                        onClick={() => handleClick(it.timestamp)}
                    >
                        <span className="text-rose-400 font-semibold">{id + 1}</span>
                        {/* <span className="text-gray-300">{timestampToTimeFormat(it.timestamp)}</span>
                        <span className="text-gray-400">{it.duration.toFixed(2)}</span> */}
                    </li>
                )}
            </ul>

    );
}

export default TimestampsList;