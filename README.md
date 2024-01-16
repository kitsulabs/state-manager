# state-manager
Simple state manager for SolidJS. ~2 kb in bundle

### Install
``bun i @kitsulabs/state-manager`` or ``npm i @kitsulabs/state-manager``

### Example
```tsx
import { atom, globalSignal } from '@kitsulabs/state-manager'

const CLICKS = atom({
    default: 0, // default value
    key: 'clicks', // string, number or symbol
    save: true // save value to localStorage
})

const App = () => {
    // use like createSignal
    const [count, setCount] = globalSignal(CLICKS)
    
    function handleClick () {
        setCount(value => value + 1)
    }
    
    return (
        <button onClick={handleClick}>
            You clicked {count()} times 
        </button>
    )
}
```