// db date: Fri Oct 03 2025 18:02:40 GMT+0300 (Москва, стандартное время)
function lastDateIsSame(lastDate: string) {
    const currentDate = new Date().toString().split(" ")[2];
    const lastDateUpdated = lastDate.split(" ")[2];
    return currentDate === lastDateUpdated;
}

export { lastDateIsSame };

