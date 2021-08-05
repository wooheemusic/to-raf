# to-raf
The interface of `requestAnimationFrame` is difficult and rigid to use. 
`to-raf` is a **throttling adapter** to `requestAnimationFrame`. If a number of exepressions of `toRaf(f)` are executed in an interval of a frame, `requestAnimationFrame` throttles them using the last one. If no expression in an interval of a frame is executed, it does nothing.

### Creation
`getToRAF` creates one animation closure.
If you want two independent animations, create two.
```js
import getToRAF from 'to-raf';

const toRAF = getToRAF();
const toRAFa = getToRAF();
```

### Usage
```js
toRAF(otherFunctionForEachTime); // `otherFunctionForEachTime` does not need to be a single ref.
```

### Example for `react.js`
```jsx
import getToRAF from 'to-raf';
// ...

const toRAF = getToRAF();

export default function MouseCage() {
    // ...
    const handleMouseMove = e => {
        toRAF(() => setX(e.clientX))
    }
    return (
        <div onMouseMove={handleMouseMove}>MouseCage {x}</div>
    )
}
```

### Test
This code shows how it works.
```js
let x = 0;
const createNewFunctionEachTime = () => () => console.log(x++)
const id = setInterval((i) => {
    toRAF(createNewFunctionEachTime()); // function could be mutable :) wow
}, 1); // it prints 0 ~ 61 for 1 sec on my machine
setTimeout(() => {
    clearTimeout(id);
}, 1000)
```

