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

      const results = {}

      for (const key1 in employees) {
        results[key1] = 0
        for (const key2 in employees[key1]) {
          results[key1] += employees[key1][key2].days
        }
      }

      let result = "id:0"

      for (const key in results) {
        let currentResult = Number(result.split(":")[1])

        if (results[key] > currentResult) {
          result = `${key}:${results[key]}`
        }
      }


      let finalTeam = result.split(":")[0]
      let projectsArray = []
      for (const key in employees[finalTeam]) {
        projectsArray.push(`${key} ${employees[finalTeam][key].days}`)
      }

      const [employeeID1, employeeID2] = finalTeam.split(" ")

      const output = {
        employeeID1,
        employeeID2,
        projects: projectsArray
      }

      setFileData(output)
    })

    fr.readAsText(file)
  }

  return (
    <div className="App">
      <label htmlFor='file-input'>CSV File</label>
      <input ref={inputRef} onChange={inputHandler} id='file-input' type="file" accept=".csv" />
      <div className='table-container'>
        {fileData &&
          <div className='table-row'>
            <p>Employee ID #1</p>
            <p>Employee ID #2</p>
            <p>Project ID</p>
            <p>Days worked</p>
          </div>}
        {fileData && fileData.projects.map((dataArray, i) =>
          <TableRow
            key={i} project={dataArray}
            employee1={fileData.employeeID1}
            employee2={fileData.employeeID2}
          />)}
      </div>
    </div>
  );
}

export default App
