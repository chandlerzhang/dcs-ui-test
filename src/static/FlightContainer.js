import React from 'react' 
import TabBar from './TabBar'
import styles from './main.css'
import {Button} from 'antd'
import FlightList from './FlightList'
import POperationMenu from './POperationMenu'

export default  class FlightContainer extends React.Component {

	constructor(props) {
		super(props);
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
			    <FlightList {...this.props}/>
			</div>
		)
	}
}
