export default function S3ListData(Bucket?: string, container_name?: string): Promise<{
    type: string;
    list: any;
    test: {
        "S3ListData resolver can list objects": boolean;
        "S3ListData manifest can be encoded as a valid character string": boolean;
        "S3ListData manifest object is valid JSON": boolean;
        "S3ListData manifest contains valid list of data": boolean;
    };
}>;
