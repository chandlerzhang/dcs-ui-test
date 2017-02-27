import React from 'react'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

export default class Header extends React.Component {

  render() {

    const obj = F.headerRenderData(this.props)

    return obj.renderData
  }
}
