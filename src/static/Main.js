import React , {PropTypes}  from 'react'
import {connect} from 'dva'
import Bottom from './Bottom.js'
import Header from './Header.js'
import FlightTab from './FlightTab'
import styles from './main.css'


class Main extends React.Component {

	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div className={styles.main}>
				<Header />
				<div className={styles.container}>
					<FlightTab />
				</div>
				<Bottom />
			</div>
		)
	}
}


export default  connect()(Main);