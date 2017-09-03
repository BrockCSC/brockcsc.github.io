var Precache = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__)/], // required for firebase auth
    stripPrefix: 'dist',
    root: 'dist/',
    polugins: [
        new Precache({
            cacheId: 'CSC',
            filename: 'service-worker.js',
            staticFileGlobs: [
                'dist/index.html',
                'dist/**.js',
                'dist/**.css'
            ],
            stripPrefix: 'dist/assets/',
            mergeStaticsConfig: true
        })
    ]
}