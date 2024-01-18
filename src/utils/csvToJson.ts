function csvToJson ( csv: any ): Array<any> {

    const lines = csv.split('\n');
    const result = new Array(lines.length - 1);
    const headers: Array<any> = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {

        let obj: { [ index: string ]: any } = {};
        const currentLine = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {

            const header = headers[j].replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
            const data = currentLine[j].replace(/[\'\"\\\/\b\f\n\r\t]/g, '');

            obj[header] = data;

        }

        result[i - 1] = obj;

    }

    return result;

}

function graphhopperSptCsvConver ( csv: any ): Float32Array {

    const lines = csv.split('\n');
    // header and one line start point is null. so length - 2
    const length = (lines.length - 2) * 6
    const result = new Float32Array(length);

    let index = 0;
    let distance = 0;
    for (let i = 2; i < lines.length; i++) {

        const currentLine = lines[i].split(',');

        result[index++] = Number(currentLine[0]);
        result[index++] = Number(currentLine[1]);
        result[index++] = distance;

        result[index++] = Number(currentLine[2]);
        result[index++] = Number(currentLine[3]);
        result[index++] = distance = currentLine[4];

    }

    return result;

}

export {

    csvToJson,
    graphhopperSptCsvConver

}