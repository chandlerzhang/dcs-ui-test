import React from 'react'
import {message} from 'antd'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

import PSelect from '../components/PSelect'
import FStatus from '../components/FStatus'
import Login from '../components/Login'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PList from '../components/PList'
import PAdd from '../components/PAdd'
import Mphone from '../components/Mphone'
import PStop from '../components/PStop'
import SeatMap from '../components/SeatMap'
import Checkin from '../components/Checkin'
import Confirm from '../components/Confirm'
import ManualProtect from '../components/ManualProtect'
import BindingInf from '../components/BindingInf'
import MApi from '../components/MApi'
import Log from '../components/Log'
import PbAdd from '../components/PbAdd'
import PbDel from '../components/PbDel'
import CancelFee from '../components/CancelFee'
import PbFeeAdd from '../components/PbFeeAdd'

const renderComp = (props)=> {
  const {content, dispatch} = props
  const {pls, pageName, token, currActive, currBlock, selectPls, otherCurrPage, otherPageNum} = content
  switch (pageName) {

    case C.PAGE_PASSENGER_LIST:

      const plistProps = {
        ...content,
        onRowSelect(selected, record){
          if (selected) {
            dispatch({type: 'content/select', record: record})
          } else {
            dispatch({type: 'content/unselect', record: record})
          }
        },
        onRowSelectAll(selected){
          dispatch({type: 'content/eventHandler', handler: {fn: 'ctrlAFn'}})
        },
        onRowClick(isSelected, record){
          if (!isSelected) {
            dispatch({type: 'content/select', record: record, isClick: true})
          } else {
            dispatch({type: 'content/unselect', record: record, isClick: true})
          }
        }
      }
      return <PList {...plistProps} />
    case C.PAGE_ADD_PASSENGER:

      const pAddProps = {
        dss: [token.fl.ars],
        currActive, currBlock
      }
      return <PAdd {...pAddProps} />

    case C.PAGE_MODIFY_PHONE:

      if (selectPls.length == 0) {
        message.error('请选择一个旅客')
        return null
      }
      const mPhoneProps = {
        selectPls, currActive, currBlock, pageName,
        phone: selectPls[0].te
      }
      return <Mphone {...mPhoneProps}/>

    case C.PAGE_STOP_PASSENGER:

      if (selectPls.length == 0) {
        message.error('请选择一个或多个旅客')
        return null
      }
      const stopPlProps = {
        selectPls, currActive, currBlock, pageName
      }
      return <PStop {...stopPlProps}/>

    case C.PAGE_SEATMAP:

      const seatMapProps = {}
      return <SeatMap {...seatMapProps}/>

    case C.PAGE_CHECKIN:

      const checkinProps = {
        currActive, currBlock, pageName
      }
      return <Checkin {...checkinProps}/>

    case C.PAGE_MANUAL_PROTECT:

      const mproectProps = {
        selectPls, currActive, currBlock, pageName
      }
      return <ManualProtect {...mproectProps}/>

    case C.PAGE_BINDING_INF:

      const bindingInfProps = {
        pls, selectPls, currActive, currBlock, pageName,
        onBind(ps, cb){
          dispatch({type: 'content/doBindingInf', ps, cb, bind: true})
        },
        unBind(ps, cb){
          dispatch({type: 'content/doBindingInf', ps, cb, bind: false})
        }
      }

      return <BindingInf {...bindingInfProps}/>

    case C.PAGE_MODIFY_API:

      const mApiProps = {
        selectPls, currActive, currBlock, pageName,
      }
      return <MApi {...mApiProps}/>

    case C.PAGE_LOG_LIST:

      const logProps = {
        currBlock, currActive, pageName, otherCurrPage, otherPageNum,
        logs: content.serverData
      }

      return <Log {...logProps}/>

    case C.PAGE_PB_ADD:

      const pbAddProps = {
        currBlock, currActive, pageName,
        pbs: content.serverData,
        dss: [token.fl.ds]
      }

      return <PbAdd {...pbAddProps}/>

    case C.PAGE_PB_DEL:

      const pbDelProps = {
        currBlock, currActive, pageName,
        pbs: content.serverData,
        needSelect: true
      }
      return <PbDel {...pbDelProps}/>

    case C.PAGE_CANCEL_FEE:

      if (selectPls.length !== 1) {
        message.error('请选择一个旅客')
        return null
      }
      const cancelFeeProps = {
        currBlock, currActive, pageName,
        fees: content.serverData.feeMsg,
        needSelect: true
      }

      return <CancelFee {...cancelFeeProps}/>

    case C.PAGE_FEE_ADD:
      if (selectPls.length !== 1) {
        message.error('请选择一个旅客')
        return null
      }
      const feeAddProps = {
        currBlock, currActive, pageName,
        fees: content.serverData,
      }

      return <PbFeeAdd {...feeAddProps} />

  }
}

export default {
  PSelect,
  FStatus,
  Login,
  Header,
  Footer,
  PList,
  PAdd,
  Mphone,
  PStop,
  SeatMap,
  Checkin,
  Confirm,
  ManualProtect,
  BindingInf,
  MApi,
  renderComp
}
