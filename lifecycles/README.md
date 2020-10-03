# Class notes

## Stages of React app

1. **Mounting** - Initializing, birth of your component
2. **Updating** - Changes, growth of your component
3. **Unmounting** - End, removed from DOM, death of your component
4. **Error**

### Lifecycle methods to keep in mind

1. **`constructor()`** - triggers first because component needs to set its state first.
2. **`render()`** - triggers when component mounts, and with every change/update. The `render()` method is the most used lifecycle method because `render()` is the only required method within a class component in React. As the name suggests it handles the rendering of your component to the UI. **It happens during the mounting and updating of your component**.
   React requires that `render()` is pure method and it doesn't have any side effects. Pure functions are those that do not have any side-effects and will always return the same output when the same inputs are passed. This means that you can not `setState()` within a `render()`.
3. **`componentDidMount()`** - besides render, far the most used. Component is mounted and ready and then this method hits. Usually fetches the data from API and prepares it for rendering onto DOM (it doesn’t render it though, render method serves for that). It is not pure, usually state get set/updated here.
4. **`componentDidUpdate(previousProps, previousState, snapshot)`** - this method will fire when component updates, when there are some changes. These changes can also come from parent component, if a component sends a prop down to child component and that triggers a change. As usual, after every change in component, `render()` method will fire right after.
   You can call `setState()` in this lifecycle, but keep in mind that you will need to wrap it in a condition to check for state or prop changes from previous state. Incorrect usage of `setState()` can lead to an infinite loop.
5. **`getSnapshotBeforeUpdate(previousProps, previousState)`** - this method always returns something and whatever it returns it will be a snapshot in `componentDidMount()` as a snapshot.
6. **`componentWillUnmount()`** - a lifecycle method used for component cleanup (if we have any global variables that we don’t need, if there are some connections to be closed, if there are any event listeners - this is where they get cleaned). In this lifecycle method, component gets unmounted which means destroyed from DOM.
