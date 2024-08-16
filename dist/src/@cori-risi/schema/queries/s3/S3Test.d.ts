export default function S3Test(): Promise<{
    type: string;
    message: string;
    test: {
        "S3Test resolver can list objects in `cori-risi-app` under the examples/ prefix": boolean;
        "S3Test object can be encoded as a valid character string": boolean;
        "S3Test object is valid JSON": boolean;
    };
}>;
