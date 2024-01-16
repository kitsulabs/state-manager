import Storage from './Storage.ts'
import {map, events} from './context.ts'

type SetState<T> = T | ((prevState: T) => T | undefined)
type AtomKey = number | string | symbol
interface AtomOpts<T> {
    default?: T
    key?: AtomKey
    save?: boolean
}

class Atom<T> {
    default?: T
    key: AtomKey
    save: boolean = false

    constructor (opts: AtomOpts<T>) {
        this.key = opts.key || events.last_index++
        this.default = opts.default

        if (opts.save && typeof this.key === 'string') {
            this.save = true
            const value = Storage.get(this.key)
            if (value) map.set(this.key, value)
        }
    }

    get (): T {
        return map.get(this.key) || this.default
    }

    set (value: T) {
        map.set(this.key, value)
        events.emit(this.key, value)

        if (this.save) {
            Storage.set(this.key, value)
        }
    }

    sub (handle: (value: T) => void) {
        events.on(this.key, handle)
    }

    unsub (handle: (value: T) => void) {
        events.off(this.key, handle)
    }

    setter () {
        return (v: SetState<T>) => {
            if (typeof v === 'function')
                v = (v as Function)(this.get())
            this.set(v as T)
        }
    }
}

export default Atom
export type {AtomKey, AtomOpts}