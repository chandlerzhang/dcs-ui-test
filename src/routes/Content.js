import React from 'react'
import {connect} from 'dva'
import {Table, message} from 'antd'
import PSelect from '../components/PSelect'
import FStatus from '../components/FStatus'
import Login from '../components/Login'
import PDetail from '../components/PDetail'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventHandler from '../components/EventHandler'
import * as C from '../utils/Const'
import * as F from '../utils/Func'

class Content extends React.Component {

  constructor() {
    super()
    this.comps = {}
  }

  static genPlKey(pl) {
    return 'pl-list-' + pl.uui
  }

  regComps(list, block) {

    block = block || C.MAIN_BLOCK

    const isMainBlock = block == C.MAIN_BLOCK
    let comps;
    if (isMainBlock) {
      comps = [...list, C.CMD_INPUT]
    } else {
      comps = [...list]
    }
    this.comps[block] = comps
  }

  getComps(block) {

    const {currBlock} = this.props.content
    block = block || currBlock
    return this.comps[block]
  }

  componentDidUpdate() {
    F.focusActive()
  }

  render() {
    const {content, dispatch} = this.props
    const {pls, fls, selectPls, loading, token, currBlock, currActive} = content
    const isLogin = token && token.user

    const columns = [
      {
        title: '状态',
        key: 'status',
        width: 100,
        render: (r) => {
          const isDel = r.scf && $.trim(r.scf.toLocaleUpperCase()) === 'DEL'
          const isAc = r.wci
          return <span>
            {isDel ? <span className="dcs-squar">退</span> : null}
            <span className="dcs-squar">{isAc ? 'AC' : 'NA'}</span>
          </span>
        },
      },
      {title: '姓名', dataIndex: 'cn', key: '1', width: 150},
      {title: '性质', dataIndex: 'sex', key: '2', width: 150},
      {title: '订单号', dataIndex: 'orn', key: '3', width: 150},
      {title: '座位', dataIndex: 'sea', key: '4', width: 150},
      {title: '目的地', dataIndex: 'ds', key: '5', width: 150},
      {title: '免额行李', dataIndex: 'fbw', key: '6', width: 150},
      {title: '行李重量', dataIndex: 'tbw', key: '7', width: 150},
      {title: '服务', dataIndex: 'osi', key: '8'},
    ];

    const rowSelection = {
      selectedRowKeys: selectPls.map((pl)=>Content.genPlKey(pl)),
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
        if (selected) {
          dispatch({type: 'content/select', record: record})
        } else {
          dispatch({type: 'content/unselect', record: record})
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if (selected) {
          dispatch({type: 'content/selectAll'})
        } else {
          dispatch({type: 'content/unselectAll'})
        }
      },
    }

    const passengerSelectProps = {
      label: '已选旅客（F4）',
      type: C.PSELECT_TYPE_PASSENGER,
      list: selectPls,
      regComps: this.regComps.bind(this),
      onClose: (pl)=> {
        dispatch({type: 'content/unselect', record: pl})
      }, currBlock, currActive
    }
    const passengerOprProps = {
      label: '旅客操作（F5）',
      type: C.PSELECT_TYPE_BUTTON,
      regComps: this.regComps.bind(this),
      list: [{
        text: '值机',
        onClick: ()=> {
        }
      }, {
        text: '候补',
        onClick: ()=> {
        }
      }], currBlock, currActive
    }

    const fSwitchProps = {
      label: '切换航段（F2）',
      type: C.PSELECT_TYPE_FLIGHT,
      list: fls,
      currFl: token ? token.fl : null,
      regComps: this.regComps.bind(this),
      onClose(pl){
        if (fls.length === 1) {
          message.error('当前仅有一个航班，不能关闭！')
          return
        }
        dispatch({type: 'content/removeFlight', record: pl})
      },
      onAdd(){

      }, currBlock, currActive
    }

    const eventProps = {
      getComps: this.getComps.bind(this),
      dispatch, currBlock, currActive,
    }

    const headerProps = {
      regComps: this.regComps.bind(this),
      currBlock, currActive,
    }

    if (isLogin) {

      this.regComps(pls.map(pl=>Content.genPlKey(pl)))

      return <EventHandler {...eventProps}>
        <div className="dcs-main">
          <div className="dcs-header">

            <Header {...headerProps}/>
          </div>
          <div className="dcs-center">
            {fls && fls.length > 0 ? <PSelect {...fSwitchProps}/> : null}
            <FStatus fl={token.fl}/>
            {selectPls && selectPls.length > 0 ? <PSelect {...passengerSelectProps} /> : null}
            <PSelect {...passengerOprProps} />
            <Table className="dcs-pl-table"
                   title={(o)=> <span><span className="dcs-circle">i</span>共<span
                     className="dcs-pl-table-num">{pls.length}</span>条旅客数据，已选择<span
                     className="dcs-pl-table-num">{selectPls.length}</span>条</span>}
                   rowKey={pl=>Content.genPlKey(pl)}
                   rowSelection={rowSelection}
                   columns={columns}
                   pagination={false}
                   dataSource={pls}
                   onRowClick={(record)=> {

                     const isSelected = selectPls.some(pl=>pl.uui == record.uui)
                     if (isSelected) {
                       dispatch({type: 'content/select', record: record})
                     } else {
                       dispatch({type: 'content/unselect', record: record})
                     }
                   }}
                   expandedRowKeys={[currActive || '']}
                   expandedRowRender={r=> {
                     const pDetailProps = {
                       pl: r
                     }
                     return <PDetail {...pDetailProps} />
                   }}
                   rowClassName={(r)=> {
                     return F.getActiveCls(currActive == Content.genPlKey(r))
                   }}
                   scroll={{y: 400}}/>
          </div>
          <div className="dcs-footer">
            <Footer/>
          </div>

        </div>
      </EventHandler>
    } else {
      const loginProps = {
        onLogin(){
          console.log('you clicked login button~~~')
        }
      }

      return <Login {...loginProps}/>
    }
  }
}

Content.PropTypes = {
  token: React.PropTypes.object,
  loading: React.PropTypes.bool,
  pls: React.PropTypes.array,
  fls: React.PropTypes.array,
  selectPls: React.PropTypes.array,
  currBlock: React.PropTypes.string,
  currActive: React.PropTypes.string,
}

export default connect(({content})=> {
  return {
    content
  }
})(Content)
