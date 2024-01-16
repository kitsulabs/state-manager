import type Atom from './Atom.ts'
import { createStore } from 'solid-js/store'
import type { SetStoreFunction, Store } from 'solid-js/store'
import { createSignal, onCleanup, onMount, type Signal } from 'solid-js'

function globalSignal<T> (atom: Atom<T>) {
    const signal = createSignal<T>(atom.get())
    onMount(() => { atom.sub(signal[1]) })
    onCleanup(() => { atom.unsub(signal[1]) })
    return [signal[0], atom.setter()] as Signal<T>
}

function globalStore<T extends object> (atom: Atom<T>) {
    const store = createStore<T>(atom.get())
    onMount(() => { atom.sub(store[1]) })
    onCleanup(() => { atom.unsub(store[1]) })
    return [store[0], atom.setter()] as [Store<T>, SetStoreFunction<T>]
}

export {globalSignal, globalStore}