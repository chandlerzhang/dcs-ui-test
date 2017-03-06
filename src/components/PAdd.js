import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form, Radio,
  Button, Input, Row, Col
} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

/**
 * 候补旅客
 */
export default class PAdd extends React.Component {

  handleSubmit() {

  }

  render() {
    const {dss, currActive, currBlock} = this.props

    const isCurrPage = currBlock === C.MAIN_BLOCK
    let dsField;
    if (dss.length == 1) {
      dsField = <RadioGroup>
        <Radio value={dss[0]} checked>{dss[0]}</Radio>
      </RadioGroup>
    } else {
      dsField = <RadioGroup>
        {
          dss.map((ds, i)=> {
            const k = `key-ds-${i}`
            const isActive = currActive == k
            if (isActive) {
              return <Radio value={ds} checked className={isCurrPage && F.getActiveCls(isActive)}>{ds}</Radio>
            } else {
              return <Radio value={ds}>{ds}</Radio>
            }
          })
        }
      </RadioGroup>
    }

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    return <div>
      <Row>
        <Col span={24} className="add-passenger-header">
          候补旅客
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="目的站"
            >
              {dsField}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="旅客姓名"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.PADD_CN_KEY)}
                     placeholder="unavailable choice"
                     id="error"/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="旅客性质"
            >
              <RadioGroup>
                <Radio value="M" className={F.getActiveCls(isCurrPage && currActive == C.PADD_SEX1_KEY)}>M</Radio>
                <Radio value="C" className={F.getActiveCls(isCurrPage && currActive == C.PADD_SEX2_KEY)}>C</Radio>
                <Radio value="I" className={F.getActiveCls(isCurrPage && currActive == C.PADD_SEX3_KEY)}>I</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="证件号码"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"

            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.PADD_DN_KEY)}
                     placeholder="unavailable choice"
                     id="error"/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="电子票"
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input className={F.getActiveCls(isCurrPage && currActive == C.PADD_ETI_KEY)}
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
