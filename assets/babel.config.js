module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                loose: true,
                bugfixes: true,
                modules: false,
            },
        ],
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                absoluteRuntime: false,
                helpers: true,
                regenerator: true,
            },
        ],
    ],
}
