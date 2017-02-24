import * as S from '../services/Content'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
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
  },

  subscriptions: {

    setup({dispatch, history}){
      // console.log(arguments)
      dispatch({type: 'queryUser'})
    }
  },

  effects: {

    *queryUser({payload}, {call, put}){

      yield put({type: 'showLoading'})
      const data = F.upperCase(yield call(S.queryUser, null))
      console.log('*queryUser', data)
      if (data) {
        const pls = F.upperCase(yield call(S.fetch, null))
        yield put({type: 'initContext', token: data, pls: pls})
      }
    }
  },

  reducers: {
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

      return {
        ...state,
        token, pls,
        fls: [token.fl]
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
