import alias from 'rollup-plugin-alias'
import minify from 'rollup-plugin-babel-minify'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'

const isProd = process.env.NODE_ENV === 'production'
const { moduleName, name } = require('./package.json')
const fileName = name.replace('@amoy/', '')
const getFilePath = (type = '') => `dist/${fileName}${type == '' ? '' : '.'}${type}.js`
const output = options => ({
    name: moduleName,
    sourcemap: true,
    ...options,
})

const configure = {
    input: 'src/index.ts',
    output: [output({
        file: getFilePath(),
        format: 'umd',
    }), output({
        file: getFilePath('es'),
        format: 'es',
    })],
    plugins: [
        alias({
            common: './common',
        }),
        typescript(),
        commonjs(),
        resolve(),
    ],
    external: [],
}

if (isProd) {
    configure.output = configure.output.map(output => {
        const format = output.format == 'umd' ? '' : `.${output.format}`
        output.file = `dist/${fileName}${format}.min.js`
        return output
    })
    configure.plugins.push(minify())
}

module.exports = configure
