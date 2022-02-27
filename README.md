# binary-gltf
Simpe library for working with binary glTF files.

The library exposes a single `parse` method that takes an `ArrayBuffer` of a GLB file and returns an object with the following structure:
```
{
    json: Object,
    binary: DataView,
    extras: [
        {
            type: number,
            view: DataView
        }
    ]
}
```

If any error is encountered during parsing, an exception will be thrown.

### Usage

Example use in browser (rollup):

```javascript
import {BinaryGltf} from "@matthewcpp/binary-gltf";

try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const binaryGltf = BinaryGltf.parse(buffer);
} catch (e) {
    console.log(e.toString());
}
```

Example use in NodeJS:

```javascript
const { BinaryGltf } = require("@matthewcpp/binary-gltf");
const fs = require("fs");

try {
    const data = fs.readFileSync(filePath);
    const binaryGltf = BinaryGltf.parse(data.buffer);
} catch (e) {
    console.log(e.toString());
}
```

### Testing
1. Build the library by running `npm run build`
1. Test Browser usage: `npm run test-web`
1. Test NodeJs usage: `npm run test-node`
