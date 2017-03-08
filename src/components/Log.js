import React from 'react'
import {Table, Pagination} from 'antd'
import * as F from '../utils/Func'
import * as C from '../utils/Const'

export default class Log extends React.Component {

  render() {

    const {currBlock, currActive, pageName, logs} = this.props
    const isCurrPage = pageName === C.PAGE_LOG_LIST && currBlock === C.MAIN_BLOCK

    const rowSelection = {
      selectedRowKeys: [currActive],
      onChange: (selectedRowKeys, selectedRows) => {
      },
      onSelect: (record, selected, selectedRows) => {
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
      },
    }

    const columns = [
      {title: '操作员', dataIndex: 'lmb', key: '2', width: 150},
      {title: '日志', dataIndex: 'acg', key: '3', width: 150},
      {title: '操作时间', dataIndex: 'ct', key: '4', width: 150},
    ];

    return <Table className="dcs-pl-table"
                  title={(o)=> <span><span className="dcs-circle">i</span>共<span
                    className="dcs-pl-table-num">{logs.length}</span>条日志数据</span>}
                  rowKey={(pl,i)=>{
                    pl.id = i

                    return F.genLogKey(pl)
                  }}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={logs}
                  onRowClick={()=>{}}
                  expandedRowKeys={[currActive || '']}
                  pagination={false}
                  rowClassName={(r)=> {
                    return F.getActiveCls(isCurrPage && currActive == F.genLogKey(r))
                  }}
                  scroll={{y: 350}}/>
  }
}
