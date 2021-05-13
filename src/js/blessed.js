import blessed from 'blessed'
import reactBlessed from 'react-blessed'
import React from 'react'

// js.blessed/Debug
class Debug extends React.Component{
  state = {"hasError":false,"error":null};
  static getDerivedStateFromError(error){
    return {error,"hasError":true};
  }
  render(){
    let {children,...rprops} = this.props;
    if(this.state.hasError){
      return this.props.fallback;
    }
    else{
      return this.props.children;
    }
  }
}

// js.blessed/createScreen
function createScreen(title,options){
  const s = blessed.screen(Object.assign({
    "smartCSR":true,
    "dockBorders":true,
    "autoPadding":true,
    "cursor":{
        "artificial":true,
        "shape":{"bg":"yellow","fg":"white","bold":true},
        "blink":true
      },
    "debug":true,
    "title":title,
    "sendFocus":true,
    "useBCE":true,
    "grabKeys":true
  },options));
  s.key(["q","C-c","Esc"],function (){
    this.destroy();
  });
  return s;
}

// js.blessed/run
function run(element,title,options){
  reactBlessed.render(element,createScreen(title,options));
}

// js.blessed/MODULE
const MODULE = {"Debug":Debug,"createScreen":createScreen,"run":run}

export default MODULE