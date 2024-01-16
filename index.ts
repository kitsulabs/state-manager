import Atom, { type AtomOpts } from '../state-manager1/src/Atom.ts'

function atom<T> (opts: AtomOpts<T>) {
    return new Atom<T>(opts)
}

export * from '../state-manager1/src/hooks.ts'
export {atom}