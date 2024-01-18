/**
 * Standard Routing Profiles
 * https://docs.graphhopper.com/#section/Map-Data-and-Routing-Profiles
 */
export type CustomType = "car" | "foot" | "bike";
export type CustomModel = "time" | "distance";

class Custom {

    public id: number;
    public name: string;
    public type: CustomType;
    public time: number;
    public model: CustomModel;
    public distance: number;

    constructor ( id: number, name: string ) {

        this.id = id;
        this.name = name;
        this.type = "foot";
        this.model = "distance";
        this.time = 1000;
        this.distance = 10000;

    }

    public getAPIConfig ( position: [number, number] ): string {

        // http://localhost:8989/spt?point=${position}&distance_limit=${distance}&vehicle=foot&columns=prev_longitude,prev_latitude,longitude,latitude,distance
        let res = "";

        if ( position ) {

            res += `point=${position}&`;

        } else {

            throw Error ("Model Custom: the position is not defined");

        }

        this.model === "distance" ? res += `distance_limit=${this.distance}&` :
            this.model === "time" ? res += `time_limit=${this.time}&` : res += "";

        res += `vehicle=${this.type}&columns=prev_longitude,prev_latitude,longitude,latitude,distance`;

        return res;

    }

    public getLimit () {

        return this.model === "distance" ? this.distance : this.time;

    }

}

export default Custom