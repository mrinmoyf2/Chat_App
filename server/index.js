// import { createServer } from "http"
import  express  from "express"
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from "url"

// This is because the __dirname is not in the type module so that we have to import path and fileURLToPath and define the __filename and __dirname as shown below
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500
// const httpServer = createServer()

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on("connection", socket => {
    console.log(`User ${socket.id} connected`)

    socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0,5)}: ${data}`)
    })
})



// httpServer.listen(3500, () =>
//     console.log('listening on port 3500')
// )

// This is for websocket :
// server.on('connection', socket => {
//     socket.on('message', message => {
//         const b = Buffer.from(message)
//         console.log(b.toString())
//         socket.send(`${message}`)
//     })
// })
