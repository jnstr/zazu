const Mousetrap = require('mousetrap')

class MousetrapManager {
  static events = {}

  static emit (key) {
    if (!this.events[key]) return
    this.events[key].forEach((obj) => obj['cb']())
  }

  static unbind (name) {
    Object.keys(this.events).forEach((key) => {
      this.events[key].forEach((el, i) => {
        if (el['name'] === name) {
          this.events[key].splice(i, 1)
        }
      })
    })
  }

  static bind (keys, name, cb) {
    const keysArray = typeof keys === 'string' ? [keys] : keys
    keysArray.forEach((key) => {
      if (!this.events[key]) {
        this.events[key] = []
        Mousetrap.bind(key, () => {
          this.emit(key)
        })
      }
      this.events[key].push({cb, name})
    })
  }
}

module.exports = MousetrapManager
