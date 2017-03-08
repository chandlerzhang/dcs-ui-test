import * as F from '../utils/Func'
import * as C from '../utils/Const'
import EvtBind from '../utils/event-bind'
import Reducers from '../utils/Reducers'
import Effects from '../utils/Effects'
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
    lastBlock: null,//last active block
    lastActive: null,//last active item
    pageName: C.PAGE_PASSENGER_LIST,//current page name
    comps: {},

    plPageNum: 10,
    plCurrPage: 1,

    flightSwitchPageNum: 8,
    flightSwitchCurrPage: 1,

    passengerSelectPageNum: 10,
    passengerSelectCurrPage: 1,

    passengerOperationPageNum: 8,
    passengerOperationCurrPage: 1,

    confirm: {
      show: false,
      content: ''
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
          let eventFn;
          for (const eb of EvtBind) {
            if (eb.isMatch(e)) {
              if (eb.stopEvent !== false) {//除非指定stopEvent：false，否则都停止默认事件及事件传播
                F.stopEvent(e)
              }

              eventFn = eb.async ? 'asyncEventHandler' : 'eventHandler'
              fn = eb.funcName
              break
            }
          }
          if (fn) {
            dispatch({type: eventFn, handler: {fn: fn, event: e}})
          }
        })
      }
    }
  },

  effects: Effects,

  reducers: Reducers
}
