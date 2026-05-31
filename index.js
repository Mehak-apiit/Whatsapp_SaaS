import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js"
import config from "./src/config/index.js"
import connectDB from "./src/database/mongo.db.js"
//SOCKET.IO SETUP
import http from "http"; // SERVER BANANE KE LIYE HTTP MODULE KA USE KIYA HAI 
// HTTP MODUULE NODE.JS KA BUILT-IN MODULE HAI JO HTTP SERVER BANANE KE LIYE USE KIYA JATA HAI
import { Server } from "socket.io";//Ye Socket.IO ka main server class hai
// Isse hum real-time connection banate hain

// create an HTTP server
const server = http.createServer(app);//Ye Express app ko wrap karta hai HTTP server me
// initialize Socket.IO server
const io = new Server(server, {//**DOUBT***
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});
// socket ka connection
io.on("connection", (socket) => { 
    console.log("A user connected: " , socket.id);
    // Listen for messages from the client
    socket.on("message", (data) => {
        console.log("Received message: ", data);
        // Broadcast the message to all connected clients
        io.emit(" receive_message", data);
    });
    //disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected: " , socket.id);
    });
});
// start the server
server.listen(config.PORT, () => {
    console.log(`Server up and running on http://${config.HOST}:${config.PORT}`);
    connectDB();
});



