interface GeoJsonArrayLength { 
    vertex: number, 
    indices?: number 
}

class GeoJSONLength {

    /**
     * create by bunkyo university
     * 
     * calculate geojson MultiLineString type data vertex and indices array length
     * 
     * @param {*} json - geo json data
     * @param {number} vertexLength - one vertex use the elements lengths
     * 
     * @returns { vertex: number, indices: number }
     * 
     * @author Axiny
     * @date 2022/7/12
     */
    static MultiLineString ( json: any, vertexLength: number ): GeoJsonArrayLength {

        const features = json.features;
        let vertex = 0, indices = 0;
    
        for (let i = 0; i < features.length; i++) {
    
            const coordinates = features[i].geometry.coordinates;
            let points = 0;
    
            for (let j = 0; j < coordinates.length; j++) {
    
                const len = coordinates[j].length;
    
                vertex += vertexLength * len;
                points += len;
    
            }
    
            indices += (points - 1) * 2;
    
        }
    
        return { vertex, indices };

    }

    /**
     * create by bunkyo university
     * 
     * calculate geojson Point type data vertex and indices array length
     * 
     * @param {*} json - geo json data
     * 
     * @returns { vertex: number }
     * 
     * @author Axiny
     * @date 2023/6/2
     */
    static Point ( json: any ): GeoJsonArrayLength {

        const features = json.features;
        let vertex = 0;
    
        for (let i = 0; i < features.length; i++) {
    
            const coordinates = features[i].geometry.coordinates;
            vertex += coordinates.length;
    
        }
    
        return { vertex };

    }

    /**
     * create by bunkyo university
     * 
     * calculate geojson MultiLineString type data vertex and indices array length
     * 
     * @param {*} json  - geo json data
     * @param {number} vertexLength - one vertex use the elements number
     * 
     * @author Axinyx
     * @date 2023/10/29
     */
    static Polygon ( json: any, vertexLength: number ): GeoJsonArrayLength {

        return GeoJSONLength.MultiLineString(json, vertexLength);

    }

}

export default GeoJSONLength