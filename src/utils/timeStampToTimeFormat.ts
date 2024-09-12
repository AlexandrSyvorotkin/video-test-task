export function timestampToTimeFormat(timestamp: number) {
    const minutes = Math.floor(timestamp / 60);
    const seconds = Math.floor(timestamp % 60);

    const milliseconds = Math.floor((timestamp % 1) * 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
}