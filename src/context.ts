import type { AtomKey } from './Atom.ts'
type EventHandler = (data: any) => void
type EventMap = Map<AtomKey, EventHandler[]>

class EventEmitter {
    last_index: number = 0
    private events: EventMap = new Map()

    on (key: AtomKey, callback: EventHandler) {
        const items = this.events.get(key)
        if (items) {
            items.push(callback)
        } else {
            this.events.set(key, [callback])
        }
    }

    emit (key: AtomKey, data: unknown) {
        const items = this.events.get(key) || []
        for (const callback of items) {
            callback(data)
        }
    }

    off (key: AtomKey, callback?: EventHandler) {
        const items = this.events.get(key)
        if (items && callback) {
            items.splice(items.indexOf(callback), 1)
        } else {
            this.events.set(key, [])
        }
    }
}

const map = new Map()
const events = new EventEmitter()

export {map, events}