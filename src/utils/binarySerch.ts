export function findCurrentTimeStamp(time: number, data: any) {
    let left = 0;
    let right = data.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const tooltip = data[mid];
        
        if (time >= Math.floor(tooltip.timestamp) && time <= Math.floor(tooltip.timestamp + tooltip.duration))
            return tooltip;
        else if (Math.floor(tooltip.timestamp) < time) left = mid + 1;
        else right = mid - 1;
    }
    return null;
}