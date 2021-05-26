const express = require('express')
const path = require('path')
const cors = require('cors')
const expresHbs = require('express-handlebars')

const { dbConnection } = require('./database')

class Server {
    constructor () {
        this.app = express()
        this.port = process.env.PORT
        
        this.setEngine()

        this.conectarDB()
        
        this.routes()
        this.middlewares()
    }

    setEngine() {
        this.app.set('views', path.join(__dirname, 'views'))

        this.app.engine('.hbs', expresHbs({ 
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'
        }))

        this.app.set('view engine', '.hbs')
    } 
   
    async conectarDB () {
        await dbConnection()
    }

    middlewares () {
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes () {
        this.app.use(require('./routes/index.routes'))
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server
