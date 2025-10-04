function lastDateIsSame(lastDate: string) {
    const currentDate = new Date().toString().split(" ")[2];
    const lastDateUpdated = lastDate.split(" ")[2];
    return currentDate === lastDateUpdated;
}

export { lastDateIsSame };

