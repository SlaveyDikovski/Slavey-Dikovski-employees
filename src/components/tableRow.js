import React from 'react'

const TableRow = ({ data }) => {
    const [empID, projectID, dateFrom, dateTo] = data

    return (
        <div className='table-row'>
            <p>{empID}</p>
            <p>{projectID}</p>
            <p>{dateFrom}</p>
            <p>{dateTo}</p>
        </div>
    )
}

export default TableRow
