<template>
  <div id="map-container" class="map-container"></div>
  <div id="map-visualization-container" class="map-visualization-container">
    <canvas id="panel"></canvas>
  </div>
  <Custom @change="handleChange"></Custom>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import createMapBoxObject from './../../../utils/mapbox-loader'
import type { Map, LngLatLike } from './../../../utils/mapbox-loader'
import MapVisuall from '../Model/MapVisual'
import api from './../../../api'
import { graphhopperSptCsvConver } from './../../../utils/csvToJson'
import { areaList, stationList, schoolType } from './utils'
import { csvToJson } from './../../../utils/csvToJson'
import GeoJSONReader from './../../../utils/GeoJSONReader'
import Custom from './Custom.vue'
import type CustomModel from '../Model/Custom'

const CENTER_POSITION: LngLatLike = [139.4665314093654, 35.39631454359802]
const DISTANCE_LIMIT = 2000; // 距離 メートル単位
let customData: CustomModel;
let visuall: any;
let isMounted: boolean = false;
let areaName = 'saitama';

async function handleChange ( custom: CustomModel ) {

  customData = custom;

  if (isMounted) {

    visuall.clearRenderList();
    loadStationsSPT(areaName);

  }

}

onMounted(async () => {

  const mapbox: Map = createMapBoxObject('map-container', CENTER_POSITION, 10.25);

  const panel = document.getElementById('panel') as HTMLCanvasElement;
  visuall = new MapVisuall(panel, mapbox);
  
  visuall.initMapBoxListener(mapbox);
  
  visuall.render();

  if (!isMounted) loadStationsSPT(areaName);
  isMounted = true;

  // loadGeoJSONRoadsData();
  // loadStationsSPT();
  // loadSchoolSPT();
  // loadShelterSPT();
  // loadStationsLocation(areaName);
  // loadRiverOverflow();

})


async function loadShelterSPT ( name: string ) {

const locations = await api.loadShelterLcation(name);

locations.features.forEach( async (item: any) => {

  const coordinates = item.geometry.coordinates[0];
  const position = [Number(coordinates[1]), Number(coordinates[0])] as [number, number];

  await loadSPT(position);

  /// net::ERR_INSUFFICIENT_RESOURCES
  async function loadSPT (position: [number, number]) {

    try {

      // const areaCSV = await api.graphhopperSPT(position, DISTANCE_LIMIT);
      const areaCSV = await api.graphhopperSPTForCustomModel(customData.getAPIConfig(position));
      const vertex = graphhopperSptCsvConver(areaCSV);
      visuall.addShelterRoadArea(vertex, customData.getLimit());

    } catch (e) {

      await loadSPT(position);

    }

  }

})

}

async function loadSchoolSPT ( name: string ) {

  const locations = await api.loadSchoolLcation(name);

  locations.features.forEach( async (item: any) => {

    const schoolTypeCode: string = item.properties["P29_004"]; // 16001: 小学校 16002: 中学校　16004: 高等学校

    switch (schoolTypeCode) {

      // case "16002" : 
      case "16001" : {

        const coordinates = item.geometry.coordinates[0];

        const position = [Number(coordinates[1]), Number(coordinates[0])] as [number, number];
        // const areaCSV = await api.graphhopperSPT(position, DISTANCE_LIMIT);
        const areaCSV = await api.graphhopperSPTForCustomModel(customData.getAPIConfig(position));
        const vertex = graphhopperSptCsvConver(areaCSV);
        visuall.addSchoolRoadArea(vertex, customData.getLimit(), 0);

      }

    }

  })

}

async function loadStationsSPT () {
  /// load road data
  areaList.forEach(async station => {

    const stationsCSV = await api.loadAreaStationsLocation(station);
    const stations: { station_lat: any, station_lon: any }[] = csvToJson(stationsCSV);
    
    for (let i = 0; i < stations.length; i++) {

      const lat = Number(stations[i].station_lat);
      const lon = Number(stations[i].station_lon);

      const station = [lat,  lon] as [number, number];
      // const spt = await api.graphhopperSPT(station, DISTANCE_LIMIT);
      const spt = await api.graphhopperSPTForCustomModel(customData.getAPIConfig(station));
      const vertex = graphhopperSptCsvConver(spt);
      visuall.addStationRoadArea(vertex, DISTANCE_LIMIT);

    }

  });

}

async function loadGeoJSONRoadsData () {

  const geoJsonData = await api.loadKanagawaRoads();
  const roadData = GeoJSONReader.MultiLineString(geoJsonData);
  visuall.addGeoJSONRoad(roadData.vertex, roadData.indices);

}

async function loadStationsLocation ( name: string ) {

  const stationsCSV = await api.loadAreaStationsLocation(name);
  const stations: { station_lat: any, station_lon: any }[] = csvToJson(stationsCSV);

  const VERTEX_LENGTH = stations.length * 2;

  const vertex = new Float32Array(VERTEX_LENGTH);

  let index = 0;
  stations.forEach( station => {

    vertex[index++] = station.station_lon;
    vertex[index++] = station.station_lat;

  });

  visuall.addPoints(vertex);

}

// 家屋倒壊等氾濫想定区域
async function loadRiverOverflow () {

  const geoJsonData = await api.loadRiveroverflowData();
  const graphData = GeoJSONReader.Polygon(geoJsonData);
  visuall.addPolygonData(graphData.vertex, graphData.indices);

}
</script>

<style>
.map-container, .map-visualization-container, #panel {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
  
.map-visualization-container {
  pointer-events: none;
}
  
#panel {
  z-index: 99999;
}
  
.img-size {
  width: 100px;
  height: 100px;
}

.mapboxgl-ctrl-scale {
  height: 10px;
  background-color:transparent!important;
  line-height: 10%;
  text-align: center;
  color: #fff;
  border-color: #fff;
  font-size: 14px;
}
</style>