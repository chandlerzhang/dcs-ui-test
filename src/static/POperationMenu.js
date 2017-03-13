import React from 'react' 
import {Button} from 'antd'
import styles from './main.css'
/**
 * 旅客操作(F5)组件
 */
export default class POperationMenu extends React.Component {

	constructor() {
		super();
	}

	render () {
		return (
			<div className={styles.flightTab}>
				<span>旅客操作(F5):</span>
				<div style={{display:'inline-block'}}>	
					<img src="./img/u337.png" width="16px"/>
					<div className={styles.fligtMenu}>
						<Button className={styles.oprationPBtn}>值机</Button>
						<Button className={styles.oprationPBtn}>候补</Button>
						<Button className={styles.oprationPBtn}>座位图</Button>
					</div>
					<img src="./img/u337.png" width="16px"/>
				</div>
			 </div>
		)
	}
}