export const sortAsc = (arr, field) => {
    return arr.sort((a, b) => {
        if (a[field] > b[field]) { return 1; }
        if (b[field] > a[field]) { return -1; }
        return 0;
    })
}

export const sortDesc = (arr, field) => {
    return arr.sort((a, b) => {
        if (a[field] > b[field]) { return -1; }
        if (b[field] > a[field]) { return 1; }
        return 0;
    })
}
