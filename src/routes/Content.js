import React from 'react'
import {connect} from 'dva'
import {message} from 'antd'
import PSelect from '../components/PSelect'
import FStatus from '../components/FStatus'
import Login from '../components/Login'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PList from '../components/PList'
import PAdd from '../components/PAdd'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

class Content extends React.Component {

  componentDidUpdate() {
    F.focusActive()
  }

  renderMain() {

    const {content, dispatch} = this.props
    const {pageName, token, currActive,currBlock} = content
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
            if (selected) {
              dispatch({type: 'content/selectAll'})
            } else {
              dispatch({type: 'content/unselectAll'})
            }
          },
          onRowClick(isSelected, record){
            if (isSelected) {
              dispatch({type: 'content/select', record: record})
            } else {
              dispatch({type: 'content/unselect', record: record})
            }
          }
        }
        return <PList {...plistProps} />
      case C.PAGE_ADD_PASSENGER:

        const pAddProps = {
          dss: [token.fl.ars],
          currActive,currBlock
        }
        return <PAdd {...pAddProps} />

    }
  }

  render() {
    const {content, dispatch} = this.props
    const {pls, fls, selectPls, loading, token, currBlock, currActive, flightSwitchPageNum, flightSwitchCurrPage, passengerSelectPageNum, passengerSelectCurrPage, passengerOperationPageNum, passengerOperationCurrPage} = content
    const isLogin = token && token.user

    const onPrev = (t)=> {
      dispatch({type: 'content/onPrev', pselectType: t})
    }
    const onNext = (t)=> {
      dispatch({type: 'content/onNext', pselectType: t})
    }

    const passengerSelectProps = {
      label: '已选旅客（F4）',
      type: C.PSELECT_TYPE_PASSENGER,
      list: selectPls,
      onClose: (pl)=> {
        dispatch({type: 'content/unselect', record: pl})
      }, currBlock, currActive, passengerSelectCurrPage, passengerSelectPageNum, onPrev, onNext
    }

    const operationBtns = F.getOperationBtns(content, dispatch)
    const passengerOprProps = {
      label: '旅客操作（F5）',
      type: C.PSELECT_TYPE_BUTTON,
      list: operationBtns,
      currBlock,
      currActive,
      passengerOperationCurrPage,
      passengerOperationPageNum,
      onPrev,
      onNext
    }

    const fSwitchProps = {
      label: '切换航段（F2）',
      type: C.PSELECT_TYPE_FLIGHT,
      list: fls,
      currFl: token ? token.fl : null,
      onClose(pl){
        if (fls.length === 1) {
          message.error('当前仅有一个航班，不能关闭！')
          return
        }
        dispatch({type: 'content/removeFlight', record: pl})
      },
      onAdd(){

      }, currBlock, currActive, flightSwitchCurrPage, flightSwitchPageNum, onPrev, onNext
    }

    const headerProps = {
      currBlock, currActive,
    }

    if (isLogin) {

      return <div className="dcs-main">
        <div className="dcs-header">

          <Header {...headerProps}/>
        </div>
        <div className="dcs-center">
          {fls && fls.length > 0 ? <PSelect {...fSwitchProps}/> : null}
          <FStatus fl={token.fl}/>
          {selectPls && selectPls.length > 0 ? <PSelect {...passengerSelectProps} /> : null}
          {operationBtns && operationBtns.length > 0 ? <PSelect {...passengerOprProps} /> : null}
          {this.renderMain()}
        </div>
        <div className="dcs-footer">
          <Footer/>
        </div>

      </div>
    } else {
      const loginProps = {
        onLogin(){
          console.log('you clicked login button~~~')
        }
      }
      return <Login {...loginProps}/>
    }
  }
}

Content.PropTypes = {
  token: React.PropTypes.object,
  loading: React.PropTypes.bool,
  pls: React.PropTypes.array,
  fls: React.PropTypes.array,
  selectPls: React.PropTypes.array,
  currBlock: React.PropTypes.string,
  currActive: React.PropTypes.string,
  pageName: React.PropTypes.string,
  comps: React.PropTypes.object,
  flightSwitchPageNum: React.PropTypes.number,
  flightSwitchCurrPage: React.PropTypes.number,
  passengerSelectPageNum: React.PropTypes.number,
  passengerSelectCurrPage: React.PropTypes.number,
  passengerOperationPageNum: React.PropTypes.number,
  passengerOperationCurrPage: React.PropTypes.number,
}

export default connect(({content})=> {
  return {
    content
  }
})(Content)
