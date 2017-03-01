import * as S from '../services/Content'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import Evt from '../utils/event-fn'
import EvtBind from '../utils/event-bind'
export default {
  namespace: 'content',

  state: {
    fls: [],//opened flight leg
    loading: false,//is current loading
    token: null,//current login token
    pls: [],//passenger list
    selectPls: [],//selected passenger list
    currBlock: C.MAIN_BLOCK,//current active block
    currActive: C.CMD_INPUT,//current active item
    pageName: C.PAGE_PASSENGER_LIST,//current page name
    comps: {},

    flightSwitchPageNum: 8,
    flightSwitchCurrPage: 1,

    passengerSelectPageNum: 10,
    passengerSelectCurrPage: 1,

    passengerOperationPageNum: 8,
    passengerOperationCurrPage: 1,

    confirm: {
      show: false,
      content:''
    }
  },

  subscriptions: {

    setup({dispatch, history}){
      console.log('subscriptions', arguments)
      //验证用户是否登录
      dispatch({type: 'queryUser'})

      //绑定事件
      if (!(EvtBind instanceof Array)) {
        console.error(`event-bind is not an array`)
      } else {
        window.addEventListener('keydown', (e)=> {
          let fn;
          for (const eb of EvtBind) {
            if (eb.isMatch(e)) {
              if (eb.stopEvent !== false) {//除非指定stopEvent：false，否则都停止默认事件及事件传播
                F.stopEvent(e)
              }
              fn = eb.funcName
              break
            }
          }
          if (fn) {
            dispatch({type: 'eventHandler', handler: {fn: fn, event: e}})
          }
        })
      }
    }
  },

  effects: {
    *queryUser({payload}, {call, put}){
      yield put({type: 'showLoading'})
      const data = F.upperCase(yield call(S.queryUser, null))
      // console.log('*queryUser', data)
      if (data) {
        const pls = F.upperCase(yield call(S.fetch, null))
        yield put({type: 'initContext', token: data, pls: pls})
      }
    }
  },

  reducers: {
    setEt(state){

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
        [C.MAIN_BLOCK]: [C.CMD_INPUT, ...pls.map(pl=>F.genPlKey(pl))]
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
    select(state, {record}){
      const {selectPls} = state
      selectPls.push(record)
      return {
        ...state,
        selectPls
      }
    },
    unselect(state, {record}){

      const {selectPls} = state

      const leftPls = selectPls.filter(pl=>pl.uui != record.uui)
      return {
        ...state,
        selectPls: leftPls
      }
    },
    selectAll(state) {

      return {
        ...state,
        selectPls: state.pls
      }
    },
    unselectAll(state) {
      return {
        ...state,
        selectPls: []
      }
    }
  },
}
