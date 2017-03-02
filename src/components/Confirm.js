import React from 'react'
import {Modal, Button} from 'antd'
import * as F from '../utils/Func'
import * as C from '../utils/Const'

export default class Confirm extends React.Component {


  render() {

    const {confirm, currBlock, currActive,onOk,onCancel} = this.props

    const isCurrPage = currBlock == C.CONFIRM_BLOCK

    return <Modal title="提示" visible={confirm.show}
                  onOk={onOk}
                  onCancel={onCancel}
                  afterClose={()=> {
                    F.focusActive()
                  }}
                  footer={null}
    >
      <div>
        {confirm.content}
      </div>
      <div className="confirm-btns">
        <Button onClick={onCancel} className={F.getActiveCls(isCurrPage && currActive == C.CANCEL_BTN_KEY, 'confirm-cancel-btn')} type=""
                htmlType="submit">取消</Button>
        <Button onClick={onOk} className={F.getActiveCls(isCurrPage && currActive == C.OK_BTN_KEY, 'confirm-ok-btn')} type="primary"
                htmlType="submit">确定</Button>
      </div>
    </Modal>
  }
}
