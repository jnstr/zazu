const MousetrapManager = require('./mousetrapManager')

class Keyboard {
  constructor (name) {
    this.events = {}
  }

  emit (key) {
    if (!this.events[key]) return
    this.events[key].forEach((obj) => obj['cb']())
  }

  reset () {
    MousetrapManager.unbind(this.name)
  }

  bind (keys, cb) {
    const keysArray = typeof keys === 'string' ? [keys] : keys
    keysArray.forEach((key) => {
      if (!this.events[key]) {
        this.events[key] = []
        MousetrapManager.bind(key, this.name, () => {
          this.emit(key)
        })
      }
      this.events[key].push(cb)
    })
  }
}

module.exports = Keyboard
