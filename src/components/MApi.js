import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form, Radio,
  Button, Input, Row, Col
} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class MApi extends React.Component {

  render() {
    const {selectPls, currBlock, currActive, pageName} = this.props
    const pl = selectPls[0]
    const formItemLayout = {
      labelCol: {span: 3},
      wrapperCol: {span: 20},
    };
    const isCurrPage = currBlock === C.MAIN_BLOCK && pageName === C.PAGE_MODIFY_API

    return <div className="modify-api-page">
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-API信息
        </Col>
      </Row>
      <Row>

        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            <span className="ant-form-text">{pl.cn}</span>
          </FormItem>
        </Col>
        <Col span={12}>

        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="旅客姓氏"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_LNAME_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="旅客名字"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_FNAME_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="旅客性别"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_SEX_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="出生日期"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_DB_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="旅客国籍"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_DNA_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="证件签发国"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_COUNTRY_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="ID-Type"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_ITYPE_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="ID-Number"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_INUMBER_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="证件失效日期"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_DISABLE_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="旅客性质"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_STYLE_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="客票类型"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_TTYPE_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="客票号码"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input className={F.getActiveCls(isCurrPage && currActive == C.MAPI_TNUMBER_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label="护照识别"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          >
            <Input type="textarea" rows={3} className={F.getActiveCls(isCurrPage && currActive == C.MAPI_PASSPORT_KEY)}
                   placeholder="unavailable choice"
                   id="error"/>
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            wrapperCol={{span:12,offset:12}}
          >
            <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
                    htmlType="submit">提交</Button>
          </FormItem>
        </Col>
      </Row>
    </div>
  }
}
