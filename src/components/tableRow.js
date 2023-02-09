import React from 'react'

const TableRow = ({ project,
    employee1,
    employee2 }) => {
    const [projectID, days] = project.split(" ")

    return (
        <div className='table-row'>
            <p>{employee1}</p>
            <p>{employee2}</p>
            <p>{projectID}</p>
            <p>{days}</p>
        </div>
    )
}

export default TableRow
