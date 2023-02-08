import './App.css';

function App() {
  return (
    <div className="App">
      <label htmlFor='file-input'>CSV File</label>
      <input id='file-input' type="file" accept=".csv"/>
    </div>
  );
}

export default App;
