import { useRef, useState } from 'react'
import './App.css';
import TableRow from './components/tableRow';
import getCurrentDate from './utils/getCurrentDate';
import checkOverlap from './utils/checkOverlap';
import countDays from "./utils/countDays"
import getDaysFromUnix from './utils/getDaysFromUnix';

const App = () => {
  const inputRef = useRef()
  const [fileData, setFileData] = useState(null)

  const inputHandler = () => {
    const file = inputRef.current.files[0]
    const fr = new FileReader()

    fr.addEventListener("load", (e) => {
      const dataArray = e.target.result.split(", ").join(" ").split("\r\n").map(x => x.split(" "))

      dataArray.forEach(x => {
        if (x[3] === "NULL") {
          x[3] = getCurrentDate()
        }
      })

      const projects = {}
      //projects have nested objects, which have projectID as property name and array of project employees as value

      dataArray.forEach(x => {
        if (!projects[x[1]]) {
          projects[x[1]] = []
        }

        projects[x[1]].push(
          {
            employeeID: x[0],
            dateFrom: new Date(x[2]).getTime(),
            dateTo: new Date(x[3]).getTime()
          })
      })

      const employees = {}
      //employees contain ID for employee pairs, which contains the projectID, which contains the days

      for (const projectID in projects) {
        const projectEmployees = projects[projectID]

        for (const employee of projectEmployees) {
          for (let i = 0; i < projectEmployees.length; i++) {
            if (employee !== projectEmployees[i]) {
              const otherEmployee = projectEmployees[i]

              if (checkOverlap(employee, otherEmployee)) {
                if (!employees[`${employee.employeeID} ${otherEmployee.employeeID}`]) {
                  if (!Object.entries(employees).every(x => {
                    const xSplit = x[0].split(" ")

                    if (xSplit.includes(`${employee.employeeID}`) && xSplit.includes(`${otherEmployee.employeeID}`)) {
                      return false
                    }

                    return true
                  })) {
                    break
                  } else {
                    employees[`${employee.employeeID} ${otherEmployee.employeeID}`] = {}
                  }
                }

                if (!employees[`${employee.employeeID} ${otherEmployee.employeeID}`][projectID]) {
                  employees[`${employee.employeeID} ${otherEmployee.employeeID}`][projectID] = {}
                }

                employees[`${employee.employeeID} ${otherEmployee.employeeID}`][projectID]["days"] = getDaysFromUnix(countDays(employee, projectEmployees[i]))
              }
            }
          }
        }
      }

      setFileData(dataArray)
    })

    fr.readAsText(file)
  }

  return (
    <div className="App">
      <label htmlFor='file-input'>CSV File</label>
      <input ref={inputRef} onChange={inputHandler} id='file-input' type="file" accept=".csv" />
      {fileData && <div className='table-row'>
        <p>empID</p>
        <p>projectID</p>
        <p>dateFrom</p>
        <p>dateTo</p>
      </div>}
      {fileData && fileData.map((dataArray, i) => <TableRow key={i} data={dataArray} />)}
    </div>
  );
}

export default App
