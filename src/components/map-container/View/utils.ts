  // for (let i = 0; i < stationList.length; i++) {

  //   const station = stationList[i] as [number, number];
  //   const spt = await api.graphhopperSPT(station, DISTANCE_LIMIT);
  //   const vertex = graphhopperSptCsvConver(spt);
  //   visuall.addRoads(vertex);

  // }

  // /// load geojson road all data
  // const GeoJsonFileRoads = await api.loadKanagawaRoads();
  // const Roads = geoJsonReader.MultiLineString(GeoJsonFileRoads);
  // visuall.addRoads(Roads.vertex, Roads.indices, [0.5, 1.0, 1.0]);

  // /// load land price data
  // const GeoJsonFile: any = await api.loadKanagawaLandPrice();
  // const { vertex } = geoJsonReader.Point(GeoJsonFile);
  // visuall.addPoints(vertex);
  
const stationList = [
    [ 35.46620542884823, 139.6221245469623 ],   // 横浜駅
    [ 35.39631454359802, 139.4665314093654 ],   // 湘南台駅
    [ 35.46980630814175, 139.46023120669614 ],  // 大和駅
    [ 35.40037492296814, 139.53382182548944 ],  // 戸塚駅
    [ 35.4505385876704, 139.46513225348087 ],   // 桜ヶ丘駅
    [ 35.47049210073068, 139.48248366784523 ],  // 瀬谷駅
    [ 35.46802886295627, 139.50272205276843 ],  // 三ツ境駅
    [ 35.46054106553952, 139.51422803553285 ],  // 希望ヶ丘駅
    [ 35.452355071491816, 139.52643812600675 ], // 南万騎が原駅
    [ 35.43951213927732, 139.52182679811142 ],  // 緑園都市駅
    [ 35.42994000570994, 139.5065331621188 ],   // 弥生台駅
    [ 35.42952353974195, 139.49495557677199 ],  // いずみ野駅
    [ 35.43227323360748, 139.46468247710024 ],  // 高座渋谷駅
    // [ 35.44676180881675, 139.59960833510647 ],  // 保土ヶ谷駅
    [ 35.43043902503371, 139.55678987218286 ],  // 東戸塚駅
    // [ 35.38357877233545, 139.61586525564192 ],  // 杉田駅
    // [ 35.44278947372809, 139.6499966209852 ],   // 元町・中華街駅
    // [ 35.42686851839598, 139.646381181124 ],    // 山手駅
    [ 35.42313778612768, 139.60207714525276 ],  // 弘明寺駅　神奈川県道21号横浜鎌倉線
    [ 35.587233546868966, 139.59119107568895 ], // 宮崎台
    [ 35.560802,140.158457 ],                   // 学園前
]


const areaList = [

  'kanagawa',  // 神奈川県
  'saitama',   // 埼玉県
  'tiba',      // 千葉県
  'ibaraki',   // 茨城県
  'totigi',    // 栃木県
  'gunma',     // 群馬県
  // 'tokyo',     // 東京都

]

/// https://nlftp.mlit.go.jp/ksj/gml/codelist/SchoolClassCd.html
const schoolType = {

    "16001" : 0,  // 小学校
    "16002" : 1,  // 中学校
    "16003" : 2,  // 中等教育学校
    "16004" : 4,  // 高等学校
    "16005" : 5,  // 高等専門学校
    "16006" : 6,  // 短期大学
    "16007" : 7,  // 大学
    "16012" : 8,  // 特別支援学校

}

function RGBConver (R: number, G: number, B: number): Array<number> {

  return [R / 255, G / 255, B / 255];

}

export {

    stationList,
    areaList,
    schoolType,
    RGBConver
    
}