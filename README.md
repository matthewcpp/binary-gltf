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

To use with rollup:

```javascript
import {BinaryGltf} from "@matthewcpp/binary-gltf";

try {
    const binaryGltf = BinaryGltf.parse(arrayBuffer);
} catch (e) {
    console.log(e.toString());
}

```

### Testing
1. Build the library by running `npm run build`
1. Test Browser usage: `npm run test-web`
