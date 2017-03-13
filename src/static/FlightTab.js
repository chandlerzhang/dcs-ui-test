import React from 'react' 
import {Icon , Menu} from 'antd' 
import styles from './main.css'
import TabBar from './TabBar'

/**
 * 航班切换(F2)组件
 */
class FlightTab extends React.Component {

	constructor () {
		super();
		this.state = {
			title:'航班切换(F2)',
			tabData:['9C111','9C888','9C222','9C333','9C444','9C555' ]
		}
	}

	render() {
		return (
			<TabBar {...this.state}/>
		)
	}
}

export default FlightTab ;