import React from 'react'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

export default class FStatus extends React.Component {

  render() {

    const {fl, currBlock, currActive} = this.props
    const isCurrBlock = currBlock === C.FLIGHT_STATUS_BLOCK

    return <div className="ant-row dcs-pselect">
      <div className="ant-col-23">
        <span className="dcs-pselect-title">航班状态（F3）：</span>
        <span className="dcs-icon-left dcs-icon-disabled">
          <img src="./img/u337.png" width="16"/>
        </span>
        <span className="dcs-flight-status">
          <span><span className="green">{fl.fn}</span> / {fl.fde}</span>
          <span>虹桥 - 西安 - 乌鲁木齐</span>
          <span>计划: {fl.etb} - {fl.eto} - {fl.eta}</span>
          <span>航段: <span className="red">{fl.fs}</span></span>
          <span>闸口: <span className="red">{fl.gs}</span></span>
          <span>登机口: <span className="green">{fl.gat}</span></span>
          <span>值机: 176 登机: 176 拉下: 3</span>
        </span>
      </div>
      <div className="ant-col-1">
        <span className="dcs-icon-right ">
          <a href="javascript:void(0);"
             className={F.getActiveCls(isCurrBlock && currActive === C.FSTATUS_SHOWDETAIL_KEY)}><img
            src="./img/u337.png" width="16"/></a>
        </span>
      </div>
    </div>
  }
}
