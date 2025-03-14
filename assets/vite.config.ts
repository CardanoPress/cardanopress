import tailwindcss from '@tailwindcss/vite'
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
                script: './src/main.ts',
                style: './src/main.css',
                notification: './src/notification.ts',
                delegation: './src/delegation.ts',
                payment: './src/payment.ts',
                split: './src/split.ts',
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
        tailwindcss(),
        themeplate(),
        wasm(),
        topLevelAwait(),
        offloadWasm({
            'cardano_serialization_lib_bg.wasm':
                '//unpkg.com/@emurgo/cardano-serialization-lib-browser@14.1.1/cardano_serialization_lib_bg.wasm',
        }),
    ],
})
