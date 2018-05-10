const express = require('express');
const fallback = require('express-history-api-fallback');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(express.static('dist'));
app.use(fallback('index.html', { root: 'dist' }));
app.listen(8080);
