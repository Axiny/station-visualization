/**
 * create by TecFantasy
 * update by bunkyo university
 * recode base the typeUtil in 2017/10/19
 * 
 * determine the data type
 *
 * @constructor Type
 * 
 * @example
 * Type.get ()
 * 
 * @version 3.0
 * 
 * @author Axiny
 * @date 2017/10/19
 * 
 * @update Axiny 2020/6/15 根据ts语法变更代码 v1.0 -> v2.0
 * @update Axiny 2022/5/17 recode
 */
class Type {

    public static get (p: any): string {

        const type = Object.prototype.toString.call(p);

        return type.slice(8, type.length - 1);

    }

    public static isObject (p: any): boolean {

        return this.get(p) === 'Object';

    }

    public static isArray (p: any): boolean {

        return this.get(p) === 'Array';

    }

    public static isString (p: any): boolean {

        return this.get(p) === 'String';

    }

    public static isDate (p: any): boolean {

        return this.get(p) === 'Date';

    }

    public static isFunction (p: any): boolean {

        return this.get(p) === 'Function';

    }

    public static isNumber (p: any): boolean {

        return this.get(p) === 'Number';

    }

    public static isBoolean (p: any): boolean {

        return this.get(p) === 'Boolean';
        
    }

    public static isJSON (p: any): boolean {

        return this.get(p) === 'JSON'

    }

    public static isUndefined (p: any): boolean {

        return this.get(p) === 'Undefined'

    }

    public static isNull (p: any): boolean {

        return this.get(p) === 'Null';

    }

}

export default Type;