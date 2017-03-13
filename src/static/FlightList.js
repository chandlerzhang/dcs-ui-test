import React from 'react' 
import styles from './main.css'
import {Row , Col , Checkbox , Icon} from 'antd'
import FlightDetail from './FlightDetail'

export default class FlightList extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			selected:0 ,
		}
	}

	componentDidMount = () => {
		this.props.dispatch({type:'flight/query'})
	}
	
	/*
		显示/隐藏 航班详细面板
	*/
	toggleDetailPanel (i , flight , e) {
		let el = e.target.parentNode.parentNode.parentNode.childNodes[2*i+1] ;
		let visible = el.style.display ;
		el.style.display = visible === 'none' || !visible ? 'block' :'none';
	}

	handleSelectP = (e) => {
		let isSelected = e.target.checked ;
		this.setState ((preState , props) => ({
			selected: isSelected ? preState.selected + 1:preState.selected - 1 
		}))
	}

	render () {

		const { contentHeight , paddingRight , data } = this.props.flight ;
		
		const list = [];
  		for(let i = 0 ; i < data.length ; i++) {
  			let flight = data[i];
  			list.push(
  				<Row className={styles.flightRow} key={flight.no}>
  					<Col span={1}><Checkbox onChange={this.handleSelectP}/></Col>
				 	<Col span={2}>{flight.status}</Col>
				 	<Col span={2}>{flight.no}</Col>
				 	<Col span={3}>{flight.name}</Col>
				 	<Col span={2}>{flight.nature}</Col>
				 	<Col span={4}>{flight.orderNo}</Col>
				 	<Col span={1}>{flight.seatNo}</Col>
				 	<Col span={2}>{flight.destination}</Col>
				 	<Col span={2}>{flight.freeBaggage}</Col>
				 	<Col span={2}>{flight.weight}</Col>
				 	<Col span={2}>{flight.service}</Col>
				 	<Col span={1}>
				 		<Icon type="plus-square-o" className={styles.itemExpandIcon} onClick={this.toggleDetailPanel.bind(this , i , flight)}/>
				 	</Col>
  				</Row>
  			)
  			list.push(<FlightDetail detail={flight.detail}/>)
  		}
		return (
			<div className={styles.flightList}>
				<div className={styles.flightListTitle}>
					<Icon type="info-circle"/>
					<span style={{marginLeft:'10px'}}>共&nbsp;<span style={{color:'#108EE9'}}>{data.length}</span>&nbsp;条旅客，已选择&nbsp;<span style={{color:'#108EE9'}}>{this.state.selected}</span>&nbsp;名旅客</span>
				</div>
				 <Row className={styles.flightRow + ' ' + styles.listTitle} style={{paddingRight:paddingRight}}>
				 	<Col span={1}><Checkbox disabled /></Col>
				 	<Col span={2}>状态</Col>
				 	<Col span={2}>序号</Col>
				 	<Col span={3}>姓名</Col>
				 	<Col span={2}>性质</Col>
				 	<Col span={4}>订单号</Col>
				 	<Col span={1}>座位</Col>
				 	<Col span={2}>目的地</Col>
				 	<Col span={2}>免额行李</Col>
				 	<Col span={2}>行李/重量</Col>
				 	<Col span={2}>服务</Col>
				 	<Col span={1}></Col>
				 </Row>
				 <div className={styles.fligtsContent} style={{height:contentHeight}} ref="flightContent">
				 	 {list}
				 </div>
			</div>
		) 
	}
}