import React from 'react'

import r from './js/react'
import s from './js/react/store'
import b from './js/blessed'

// js-blessed.store-test.main/User
const User = s.createSection("js-blessed.store-test.main/User",null)

// js-blessed.store-test.main/UserData
const UserData = s.createRecord(
  "js-blessed.store-test.main/User",
  "js-blessed.store-test.main/UserData",
  {},
  null
)

// js-blessed.store-test.main/StoreComponent
function StoreComponent(props){
  let [val,setVal] = s.useRecordDatom(UserData);
  if(!val){
    return (
      <box shrink={true}><box top={1}
          shrink={true}
          content="NO DATA"></box>
        <button top={6}
          mouse={true}
          shrink={true}
          style={{"bg":"blue","fg":"white","hover":{"bg":"black","fg":"white"}}}
          onClick={() => setVal(new Promise(function (resolve,reject){
            setTimeout(function (){
              resolve("SUCCESS");
            },300);
          }))}
          content=" FETCH "></button></box>
      );
  }
  else{
    return (
      <box shrink={true}><box top={1}
          shrink={true}
          content=""></box>
        <button top={6}
          mouse={true}
          shrink={true}
          style={{"bg":"yellow","fg":"black"}}
          onClick={() => setVal(null)}
          content=" RESET "></button></box>
      );
  };
}

// js-blessed.store-test.main/StorePanel
function StorePanel(){
  return (
    <box top={0}
      left={0}
      width={40}><b.Debug fallback={(
          <box>Errored</box>
          )}><React.Suspense fallback={(
            <box>Loading...</box>
            )}><StoreComponent></StoreComponent></React.Suspense></b.Debug></box>
    );
}

// js-blessed.store-test.main/App
function App(props){
  let [val,setVal] = React.useState({});
  return (
    <box top={1}
      left={3}><box width={40}><StorePanel></StorePanel></box></box>
    );
}

// js-blessed.store-test.main/__init__
// 1hbaetmewojmt;
b.run((
  <App></App>
  ),"JS Blessed Store Test");