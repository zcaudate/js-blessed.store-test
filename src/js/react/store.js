import React from 'react'
import * as valtio from 'valtio'
import * as jotai from 'jotai'
import * as jotaiUtils from 'jotai/utils'
import * as jotaiValtio from 'jotai/valtio'

// js.react.store/Provider
const Provider = jotai.Provider

// js.react.store/sectionLu
const sectionLu = new Map()

// js.react.store/sectionCache
const sectionCache = {}

// js.react.store/createSection
function createSection(sid,meta){
  let section = Object.assign({"id":sid,"keys":new Set()},meta);
  sectionCache[sid] = section;
  (sectionLu).set(section,sid);
  return section;
}

// js.react.store/recordLu
const recordLu = new Map()

// js.react.store/recordCache
const recordCache = {}

// js.react.store/createRecord
function createRecord(sid,id,meta,initial){
  let datom = jotai.atom(initial);
  Object.assign(datom,{
    "id":id,
    "section":sid,
    "toString":() => "atom[" + sid + "/" + id + "]"
  });
  let entry = Object.assign({datom,id,initial},{"type":"record","section":sid},meta);
  let section = (sectionCache[sid]);
  recordCache[id] = entry;
  (recordLu).set(datom,id);
  (section.keys).add(id);
  return datom;
}

// js.react.store/useRecordDatom
const useRecordDatom = jotai.useAtom

// js.react.store/getRecordDatom
const getRecordDatom = jotaiUtils.useAtomValue

// js.react.store/setRecordDatom
const setRecordDatom = jotaiUtils.useUpdateAtom

// js.react.store/useRecordDatomField
function useRecordDatomField(datom,field){
  let [val,setVal] = jotai.useAtom(datom);
  let fval = val && (val[field]);
  let setFval = (x) => setVal({...val,[field]:x});
  return [fval,setFval];
}

// js.react.store/createGlobal
function createGlobal(id,meta,initial){
  let datom = valtio.proxy(initial);
  let link = jotaiValtio.atomWithProxy(datom);
  let entry = Object.assign({datom,id,initial,link},{"type":"global"},meta);
  recordCache[id] = entry;
  (recordLu).set(datom,id);
  return datom;
}

// js.react.store/getGlobalLink
function getGlobalLink(record){
  let gid = (recordLu).get(record);
  let entry = (recordCache[gid]);
  return (entry["link"]);
}

// js.react.store/getGlobalDatom
const getGlobalDatom = valtio.useSnapshot

// js.react.store/setGlobalDatom
function setGlobalDatom(datom){
  return function (val){
    return Object.assign(datom,val);
  };
}

// js.react.store/useGlobalDatom
function useGlobalDatom(datom){
  let val = valtio.useSnapshot(datom);
  let setVal = setGlobalDatom(datom);
  return [val,setVal];
}

// js.react.store/useGlobalDatomField
function useGlobalDatomField(datom,field){
  let val = valtio.useSnapshot(datom);
  let fval = val && (val[field]);
  let setFval = (x) => datom[field] = x;
  return [fval,setFval];
}

// js.react.store/useId
function useId(id){
  let entry = (recordCache[id]);
  if(!entry){
    throw(new Error({"msg":"Entry not found","data":{"id":id}}));
  }
  let type = (entry["type"]);
  if(type == "global"){
    return useGlobalDatom((entry["datom"]));
  }
  else if(type == "record"){
    return useRecordDatom((entry["datom"]));
  }
  else{
    throw(new Error({"msg":"Entry not valid","data":entry}));
  };
}

// js.react.store/useDatom
function useDatom(datom){
  let id = (recordLu).get(datom);
  if(!id){
    throw(new Error({"msg":"Id not found","data":{"object":datom}}));
  }
  return useId(id);
}

// js.react.store/useIdField
function useIdField(id,field){
  let [val,setVal] = useId(id);
  let fval = val && (val[field]);
  let setFval = (x) => setVal({...val,[field]:x});
  return [fval,setFval];
}

// js.react.store/MODULE
const MODULE = {
  "Provider":Provider,
  "sectionLu":sectionLu,
  "sectionCache":sectionCache,
  "createSection":createSection,
  "recordLu":recordLu,
  "recordCache":recordCache,
  "createRecord":createRecord,
  "useRecordDatom":useRecordDatom,
  "getRecordDatom":getRecordDatom,
  "setRecordDatom":setRecordDatom,
  "useRecordDatomField":useRecordDatomField,
  "createGlobal":createGlobal,
  "getGlobalLink":getGlobalLink,
  "getGlobalDatom":getGlobalDatom,
  "setGlobalDatom":setGlobalDatom,
  "useGlobalDatom":useGlobalDatom,
  "useGlobalDatomField":useGlobalDatomField,
  "useId":useId,
  "useDatom":useDatom,
  "useIdField":useIdField
}

export default MODULE