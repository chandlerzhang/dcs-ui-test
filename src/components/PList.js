import React from 'react'
import {Table, Pagination} from 'antd'
import PDetail from '../components/PDetail'
import * as F from '../utils/Func'

/**
 * 旅客列表
 */
export default class PList extends React.Component {

  render() {

    const {pls, selectPls, currActive, onRowSelect, onRowSelectAll, onRowClick, plCurrPage, plPageNum} = this.props

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
      {title: '姓名', dataIndex: 'cn', key: '1', width: 100},
      {title: '性质', dataIndex: 'sex', key: '2', width: 50},
      {title: '订单号', dataIndex: 'orn', key: '3', width: 100},
      {title: '座位', dataIndex: 'sea', key: '4', width: 50},
      {title: '目的地', dataIndex: 'ds', key: '5', width: 100},
      {title: '免额行李', dataIndex: 'fbw', key: '6', width: 100},
      {title: '行李重量', dataIndex: 'tbw', key: '7', width: 100},
      {title: '服务', dataIndex: 'osi', key: '8'},
    ];

    const rowSelection = {
      selectedRowKeys: selectPls.map((pl)=>F.genPlKey(pl)),
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
        if (typeof onRowSelect === 'function') {
          onRowSelect(selected, record)
        }
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if (typeof onRowSelectAll === 'function') {
          onRowSelectAll(selected)
        }
      },
    }

    //const pagination = <Pagination defaultCurrent={plCurrPage} pageSize={plPageNum} total={pls.length}/>
    const pagination = {
      current: plCurrPage,
      pageSize: plPageNum
    }

    return <Table className="dcs-pl-table"
                  title={(o)=> <span><span className="dcs-circle">i</span>共<span
                    className="dcs-pl-table-num">{pls.length}</span>条旅客数据，已选择<span
                    className="dcs-pl-table-num">{selectPls.length}</span>条</span>}
                  rowKey={pl=>F.genPlKey(pl)}
                  rowSelection={rowSelection}
                  columns={columns}

                  dataSource={pls}
                  onRowClick={(record)=> {

                    const isSelected = selectPls.some(pl=>pl.uui == record.uui)
                    if (typeof onRowClick === 'function') {
                      onRowClick(isSelected, record)
                    }
                  }}
                  expandedRowKeys={[currActive || '']}
                  pagination={pagination}
                  expandedRowRender={r=> {
                    const pDetailProps = {
                      pl: r
                    }
                    return <PDetail {...pDetailProps} />
                  }}
                  rowClassName={(r)=> {
                    return F.getActiveCls(currActive == F.genPlKey(r))
                  }}
                  scroll={{y: 350}}/>
  }
}
