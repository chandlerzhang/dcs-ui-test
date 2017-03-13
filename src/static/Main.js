import React , {PropTypes}  from 'react'
import {connect} from 'dva'
import Bottom from './Bottom.js'
import Header from './Header.js'
import FlightTab from './FlightTab'
import FlightStatus from './FlightStatus'
import FlightContainer from './FlightContainer'
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
					<FlightStatus dispatch={this.props.dispatch}/>
					<FlightContainer {...this.props}/>
				</div>
				<Bottom />
			</div>
		)
	}
}

function mapStateToProps ({flight}) {
	return {flight} ;
}

function mapDispatchToProps(dispatch) {
	return {
		'dispatch':(action) => dispatch(action),
	}
}

export default  connect(mapStateToProps , mapDispatchToProps)(Main);