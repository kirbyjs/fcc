module.exports = {
    presets: [
        '@babel/preset-typescript',
        '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: { browsers: 'last 2 versions' },
                modules: false
            }
        ]
    ]
};
