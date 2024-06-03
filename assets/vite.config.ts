import { defineConfig } from 'vite'
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
    plugins: [themeplate(), wasm(), topLevelAwait()],
})
