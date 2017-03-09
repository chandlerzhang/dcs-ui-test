import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import PbDel from './PbDel'
import {
  Form,
  Button, Input, Row, Col, Radio, Checkbox
} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class PbAdd extends React.Component {

  render() {
    const {dss, pbs, currBlock, currActive, pageName} = this.props
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    const isCurrPage = pageName === C.PAGE_PB_ADD && currBlock === C.MAIN_BLOCK

    return <div>
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-添加旅客行李
        </Col>
      </Row>
      <Row>
        <Col span={12}>

          <FormItem
            {...formItemLayout}
            label="目的站"
          >
            <RadioGroup >
              {dss.map((ds, i)=> {
                const k = `pb-ds-${ds}`
                const isFirst = i === 0
                if (isFirst) {
                  return <Radio checked key={k} value={ds}
                                className={F.getActiveCls(isCurrPage && currActive == k)}>{ds}</Radio>
                } else {
                  return <Radio key={k} value={ds}
                                className={F.getActiveCls(isCurrPage && currActive == k)}>{ds}</Radio>
                }

              })}
            </RadioGroup>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="使用行李号"
          >
            <Checkbox className={F.getActiveCls(isCurrPage && currActive == C.PBADD_USEID_KEY)}>&nbsp;</Checkbox>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="行李号"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.PBADD_ID_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="行李重量"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.PBADD_WEIGHT_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="不打印行李牌"
          >
            <Checkbox className={F.getActiveCls(isCurrPage && currActive == C.PBADD_NOPRINT_KEY)}>&nbsp;</Checkbox>
          </FormItem>

        </Col>
        <Col span={12}>

          <PbDel pbs={pbs}/>
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
