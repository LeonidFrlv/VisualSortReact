import './App.css';
import '../Columns/Columns'
import Columns from "../Columns/Columns";
import {useState} from "react";
import ControlsPanel from "../ControlsPanel/ControlsPanel";
import {generateColumnsArr} from "../../utils";

const Header = () => (
    <header>
        <h1>Sort Visualization</h1>
        <h4>by s1queence</h4>
    </header>
)

const App = () => {
    const [columns, setColumns] = useState(generateColumnsArr(1, 15));

    return (
      <div className='content'>
          <Header />
          <Columns columns={columns} setColumns={setColumns} />
          <ControlsPanel columns={columns} setColumns={setColumns} />
      </div>
    )
}

export default App;