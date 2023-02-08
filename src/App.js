import { useRef, useState } from 'react'
import './App.css';
import TableRow from './components/tableRow';

const App = () => {
  const inputRef = useRef()
  const [fileData, setFileData] = useState(null)

  const inputHandler = () => {
    const file = inputRef.current.files[0]
    const fr = new FileReader()

    fr.addEventListener("load", (e) => {
      const dataArray = e.target.result.split(", ").join(" ").split("\r\n").map(x => x.split(" "))
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
