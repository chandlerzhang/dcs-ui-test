import React from 'react'
import {Row, Col, Button} from 'antd'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

export default class PSelect extends React.Component {

  constructor() {

    super()

    this.state = {
      currPage: 1,//当前页
      pageNum: 8,//每页显示数目
    }
  }

  static PREV_BTN_KEY = 'PREV_BTN_KEY'
  static NEXT_BTN_KEY = 'NEXT_BTN_KEY'
  static FLIGHTADD_BTN_KEY = 'FLIGHTADD_BTN_KEY'

  static getBlockByType(type) {
    let block;
    switch (type) {
      case C.PSELECT_TYPE_BUTTON:
        block = C.OPERATION_BLOCK
        break
      case C.PSELECT_TYPE_FLIGHT:
        block = C.FLIGHTSWITCH_BLOCK
        break
      case C.PSELECT_TYPE_PASSENGER:
        block = C.PSELECT_BLOCK
        break
      default:
        throw new Error(`unsupported type ${type}`)
    }

    return block
  }

  next() {
    const state = this.state
    const list = this.props.list
    const allPage = list.length % state.pageNum == 0 ? list.length / state.pageNum : list.length / state.pageNum + 1
    const newS = {
      ...state,
      currPage: Math.min(allPage, state.currPage + 1)
    }

    this.setState(newS)
  }

  prev() {

    const state = this.state
    const newS = {
      ...state,
      currPage: Math.max(1, state.currPage - 1)
    }

    this.setState(newS)
  }

  render() {
    const {list, onClose, label, onAdd, currFl, regComps, currBlock, currActive} = this.props
    const currPage = this.state.currPage
    const pageNum = this.state.pageNum
    const recordLen = list.length
    const allPage = recordLen % pageNum == 0 ? recordLen / pageNum : Math.floor(recordLen / pageNum) + 1

    //上一页按钮是否禁用
    const iconLeftDisabled = this.state.currPage == 1
    //下一页按钮是否禁用
    const iconRightDisabled = this.state.currPage == allPage
    const iconLeftCls = iconLeftDisabled ? 'dcs-icon-left dcs-icon-disabled' : 'dcs-icon-left'
    const iconRightCls = iconRightDisabled ? 'dcs-icon-right dcs-icon-disabled' : 'dcs-icon-right'

    //展示页面类型，航班选择/旅客选择/操作选择
    let type = this.props.type || C.PSELECT_TYPE_PASSENGER
    //待展示的具体元素
    let items = []
    //是否是航班选择页面
    const isFlightSelect = type === C.PSELECT_TYPE_FLIGHT

    //允许焦点切换的组件
    const sComps = []
    let block = PSelect.getBlockByType(type)
    if (!iconLeftDisabled) {
      sComps.push(PSelect.PREV_BTN_KEY)
    }

    for (let i = 0; i < recordLen; i++) {
      const st = (currPage - 1) * pageNum, ed = currPage * pageNum

      if (i >= st && i < ed) {
        const pl = list[i]
        const k = `select-${type}-${i}`
        sComps.push(k)

        const isActive = currBlock == block && currActive == k
        switch (type) {
          case C.PSELECT_TYPE_PASSENGER :
            items.push(<span key={k} className={F.getActiveCls(isActive, 'dcs-pselect-item')}>{pl.cn}
              <a href="javascript:;" onClick={()=> {
                if (typeof onClose === 'function') {
                  onClose(pl)
                }
              }}>
              <img
                className="dcs-pselect-item-close" src="./img/u357.png"/>
            </a></span>)
            break
          case C.PSELECT_TYPE_BUTTON:
            items.push(<span key={k} className={F.getActiveCls(isActive, 'dcs-pselect-item-button')}><Button
              onClick={pl.onClick}>{pl.text}</Button></span>)
            break
          case C.PSELECT_TYPE_FLIGHT:
            const isCurr = currFl && pl.uui === currFl.uui
            const cls = isCurr ? 'dcs-pselect-item dcs-pselect-item-curr' : 'dcs-pselect-item'
            items.push(<span key={k} className={F.getActiveCls(isActive, cls)}>{pl.fn}
              <a href="javascript:;" onClick={()=> {
                if (typeof onClose === 'function') {
                  onClose(pl)
                }
              }}>
              <img className="dcs-pselect-item-close" src="./img/u357.png"/>
            </a></span>)
            break
          default:
            throw new Error(`unsupported type ${type}`)
        }
      }
    }
    if (!iconRightDisabled) {
      sComps.push(PSelect.NEXT_BTN_KEY)
    }
    if (isFlightSelect) {
      sComps.push(PSelect.FLIGHTADD_BTN_KEY)
    }

    if (regComps) regComps(sComps, block)

    const me = this

    return <Row className="dcs-pselect">
      <Col span={23}>

        <span className="dcs-pselect-title">{label}：</span>
        <a href="javascript:;"
           className={F.getActiveCls(currBlock == block && currActive == PSelect.PREV_BTN_KEY)}
           onClick={()=> {
             if (!iconLeftDisabled) {
               me.prev.call(me)
             }
           }}>
          <span className={iconLeftCls}>

              <img
                src="./img/u337.png"
                width="16"/>

          </span>
        </a>
        <span className="dcs-circle">{list.length}</span>
        {items}
        {isFlightSelect ?
          <span
            className={F.getActiveCls(currBlock == block && currActive == PSelect.FLIGHTADD_BTN_KEY, 'dcs-circle-add')}
            onClick={()=> {
              if (typeof onAdd === 'function') {
                onAdd()
              }
            }}>+</span> : null}
      </Col>
      <Col span={1}>
        <a href="javascript:;"
           className={F.getActiveCls(currBlock == block && currActive == PSelect.NEXT_BTN_KEY)}
           onClick={()=> {
             if (!iconRightDisabled) {
               me.next.call(me)
             }
           }}>
        <span className={iconRightCls}><img
          src="./img/u337.png"
          width="16"/></span>
        </a>
      </Col>
    </Row>
  }
}
