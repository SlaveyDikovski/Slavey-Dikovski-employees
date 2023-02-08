function getCurrentDate() {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let date = currentDate.getDate()

    month = month < 10 ? `0${month}` : month
    date = date < 10 ? `0${date}` : date

    return `${year}-${month}-${date}`
}

export default getCurrentDate