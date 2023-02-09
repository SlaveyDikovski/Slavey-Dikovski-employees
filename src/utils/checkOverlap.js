function checkOverlap(firstEmployee, secondEmployee) {
    const firstDF = firstEmployee.dateFrom
    const firstDT = firstEmployee.dateTo
    const secondDF = secondEmployee.dateFrom
    const secondDT = secondEmployee.dateTo

    if (firstDT < secondDF || firstDF > secondDT) {
        return false
    }

    return true
}

export default checkOverlap