import mapbpxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import type { LngLatLike, Map } from 'mapbox-gl'

// const MAPBOX_TOKEN = 'pk.eyJ1IjoibXJheGlueSIsImEiOiJjbDJma2ozbXIwOGJ3M2JwM2ljZGo5ZGZ5In0.rMOul1UwI4UvLDShfL53Uw';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYXhpbnkiLCJhIjoiY2phOTZua2UzMDR4ZTMycGVoMGFkNzBuNSJ9._MkMi0WbPzusy6yrexvt1w'
/**
 * create by bunkyo university
 * 
 * @function createMapBoxObject
 * create a mapbox object
 * 
 * @param {string} container - the id is Document Object attribute, use the mapbox container
 * @param {LngLatLike | Array<Number> | Number} center - the map center position as lon and lat
 * @param {Number | undefined} zoom - the map zoom level
 * 
 * @returns {Map | Object} 
 * 
 * @author Axiny
 * @date 2022/5/8
 */
function createMapBoxObject (container: string, center: LngLatLike, zoom?: number | undefined): Map {

    mapbpxgl.accessToken = MAPBOX_TOKEN;
    
    return new mapbpxgl.Map({
        container,
        center : center || [-74.5, 40],
        zoom: zoom || 9,
        style: 'mapbox://styles/axiny/cjgdfrkr9000g2slhzhq3m9a0',
        // style: 'mapbox://styles/mapbox/streets-v11'
    }).addControl(new mapbpxgl.ScaleControl(), 'bottom-right');

}

export type { Map, LngLatLike };
export default createMapBoxObject;
