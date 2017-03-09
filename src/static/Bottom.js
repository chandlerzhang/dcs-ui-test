import React from 'react' 
import {Button , Icon} from 'antd'
import styles from './main.css'

class Bottom extends React.Component {

	render () {
		return (
			<div className={styles.bottomWrapper}>
				<Icon type='enviroment'/>
				<b>设备</b>
				<Button className={styles.botmMenu}>登机牌打印机v3</Button>
				<Button className={styles.botmMenu}>行李牌打印机v1</Button>
				<Button className={styles.botmMenu}>小票打印机v1</Button>
				<Button className={styles.botmMenu}>身份证阅读器v1</Button>
				<Button className={styles.botmMenu}>登机牌扫描器v1</Button>
			</div>
		)
	}
}

export default Bottom ;