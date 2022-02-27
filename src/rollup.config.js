import typescript from 'rollup-plugin-typescript2'

import pkg from '../package.json'

const path = require("path");

export default {
    input: path.resolve(__dirname, "index.ts"),
    output: [
        {
            file: pkg.module,
            format: 'es'
        },
        {
            file: pkg.main,
            format: 'cjs'
        }
    ],
    plugins: [
        typescript({
            tsconfig: path.resolve(__dirname, "tsconfig.json"),
            typescript: require('typescript'),
        }),
    ]
}