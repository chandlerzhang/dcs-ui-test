import React from 'react' 
import TabBar from './TabBar'
import styles from './main.css'
import {Button} from 'antd'
import FlightList from './FlightList'
import POperationMenu from './POperationMenu'
import flights from '../../public/data/flights.json'

export default  class FlightContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			title:'已选旅客(F4)',
			tabData:['ZHANG SAN','LI SI','WANG WU','ZHAO LIU']
		}
	}

	render () {
		return (
			<div>
				<TabBar {...this.state}/>
				<POperationMenu />
			    <FlightList flights={flights}/>
			</div>
		)
	}
}
