import * as F from './Func'
import * as C from './Const'
import {message} from 'antd'

export default {
  altOFn(state, event) {

    const {selectPls, pageName, currBlock} = state

    const canResponse = pageName === C.PAGE_PASSENGER_LIST
    if (canResponse) {
      if (selectPls.length != 1) {
        message.error('请选择一个旅客')
        return state
      } else {
        const isEt = selectPls[0].wet

        const confirmTips = isEt ? '您确认要取消ET票吗？' : '您确认要设置ET票吗？'
        // F.confirm(confirmTips, ()=> {
        //   //todo
        // })

        const newComps = [C.OK_BTN_KEY, C.CANCEL_BTN_KEY]
        const comps = {
          ...state.comps,
          [C.CONFIRM_BLOCK]: newComps
        }
        return {
          ...state,
          comps,
          currBlock: C.CONFIRM_BLOCK,
          currActive: newComps[0],
          confirm: {
            show: true,
            content: confirmTips
          }
        }
      }
    }

    return state
  },
  enterFn(state, event) {

    const {currActive, currBlock, pageName, selectPls, comps} = state

    const canCheckin = pageName === C.PAGE_PASSENGER_LIST && currBlock === C.MAIN_BLOCK && selectPls.some(pl=>!pl.wci) && currActive !== C.CMD_INPUT

    if (canCheckin) {

      if (event) {
        F.stopEvent(event)
      }

      const newComps = [C.CHECKIN_FROM_KEY, C.CHECKIN_TO_KEY, C.CHECKIN_NOPRINT_KEY, C.SUBMIT_BTN_KEY, C.CMD_INPUT]
      const comps = {
        ...state.comps,
        [C.MAIN_BLOCK]: newComps
      }
      return {
        ...state,
        pageName: C.PAGE_CHECKIN,
        comps,
        currActive: newComps[0]
      }
    }

    return state
  },
  altDFn(state, event) {

    const newComps = [C.CMD_INPUT]
    const comps = {
      ...state.comps,
      [C.MAIN_BLOCK]: newComps
    }
    return {
      ...state,
      pageName: C.PAGE_SEATMAP,
      comps,
      currActive: newComps[0],
      currBlock: C.MAIN_BLOCK,
    }
  },
  altPFn(state, event) {

    const {selectPls} = state
    if (selectPls.length == 0) {
      message.error('请选择一个或多个旅客');
      return state
    }
    const newComps = [C.PSTOP_NOTE_KEY, C.SUBMIT_BTN_KEY, C.CMD_INPUT]
    const comps = {
      ...state.comps,
      [C.MAIN_BLOCK]: newComps
    }
    return {
      ...state,
      pageName: C.PAGE_STOP_PASSENGER,
      comps,
      currActive: newComps[0],
      currBlock: C.MAIN_BLOCK,
    }
  },
  altCommaFn(state, event) {

    const {selectPls} = state
    if (selectPls.length != 1) {
      message.error('请选择一个旅客');
      return state
    }
    const newComps = [C.MPHONE_TE_KEY, C.SUBMIT_BTN_KEY, C.CMD_INPUT]
    const comps = {
      ...state.comps,
      [C.MAIN_BLOCK]: newComps
    }
    return {
      ...state,
      pageName: C.PAGE_MODIFY_PHONE,
      comps,
      currActive: newComps[0],
      currBlock: C.MAIN_BLOCK,
    }
  },
  ctrlBFn(state, event) {

    const newComps = [C.PADD_CN_KEY, C.PADD_SEX1_KEY, C.PADD_SEX2_KEY, C.PADD_SEX3_KEY, C.PADD_DN_KEY, C.PADD_ETI_KEY, C.SUBMIT_BTN_KEY, C.CMD_INPUT]

    const comps = {
      ...state.comps,
      [C.MAIN_BLOCK]: newComps
    }
    return {
      ...state,
      pageName: C.PAGE_ADD_PASSENGER,
      comps,
      currActive: newComps[0],
      currBlock: C.MAIN_BLOCK,
    }
  },
  f5Fn(state, event) {

    const btns = F.getOperationBtns(state)
    if (!btns || btns.length == 0) {
      message.error('没有可选的组件')
      return state
    }
    const pageNum = state.passengerOperationPageNum
    const currPage = state.passengerOperationCurrPage
    const allNum = btns.length
    const allPage = allNum % pageNum == 0 ? allNum / pageNum : Math.floor(allNum / pageNum) + 1
    let comps = []
    for (let i = 0; i < allNum; i++) {
      const st = (currPage - 1) * pageNum
      const ed = currPage * pageNum
      if (i >= st && i < ed) {
        comps.push(F.genSelectKey(C.PSELECT_TYPE_BUTTON, i))
      }
    }

    if (currPage > 1) {
      comps = [C.PREV_BTN_KEY, ...comps]
    }
    if (currPage < allPage) {
      comps.push(C.NEXT_BTN_KEY)
    }
    const currActive = comps[0]
    comps = {
      ...state.comps,
      [C.OPERATION_BLOCK]: comps
    }

    return {
      ...state,
      currBlock: C.OPERATION_BLOCK,
      comps,
      currActive
    }
  },
  f4Fn(state, event) {

    // if (state.currBlock === C.PSELECT_BLOCK) {
    //   return state
    // }

    const pls = state.selectPls
    if (pls.length == 0) {
      message.error('没有可选的对象！');
      return
    }

    const pageNum = state.passengerSelectPageNum
    const currPage = state.passengerSelectCurrPage
    const allNum = pls.length
    const allPage = allNum % pageNum == 0 ? allNum / pageNum : Math.floor(allNum / pageNum) + 1
    let comps = []
    for (let i = 0; i < allNum; i++) {
      const st = (currPage - 1) * pageNum
      const ed = currPage * pageNum
      if (i >= st && i < ed) {
        comps.push(F.genSelectKey(C.PSELECT_TYPE_PASSENGER, i))
      }
    }

    if (currPage > 1) {
      comps = [C.PREV_BTN_KEY, ...comps]
    }
    if (currPage < allPage) {
      comps.push(C.NEXT_BTN_KEY)
    }
    const currActive = comps[0]
    comps = {
      ...state.comps,
      [C.PSELECT_BLOCK]: comps
    }

    return {
      ...state,
      currBlock: C.PSELECT_BLOCK,
      comps,
      currActive
    }

  },
  f2Fn(state, event) {

    // if (state.currBlock === C.FLIGHTSWITCH_BLOCK) {
    //   return state
    // }

    const {fls} = state
    if (!(fls instanceof Array)) {
      console.log(`fls must be Array`)
      return
    }
    if (fls.length == 0) {
      message.error(`没有可选的对象`)
      return
    }
    const pageNum = state.flightSwitchPageNum
    const currPage = state.flightSwitchCurrPage
    const allNum = fls.length
    const allPage = allNum % pageNum == 0 ? allNum / pageNum : Math.floor(allNum / pageNum) + 1

    let comps = []
    for (let i = 0; i < allNum; i++) {
      const st = (currPage - 1) * pageNum
      const ed = currPage * pageNum
      if (i >= st && i < ed) {
        comps.push(F.genSelectKey(C.PSELECT_TYPE_FLIGHT, i))
      }
    }

    if (currPage > 1) {
      comps = [C.PREV_BTN_KEY, ...comps]
    }
    if (currPage < allPage) {
      comps.push(C.NEXT_BTN_KEY)
    }
    comps.push(C.FLIGHTADD_BTN_KEY)
    const currActive = comps[0]

    comps = {
      ...state.comps,
      [C.FLIGHTSWITCH_BLOCK]: comps
    }

    return {
      ...state,
      currBlock: C.FLIGHTSWITCH_BLOCK,
      comps,
      currActive
    }
  },
  escFn(state, event) {

    const {pageName, currActive} = state

    if (pageName !== C.PAGE_PASSENGER_LIST && currActive !== C.CMD_INPUT) {
      return {
        ...state,
        currBlock: C.MAIN_BLOCK,
        currActive: C.CMD_INPUT,
      }
    }

    const newComps = state.pls.map(pl=>F.genPlKey(pl))
    const comps = {
      ...state.comps,
      [C.MAIN_BLOCK]: [...newComps, C.CMD_INPUT]
    }
    const confirm = {
      ...state.confirm,
      show: false
    }
    return {
      ...state,
      currBlock: C.MAIN_BLOCK,
      currActive: C.CMD_INPUT,
      pageName: C.PAGE_PASSENGER_LIST,
      comps, confirm
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
    const {pls, selectPls, pageName} = state
    if (pageName != C.PAGE_PASSENGER_LIST) {
      return state
    }
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
