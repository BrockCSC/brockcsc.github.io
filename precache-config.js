module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [/^(?!\/__)/], // required for firebase auth
    stripPrefix: 'dist',
    root: 'dist/',
    cacheId: 'CSC',
    filename: 'service-worker.js',
    staticFileGlobs: [
        'dist/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,ico}'
    ],
    runtimeCaching: [{
        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
        handler: 'cacheFirst'
    }, {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
        handler: 'cacheFirst'
    }, {
        urlPattern: /^https:\/\/platform\.twitter\.com\//,
        handler: 'cacheFirst'
    }],
    // stripPrefix: 'dist/assets/',
    mergeStaticsConfig: true
}
