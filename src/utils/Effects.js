import * as S from '../services/Content'
import * as F from '../utils/Func'
import Evt from '../utils/event-fn'

export default {
  *doSetMOrC({pl}, {call, put, select}){

    const r = yield call(S.setMorC, {pl})
    try {
      if (!r || !r.success) {
        console.error('doSetMOrC error')
        return
      }
      yield put({type: 'updateAfterSetMOrC', pl})
    } finally {
      yield put({type: 'closeConfirm'})
    }
  },
  *doCancelCheckin({pls}, {call, put, select}){

    const r = yield call(S.cancelCheckin, {pls})
    try {
      if (!r || !r.success) {
        console.error('doCancelCheckin error')
        return
      }
      yield put({type: 'updateAfterCancelCheckin', pls})
    } finally {
      yield put({type: 'closeConfirm'})
    }
  },
  *doBindingInf({ps, cb, bind}, {call, put, select}){

    let r;
    if (bind) {
      r = yield call(S.bindInf, {ps})
    } else {
      r = yield call(S.unBindInf, {ps})
    }
    if (typeof cb === 'function') {
      cb(r, ps, bind)
    }
    yield put({type: 'updateBindingInf', result: r, ps, bind})
  },
  *asyncEventHandler({handler}, {call, put, select}){

    const {fn, event} = handler
    const f = Evt[fn]

    if (typeof f === 'function') {
      yield f(yield select(s=>s.content), {call, put, select}, event)
    } else {
      console.error(`event func[${fn}] not found!`)
    }
  },
  *doSetEt({isEt, pl}, {call, put}){

    const setResult = yield call(S.setEt, {isEt, pl})

    console.log('setResult', setResult)
    if (setResult.success) {

      yield put({type: 'executeSetEt', isEt, pl})
      yield put({type: 'closeConfirm'})
    }
  },
  *queryUser({payload}, {call, put, select}){
    yield put({type: 'showLoading'})
    const data = F.upperCase(yield call(S.queryUser, null))
    console.log('*queryUser', data, arguments, yield select(s=>s))

    if (data) {
      const pls = F.upperCase(yield call(S.fetch, null))
      yield put({type: 'initContext', token: data, pls: pls})
    }
  },
}
