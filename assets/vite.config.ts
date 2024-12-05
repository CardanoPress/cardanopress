import { defineConfig } from 'vite'
import offloadWasm from 'vite-plugin-offload-wasm'
import themeplate from 'vite-plugin-themeplate'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        assetsDir: '',
        rollupOptions: {
            input: {
                script: './src/main.js',
                style: './src/main.css',
                notification: './src/notification.js',
                delegation: './src/delegation.js',
                payment: './src/payment.js',
                split: './src/split.js',
            },
            output: {
                globals: {
                    alpinejs: 'Alpine',
                },
            },
            external: ['alpinejs'],
        },
    },
    plugins: [
        themeplate(),
        wasm(),
        topLevelAwait(),
        offloadWasm({
            'cardano_serialization_lib_bg.wasm':
                '//unpkg.com/@emurgo/cardano-serialization-lib-browser@9.1.4/cardano_serialization_lib_bg.wasm',
        }),
    ],
})
