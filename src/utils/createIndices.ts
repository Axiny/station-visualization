function createIndices(lastIndex: number, length: number): Array<number> {

    const res = new Array((length - 1) * 2);
    let index = 0;
    
    for (let i = 0; i < length - 1; i++) {

        res[index] = lastIndex + i;
        index++;

        res[index] = lastIndex + i + 1;
        index++;

    }

    return res;

}

export default createIndices;