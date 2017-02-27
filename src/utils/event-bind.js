export default [{
  isMatch: (e)=>e.which == 40 || e.which == 39 || (e.which == 9 && !e.shiftKey),
  funcName: 'downFn'
},{
  isMatch: (e)=>e.which == 38 || e.which == 37 || (e.which == 9 && e.shiftKey),
  funcName: 'upFn'
},{
  isMatch: (e)=>e.which == 65 && e.ctrlKey,
  funcName: 'ctrlAFn'
},{
  isMatch: (e)=>e.which == 112,
  funcName: 'f1Fn'
},{
  isMatch: (e)=>e.which == 113,
  funcName: 'f2Fn'
},{
  isMatch: (e)=>e.which == 27,
  funcName: 'escFn'
},{
  isMatch: (e)=>e.which == 115,
  funcName: 'f4Fn'
},{
  isMatch: (e)=>e.which == 116,
  funcName: 'f5Fn'
}]
