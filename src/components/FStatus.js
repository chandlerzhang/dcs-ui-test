import React from 'react'

export default class FStatus extends React.Component {

  render() {

    const {fl} = this.props

    return <div className="ant-row dcs-pselect">
      <div className="ant-col-23">
        <span className="dcs-pselect-title">航班状态：</span>
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
        <span className="dcs-icon-right dcs-icon-disabled">
          <img src="./img/u337.png" width="16"/>
        </span>
      </div>
    </div>
  }
}
