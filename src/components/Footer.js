import React from 'react'
import {Button} from 'antd'

export default class Footer extends React.Component {

  render() {

    return <div>
                <span className="dcs-footer-title">
                    <img src="./img/u66.png" width="16"/>
                  &nbsp;&nbsp;&nbsp;设备
                </span>
      <Button className="bottom-button">登机牌打印机</Button>
      <Button className="bottom-button" type="danger">行李牌打印机</Button>
      <Button className="bottom-button">小票打印机</Button>
      <Button className="bottom-button">身份证阅读器</Button>
      <Button className="bottom-button">登机牌扫描仪</Button>
    </div>
  }
}
