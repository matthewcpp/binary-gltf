export class BinaryGltfChunk {
    public constructor(
        public readonly type: number,
        public readonly buffer: DataView
    ) {}

}
export class BinaryGltf {
    public readonly json: Object;
    public readonly chunks: BinaryGltfChunk[];

    public constructor(data: ArrayBuffer | DataView) {
        const dataView = BinaryGltf._getDataView(data);

        this._validateHeader(dataView);
    }

    private static _getDataView(data: ArrayBuffer | DataView) {
        if (data instanceof ArrayBuffer)
            return new DataView(data);

        if (data instanceof DataView)
            return data;

        throw new Error("Data must be either an ArrayBuffer or DataView");
    }

    private _validateHeader(view: DataView) {
        const magic = view.getUint32(0, true);
        if (magic !== 0x46546C67)
            throw new Error(`Unexpected magic number in header: ${magic}`);

        const version = view.getUint32(4, true);
        if (version !== 2)
            throw new Error(`Unexpected glTF version in header: ${version}`);

        const dataLength =  view.getUint32(8, true);
        if (dataLength !== view.byteLength)
            throw new Error(`Unexpected data length in header: ${dataLength}.  Expected: ${view.byteLength}`);
    }
}