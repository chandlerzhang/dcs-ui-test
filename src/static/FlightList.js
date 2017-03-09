import React from 'react' 
import styles from './main.css'
import {Row , Col , Checkbox , Icon} from 'antd'

export default class FlightList extends React.Component {

	render () {
		// const columns = [
		// 	 { title: '状态', dataIndex: 'status', key: 'status' , width:80 },
		// 	 { title: '序号', dataIndex: 'no', key: 'no' , width:80},
		// 	 { title: '姓名', dataIndex: 'name', key: 'name' , width:150},
		// 	 { title: '性质', dataIndex: 'nature', key: 'nature' , width:80},
		// 	 { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' , width:180},
		// 	 { title: '座位', dataIndex: 'seatNo', key: 'seatNo' , width:80},
		// 	 { title: '目的地', dataIndex: 'destination', key: 'destination' , width:100},
		// 	 { title: '免额行李', dataIndex: 'freeBaggage', key: 'freeBaggage', width:150 },
		// 	 { title: '行李/重量', dataIndex: 'weight', key: 'weight', width:80},
		// 	 { title: '服务', dataIndex: 'service', key: 'service' , width:100}
		// ]

		const data = [
			{key:1 , status:'退，AC', no:'123' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:2 , status:'退，AC', no:'124' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:3 , status:'退，AC', no:'125' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:4 , status:'退，AC', no:'126' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:5 , status:'退，AC', no:'127' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:6 , status:'退，AC', no:'128' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:7 , status:'退，AC', no:'129' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:8 , status:'退，AC', no:'130' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:9 , status:'退，AC', no:'131' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'},
			{key:10 , status:'退，AC', no:'132' ,name:'ZHANG SAN', nature:'成人' , orderNo:'Ed30d3jd95653' , seatNo:'22B' , destination:'MWN',freeBaggage:'25 KA=0',weight:'15kg' , service:'VIP'}
		]
		// <Table
		// 	    columns={columns}
		// 	    expandedRowRender={record => <p>{record.destination}</p>}
		// 	    dataSource={data}
		// 	    pagination={{ pageSize: 50 }} scroll={{ y: 400 }} 
		// 	    bordered
  //   			size="middle"
  // 			/>
  		const rows = [] ;
  		for(let i = 0 ; i < data.length ; i++) {
  			let flight = data[i];
  			rows.push(
  				<Row className={styles.flightRow}>
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
			<div className={styles.flightList}>
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