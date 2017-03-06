import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form,
  Button, Input, Row, Col
} from 'antd';
const FormItem = Form.Item;

/**
 * 修改电话号码
 */
export default class Mphone extends React.Component {

  render() {
    const {selectPls, currActive, currBlock, pageName, phone} = this.props
    const pl = selectPls[0]

    const isCurrPage = currBlock === C.MAIN_BLOCK && pageName === C.PAGE_MODIFY_PHONE

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return <div>
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-修改电话
        </Col>
      </Row>
      <Row>
        <Col span={24}>

          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              <span className="ant-form-text">{pl.cn}</span>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="旅客电话"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.MPHONE_TE_KEY)}
                     placeholder="unavailable choice"
                     defaultValue={phone}
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
