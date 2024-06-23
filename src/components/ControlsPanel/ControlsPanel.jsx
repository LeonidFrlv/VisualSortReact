import {useState} from 'react';
import './ControlsPanel.css';
import bubbleSort from "./utils/bubbleSort";
import selectionSort from "./utils/selectionSort";
import combSort from "./utils/combSort";
import {generateColumnsArr} from "../../utils";

const ProgressPercent = ({ percent }) => (
    <div className='percent' id='percent'>{ percent >= 0 ? "Progress: " + percent + "%" : '' }</div>
)

const Select = ({ setSortType, sortType }) => {
        const sortTypes = [
            'BubbleSort',
            'SelectionSort',
            'CombSort',
            'InstantSort'
        ]

    const changeSortType = (e) => setSortType(e.target.value);

    return (
        <select value={sortType} onChange={changeSortType} className='select_sort_type' id='select_sort_type'>
            {sortTypes.map(item => (
                <option key={item}>{item}</option>
            ))}
        </select>
    )
}

const ControlBtn = ({ columns, setColumns, setPercent, setProgressPercent, sortedColumns, sortType }) => {
    const [btnAction, setBtnAction] = useState('SORT');

    const startAction = async (e) => {
        if (btnAction === 'SORT') {
            setProgressPercent(0, 1);
            e.target.disabled = true;
            setBtnAction('IN PROGRESS');
            if (sortType === 'BubbleSort') await bubbleSort(columns, setColumns, sortedColumns, setProgressPercent);
            if (sortType === 'SelectionSort') await selectionSort(columns, setColumns, sortedColumns, setProgressPercent);
            if (sortType === 'CombSort') await combSort(columns, setColumns, sortedColumns, setProgressPercent);
            if (sortType === 'InstantSort') {
                setColumns(() => [...columns].sort((a, b) => a.value - b.value))
                setProgressPercent(1, 1);
            }
            e.target.disabled = false;
            setBtnAction('GENERATE');
        }

        if (btnAction === 'GENERATE') {
            setColumns(generateColumnsArr(1, 15));
            setPercent();
            setBtnAction('SORT');
        }
    }

    return (
        <button className='start_btn' id='start_btn' onClick={startAction}>{btnAction}</button>
    )
}

const ControlsPanel = ({ columns, setColumns }) => {
    const [percent, setPercent] = useState();
    const [sortType, setSortType] = useState('BubbleSort');

    const sortedColumns = [...columns].sort((a, b) => a.value - b.value);

    const setProgressPercent = (current, max) => {
        setPercent(Math.round(current / max * 100));
    }

    return (
        <div className='control_panel'>
            <ControlBtn columns={columns} setColumns={setColumns} setPercent={setPercent} setProgressPercent={setProgressPercent} sortedColumns={sortedColumns} sortType={sortType} />
            <Select sortType={sortType} setSortType={setSortType} />
            <ProgressPercent percent={percent} />
        </div>
    );
};

export default ControlsPanel;