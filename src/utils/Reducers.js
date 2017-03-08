import * as F from '../utils/Func'
import * as C from '../utils/Const'
import Evt from '../utils/event-fn'

export default {
  normalEsc(state){
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
      // [C.MAIN_BLOCK]: [...newComps, C.CMD_INPUT]
      [C.MAIN_BLOCK]: newComps
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
  updateAfterSetMOrC(state, {pl}){

    const {pls, selectPls} = state
    const isM = pl.sex === 'M'
    const newPls = pls.map(p=> {
      if (p.uui === pl.uui) {
        if (isM) {
          p.sex = 'C'
        } else {
          p.sex = 'M'
        }
      }
      return p
    })
    const newSelectPls = selectPls.map(p=> {
      if (p.uui === pl.uui) {
        if (isM) {
          p.sex = 'C'
        } else {
          p.sex = 'M'
        }
      }
      return p
    })

    return {
      ...state,
      pls: newPls,
      selectPls: newSelectPls
    }
  },
  updateAfterCancelCheckin(state, {pls:change}){

    const {pls, selectPls} = state

    const newPls = pls.map(pl=> {
      const m = change.some(p=>p.uui === pl.uui)
      if (m) {
        pl.wci = false
      }
      return pl
    })

    const newSelectPls = selectPls.map(pl=> {
      const m = change.some(p=>p.uui === pl.uui)
      if (m) {
        pl.wci = false
      }

      return pl
    })

    return {
      ...state,
      pls: newPls,
      selectPls: newSelectPls
    }

  },
  closeConfirm(state){

    // const {currBlock, currActive} = state
    const {comps, lastActive, lastBlock} = state

    const currComps = comps[C.MAIN_BLOCK]
    let currActive = C.CMD_INPUT
    if (currComps && currComps.length > 0) {
      currActive = currComps[0]
    }
    if (lastActive) {
      currActive = lastActive
    }
    let currBlock = C.MAIN_BLOCK
    if (lastBlock) {
      currBlock = lastBlock
    }
    return {
      ...state,
      currBlock,
      currActive,
      lastBlock: null,
      lastActive: null,
      confirm: {
        ...state.confirm,
        show: false,
        onOk: null,
        onCancel: null
      }
    }
  },
  showConfirm(state, {content, onOk, onCancel}){

    const confirm = {
      ...state.confirm,
      show: true,
      content,
      onOk,
      onCancel
    }
    const newComps = [C.OK_BTN_KEY, C.CANCEL_BTN_KEY]
    const comps = {
      ...state.comps,
      [C.CONFIRM_BLOCK]: newComps
    }
    return {
      ...state,
      currBlock: C.CONFIRM_BLOCK,
      currActive: newComps[0],
      comps,
      confirm,
      lastBlock: state.currBlock,
      lastActive: state.currActive
    }
  },
  updateBindingInf(state, {result, ps, bind}){

    //todo 成人可以绑定多个婴儿，目前判断婴儿是否可绑定逻辑无法确认，暂时不做
    if (result) {
      if (bind) {

      }
    }

    return state
  },
  showBindingInf(state, {infs}){
    let {pls, selectPls} = state

    const filterFn = pl=> {
      const isMatch = pl.uui == selectPls[0].uui
      if (isMatch) {
        pl.infs = infs.list
      }
      return pl
    }

    pls = pls.map(filterFn)
    selectPls = selectPls.map(filterFn)

    const selectableInfs = F.getSelectableInfs(pls)
    const selectedInfs = selectPls[0].infs || []
    let newComps = [
      ...selectableInfs.map(pl=>F.genBindingInfPlKey(pl)),
    ]
    if (selectableInfs.length > 0) {
      newComps.push(C.BINGDINGINF_BINDING_KEY)
    }
    if (selectedInfs.length > 0) {
      newComps.push(C.BINGDINGINF_UNBINDING_KEY)
    }
    newComps = [...newComps,
      ...selectedInfs.map(pl=>F.genBindingInfPlKey(pl)),
    ]

    const comps = {
      ...state.comps,
      [C.MAIN_BLOCK]: newComps
    }

    return {
      ...state,
      pageName: C.PAGE_BINDING_INF,
      currBlock: C.MAIN_BLOCK,
      pls,
      selectPls,
      comps,
      currActive: newComps[0]
    }
  },
  manualProtect(state){

    return Evt.ctrl5Fn(state)
  },
  // closeConfirm(state){
  //
  //   return Evt.escFn(state)
  // },
  executeSetEt(state, {isEt, pl}){

    const {pls, selectPls} = state

    const newSelectPls = selectPls.map(p=> {

      if (p.uui === pl.uui) {

        p.wet = !isEt
      }
      return p
    })

    const newPls = pls.map(p=> {

      if (p.uui === pl.uui) {
        p.wet = !isEt
      }
      return p
    })

    return {
      ...state,
      pls: newPls,
      selectPls: newSelectPls
    }
  },
  showSetEt(state){

    return Evt.altOFn(state)
  },
  checkin(state){

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
  },
  stopPassenger(state){
    return Evt.altPFn(state)
  },
  modifyPhone(state){
    return Evt.altCommaFn(state)
  },
  addPassenger(state){
    return Evt.ctrlBFn(state)
  },
  eventHandler(state, {handler}){

    const {fn, event} = handler
    const f = Evt[fn]

    if (typeof f === 'function') {
      const ret = f(state, event)
      if (!ret) {
        console.error(`return value of event func[${fn}] cannot be null`)
      }
      return Object.assign({}, state, ret)
    } else {
      console.error(`event func[${fn}] not found!`)
    }

    return state
  },
  onNext(state, {pselectType}){
    const {currPageField, pageNumField} = F.getPageInfoField(pselectType)

    let list;
    let currPage = state[currPageField]
    let pageNum = state[pageNumField]

    switch (pselectType) {
      case C.PSELECT_TYPE_PASSENGER:
        list = state.selectPls
        break
      case C.PSELECT_TYPE_BUTTON:
        list = F.getOperationBtns(state)
        break
      case C.PSELECT_TYPE_FLIGHT:
        list = state.fls
        break
    }
    if (list) {
      const allNum = list.length
      const allPage = allNum % pageNum == 0 ? allNum / pageNum : Math.floor(allNum / pageNum) + 1
      if (currPage < allPage) {
        let newS = {
          ...state,
          [currPageField]: currPage + 1
        }

        //活动元素（comps）需要重新计算，直接调用keyEvent中定义的方法
        let newS2
        switch (pselectType) {
          case C.PSELECT_TYPE_PASSENGER:
            newS2 = Evt.f4Fn(newS)
            break
          case C.PSELECT_TYPE_BUTTON:
            newS2 = Evt.f5Fn(newS)
            break
          case C.PSELECT_TYPE_FLIGHT:
            newS2 = Evt.f2Fn(newS)
            break
        }
        return {
          ...newS2,
          currActive: newS.currActive
        }
      }
    }

    return state
  },
  onPrev(state, {pselectType}){

    const {currPageField, pageNumField} = F.getPageInfoField(pselectType)

    let list;
    let currPage = state[currPageField]
    let pageNum = state[pageNumField]

    switch (pselectType) {
      case C.PSELECT_TYPE_PASSENGER:
        list = state.selectPls
        break
      case C.PSELECT_TYPE_BUTTON:
        list = F.getOperationBtns(state)
        break
      case C.PSELECT_TYPE_FLIGHT:
        list = state.fls
        break
    }
    if (list) {
      const allNum = list.length
      const allPage = allNum % pageNum == 0 ? Math.floor(allNum / pageNum) : Math.floor(allNum / pageNum) + 1

      if (currPage > 1) {
        let newS = {
          ...state,
          [currPageField]: currPage - 1
        }

        //活动元素（comps）需要重新计算，直接调用keyEvent中定义的方法
        let newS2
        switch (pselectType) {
          case C.PSELECT_TYPE_PASSENGER:
            newS2 = Evt.f4Fn(newS)
            break
          case C.PSELECT_TYPE_BUTTON:
            newS2 = Evt.f5Fn(newS)
            break
          case C.PSELECT_TYPE_FLIGHT:
            newS2 = Evt.f2Fn(newS)
            break
        }
        return {
          ...newS2,
          currActive: newS.currActive
        }
      }
    }

    return state
  },
  updateState(state, {newState}){
    return Object.assign({}, state, newState)
  },
  removeFlight(state, {record}){
    return {
      ...state,
      fls: state.fls.filter(fl=>fl.uui != record.uui)
    }
  },
  initContext(state, {token, pls}){

    const comps = {
      ...pls.comps,
      // [C.MAIN_BLOCK]: [C.CMD_INPUT, ...pls.map(pl=>F.genPlKey(pl))]
      [C.MAIN_BLOCK]: pls.map(pl=>F.genPlKey(pl))
    }
    return {
      ...state,
      token, pls,
      fls: [token.fl],
      comps
    }
  },
  showLoading(state){

    return {
      ...state,
      loading: true
    }
  },
  load(state, {payLoad}){

    return {
      ...state,
      pls: payLoad
    }
  },
  select(state, {record, isClick}){
    const {selectPls} = state
    selectPls.push(record)
    return {
      ...state,
      selectPls,
      passengerSelectCurrPage: 1,
      currBlock: isClick ? C.MAIN_BLOCK : state.currBlock,
      currActive: isClick ? F.genPlKey(record) : state.currActive,
    }
  },
  unselect(state, {record, isClick}){

    const {selectPls, currBlock, currActive} = state

    const leftPls = selectPls.filter(pl=>pl.uui != record.uui)

    const isInPSelectBlock = currBlock === C.PSELECT_BLOCK
    const isNullSelected = leftPls.length == 0
    let newBlock = isInPSelectBlock && isNullSelected ? C.MAIN_BLOCK : currBlock
    let newActive = isInPSelectBlock && isNullSelected ? C.CMD_INPUT : currActive

    if (isClick) {
      newBlock = C.MAIN_BLOCK
      newActive = F.genPlKey(record)
    }

    return {
      ...state,
      selectPls: leftPls,
      currBlock: newBlock,
      currActive: newActive
    }
  },
  // selectAll(state) {
  //
  //   return {
  //     ...state,
  //     selectPls: state.pls,
  //     passengerSelectCurrPage: 1
  //   }
  // },
  // unselectAll(state) {
  //   const {currActive, currBlock} = state
  //   const isInPSelectBlock = currBlock === C.PSELECT_BLOCK
  //   const newBlock = isInPSelectBlock ? C.MAIN_BLOCK : currBlock
  //   const newActive = isInPSelectBlock ? C.CMD_INPUT : currActive
  //   return {
  //     ...state,
  //     selectPls: [],
  //     currBlock: newBlock,
  //     currActive: newActive
  //   }
  // }
}
