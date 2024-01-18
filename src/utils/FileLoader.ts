/**
 * create by bunkyo university
 * 
 * @constructor FileLoader
 * 
 * @example
 * import FileLoader from './FileLoader';
 * ...
 * /// in the async function
 * const xmlFile = await FileLoader.xml('///url///');
 * ...
 * 
 * @author Axiny
 * @date 2022/6/20
 */
class FileLoader {

    private static options: RequestInit = {
        
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    }

    constructor () {}

    public static async stringBlob (url: string, options?: RequestInit): Promise<string> {

        const init = Object.assign({}, FileLoader.options, options);

        const response = await fetch(url, init);
        const str = (await response.text()).toString();

        return str;

    }

    public static async xml (url: string, options?: RequestInit): Promise<Document> {

        const str = await FileLoader.stringBlob(url, options);
        const xml = await new DOMParser().parseFromString(str, "text/xml");

        return xml;

    }

    public static async json (url: string, options?: RequestInit): Promise<any> {

        const str = await FileLoader.stringBlob(url, options);
        const json = JSON.parse(str);
        
        return json;

    }

    public static async osm (url: string): Promise<any> { 

        const osm = await FileLoader.xml(url);

        return osm;

    }

}

export default FileLoader