import React from 'react' 
import {Icon} from 'antd'
import styles from './main.css'

class TabBar extends React.Component {

	constructor(props) {
		super(props);
	}

	render () {
		const tabs = [] ;
		for(let i = 0 ; i < this.props.tabData.length ; i++) {
			let tabText = this.props.tabData[i] ;
			tabs.push(
				<a key={i}>{tabText}<Icon type="close-circle-o" className={styles.closeCircleO}/></a>
			)
		}
		return (
			<div className={styles.flightTab}>
				<span>{this.props.title}</span>
				<div style={{display:'inline-block'}}>	
					<img src="./img/u337.png" width="16px"/>
					<div className={styles.fligtMenu}>
						{tabs}
					</div>
					<img src="./img/u337.png" width="16px"/>
				</div>
			</div>
		)
	}
}

export default TabBar ;