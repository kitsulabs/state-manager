import type { AtomKey } from './Atom.ts'
const PREFIX = 'st_'

class Storage {
    static set (key: AtomKey, value: unknown) {
        if (value instanceof Object) {
            value = JSON.stringify(value)
        }

        localStorage.setItem(PREFIX + String(key), String(value))
    }

    static get (key: AtomKey) {
        const value = localStorage.getItem(PREFIX + String(key))
        if (!value) return null

        if (value.match(/^(\{|\d)|^(true|false)$/))
            return JSON.parse(value)

        return value
    }
}

export default Storage