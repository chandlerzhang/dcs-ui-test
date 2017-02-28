import React from 'react'
import {Row, Col, Button, message} from 'antd'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

export default class PSelect extends React.Component {

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


  render() {
    const {list, onClose, label, onAdd, currFl, currBlock, currActive, onPrev, onNext} = this.props
    //展示页面类型，航班选择/旅客选择/操作选择
    let type = this.props.type || C.PSELECT_TYPE_PASSENGER

    const {currPageField, pageNumField} = F.getPageInfoField(type)
    const pageInfo = {
      currPage: this.props[currPageField],
      pageNum: this.props[pageNumField]
    }
    const currPage = pageInfo.currPage
    const pageNum = pageInfo.pageNum
    const recordLen = list.length
    const allPage = recordLen % pageNum == 0 ? recordLen / pageNum : Math.floor(recordLen / pageNum) + 1

    //上一页按钮是否禁用
    const iconLeftDisabled = currPage == 1
    //下一页按钮是否禁用
    const iconRightDisabled = currPage == allPage
    const iconLeftCls = iconLeftDisabled ? 'dcs-icon-left dcs-icon-disabled' : 'dcs-icon-left'
    const iconRightCls = iconRightDisabled ? 'dcs-icon-right dcs-icon-disabled' : 'dcs-icon-right'

    //待展示的具体元素
    let items = []
    //是否是航班选择页面
    const isFlightSelect = type === C.PSELECT_TYPE_FLIGHT

    let block = PSelect.getBlockByType(type)

    for (let i = 0; i < recordLen; i++) {
      const st = (currPage - 1) * pageNum, ed = currPage * pageNum

      if (i >= st && i < ed) {
        const pl = list[i]
        const k = F.genSelectKey(type, i)
        // sComps.push(k)

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
            let btn = <Button onClick={pl.onClick}>{pl.text}</Button>
            if (!pl.enable) {
              btn = <Button className="disabled" onClick={()=> {
                if (pl.errmsg) {
                  message.error(pl.errmsg)
                }
              }}>{pl.text}</Button>
            }
            items.push(<span key={k} className={F.getActiveCls(isActive, 'dcs-pselect-item-button')}>{btn}</span>)
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

    const me = this

    return <Row className="dcs-pselect">
      <Col span={23}>

        <span className="dcs-pselect-title">{label}：</span>
        <a href="javascript:;"
           className={F.getActiveCls(currBlock == block && currActive == C.PREV_BTN_KEY)}
           onClick={()=> {
             if (!iconLeftDisabled && typeof onPrev === 'function') {
               onPrev(type)
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
            className={F.getActiveCls(currBlock == block && currActive == C.FLIGHTADD_BTN_KEY, 'dcs-circle-add')}
            onClick={()=> {
              if (typeof onAdd === 'function') {
                onAdd()
              }
            }}>+</span> : null}
      </Col>
      <Col span={1}>
        <a href="javascript:;"
           className={F.getActiveCls(currBlock == block && currActive == C.NEXT_BTN_KEY)}
           onClick={()=> {
             if (!iconRightDisabled && typeof onNext === 'function') {
               onNext(type)
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
