import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form,
  Button, Row, Col, Table
} from 'antd';
const FormItem = Form.Item;

export default class PbDel extends React.Component {

  render() {

    const {pbs, rowSelection, currBlock, currActive, pageName} = this.props

    const needSelect = !!rowSelection
    const isCurrPage = pageName === C.PAGE_PB_DEL && currBlock === C.MAIN_BLOCK

    //todo 需要处理小数计算不准确
    const allWeight = pbs.reduce((p1, p2)=> (p1.bw || p1) + p2.bw)

    return <div className="modify-api-page">
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-删除旅客行李
        </Col>
      </Row>
      <Row>
        <Col span={24}>

          <Table className="dcs-pl-table"
                 title={(o)=> <span><span className="dcs-circle">i</span>行李数量<span
                   className="dcs-pl-table-num">{pbs.length}</span>，总重<span
                   className="dcs-pl-table-num">{allWeight}</span>kg</span>}
                 rowKey={pl=>F.genPbKey(pl)}
                 rowSelection={rowSelection}
                 columns={[
                   {title: '目的站', dataIndex: 'ds', key: '2', width: 150},
                   {title: '行李号', dataIndex: 'bsn', key: '3', width: 150},
                   {title: '重量', dataIndex: 'bw', key: '4', width: 150},
                 ]}
                 dataSource={pbs}
                 onRowClick={()=> {
                 }}
                 rowClassName={needSelect ? (r)=> {
                   return F.getActiveCls(isCurrPage && currActive == F.genPbKey(r))
                 } : ()=>''}
                 pagination={false}
                 scroll={{y: 300}}/>
        </Col>
      </Row>
      {needSelect ? <Row>
        <Col span={24} style={{marginTop:'10px'}}>
          <FormItem wrapperCol={{span: 12, offset: 12}}>
            <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
                    htmlType="submit">删除</Button>
          </FormItem>
        </Col>
      </Row> : null}
    </div>

  }
}
