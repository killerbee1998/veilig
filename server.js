//constants
const PORT = process.env.PORT

// import app
const app = require('./src/app').app

app.listen(PORT || 3000)