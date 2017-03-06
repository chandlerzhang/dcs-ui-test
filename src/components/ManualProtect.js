import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form,
  Button, Input, Row, Col
} from 'antd';
const FormItem = Form.Item;

/**
 * 手工保护
 */
export default class ManualProtect extends React.Component{

  render(){

    const {selectPls, currActive, currBlock, pageName} = this.props
    const pl = selectPls[0]

    const isCurrPage = currBlock === C.MAIN_BLOCK && pageName === C.PAGE_MANUAL_PROTECT

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return <div>
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-手工保护
        </Col>
      </Row>
      <Row>
        <Col span={24}>

          <Form >

            <FormItem
              {...formItemLayout}
              label="航班号"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.MPROTECT_FN_KEY)}
                     placeholder="unavailable choice"
                     id="error"/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="航班日期"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.MPROTECT_FD_KEY)}
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
