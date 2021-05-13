# Issue with Bug

There is a current bug with jotai and suspense. Maybe it's because I'm
using it wrong

``` javascript
// React will try to recreate this component tree from scratch using the error boundary you provided, Debug.
[Bug] deleting atomState with read promise {
  toString: [Function: toString],
  init: null,
  read: [Function (anonymous)],
  write: [Function (anonymous)],
  id: 'js-blessed.store-test.main/UserData',
  section: 'js-blessed.store-test.main/User'
}
```

### Commands

``` shell
make init
make dev
```
