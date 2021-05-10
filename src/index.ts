class BinaryGltfChunk {
    public constructor(
        public readonly type: number,
        public readonly view: DataView
    ) {}
}

export class BinaryGltf {
    private static _MagicNum = 0x46546C67;
    private static _JsonChunk = 0x4E4F534A;
    private static _BinaryChunk = 0x004E4942;

    constructor(public readonly json: Object,
                public readonly binary: DataView,
                public readonly extras: BinaryGltfChunk[])
    {}

    private static _validateHeader(buffer: ArrayBuffer) {
        const view = new DataView(buffer, 0, 12);
        const magic = view.getUint32(0, true);
        if (magic !== BinaryGltf._MagicNum)
            throw new Error(`Unexpected magic number in header: ${magic}.`);

        const version = view.getUint32(4, true);
        if (version !== 2)
            throw new Error(`Unexpected glTF version in header: ${version}.`);

        const dataLength =  view.getUint32(8, true);
        if (dataLength !== buffer.byteLength)
            throw new Error(`Unexpected data length in header: ${dataLength}.  Expected: ${view.byteLength}.`);
    }

    private static _parseChunks(buffer: ArrayBuffer): BinaryGltfChunk[] {
        const view = new DataView(buffer);
        const chunks: BinaryGltfChunk[] = [];

        let offset = 12; // sizeof(header)
        while (offset < view.byteLength) {
            const chunkLength = view.getUint32(offset, true);
            const chunkType = view.getUint32(offset + 4, true);

            const chunkView = new DataView(buffer, offset + 8, chunkLength);
            chunks.push(new BinaryGltfChunk(chunkType, chunkView));
            offset += 8 + chunkLength;
        }

        return chunks;
    }

    public static load(data: ArrayBuffer): BinaryGltf {

        BinaryGltf._validateHeader(data);

        const chunks = BinaryGltf._parseChunks(data);

        if (chunks[0].type !== BinaryGltf._JsonChunk)
            throw new Error("First binary glTF chunk should have type of 'Structured JSON content'.");

        const textDecoder = new TextDecoder();
        const json = JSON.parse(textDecoder.decode(chunks[0].view));

        let binary: DataView = null;
        const extras: BinaryGltfChunk[] = [];
        for (let i = 1; i < chunks.length; i++) {
            if (chunks[i].type === BinaryGltf._BinaryChunk)
                binary = chunks[i].view;
            else
                extras.push(chunks[i]);
        }

        return new BinaryGltf(json, binary, extras);
    }
}