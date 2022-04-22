const fs = require('fs')

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo
  }

  async getAll() {
    try {
      const Items = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      return Items
    } catch (error) {
      await fs.promises.writeFile(`src/database/${this.archivo}.json`, JSON.stringify([]), 'utf-8')

      const Items = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )
      return Items
    }
  }
  async getById(id) {
    try {
      const Items = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      const encontrarItem = Items.find((e) => e.id === Number(id))

      return encontrarItem
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async add(producto) {
    try {
      const Items = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      Items.push(producto)

      await fs.promises.writeFile(
        `src/database/${this.archivo}.json`,
        JSON.stringify(Items),
        'utf-8'
      )
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async editById(producto) {
    try {
      let Items = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      Items = Items.map((e) => (e.id !== producto.id ? e : producto))

      await fs.promises.writeFile(
        `src/database/${this.archivo}.json`,
        JSON.stringify(Items),
        'utf-8'
      )
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const Items = JSON.parse(
        await fs.promises.readFile(`src/database/${this.archivo}.json`, 'utf-8')
      )

      const filtrarProductos = Items.filter((producto) => producto.id !== Number(id))

      if (JSON.stringify(Items) === JSON.stringify(filtrarProductos)) {
        return false
      } else {
        await fs.promises.writeFile(
          `src/database/${this.archivo}.json`,
          JSON.stringify(filtrarProductos),
          'utf-8'
        )

        return true
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  }

}

module.exports = Contenedor
