import createIndices from './createIndices'

/**
 * create by bunkyo university
 * 
 * japan roads network data reader
 * 
 * https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html#prefecture14
 * 
 * @param {Document} xml - xml data
 * 
 * @return { vertex : Array<number>, indices : Array<number> }
 * 
 * @author Axiny
 * @date 2022/6/20
 */
function RoadsGISReaderForJP (xml: Document): { vertex: Array<number>, indices: Array<number> } {

    const roads = xml.getElementsByTagName("gml:posList");
    const vertex: Array<number> = [];
    let indices: Array<number> = [];
    let indicesCount: number = 0;

    for (let i = 0; i < roads.length; i++) {

        const pointstr = (roads[i].textContent as string).toString().trim();
        const pointsTrimStr = pointstr.replace(/\n/g, " ");
        const pointList = pointsTrimStr.split(" ");
        const pointLength = pointList.length;

        for (let j = 0; j < pointLength; j += 2) {

            const lat = Number(pointList[j]);
            const lon = Number(pointList[j + 1]);
            const altitude = 0;

            vertex.push(lon, lat, altitude);

        }

        const lineIndices = createIndices(indicesCount, pointLength / 2);
        indices = indices.concat(lineIndices);

        indicesCount = indicesCount + pointLength / 2;

    }

    return { vertex, indices }

}


export default RoadsGISReaderForJP