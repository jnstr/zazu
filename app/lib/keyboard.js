const Mousetrap = require('mousetrap')

class Keyboard {
  constructor () {
    this.events = {}
  }

  emit (key) {
    if (!this.events[key]) return
    this.events[key].forEach((cb) => cb())
  }

  bind (keys, cb) {
    const keysArray = typeof keys === 'string' ? [keys] : keys
    keysArray.forEach((key) => {
      if (!this.events[key]) {
        this.events[key] = []
        Mousetrap.bind(key, () => {
          this.emit(key)
        })
      }
      this.events[key].push(cb)
    })
  }
}

module.exports = new Keyboard()
