function copy (p: any): any {

    return JSON.parse(JSON.stringify(p))

}

export default copy;