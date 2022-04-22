const {Router} = require('express')
const Contenedor = require('../classes/contenedor')
const routerProductos=  new Router()
const database = new Contenedor('productos')


routerProductos.get('/', (req, res) => {
    
    res.render('index')

})

routerProductos.get('/productos', async (req, res) => {
    try {
      const todosProductos = await database.getAll()
      res.render('vistaProductos', { todosProductos })
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  })


  routerProductos.post('/productos', async (req, res) => {
    try {
      const todosProductos = await database.getAll()
      const noImage =
        'https://cdn4.iconfinder.com/data/icons/basic-ui-element-flat-style/512/Basic_UI_Elements_-_2.3_-_Flat_Style_-_36-02-64.png'
      let lastID = 0
  
      if (todosProductos.length) {
        ultimoID = todosProductos[todosProductos.length - 1].id
      }
  
      const nuevoProducto = {
        id: ultimoID + 1,
        title: req.body.title ? req.body.title : 'No Title',
        price: req.body.price ? req.body.price : 0,
        thumbnail: req.body.thumbnail ? req.body.thumbnail : noImage,
      }
  
      await database.add(nuevoProducto)
      res.redirect('/')
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  })

module.exports=routerProductos