import React from 'react'
import {Row,Col} from 'antd'

export default class PDetail extends React.Component {


  render() {

    const {pl} = this.props

    return <Row>
      <Col span={18}>
        <div>
          <Row>
            <Col span={4} className="dcs-col-right">姓名：</Col>
            <Col span={4}>{pl.cn}</Col>
            <Col span={4} className="dcs-col-right">航程：</Col>
            <Col span={4}>{pl.ss}-{pl.ds}</Col>
            <Col span={4} className="dcs-col-right">会员号码：</Col>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={4} className="dcs-col-right">英文姓名：</Col>
            <Col span={4}>{pl.en}</Col>
            <Col span={4} className="dcs-col-right">共享航段：</Col>
            <Col span={4}></Col>
            <Col span={4} className="dcs-col-right">电话：</Col>
            <Col span={4}>{pl.te}</Col>
          </Row>
          <Row>
            <Col span={4} className="dcs-col-right">性别：</Col>
            <Col span={4}>{pl.sex}</Col>
            <Col span={4} className="dcs-col-right">候补：</Col>
            <Col span={4}></Col>
            <Col span={4} className="dcs-col-right">电子客票：</Col>
            <Col span={4}></Col>
          </Row>
          <Row>
            <Col span={4} className="dcs-col-right">证件号码：</Col>
            <Col span={4}></Col>
            <Col span={4} className="dcs-col-right">CRS：</Col>
            <Col span={4}></Col>
            <Col span={4} className="dcs-col-right">机票价格：</Col>
            <Col span={4}></Col>
          </Row>
        </div>
      </Col>
      <Col span={6}>

        <div>
          <Row>
            <Col span={8}>目的站</Col>
            <Col span={8}>行李号</Col>
            <Col span={8}>重量（KG）</Col>
          </Row>
          <Row>
            <Col span={8}>PVG</Col>
            <Col span={8}>1000001</Col>
            <Col span={8}>20</Col>
          </Row>
          <Row>
            <Col span={8}>PVG</Col>
            <Col span={8}>1000001</Col>
            <Col span={8}>20</Col>
          </Row>
          <Row>
            <Col span={8}>PVG</Col>
            <Col span={8}>1000001</Col>
            <Col span={8}>20</Col>
          </Row>
        </div>
      </Col>
    </Row>
  }
}

PDetail.propTypes = {
  pl: React.PropTypes.object
}
