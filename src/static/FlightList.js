import React from 'react' 
import styles from './main.css'
import {Row , Col , Checkbox , Icon} from 'antd'

export default class FlightList extends React.Component {

	constructor () {
		super();
		this.state = {
			listStyle:{
				height:0
			}
		}
		
	}

	componentDidMount = () => {
		let listHeight = window.innerHeight - 340 ;
		this.setState ({
			listStyle: {
				height:listHeight+'px' 
			}
		}) 
	}

	onHandleStatusVisible () {
		console.log("显示隐藏航班状态")
	}

	render () {
		const data = [];
		for(let i = 0 ; i < 20 ; i++) {
			data.push({
				key:i , 
				status:'退，AC', 
				no:'123'+i ,
				name:'ZHANG SAN', 
				nature:'成人' , 
				orderNo:'Ed30d3jd95653' , 
				seatNo:'22B' , 
				destination:'MWN',
				freeBaggage:'25 KA=0',
				weight:'15kg' , 
				service:'VIP'
			})
		}
	
  		const rows = [] ;
  		for(let i = 0 ; i < data.length ; i++) {
  			let flight = data[i];
  			rows.push(
  				<Row className={styles.flightRow} key={flight.key}>
  					<Col span={1}><Checkbox /></Col>
				 	<Col span={2}>{flight.status}</Col>
				 	<Col span={1}>{flight.no}</Col>
				 	<Col span={3}>{flight.name}</Col>
				 	<Col span={2}>{flight.nature}</Col>
				 	<Col span={4}>{flight.orderNo}</Col>
				 	<Col span={2}>{flight.seatNo}</Col>
				 	<Col span={2}>{flight.destination}</Col>
				 	<Col span={2}>{flight.freeBaggage}</Col>
				 	<Col span={2}>{flight.weight}</Col>
				 	<Col span={2}>{flight.service}</Col>
				 	<Col span={1}></Col>
  				</Row>
  			)
  		}
		return (
			<div className={styles.flightList} style={this.state.listStyle}>
				 <Row className={styles.flightRow}>
				 	<Col span={1}><Checkbox /></Col>
				 	<Col span={2}>状态</Col>
				 	<Col span={1}>序号</Col>
				 	<Col span={3}>姓名</Col>
				 	<Col span={2}>性质</Col>
				 	<Col span={4}>订单号</Col>
				 	<Col span={2}>座位</Col>
				 	<Col span={2}>目的地</Col>
				 	<Col span={2}>免额行李</Col>
				 	<Col span={2}>行李/重量</Col>
				 	<Col span={2}>服务</Col>
				 	<Col span={1}></Col>
				 </Row>
				 {rows}
			 </div>
		) 
	}
}