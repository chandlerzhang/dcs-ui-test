// import $ from 'robe-ajax'
import {Row, Col, Menu, Input, Breadcrumb, Carousel, Modal} from 'antd'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import * as C from './Const'

/**
 * 将对象或者数组内的所有字符串字段转换成大写
 * @param list  对象或者数组
 * @returns {*} 转换后的对象
 */
export function upperCase(list) {
  if (!list) return list
  const objUpper = pl=> {
    for (const k in pl) {

      const v = pl[k]
      if (pl.hasOwnProperty(k) && v) {
        if (typeof v === 'string') {
          pl[k] = v.toLocaleUpperCase()
        } else if (typeof v === 'object') {
          pl[k] = objUpper(v)
        }
      }
    }
    return pl
  }

  if (list instanceof Array) {
    for (const pl of list) {
      objUpper(pl)
    }

    return list
  } else {
    return objUpper(list)
  }
}

/**
 * 执行ajax请求
 * @param url
 * @param options
 * @returns {*}
 */
export function request(url, options) {
  return $.ajax({
    url: url,
    method: options.method || 'get',
    data: options.data || {},
    processData: options.method === 'get',
    dataType: 'JSON'
  }).done((data) => {
    return data
  })
}

/**
 * 获取active样式
 * @param isActive
 * @param originCls
 * @param ele
 * @returns {*}
 */
export function getActiveCls(isActive, originCls, ele) {

  originCls = originCls || ''
  if (isActive) return originCls + ' dcs-active'
  else return originCls
}

export function indexOf(arr, obj) {

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == obj) return i
  }
  return -1;
}

export function stopEvent(e) {
  e.preventDefault()
  e.stopImmediatePropagation()
}

/**
 * 将焦点置于active元素
 */
export function focusActive() {
  const active = $('.dcs-active')
  const selector = 'input,a,button'
  const activeIsInput = active.is(selector)
  if (activeIsInput) {
    active.focus()
  } else {
    $(selector, active).first().focus()
  }
}

export function genPlKey(pl) {
  return 'pl-list-' + pl.uui
}

/**
 * 获取Header的渲染xsl和活动对象
 * @param props
 * @returns {{renderData: XML 渲染对象, comps: Array 活动对象}}
 */
export function headerRenderData(props) {
  const {currBlock, currActive} = props
  const isMenuBlock = currBlock == C.TOPMENU_BLOCK
  const isInputActive = currActive == C.CMD_INPUT
  const input = <Input placeholder="input here" style={{width: '100%'}}
                       className={getActiveCls(isInputActive, 'header-autocomplete')}/>

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
        return <Menu.Item className={getActiveCls(isMenuBlock && currActive == kk)}
                          key={kk}><a href="javascript:;" onClick={cBtn.onClick}>{cBtn.text}</a></Menu.Item>
      })
      return <MenuItemGroup key={k} title={btn.text}>{cMenu}</MenuItemGroup>
    } else {
      comps.push(k)
      return <Menu.Item className={getActiveCls(isMenuBlock && currActive == k)}
                        key={k}><a href="javascript:;" onClick={btn.onClick}>{btn.text}</a></Menu.Item>
    }
  })

  //注册组件

  const renderData = <div>
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

  return {
    renderData,
    comps
  }
}

export function genSelectKey(type, i) {

  return `select-${type}-${i}`
}

export function getPageInfoField(type) {
  let pageInfo;

  switch (type) {

    case C.PSELECT_TYPE_FLIGHT:
      pageInfo = {
        currPageField: 'flightSwitchCurrPage',
        pageNumField: 'flightSwitchPageNum'
      }
      break
    case C.PSELECT_TYPE_BUTTON:
      pageInfo = {
        currPageField: 'passengerOperationCurrPage',
        pageNumField: 'passengerOperationPageNum'
      }
      break
    case C.PSELECT_TYPE_PASSENGER:
      pageInfo = {
        currPageField: 'passengerSelectCurrPage',
        pageNumField: 'passengerSelectPageNum'
      }
      break
    default:
      throw new Error(`unsupported type ${type}`)
  }

  return pageInfo
}

export function getOperationBtns(state, dispatch) {

  let btns = []

  const {pageName, selectPls} = state

  switch (pageName) {

    case C.PAGE_PASSENGER_LIST:
      btns = [{
        text: '值机',
        enable: selectPls.some(pl=>!pl.wci),
        errmsg: '所选的旅客中必须包含未值机的旅客',
        onClick(){
          dispatch({type: 'content/checkin'})
        }
      }, {
        text: '取消值机',
        enable: selectPls.some(pl=>pl.wci),
        errmsg: '所选的旅客中必须包含已值机的旅客',
        onClick(){
        }
      }, {
        text: '候补',
        enable: true,
        onClick(){
          dispatch({type: 'content/addPassenger'})
        }
      }, {
        text: '电子客票',
        enable: selectPls.length == 1,
        errmsg: '请选择一个旅客',
        onClick(){
          dispatch({type:'content/setEt'})
        }
      }, {
        text: '修改电话',
        enable: selectPls.length == 1,
        errmsg: '请选择一个旅客',
        onClick(){
          dispatch({type: 'content/modifyPhone'})
        }
      }, {
        text: '修改服务',
        enable: selectPls.length == 1,
        errmsg: '请选择一个旅客',
        onClick(){
        }
      }, {
        text: '截留',
        enable: selectPls.length > 0,
        errmsg: '请选择一个或多个旅客',
        onClick(){
          dispatch({type: 'content/stopPassenger'})
        }
      }, {
        text: '设置成人/儿童',
        enable: selectPls.length == 1 && selectPls[0].sex !== 'INF',
        errmsg: '请选择一个非婴儿旅客',
        onClick(){
        }
      }, {
        text: '绑定婴儿',
        enable: selectPls.length == 1 && selectPls[0].sex === 'ADULT',
        errmsg: '请选择一个成人旅客',
        onClick(){
        }
      }, {
        text: '重打登机牌',
        enable: selectPls.some(pl=>pl.wci),
        errmsg: '所选的旅客中必须包含已值机的旅客',
        onClick(){
        }
      }, {
        text: '重打行李牌',
        enable: selectPls.some(pl=>pl.wci),
        errmsg: '所选的旅客中必须包含已值机的旅客',
        onClick(){
        }
      }, {
        text: '手工保护',
        enable: selectPls.length > 0,
        errmsg: '请选择一个或多个旅客',
        onClick(){
        }
      }, {
        text: '编辑API',
        enable: selectPls.length == 1,
        errmsg: '请选择一个旅客',
        onClick(){
        }
      }]
      btns.sort((b1, b2)=>b2.enable - b1.enable)
      break;
  }

  return btns
}

export function confirm(tips, okFunc, cancelFunc) {

  const emptyFunc = ()=> {
  }
  Modal.confirm({
    title: '提示',
    content: tips || '',
    onOk: okFunc || emptyFunc,
    onCancel: cancelFunc || emptyFunc
  })
}
