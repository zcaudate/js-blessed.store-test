# Issue with Suspense

There is a current bug with jotai and suspense. Maybe it's because I'm
[using it
wrong](https://github.com/zcaudate/js-blessed.store-test/blob/master/src/main.js#L30-L34).
Once the **FETCH** button is clicked, which sets the atom (initially
null) with a promise:

![](https://user-images.githubusercontent.com/1455572/118162336-333f3e00-b453-11eb-9ff2-a82e7a376774.png)

It triggers an error in the Suspense element:

![](https://user-images.githubusercontent.com/1455572/118162341-35a19800-b453-11eb-9a53-3a1b4cfe09c3.png)

The error:

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
