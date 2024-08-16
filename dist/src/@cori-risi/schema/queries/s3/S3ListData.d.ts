export interface S3DataList {
    type: "S3DataList";
    list: any[];
    test: any;
}
export default function S3ListData(Bucket?: string, container_name?: string): Promise<S3DataList>;
