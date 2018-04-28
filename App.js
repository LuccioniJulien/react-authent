import React from 'react'
import { AsyncStorage, Text, View, Dimensions,Image } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './screens/home'
import Scan from './screens/scan'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import styles from './screens/styles'
const initial_state = {
	data: []
}

function reducer(prev_state = initial_state, action) {
	switch (action.type) {
		case 'QR_FETCH':
			return Object.assign({}, prev_state, {
				data: action.payload.state,
				loading: action.payload.loading
			})
			break
		case 'QR_ADD':
			return Object.assign({}, prev_state, {
				data: [...prev_state.data, action.payload.QRCode]
			})
			break
		case 'QR_CLEAR':
			return Object.assign({}, prev_state, {
				data: []
			})
			break
		case 'QR_CLEAR_ONE':
			return Object.assign({}, prev_state, {
				data: action.payload.data
			})
			break
		default:
			return prev_state
			break
	}
}
const store = createStore(reducer)
const dispatch = store.dispatch

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isStoreLoading: true,
			store: store
		}
	}

	async componentWillMount() {
		const value = await AsyncStorage.getItem('@MySuperStore:list')
		// console.log('PREVIOUS_STATE: '+value)
		const state = JSON.parse(value)
		if (state) {
			this.setState({ store: createStore(reducer, state) })
		} else {
			this.setState({ store: store })
		}
		this.setState({ isStoreLoading: false })
	}

	render() {
		if (this.state.isStoreLoading) {
			const { width, height } = Dimensions.get('window')
			return (
				<View style={styles.containerBis}>
					<Image style={{ width, height }} source={require('./assets/agg.png')} />
				</View>
			)
		} else {
			return (
				<Provider store={this.state.store}>
					<Sn />
				</Provider>
			)
		}
	}
}

const Mainstack = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			title: 'AUTHENTIFICATOR',
			headerStyle: {
				backgroundColor: '#4286f4'
			}
		})
	}
})

const Sn = StackNavigator(
	{
		Main: {
			screen: Mainstack
		},
		Scan: {
			screen: Scan
		}
	},
	{
		mode: 'modal',
		headerMode: 'none'
	}
)
