import React from 'react'
import {message} from 'antd'
import * as F from '../utils/Func'
import * as C from '../utils/Const'

export default class EventHandler extends React.Component {

  constructor() {

    super()

    this.listeners = []
  }

  addListener(name, match, deal) {
    this.listeners.push({
      name, match, deal
    })
  }


  handle(e) {

    const {currBlock, currActive, dispatch} = this.props


    for (const lis of this.listeners) {

      if (lis.match(e)) {
        const updated = lis.deal(e, lis)

        if (updated) {
          // updateEventData(updated)
          dispatch({type: 'content/updateState', newState: updated})
        }
      }
    }
  }

  componentWillMount() {

    // window.addEventListener('keydown', this.handle.bind(this))

    this.addListener('Down', (e)=>e.which == 40 || e.which == 39 || (e.which == 9 && !e.shiftKey), this.downFn.bind(this))
    this.addListener('Up', (e)=>e.which == 38 || e.which == 37 || (e.which == 9 && e.shiftKey), this.upFn.bind(this))
    this.addListener('F4+F2+F5', (e)=>e.which == 115 || e.which == 113 || e.which == 116, this.commFn.bind(this))
    this.addListener('Esc', (e)=>e.which == 27, this.escFn.bind(this))//Tab Down
    this.addListener('Ctrl+A', (e)=>e.which == 65 && e.ctrlKey, this.ctrlAFn.bind(this))//Tab Down
    this.addListener('F1', (e)=>e.which == 112, this.commFn.bind(this))//Tab Down
  }

  componentWillUnmount() {
    // window.removeEventListener('keydown')
  }

  render() {

    const {children} = this.props

    return children
  }

  ctrlAFn(e) {
    F.stopEvent(e)

    const {currBlock, dispatch} = this.props

    dispatch({type: 'content/selectAll'})
  }

  escFn(e) {
    F.stopEvent(e)

    return {
      currBlock: C.MAIN_BLOCK,
      currActive: C.CMD_INPUT
    }
  }

  commFn(e) {
    F.stopEvent(e)

    let block;
    switch (e.which) {
      case 115://f4
        block = C.PSELECT_BLOCK
        break
      case 113://f2
        block = C.FLIGHTSWITCH_BLOCK
        break
      case 116://f5
        block = C.OPERATION_BLOCK
        break
      case 112://f1
        block = C.TOPMENU_BLOCK
        break
      default:
        throw new Error(`unsupported key ${e.which}`)
    }

    const {getComps, currActive} = this.props
    const comps = getComps(block)
    if (!comps || comps.length == 0) {
      message.error('没有可选的组件');
      return
    }

    return {
      currBlock: block,
      currActive: comps[0]
    }
  }

  upFn(e) {
    F.stopEvent(e)
    const {getComps, currActive} = this.props
    if (!getComps) return

    const comps = getComps() || []
    if (comps.length == 0) {
      console.error('comps is empty~~')
      return
    }
    let index = F.indexOf(comps, currActive)
    if (index < 0) {
      return {
        currActive: comps[0]
      }
    } else {
      if (--index < 0) {
        index = comps.length - 1
      }

      return {
        currActive: comps[index]
      }
    }
  }

  downFn(e) {
    F.stopEvent(e)
    const {getComps, currActive} = this.props
    if (!getComps) return

    const comps = getComps() || []
    if (comps.length == 0) {
      console.error('comps is empty~~')
      return
    }
    let index = F.indexOf(comps, currActive)
    if (index < 0) {
      return {
        currActive: comps[0]
      }
    } else {
      if (++index >= comps.length) {
        index = 0
      }

      return {
        currActive: comps[index]
      }
    }

  }
}
