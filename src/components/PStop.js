import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form,
  Button, Input, Row, Col
} from 'antd';
const FormItem = Form.Item;

export default class PStop extends React.Component {

  render() {
    const {selectPls, currActive, currBlock, pageName} = this.props
    const cns = selectPls.map(pl=>pl.cn).join(',')

    const isCurrPage = currBlock === C.MAIN_BLOCK && pageName === C.PAGE_STOP_PASSENGER

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return <div>
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-截留
        </Col>
      </Row>
      <Row>
        <Col span={24}>

          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              <span className="ant-form-text">{cns}</span>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="备注"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.PSTOP_NOTE_KEY)}
                     placeholder="unavailable choice"
                     id="error"/>
            </FormItem>

            <FormItem wrapperCol={{span: 16, offset: 6}}>
              <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
                      htmlType="submit">提交</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </div>
  }
}
