import React from 'react' 
import TabBar from './TabBar'
import styles from './main.css'
import {Button} from 'antd'
import FlightList from './FlightList'

class FlightListContainer extends React.Component {

	constructor() {
		super();
		this.state = {
			title:'已选旅客(F4)',
			tabData:['ZHANG SAN','LI SI','WANG WU','ZAHO LIU']
		}
	}

	render () {
		return (
			<div>
				<TabBar {...this.state}/>
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
			    <FlightList />
			</div>
			
		)
	}
}

export default FlightListContainer ;