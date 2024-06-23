import {cloneDeep, delay} from "../../../utils";

export default async function bubbleSort(columns, setColumns, sortedColumns, setProgressPercent) {
    const currentColumns = cloneDeep(columns);
    for (let i = 0, j = currentColumns.length - 1; i < currentColumns.length; i++, j--) {
        for (let k = 0; k < j; k++) {
            let nextIndex = k + 1;
            if (nextIndex === currentColumns.length) break;
            let currentItem = currentColumns[k];
            let nextItem = currentColumns[nextIndex];
            currentItem.selected = true;
            nextItem.selected = true;
            if (nextItem.value < currentItem.value) {
                currentColumns[k] = nextItem;
                currentColumns[nextIndex] = currentItem;
                setColumns([...currentColumns]);
            }

            await delay();
            currentItem.selected = false;
            nextItem.selected = false;
            setColumns([...currentColumns]);
        }

        if (JSON.stringify(sortedColumns) === JSON.stringify(currentColumns)) {
            setProgressPercent(1, 1);
            return;
        }

        setProgressPercent(i + 1, columns.length);
    }
}