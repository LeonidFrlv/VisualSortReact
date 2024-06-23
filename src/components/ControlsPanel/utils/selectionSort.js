import {cloneDeep, delay} from "../../../utils";

export default async function selectionSort(columns, setColumns, sortedColumns, setProgressPercent) {
    const currentColumns = cloneDeep(columns);
    let lastIndex = currentColumns.length - 1;
    for (let i = 0; i < currentColumns.length; i++) {
        for (let k = 0; k < lastIndex; k++) {
            let lastItem = currentColumns[lastIndex];
            let currentItem = currentColumns[k];
            lastItem.selected = true;
            currentItem.selected = true;
            if (currentItem.value > lastItem.value) {
                currentColumns[k] = lastItem;
                currentColumns[lastIndex] = currentItem;
                setColumns([...currentColumns]);
            }

            await delay();
            currentItem.selected = false;
            lastItem.selected = false;
            lastItem = currentItem;
            setColumns([...currentColumns]);
        }
        lastIndex--;

        if (JSON.stringify(sortedColumns) === JSON.stringify(currentColumns)) {
            setProgressPercent(1, 1);
            return;
        }

        setProgressPercent(i + 1, currentColumns.length);
    }

}