function getDaysBetweenDates(firstDate, secondDate) {
    let res = secondDate.getTime() - firstDate.getTime()

    return res / (1000 * 60 * 60 * 24);
}

export default getDaysBetweenDates