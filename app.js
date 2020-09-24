const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app
	.use(express.static(path.join(__dirname, 'dist')))
	.get('/*', (_req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))
	.listen(PORT, () => console.log(`Listening On ${ PORT }`));