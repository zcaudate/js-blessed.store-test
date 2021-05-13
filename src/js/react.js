import React from 'react'

// js.react/Try
class Try extends React.Component{
  state = {"hasError":false,"error":null};
  static getDerivedStateFromError(error){
    return {error,"hasError":true};
  }
  render(){
    if(this.state.hasError){
      return this.props.fallback;
    }
    else{
      return this.props.children;
    }
  }
}

// js.react/useInterval
function useInterval(f,ms){
  let saved = React.useRef(() => ({}));
  React.useEffect(function (){
    saved["current"] = f;
  });
  React.useEffect(function (){
    if(ms !== null){
      let interval = setInterval(() => saved.current(),ms || 0);
      return function (){
        clearInterval(interval);
      };
    }
  },[ms]);
}

// js.react/useTimeout
function useTimeout(f,ms){
  let saved = React.useRef(f);
  React.useEffect(function (){
    saved["current"] = f;
  });
  React.useEffect(function (){
    if(ms !== null){
      let timeout = setTimeout(() => saved.current(),ms || 0);
      return function (){
        clearTimeout(timeout);
      };
    }
  },[ms]);
}

// js.react/useTimeoutFn
function useTimeoutFn(f,ms){
  let [done,setDone] = React.useState(false);
  let timeout = React.useRef(null);
  let cb = React.useRef(f);
  let resetFn = React.useCallback(function (){
    setDone(false);
    if(timeout.current){
      clearTimeout(timeout.current);
    }
  },[]);
  let runFn = React.useCallback(function (){
    resetFn();
    timeout["current"] = setTimeout(function (){
      cb.current();
      setDone(true);
    },ms);
  },[ms]);
  return [runFn,done,resetFn];
}

// js.react/useStep
function useStep(f){
  let [done,setDone] = React.useState(false);
  React.useEffect(function (){
    if(!done){
      f(setDone);
    }
  });
  return [done,setDone];
}

// js.react/useStepAsync
function useStepAsync(f){
  let [done,setDone] = React.useState(false);
  let [working,setWorking] = React.useState(false);
  React.useEffect(function (){
    if(!done && !working){
      f(setWorking,setDone);
    }
  });
  return [done,working,setDone,setWorking];
}

// js.react/useIsMountedFn
function useIsMountedFn(){
  let mounted = React.useRef(true);
  let mountedFn = React.useCallback(() => (mounted["current"]),[]);
  React.useEffect(function (){
    mounted["current"] = true;
    return () => mounted["current"] = false;
  },[]);
  return mountedFn;
}

// js.react/useCountdown
function useCountdown(wait,timeoutFn){
  let [delay,setDelay] = React.useState(wait);
  React.useEffect(function (){
    let id = setTimeout(function (){
      if(delay > 1.1){
        setDelay(delay - 1);
      }
      else{
        if(timeoutFn){
          timeoutFn();
        }
      }
    },1000);
    return function (){
      clearTimeout(id);
    };
  });
  return [delay,setDelay];
}

// js.react/MODULE
const MODULE = {
  "Try":Try,
  "useInterval":useInterval,
  "useTimeout":useTimeout,
  "useTimeoutFn":useTimeoutFn,
  "useStep":useStep,
  "useStepAsync":useStepAsync,
  "useIsMountedFn":useIsMountedFn,
  "useCountdown":useCountdown
}

export default MODULE