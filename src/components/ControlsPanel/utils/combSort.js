import {cloneDeep, delay} from "../../../utils";

export default async function combSort(columns, setColumns, sortedColumns, setProgressPercent) {
    const currentColumns = cloneDeep(columns);

    const factor = 1.247;
    let gapFactor = currentColumns.length / factor;
    let i = 0;
    while (gapFactor > 1) {
        i++;
        const gap = Math.round(gapFactor);
        for (let i = 0, j = gap; j < currentColumns.length; i++, j++) {
            let currentItem = currentColumns[i];
            let gapItem = currentColumns[j];
            currentItem.selected = true;
            gapItem.selected = true;
            if (currentColumns[i].value > currentColumns[j].value) {
                currentColumns[i] = gapItem;
                currentColumns[j] = currentItem;
                setColumns([...currentColumns]);
            }
            await delay();
            currentItem.selected = false;
            gapItem.selected = false;
            setColumns([...currentColumns]);
        }
        gapFactor = gapFactor / factor;

        if (JSON.stringify(sortedColumns) === JSON.stringify(currentColumns)) {
            setProgressPercent(1, 1);
            return;
        }

        setProgressPercent(i + 1, currentColumns.length);
    }
}