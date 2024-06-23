const delay = () => {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            clearTimeout(timer);
            resolve();
        }, 75)
    });
}

let id = 0;
const getId = () => 'id_' + id++;

const generateUniqueInt = (arr, min, max) => {
    let int = min + Math.round(Math.random() * max);

    const isExist = arr.find(item => item.value === int);
    if (isExist) return generateUniqueInt(arr, min, max);

    return int;
}

const getNewColumn = (arr, min, max) => ({
    selected: false,
    value: generateUniqueInt(arr, min, max),
    key: getId()
})

const generateColumnsArr = (min, max) => {
    const arr = [];

    for (let i = 0; i < max + 1; i++) {
        arr.push(getNewColumn(arr, min, max));
    }

    return arr;
}

const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj))

export {delay, cloneDeep, generateColumnsArr};