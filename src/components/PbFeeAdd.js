import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import CancelFee from './CancelFee'
import {
  Form,
  Button, Input, Row, Col
} from 'antd';
const FormItem = Form.Item;

export default class PbFeeAdd extends React.Component {

  render() {
    const {fees, currBlock, currActive, pageName} = this.props
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    const isCurrPage = pageName === C.PAGE_FEE_ADD && currBlock === C.MAIN_BLOCK

    return <div>
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-行李收费
        </Col>
      </Row>
      <Row>
        <Col span={12}>


          <FormItem
            {...formItemLayout}
            label="首件应收（元）"
          >
            <span className="ant-form-text">{fees.ak}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="民航公布价（元）"
          >
            <span className="ant-form-text">{fees.af}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="逾重收费单价（元）"
          >
            <span className="ant-form-text">18</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="首件实收（元）"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.PBFEE_SS_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="逾重收费重量（KG）"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.PBFEE_ZL_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="行李收费合计（元）"
          >
            <span className="ant-form-text">18</span>
          </FormItem>


        </Col>
        <Col span={12}>

          <CancelFee fees={fees.feeMsg || []}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FormItem wrapperCol={{span: 16, offset: 6}}>
            <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
                    htmlType="submit">继续添加</Button>
          </FormItem>
        </Col>
      </Row>
    </div>
  }
}
