import FileLoader from './../utils/FileLoader'

const FILE_URL: string = "./src/source"

const graphhopperSPT = async function (position: [number, number], distance: number) {

    const result = await FileLoader.stringBlob(`
        http://localhost:8989/spt?point=${position}&distance_limit=${distance}&vehicle=foot&columns=prev_longitude,prev_latitude,longitude,latitude,distance`);

    return result;

}

const loadKanagawaLandPrice = async function () {

    const result = await FileLoader.json(`${FILE_URL}/kanto-land-price.geojson`);

    return result;

}

const loadKanagawaRoads = async function () {

    const result = await FileLoader.json(`${FILE_URL}/roads/kanagawa.geojson`);

    return result;

}


const loadAreaStationsLocation = async function ( name: string ) {

    const result = await FileLoader.stringBlob(`${FILE_URL}/station/${name}.csv`);

    return result;

}

const loadSchoolLcation = async function ( name: string ) {

    const result = await FileLoader.json(`${FILE_URL}/school/${name}.geojson`);

    return result;

}

const loadShelterLcation = async function ( name: string ) {

    const result = await FileLoader.json(`${FILE_URL}/shelter/${name}.geojson`);

    return result;

}

const loadRiveroverflowData = async function () {

    const result = await FileLoader.json(`${FILE_URL}/area/A31-40-22_10_5339.geojson`); // 家屋倒壊等氾濫想定区域 A31-40-22_10_5339

    return result;

}

const graphhopperSPTForCustomModel = async function ( req: string ) {

    const result = await FileLoader.stringBlob(`http://localhost:8989/spt?${req}`);

    return result;

}

export default {

    graphhopperSPT,
    graphhopperSPTForCustomModel,
    loadKanagawaLandPrice,
    loadAreaStationsLocation,
    loadKanagawaRoads,
    loadSchoolLcation,
    loadShelterLcation,
    loadRiveroverflowData,

}

export {

    graphhopperSPT,
    graphhopperSPTForCustomModel,
    loadKanagawaLandPrice,
    loadKanagawaRoads,
    loadSchoolLcation,
    loadShelterLcation,
    loadRiveroverflowData

}