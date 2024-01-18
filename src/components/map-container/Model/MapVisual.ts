import { 
    WebGLRender, 
    Scene, 
    Roads,
    Area
} from '../../../utils/WebGL'

import type { WebMercatorViewportOptions } from '../../../utils/WebGL/'
import { GPSPoint } from '../../../utils/WebGL/GPSPoint'
import type { Map } from './../../../utils/mapbox-loader'
import { RGBConver } from './../View/utils'

const EVENTS: string[] = ['zoom','rotate', 'drag', 'pitch', 'rotate', 'move'];

class MapVisuall {

    private webglRender: WebGLRender;
    private canvas: HTMLCanvasElement;
    private scene: Scene;
    private roadList: Roads[] = [];
    private pointList: GPSPoint[] = [];
    private areaList: Area[] = [];
    private state: any;

    constructor (canvas: HTMLCanvasElement, map: Map) {

        this.canvas = canvas;

        const scene = this.scene = new Scene();
        const webglRender = new WebGLRender(canvas);
        this.webglRender = webglRender;

        const state = this.state = this.getMapboxState(map);
        
        this.changeCamera(state.config, state.scale);

        webglRender.init(scene);

    }

    private getMapboxState (map: Map): { config: WebMercatorViewportOptions, scale: number } {

        const { lat, lng } = map.getCenter();
        const { width, height } = map.getCanvas();
        const zoom = map.getZoom();
        const scale = Math.pow(2, zoom);

        const config: WebMercatorViewportOptions = {

            width,
            height,
            latitude  : lat,
            longitude : lng,
            zoom,
            pitch     : map.getPitch(),
            bearing   : map.getBearing(),
            altitude : 1.5

        }

        return { config, scale }

    }

    public addShelterRoadArea (vertex: any, distance: number) {

        const color = [
            RGBConver(150, 255, 100),
            RGBConver(50, 200, 50),
            RGBConver(25, 150, 0),
            RGBConver(0, 50, 0),
            RGBConver(0, 25, 0)
        ]

        this.addRoads(vertex, color, distance);

    }

    public addSchoolRoadArea (vertex: any, distance: number, type: number) {

        let color: any[] = []

        switch (type) {

            case 0: {

                color = [
                    RGBConver(100, 255, 255),
                    RGBConver(0, 100, 255),
                    RGBConver(0, 50, 200),
                    RGBConver(0, 25, 150),
                    RGBConver(0, 10, 100)
                ]
                break;
            }

            case 1: {

                color = [
                    RGBConver(255, 200, 255),
                    RGBConver(255, 150, 255),
                    RGBConver(255, 100, 255),
                    RGBConver(255, 50, 255),
                    RGBConver(255, 0, 255)
                ]
                break;

            }

        }

        this.addRoads(vertex, color, distance);

    }

    public addStationRoadArea (vertex: any, distance: number) {

        const color = [
            RGBConver(255, 255, 0),
            RGBConver(255, 191, 0),
            RGBConver(255, 128, 0),
            RGBConver(255, 64, 0),
            RGBConver(255, 0, 0)
        ]

        this.addRoads(vertex, color, distance);

    }

    public addGeoJSONRoad(vertex: any, indices: Array<number> | Uint32Array) {

        const color = [
            [0.5, 1, 0.75],
            [0.5, 1, 0.75],
            [0.5, 1, 0.75],
            [0.5, 1, 0.75],
            [0.5, 1, 0.75]
        ]

        this.addRoads(vertex, color, 1, indices);

    }

    public addRoads (vertexs: any, color: Array<any>, distance: number, indices?: Array<number> | Uint32Array) {

        const roads = new Roads(vertexs);

        if (indices) {
            
            roads.setIndices(indices);
            
        }

        roads.setData('u_color_1', color[0]);
        roads.setData('u_color_2', color[1]); 
        roads.setData('u_color_3', color[2]);
        roads.setData('u_color_4', color[3]); 
        roads.setData('u_color_5', color[4]);
        roads.setData('u_opacity', 0.75);
        roads.setData('u_distance_limit', distance / 4);
        roads.setData('u_offset', [0.0, 0.0]); // 0.0, 0.0007125
        
        this.roadList.push(roads);
        this.changeCamera(this.state.config, this.state.scale);

        this.scene.add(roads);

    }

    public addPoints (vertexs: any) {

        const points = new GPSPoint(vertexs);

        points.mercatorViewportState(this.state.config);
        const viewportMatrix = points.getViewProjectionMatrix();

        points.setData('u_scale', this.state.scale);
        points.setData('u_mapMatrix', viewportMatrix);

        points.setData('u_color', [1, 0, 0]);
        points.setData('u_opacity', 1.0);

        this.pointList.push(points);
        this.scene.add(points);

    }

    
    public addPolygonData (vertexs: any, indices?: Array<number> | Uint32Array) {

        const polygon = new Area(vertexs);

        if (indices) {
            
            polygon.setIndices(indices);
            
        }

        polygon.mercatorViewportState(this.state.config);
        const viewportMatrix = polygon.getViewProjectionMatrix();

        polygon.setData('u_scale', this.state.scale);
        polygon.setData('u_mapMatrix', viewportMatrix);
        polygon.setData('u_offset', [0.0, -0.0000005]);

        polygon.setData('u_color', [1, 1, 0]);
        polygon.setData('u_opacity', 1.0);

        this.areaList.push(polygon);
        this.changeCamera(this.state.config, this.state.scale);

        this.scene.add(polygon);

    }

    public render () {

        const WebGLRender = this.webglRender;
        
        tick();

        function tick () {

            WebGLRender.render();
            requestAnimationFrame(tick);

        }

    }

    public changeCamera (config: WebMercatorViewportOptions, scale: number) {

        const GISObjects = [...this.roadList, ...this.pointList, ...this.areaList];

        for (let i = 0; i < GISObjects.length; i++) {

            const GISObject3D = GISObjects[i];

            GISObject3D.mercatorViewportState(config);
            const viewportMatrix = GISObject3D.getViewProjectionMatrix();

            GISObject3D.setData('u_scale', scale);
            GISObject3D.setData('u_mapMatrix', viewportMatrix);

        }

    }

    public initMapBoxListener (map: Map): void {

        EVENTS.forEach(name => map.on(name, () =>{

            const res = this.state = this.getMapboxState(map);

            this.changeCamera(res.config, res.scale);

        }))

    }

    public clearRenderList () {

        this.roadList = [];
        this.pointList = [];
        this.areaList = [];
        this.scene.clearRenderList();

    }
    
}


export default MapVisuall