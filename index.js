import app from "./src/app.js"
import config from "./src/config/index.js"
//http://localhost:4001
app.listen(config.PORT,config.HOST,() => {
    console.log(`Server up and running on http://${config.HOST}:${config.PORT}`)
})