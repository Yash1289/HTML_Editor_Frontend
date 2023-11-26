// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/backend',  // Use /backend as the proxy endpoint
    createProxyMiddleware({
      target: 'https://html-editor-server-backend.onrender.com',
      changeOrigin: true,
    })
  );
};
