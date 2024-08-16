
export interface S3DataList {
    type: "S3DataList";
    list: any[],
    test: any
}

export interface S3Data {
    "name": string;
    "short_name": string;
    "formats": string[];
    "icons": any[];
    "tags": any[];
    "uri": string;
}
