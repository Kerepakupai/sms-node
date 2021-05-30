const path = require('path')
const cors = require('cors')
const express = require('express')
const expressHbs = require('express-handlebars')
const morgan = require('morgan')

const { dbConnection } = require('./database')
const { socketController } = require('./socket')

class Server {
    constructor () {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)
        
        this.setEngine()

        this.conectarDB()
        
        this.middlewares()
        this.routes()
        this.sockets()
    }

    setEngine() {
        this.app.set('views', path.join(__dirname, 'views'))

        this.app.engine('.hbs', expressHbs({ 
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs',
            helpers: require('./libs/handlebars')
        }))

        this.app.set('view engine', '.hbs')
    } 

    sockets() {
        this.io.on('connection', socketController)
    }
   
    async conectarDB () {
        await dbConnection()
    }

    middlewares () {
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    routes () {
        this.app.use(require('./routes/index.routes'))
    }

    listen () {
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server
