const express = require('express')
const path = require('path')

const routerProductos = require("./router/routerProductos")

const app = express()

  app.set('view engine', 'pug')
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
