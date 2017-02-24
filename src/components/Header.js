import React from 'react'
import * as C from '../utils/Const'
import * as F from '../utils/Func'
import {Row, Col, Menu, Input, Breadcrumb, Carousel} from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends React.Component {

  render() {

    const {currBlock, currActive, regComps} = this.props
    const isMenuBlock = currBlock == C.TOPMENU_BLOCK
    const isInputActive = currActive == C.CMD_INPUT
    const input = <Input placeholder="input here" style={{width: '100%'}}
                         className={F.getActiveCls(isInputActive, 'header-autocomplete')}/>

    const btns = [{
      text: '航段',
      onClick(){
      }
    }, {
      text: '座位',
      onClick(){
      }
    }, {
      text: '旅客',
      onClick(){
      }
    }, {
      text: '通知',
      onClick(){
      }
    }, {
      text: '设置',
      children: [{
        text: '修改密码',
        onClick(){
        }
      }, {
        text: '设备',
        onClick(){
        }
      }, {
        text: '网络',
        onClick(){
        }
      }]

    }, {
      text: '注销',
      onClick(){
      }
    }, {
      text: '登出',
      onClick(){
      }
    }]

    const comps = []
    const menus = btns.map((btn, i)=> {
      const k = `header-menu-${i}`
      if (btn.children) {
        const cMenu = btn.children.map((cBtn, j)=> {
          const kk = `${k}-${j}`
          comps.push(kk)
          return <Menu.Item className={F.getActiveCls(isMenuBlock && currActive == kk)}
                            key={kk}><a href="javascript:;" onClick={cBtn.onClick}>{cBtn.text}</a></Menu.Item>
        })
        return <MenuItemGroup key={k} title={btn.text}>{cMenu}</MenuItemGroup>
      } else {
        comps.push(k)
        return <Menu.Item className={F.getActiveCls(isMenuBlock && currActive == k)}
                          key={k}><a href="javascript:;" onClick={btn.onClick}>{btn.text}</a></Menu.Item>
      }
    })

    //注册组件
    regComps(comps, C.TOPMENU_BLOCK)

    return <div>
      <Row>
        <Col span={6}>
          <Menu mode="horizontal"
                openKeys={isMenuBlock ? ['sub1'] : []}
                selectedKeys={isMenuBlock ? [currActive] : []}>
            <SubMenu key="sub1"
                     title={<span className="header-menu-title"><img width="16" src="./img/logo_u105.png"/><span>(F1)春秋航空 - 离港系统</span></span>}>
              {menus}
            </SubMenu>
          </Menu>
        </Col>
        <Col span={12}>
          {input}
        </Col>
        <Col span={2} className="header-otherinfo">
        <span >
          <img src="./img/u95.png" width="16"/>
          6ms
        </span>

        </Col>
        <Col span={2} className="header-otherinfo">
        <span >
          <img src="./img/u89.png" width="16"/>
          帮助
        </span>

        </Col>
        <Col span={2} className="header-otherinfo">
        <span >
          <img src="./img/u91.png" width="16"/>
          000005
        </span>

        </Col>
      </Row>
      <Row>
        <Col span={6} className="header-breadcrumb">

          <Breadcrumb>
            <Breadcrumb.Item><a href="">旅客</a></Breadcrumb.Item>
            <Breadcrumb.Item>添加行李</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={2} className="header-scroll-title">
          <img src="./img/u418.png" width="16"/>
          通知
        </Col>
        <Col span={16} className="header-scroll-content">
          <Carousel autoplay dots={false}>
            <div>111111111111111111111111111111</div>
            <div>222222222222222222222222222222</div>
            <div>333333333333333333333333333333</div>
          </Carousel>
        </Col>
      </Row>
    </div>
  }
}
