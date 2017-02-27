import * as F from './Func'
import * as C from './Const'
import {message} from 'antd'

export default {
  escFn(state, event) {

    return {
      ...state,
      currBlock: C.MAIN_BLOCK,
      currActive: C.CMD_INPUT
    }
  },
  f1Fn(state, event) {

    const obj = F.headerRenderData(state)

    if (!obj || !(obj.comps instanceof Array)) {
      console.log(`headerRenderData 返回值为空或者comps属性不是数组`)
      return
    }
    if (obj.comps.length == 0) {
      message.error('没有可选的活动对象')
      return
    }

    const comps = {
      ...state.comps,
      [C.TOPMENU_BLOCK]: obj.comps
    }
    return {
      ...state,
      currBlock: C.TOPMENU_BLOCK,
      comps,
      currActive: obj.comps[0]
    }
  },
  ctrlAFn(state, event) {
    const {pls, selectPls} = state
    return {
      selectPls: pls.length == selectPls.length ? [] : pls
    }
  },
  downFn(state, event) {

    const {currActive, currBlock} = state

    const comps = state.comps[currBlock] || []
    if (comps.length == 0) {
      console.error('comps is empty~~')
      return state
    }
    let index = F.indexOf(comps, currActive)
    if (index < 0) {
      return {
        ...state,
        currActive: comps[0]
      }
    } else {
      if (++index >= comps.length) {
        index = 0
      }

      return {
        ...state,
        currActive: comps[index]
      }
    }
  },
  upFn(state, event) {
    const {currActive, currBlock} = state

    const comps = state.comps[currBlock] || []
    if (comps.length == 0) {
      console.error('comps is empty~~')
      return state
    }
    let index = F.indexOf(comps, currActive)
    if (index < 0) {
      return {
        ...state,
        currActive: comps[0]
      }
    } else {
      if (--index < 0) {
        index = comps.length - 1
      }

      return {
        ...state,
        currActive: comps[index]
      }
    }
  }
}
