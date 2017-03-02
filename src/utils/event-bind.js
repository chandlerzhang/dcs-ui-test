export default [{
  isMatch: (e)=>e.which == 40 || e.which == 39 || (e.which == 9 && !e.shiftKey),
  funcName: 'downFn'
}, {
  isMatch: (e)=>e.which == 38 || e.which == 37 || (e.which == 9 && e.shiftKey),
  funcName: 'upFn'
}, {
  isMatch: (e)=>e.which == 65 && e.ctrlKey,
  funcName: 'ctrlAFn'
}, {
  isMatch: (e)=>e.which == 112,
  funcName: 'f1Fn'
}, {
  isMatch: (e)=>e.which == 113,
  funcName: 'f2Fn'
}, {
  isMatch: (e)=>e.which == 27,
  funcName: 'escFn'
}, {
  isMatch: (e)=>e.which == 115,
  funcName: 'f4Fn'
}, {
  isMatch: (e)=>e.which == 116,
  funcName: 'f5Fn'
}, {
  isMatch: (e)=>e.which == 66 && e.ctrlKey,
  funcName: 'ctrlBFn'
}, {
  isMatch: (e)=>e.which == 188 && e.altKey,
  funcName: 'altCommaFn'
}, {
  isMatch: (e)=>e.which == 80 && e.altKey,
  funcName: 'altPFn'
}, {
  isMatch: (e)=>e.which == 68 && e.altKey,
  funcName: 'altDFn'
}, {
  isMatch: (e)=>e.which == 13,
  stopEvent: false,
  funcName: 'enterFn'
}, {
  isMatch: (e)=>e.which == 79 && e.altKey,
  async: true,
  funcName: 'altOFn'
}]
