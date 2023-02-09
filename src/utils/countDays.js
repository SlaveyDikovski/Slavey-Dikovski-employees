function countDays(employee1, employee2) {
    if (employee1.dateFrom < employee2.dateFrom && employee1.dateTo < employee2.dateTo) {
        return employee1.dateTo - employee2.dateFrom
    } else if (employee1.dateFrom > employee2.dateFrom && employee1.dateTo > employee2.dateTo) {
        return employee2.dateTo - employee1.dateFrom
    } else if (employee1.dateFrom > employee2.dateFrom && employee1.dateTo < employee2.dateTo) {
        return employee1.dateTo - employee1.dateFrom
    } else if (employee1.dateFrom < employee2.dateFrom && employee1.dateTo > employee2.dateTo) {
        return employee2.dateTo - employee2.dateFrom
    } else if (employee1.dateFrom < employee2.dateFrom && employee1.dateTo === employee2.dateTo) {
        return employee2.dateTo - employee2.dateFrom
    } else if (employee1.dateFrom > employee2.dateFrom && employee1.dateTo === employee2.dateTo) {
        return employee1.dateTo - employee1.dateFrom
    } else if (employee1.dateFrom === employee2.dateFrom && employee1.dateTo < employee2.dateTo) {
        return employee1.dateTo - employee1.dateFrom
    } else if (employee1.dateFrom === employee2.dateFrom && employee1.dateTo > employee2.dateTo) {
        return employee2.dateTo - employee2.dateFrom
    } else if (employee1.dateFrom === employee2.dateFrom && employee1.dateTo === employee2.dateTo) {
        return employee2.dateTo - employee1.dateFrom
    }
}

export default countDays
