import React from 'react'
import * as F from '../utils/Func'
import * as C from '../utils/Const'
import {
  Form,
  Button, Input, Row, Col, message, Table
} from 'antd';
const FormItem = Form.Item;

/**
 * 绑定婴儿
 */
export default class BindingInf extends React.Component {
  constructor() {

    super()

    this.state = {
      leftSelected: [],
      rightSelected: []
    }
  }

  componentWillReceiveProps(nextProps) {

    const {selectPls} = nextProps
    if (selectPls.length == 0) {
      message.error('请选择一个成人旅客')
      return
    }
    this.setState({
      ...this.state,
      rightSelected: selectPls[0].infs || []
    })
  }

  onRowSelected(r, s, t) {

    let fieldName;
    switch (t) {
      case 'L' :
        fieldName = 'leftSelected'
        break
      case 'R':
        fieldName = 'rightSelected'
        break
    }
    if (fieldName) {
      const selected = this.state[fieldName]
      const contains = selected.some(pl=>pl.uui === r.uui)
      let change;
      if (s) {
        if (!contains) {
          selected.push(r)
          change = {
            [fieldName]: selected
          }
        }
      } else {
        if (contains) {
          change = {
            [fieldName]: selected.filter(pl=>pl.uui !== r.uui)
          }
        }
      }
      if (change) {
        this.setState({
          ...this.state,
          ...change
        })
      }
    }

  }

  onRowSelectAll(s, t) {
    const {pls, selectPls} = this.props

    const selectableInfs = F.getSelectableInfs(pls)
    const selectedInfs = selectPls[0].infs || []
    let fieldName;
    switch (t) {
      case 'L' :
        fieldName = 'leftSelected'
        break
      case 'R':
        fieldName = 'rightSelected'
        break
    }
    if (fieldName) {
      let change;
      if (s) {
        change = {
          [fieldName]: t === 'L' ? selectableInfs : selectedInfs
        }
      } else {
        change = {
          [fieldName]: []
        }
      }
      if (change) {
        this.setState({
          ...this.state,
          ...change
        })
      }
    }
  }

  opCallBack(r, l, isBind) {

    if (!r) {
      message.error('操作失败！')
      return
    }

    if (isBind) {

    }
  }

  render() {

    const {pls, selectPls, currBlock, currActive, pageName, onBind, unBind} = this.props
    if (selectPls.length == 0) {
      message.error('请选择旅客')
      return null
    }

    const isCurrPage = pageName === C.PAGE_BINDING_INF && currBlock === C.MAIN_BLOCK
    const pl = selectPls[0]
    const formItemLayout = {
      labelCol: {span: 12},
      wrapperCol: {span: 12},
    }

    const columns = [
      {title: '序号', render: (text, record, index)=>index + 1, key: '4', width: 150},
      {title: '姓名', dataIndex: 'cn', key: '5', width: 150},
      {title: '目的站', dataIndex: 'ds', key: '6', width: 150},
    ];

    const selectableInfs = F.getSelectableInfs(pls)
    const selectedInfs = pl.infs || []

    const isLeftBtnEnable = selectableInfs.length > 0
    const isRightBtnEnable = selectedInfs.length > 0

    return <div className="binding-inf-body">
      <Row>
        <Col span={24} className="add-passenger-header">
          旅客-绑定婴儿
        </Col>
      </Row>
      <Row>
        <Col span={24}>

          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            <span className="ant-form-text">{pl.cn}</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span={10}>

          <span className="binding-inf-div-title">可选婴儿（F6）：</span>
          <Table className="dcs-pl-table"
                 title={(o)=> <span><span className="dcs-circle">i</span>共<span
                   className="dcs-pl-table-num">{selectableInfs.length}</span>条数据，已选择<span
                   className="dcs-pl-table-num">{this.state.leftSelected.length}</span>条</span>}
                 rowKey={pl=>F.genBindingInfPlKey(pl)}
                 rowSelection={
                 {
                   selectedRowKeys: this.state.leftSelected.map((pl)=>F.genBindingInfPlKey(pl)),
                   onChange: (selectedRowKeys, selectedRows) => {
                   },
                   onSelect: (record, selected, selectedRows) => {
                     this.onRowSelected(record, selected, 'L')
                   },
                   onSelectAll: (selected, selectedRows, changeRows) => {
                     this.onRowSelectAll(selected, 'L')
                   },
                 }
                 }
                 columns={columns}
                 dataSource={selectableInfs}
                 pagination={false}
                 rowClassName={(r)=> {
                   return F.getActiveCls(isCurrPage && currActive == F.genBindingInfPlKey(r))
                 }}
                 scroll={{y: 350}}/>
        </Col>
        <Col span={4}>

          <div className="binding-btn">
            {
              isLeftBtnEnable ?
                <Button className={F.getActiveCls(isCurrPage && currActive == C.BINGDINGINF_BINDING_KEY)} type="primary"
                        htmlType="submit"
                        onClick={
                          (()=> {
                            const ls = this.state.leftSelected
                            if (ls.length == 0) {
                              message.error('请选择需要绑定的婴儿')
                              return
                            }
                            if (typeof onBind === 'function') {
                              onBind(ls, this.opCallBack.bind(this))
                            }
                          }).bind(this)
                        }>&gt;&gt; 绑 定 (Enter)</Button>
                : <Button disabled className={F.getActiveCls(isCurrPage && currActive == C.BINGDINGINF_BINDING_KEY)}
                          type="primary"
                          htmlType="submit">&gt;&gt; 绑 定 (Enter)</Button>
            }

          </div>
          <div className="unbinding-btn">
            {
              isRightBtnEnable ?
                <Button className={F.getActiveCls(isCurrPage && currActive == C.BINGDINGINF_UNBINDING_KEY)}
                        type="primary"
                        htmlType="submit"
                        onClick={
                          (()=> {
                            const rs = this.state.rightSelected
                            if (rs.length == 0) {
                              message.error('请选择需要解绑的婴儿')
                              return
                            }
                            if (typeof unBind === 'function') {
                              unBind(rs, this.opCallBack.bind(this))
                            }
                          }).bind(this)
                        }> 解 除 (Enter) &lt;&lt;</Button>
                : <Button disabled className={F.getActiveCls(isCurrPage && currActive == C.BINGDINGINF_UNBINDING_KEY)}
                          type="primary"
                          htmlType="submit"> 解 除 (Enter) &lt;&lt;</Button>
            }
          </div>
        </Col>
        <Col span={10}>
          <span className="binding-inf-div-title">已选婴儿（F7）：</span>
          <Table className="dcs-pl-table"
                 title={(o)=> <span><span className="dcs-circle">i</span>共<span
                   className="dcs-pl-table-num">{selectedInfs.length}</span>条数据，已选择<span
                   className="dcs-pl-table-num">{this.state.rightSelected.length}</span>条</span>}
                 rowKey={pl=>F.genBindingInfPlKey(pl)}
                 rowSelection={
                 {
                   selectedRowKeys: this.state.rightSelected.map((pl)=>F.genBindingInfPlKey(pl)),
                   onChange: (selectedRowKeys, selectedRows) => {
                   },
                   onSelect: (record, selected, selectedRows) => {
                     this.onRowSelected(record, selected, 'R')
                   },
                   onSelectAll: (selected, selectedRows, changeRows) => {
                     this.onRowSelectAll(selected, 'R')
                   },
                 }
                 }
                 columns={columns}
                 dataSource={selectedInfs}
                 pagination={false}
                 rowClassName={(r)=> {
                   return F.getActiveCls(isCurrPage && currActive == F.genBindingInfPlKey(r))
                 }}
                 scroll={{y: 350}}/>
        </Col>
      </Row>
      {
        /**
         *
         * <Row>
         <Col span={24} className="binding-inf-submit-div">
         <FormItem wrapperCol={{span: 12, offset: 6}}>
         <Button className={F.getActiveCls(isCurrPage && currActive == C.SUBMIT_BTN_KEY)} type="primary"
         htmlType="submit">提交</Button>
         </FormItem>
         </Col>
         </Row>
         */
      }
    </div>
  }
}
