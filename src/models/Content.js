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
    comps: {}
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
      return {
        ...state,
        selectPls: selectPls.filter(pl=>pl.uui != record.uui)
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
