import { join, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    root: __dirname,
    plugins: [
        dts({
            outputDir: join(__dirname, 'build'),
            tsConfigFilePath: join(__dirname, 'tsconfig.json'),
            skipDiagnostics: false,
            logDiagnostics: true,
            staticImport: true,
        }),
    ],
    resolve: {
        alias: [
            { find: /^@\/(.*)/, replacement: `${resolve(__dirname, 'src')}/$1` },
        ],
    },
    json: {
        namedExports: false,
        stringify: true,
    },
    build: {
        sourcemap: process.env.MODE === 'development' ? true : false,
        outDir: 'build',
        assetsDir: '.',
        minify: process.env.MODE === 'development' ? false : 'terser',
        target: 'chrome104',
        terserOptions: {
            ecma: 2020,
            compress: {
                passes: 2,
            },
            safari10: false,
        },
        lib: {
            entry: join('src', 'index.ts'),
            fileName: 'index',
            name: 'AStar',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['vue'],
        },
        emptyOutDir: true,
    },
});
