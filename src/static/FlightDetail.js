import React from 'react' 
import {Row , Col} from 'antd'
import styles from './main.css'
/**
 *	显示航班详情的组件
 */
export default class FlightDetail extends React.Component {

	render () {
		return (
  			<Row className={styles.flightDetailRow}>
  				<Col span={6}>
					<Row>
						<Col span={10} className={styles.rowLabel}>姓名 :&nbsp;</Col>
						<Col span={14}>张三</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>英文姓名 :&nbsp;</Col>
						<Col span={14}>ZHUANG SHUANG SHUANG</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>性别 :&nbsp;</Col>
						<Col span={14}>男</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>身份证号码 :&nbsp;</Col>
						<Col span={14}>301211199601251458</Col>
					</Row>
  				</Col>	
  				<Col span={6}>
					<Row>
						<Col span={10} className={styles.rowLabel}>航班 :&nbsp;</Col>
						<Col span={14}>SHA - MMM - WWW - MMM</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>共享航段 :&nbsp;</Col>
						<Col span={14}>9C1234 / 9C2345 / 9C3456</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>候补 :&nbsp;</Col>
						<Col span={14}>1234657</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>CRS :&nbsp;</Col>
						<Col span={14}>1234657</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>团队标识 :&nbsp;</Col>
						<Col span={14}>1234657</Col>
					</Row>
  				</Col>
  				<Col span={6}>
					<Row>
						<Col span={10} className={styles.rowLabel}>会员号码 :&nbsp;</Col>
						<Col span={14}>123465789012345678</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>电话 :&nbsp;</Col>
						<Col span={14}>1234657890123</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>电了客标 :&nbsp;</Col>
						<Col span={14}>1234657890123</Col>
					</Row>
					<Row>
						<Col span={10} className={styles.rowLabel}>机票价格 :&nbsp;</Col>
						<Col span={14}>CNY810</Col>
					</Row>
  				</Col>
  				<Col span={6}>
					<Row>
						<Col span={8}>目的地</Col>
						<Col span={8}>行李号</Col>
						<Col span={8}>重量(kg)</Col>
					</Row>
					<Row>
						<Col span={8}>PVG</Col>
						<Col span={8}>111111</Col>
						<Col span={8}>13</Col>
					</Row>
					<Row>
						<Col span={8}>PVG</Col>
						<Col span={8}>222222</Col>
						<Col span={8}>15</Col>
					</Row>
					<Row>
						<Col span={8}>wwwwww</Col>
						<Col span={8}>333333</Col>
						<Col span={8}>22.22</Col>
					</Row>
  				</Col>
  			</Row>
		)
	}
}