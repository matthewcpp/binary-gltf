const { BinaryGltf } = require("../../dist/index_cjs");
const fs = require("fs");

if (process.argv.length < 3) {
    console.log("Usage: node test.js /path/to/file.glb")
    process.exit(1);
}

const filePath = process.argv[2];

try {
    const data = fs.readFileSync(filePath);
    const binaryGltf = BinaryGltf.parse(data.buffer);

    console.log(`Loaded: ${filePath}`);
    console.log(`Binary: offset: ${binaryGltf.binary.byteOffset}\nlength:${binaryGltf.binary.byteLength}`);
} catch (e) {
    console.log(e.toString());
}


