import React from 'react' 
import {Icon , Menu} from 'antd' 
import styles from './main.css'
import FlightInfo from './FlightInfo'
import TabBar from './TabBar'

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
			<div>
				<TabBar {...this.state}/>
				<div>
					<FlightInfo />
				</div>
			</div>
			
		)
	}
}

export default FlightTab ;