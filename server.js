const path = require('path');
const express = require('express');
const isDev = process.env.NODE_ENV !== 'production';
const port = isDev ? 3000 : process.env.PORT;
const app = express();

if (isDev) require('./createBundle')(app)
else {
  app.use(express.static(path.join(__dirname + '/dist')))
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  )
}

// Start express.
if (!module.parent) {
  app.listen(port, err => {
    if (err) console.log(err)
    console.log(`⚡  Express started on port ${port}`)
  })
}
