import React from 'react'
import {Row, Col, Input, Form, Button, Checkbox} from 'antd'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import SeatMap from '../components/SeatMap'

const FormItem = Form.Item;

/**
 * 值机
 */
export default class Checkin extends React.Component {

  render() {

    const {currActive, currBlock, pageName} = this.props
    const formItemLayout = {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 10
      }
    }
    const isCurrPage = pageName === C.PAGE_CHECKIN

    return <div style={{marginTop: '20px'}}>
      <Row>
        <Col span={24}>

          <SeatMap/>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <FormItem
            {...formItemLayout}
            label="从："
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.CHECKIN_FROM_KEY)}
                   placeholder="unavailable choice"
            />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            {...formItemLayout}
            label="到："
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.CHECKIN_TO_KEY)}
                   placeholder="unavailable choice"
            />
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            {...formItemLayout}
            label=""
          >
            <Checkbox className={F.getActiveCls(isCurrPage && currActive == C.CHECKIN_NOPRINT_KEY)}
                      placeholder="unavailable choice"
            >不打印登机牌</Checkbox>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem wrapperCol={{span: 16, offset: 6}}>
            <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
                    htmlType="submit">提交</Button>
          </FormItem>
        </Col>
      </Row>
    </div>
  }
}
