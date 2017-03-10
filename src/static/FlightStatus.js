import React from 'react' 
import {Icon ,Row , Col } from 'antd' 
import styles from './main.css'

/**
 * 航班状态(F3)组件
 */
export default class FlightStatus extends React.Component {

	constructor() {
		super();
		this.state = {
			src:'./img/u337.png' ,
			collapsePanelStyle:{
				display:'none',
			}
		}
	}
	/**
		展开/隐藏航班详细状态面板
	*/
	toggleFlightStatusDetail = (e) => {
		let display = this.state.collapsePanelStyle.display ;
		display = display === 'none' ? 'block' : 'none' ;
		this.setState({
			collapsePanelStyle:{
				display:display
			}
		})
	}



	render() {
		return (
			<div className={styles.flightStatusBar}>
				<span>航段状态(F3): </span>
				<div className={styles.flightStatus}>	
					<div className={styles.flightStatusContent} >
						<span style={{color:'#108EE9'}}>9C8765&nbsp;</span>
						<span style={{color:'#666666'}}>/ 12DEC&nbsp;</span>
						<span>虹桥 - </span>
						<span style={{color:'#008000'}}>西安</span>
						<span> - </span>
						<span style={{color:'#108EE9'}}>乌鲁木齐&nbsp;&nbsp;</span>
						<span>计划: </span>
						<span style={{color:'#000000'}}>15:20 - 15:50 - 18:15&nbsp;&nbsp;</span>
						<span>航段:</span>
						<span style={{color:'#FF3400'}}>OP&nbsp;&nbsp;</span>
						<span>闸口:</span>
						<span style={{color:'#FF3400'}}>OP&nbsp;&nbsp;</span>
						<span>登机口:</span>
						<span style={{color:'#008000'}}>A7&nbsp;&nbsp;</span>
						<span>值机:</span>
						<span style={{color:'#000000'}}>176&nbsp;&nbsp;</span>
						<span>登机:</span>
						<span style={{color:'#000000'}}>176&nbsp;&nbsp;</span>
						<span>拉下:</span>
						<span style={{color:'#000000'}}>3</span>
					</div>
				</div>
				<img src={this.state.src}  className={styles.expandArrow} onClick={this.toggleFlightStatusDetail}/>
				<div style={this.state.collapsePanelStyle}>
					<Row className={styles.collapseRow}>
						<Col span={1}>机型</Col>
						<Col span={2}>A320_1</Col>
						<Col span={2}>初始关闭</Col>
						<Col span={2}>04-25 10:13</Col>
						<Col span={1}>成人：</Col>
						<Col span={1}>124</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>值机:</Col>
						<Col span={1} style={{color:'#000000'}}>176</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>登机:</Col>
						<Col span={1} style={{color:'#000000'}}>176</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>拉下:</Col>
						<Col span={1} style={{color:'#000000'}}>3</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>高危:</Col>
						<Col span={1} style={{color:'#000000'}}>0</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>机组:</Col>
						<Col span={1} style={{color:'#000000'}}>0</Col>
					</Row>
					<Row className={styles.collapseRow}>
						<Col span={1}>机型</Col>
						<Col span={2}>A320_1</Col>
						<Col span={2}>初始关闭</Col>
						<Col span={2}>04-25 10:13</Col>
						<Col span={1}>成人：</Col>
						<Col span={1}>124</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>值机:</Col>
						<Col span={1} style={{color:'#000000'}}>176</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>登机:</Col>
						<Col span={1} style={{color:'#000000'}}>176</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>拉下:</Col>
						<Col span={1} style={{color:'#000000'}}>3</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>高危:</Col>
						<Col span={1} style={{color:'#000000'}}>0</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>机组:</Col>
						<Col span={1} style={{color:'#000000'}}>0</Col>
					</Row>
					<Row className={styles.collapseRow}>
						<Col span={1}>机型</Col>
						<Col span={2}>A320_1</Col>
						<Col span={2}>初始关闭</Col>
						<Col span={2}>04-25 10:13</Col>
						<Col span={1}>成人：</Col>
						<Col span={1}>124</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>值机:</Col>
						<Col span={1} style={{color:'#000000'}}>176</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>登机:</Col>
						<Col span={1} style={{color:'#000000'}}>176</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>拉下:</Col>
						<Col span={1} style={{color:'#000000'}}>3</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>高危:</Col>
						<Col span={1} style={{color:'#000000'}}>0</Col>
						<Col span={1} style={{color:'#BCBCBC'}}>机组:</Col>
						<Col span={1} style={{color:'#000000'}}>0</Col>
					</Row>
				</div>
			</div>
		)
	}

}
