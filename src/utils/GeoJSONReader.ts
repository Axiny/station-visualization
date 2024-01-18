import GeoJSONLength from './GeoJSONLength';
import { Log } from '.';

interface GeoJSON {
    crs: object;
    features: Array<object>;
    name: string;
    type: string;
}

interface GeoFeature {
    geometry: {
        coordinates: Array<[]> | Array<number>;
        type: string;
    };
    properties: object
}

const log = new Log('GeoJSONReader');

class GeoJSONReader {

    public static Point ( json: GeoJSON ): { vertex: Float32Array } {

        const { crs, features, name, type } = json;

        const lengths = GeoJSONLength.Point(json);
    
        const vertex: Float32Array = new Float32Array(lengths.vertex);
        let vertexArrayIndex: number= 0;
    
        for (let i = 0; i < features.length; i++) {
    
            const feature = features[i] as GeoFeature;
            const coordinates = feature.geometry.coordinates;
    
            vertex[vertexArrayIndex++] = coordinates[0] as number;
            vertex[vertexArrayIndex++] = coordinates[1] as number;
    
        }
    
        return { vertex }

    }

    public static MultiLineString ( json: GeoJSON ): { vertex: Float32Array, indices: Array<number> | Uint32Array } {

        const { crs, features, name, type } = json;

        log.print('load json data. the features length is ' + features.length );
    
        const lengths = GeoJSONLength.MultiLineString(json, 3);
    
        const vertex: Float32Array = new Float32Array(lengths.vertex);
        let vertexArrayIndex: number= 0;
    
        const indices: Uint32Array = new Uint32Array(lengths.indices as number);
        let indicesArrayIndex: number = 0;
        let indicesCount: number = 0;
    
        log.print(`vertext array length: ${lengths.vertex}.`);
        log.print(`indices array length: ${lengths.indices}.`);
    
        log.time('OSM Data load time');
    
        for (let i = 0; i < features.length; i++) {
    
            const feature = features[i] as GeoFeature;
            const coordinates = feature.geometry.coordinates;
            let pointLength = 0;
    
            for (let j = 0; j < coordinates.length; j++) {
    
                const coordinate = coordinates[j] as Array<[]>;
    
                for (let k = 0; k < coordinate.length; k++) {
    
                    const GPSPoint: number[] = coordinate[k];
    
                    vertex[vertexArrayIndex++] = GPSPoint[0];
                    vertex[vertexArrayIndex++] = GPSPoint[1];
                    vertex[vertexArrayIndex++] = 0;
                    
                }
    
                pointLength += coordinate.length;
    
            }
    
            for (let i = 0; i < pointLength - 1; i++) {
    
                indices[indicesArrayIndex++] = indicesCount + i;
                indices[indicesArrayIndex++] = indicesCount + i + 1;
        
            }
    
            indicesCount = indicesCount + pointLength;
    
        }
    
        log.timeEnd('OSM Data load time');
    
        return { vertex, indices }

    }

    // static Polygon ( json: GeoJSON ): { vertex: Float32Array } {

    //     const { crs, features, name, type } = json;
    //     const lengths = GeoJSONLength.Polygon(json, 3);

    //     const vertex: Float32Array = new Float32Array(lengths.vertex);
    //     let vertexArrayIndex: number= 0;

    //     for (let i = 0; i < features.length; i++) {
    
    //         const feature = features[i] as GeoFeature;
    //         const coordinates = feature.geometry.coordinates;
    
    //         for (let j = 0; j < coordinates.length; j++) {
    
    //             const coordinate = coordinates[j] as Array<[]>;
    
    //             for (let k = 0; k < coordinate.length; k++) {
    
    //                 const GPSPoint: number[] = coordinate[k];
    
    //                 vertex[vertexArrayIndex++] = GPSPoint[0];
    //                 vertex[vertexArrayIndex++] = GPSPoint[1];
    //                 vertex[vertexArrayIndex++] = 0;
                    
    //             }
    
    //         }
    
    //     }

    //     return { vertex }

    // }

    public static Polygon ( json: GeoJSON ) {

        return GeoJSONReader.MultiLineString(json);
        
    }
    
}


export default GeoJSONReader