import flights from '../../public/data/flights'

export default {
	namespace:'flight' ,
	state:{
		contentHeight:'0px',
		paddingRight:'0px',
		data:[],
	},
	effects:{
		*query({payload:action} , {call , put}) {
			yield put({ 
				type:'queryFlight' ,
				payload:flights 
			})
		}
	},
	reducers:{
		queryFlight(state , {payload:data}) {
			let contentHeight = window.innerHeight - 420 ;
			let paddingRight =  contentHeight >= data.length * 40 ? '0px' : '17px' ;
			contentHeight += 'px' ;
			return {...state , data , contentHeight , paddingRight} ;
		},
		calcContentHeight(state ,{payload:isShow}) {
			let contentHeight = isShow ? window.innerHeight - 540 : window.innerHeight - 420 ;
			contentHeight += 'px' ;
			return {...state , contentHeight} ;
		}
	}
}