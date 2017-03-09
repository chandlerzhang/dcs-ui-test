import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form,
  Button, Row, Col, Table
} from 'antd';
const FormItem = Form.Item;

export default class CancelFee extends React.Component {
  constructor() {
    super()

    this.state = {
      selected: []
    }
  }

  onSelect(record, selected, selectedRows) {

    if (selected) {
      const selected = this.state.selected
      selected.push(record)
      this.setState({
        ...this.state,
        selected
      })
    } else {
      const selected = this.state.selected.filter(pb=>pb.id !== record.id)
      this.setState({
        ...this.state,
        selected
      })
    }
  }

  onSelectAll(selected, selectedRows, changeRows) {

    this.setState({
      ...this.state,
      selected: selected ? this.props.pbs : []
    })
  }

  render() {

    const {fees, needSelect, currBlock, currActive, pageName} = this.props

    const isCurrPage = pageName === C.PAGE_CANCEL_FEE && currBlock === C.MAIN_BLOCK

    const rowSelection = {
      selectedRowKeys: this.state.selected.map(pb=>F.genKey(pb,'fee')),
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: this.onSelect.bind(this),
      onSelectAll: this.onSelectAll.bind(this),
    }

    return <div className="modify-api-page">
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-取消行李收费
        </Col>
      </Row>
      <Row>
        <Col span={24}>

          <Table className="dcs-pl-table"
                 title={(o)=> <span><span className="dcs-circle">i</span>共<span
                   className="dcs-pl-table-num">{fees.length}</span>项费用，已选择<span
                   className="dcs-pl-table-num">{this.state.selected.length}</span>项</span>}
                 rowKey={pl=>F.genKey(pl,'fee')}
                 rowSelection={needSelect ? rowSelection : null}
                 columns={[
                   {title: '订单号', dataIndex: 'obn', key: '2', width: 150},
                   {title: '首件实收（元）', dataIndex: 'acnt', key: '2', width: 150},
                   {title: '重量（KG）', dataIndex: 'bw', key: '3', width: 150},
                   {title: '逾重收费（元）', dataIndex: 'bcnt', key: '4', width: 150},
                 ]}
                 dataSource={fees}
                 onRowClick={()=> {
                 }}
                 rowClassName={needSelect ? (r)=> {
                   return F.getActiveCls(isCurrPage && currActive == F.genKey(r,'fee'))
                 } : ()=>''}
                 pagination={false}
                 scroll={{y: 300}}/>
        </Col>
      </Row>
      {needSelect ? <Row>
        <Col span={24} style={{marginTop: '10px'}}>
          <FormItem wrapperCol={{span: 12, offset: 12}}>
            <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
                    htmlType="submit">提交</Button>
          </FormItem>
        </Col>
      </Row> : null}
    </div>

  }
}
