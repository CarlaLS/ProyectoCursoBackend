const express = require('express')
const path = require('path')
const engine = require('express-handlebars').engine
const routerProductos = require("./router/routerProductos")

const app = express()


const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs',
  }
  
  app.engine('.hbs', engine(handlebarsConfig))
  app.set('view engine', '.hbs')
  app.set('views', 'src/views')

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '../public')))

/* los routers */

app.use('/', routerProductos)



/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
