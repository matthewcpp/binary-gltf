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
1. Start the development server: `npx http-server`
1. Navigate to [http://localhost:8080/test/](http://localhost:8080/test/)
1. Enter GLB file url and click Load.
