import app from "./src/app.js"
import config from "./src/config/index.js"
import connectDB from "./src/database/mongo.db.js"
import sendEmail from "./src/services/email.service.js"




// http://localhost:4001
app.listen(config.PORT, () => {
    console.log(`Server up and running on http://${config.HOST}:${config.PORT}`)
    connectDB();
    sendEmail("me")
})