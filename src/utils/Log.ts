/**
 * create by bunkyo university
 * 
 * @constructor Log
 * the log util
 * 
 * @param {string} title - the module name
 * 
 * @example
 * const log = new Log('module');
 * log.print('this is the log message');
 * 
 * // [module]: this is the log message
 * 
 * @author Axiny
 * @date 2022/5/5
 */
class Log {

    private title: string;

    constructor (title?: string) {

        this.title = title || 'Log';

    }

    private getMessage (message: string): string {

        return `[${this.title}]: ${message}`;

    }

    public changeTitle (title: string): void {

        this.title = title;

    }

    public error (msg: string): void {

        throw new Error( this.getMessage(msg) );

    }

    public print (msg: any): void {

        console.log( this.getMessage(msg) );

    }

    public printf (msg: any): void {

        console.log( this.getMessage(""), msg );

    }

    public warn (msg: string | object | any): void {

        console.warn( this.getMessage(msg) );

    }

    public time (msg: string | object | any): void {

        console.time( this.getMessage(msg) );

    }

    public timeEnd (msg: string | object | any): void {

        console.timeEnd( this.getMessage(msg) );

    }

}

export default Log