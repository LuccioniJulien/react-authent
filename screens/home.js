import { Alert, Text, View, TouchableOpacity, Modal, ScrollView, AsyncStorage } from 'react-native'
import React from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import TOTP from '../lib/totp'

console.disableYellowBox = true

class Home extends React.Component {

	constructor() {
		super()
		this.state = {
			timer: null
		}
	}

	componentDidMount(){
		// console.log(`DO YOU KNOW DA WAE ? ${this.props.data.length == 0}`)
		if(this.props.data.length  == 0){
			this.intAnimId = setInterval(() => {
				this.refs.view.bounce(800)
			}, 2000)
		}
	}

	componentDidUpdate() {
		clearInterval(this.intAnimId)
		if (!this.state.timer) {
			this.intId = setInterval(() => {
				this.setState({ timer: this.state.timer + 5000 })
			}, 5000)
		}
		if(this.props.data.length  == 0){
			this.intAnimId = setInterval(() => {
				this.refs.view.bounce(800)
			}, 2000)
		}
	}

	componentWillUnmount() {
		clearInterval(this.intAnimId)
		clearInterval(this.intId)
	}

	render() {
		const { navigate } = this.props.navigation
		let listComp = this._item(this.props.data)
			return (
				<View style={styles.container}>
					<ScrollView>{listComp}</ScrollView>
					<Animatable.View style={{alignItems: 'center'}} ref="view">
					<Text style={{ fontSize: 20 }}>{this.props.data.length  == 0 ? "Press Add and scan the QRCode" : ""}</Text>
						<TouchableOpacity
							style={[styles.button, styles.green]}
							onPress={() =>
								navigate('Scan')
							}
						>
							<Text style={{ fontSize: 20 }}>Add</Text>
						</TouchableOpacity>
					</Animatable.View>
					<TouchableOpacity
						style={[styles.button, styles.red]}
						onPress={() => {
							this._clear()
						}}
					>
						<Text style={{ fontSize: 20 }}>Clear</Text>
					</TouchableOpacity>
				</View>
			)
	}

	_clear = () => {
		Alert.alert(
			'Remove',
			'Do you want to remove all item ?',
			[
				{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{
					text: 'Yes',
					onPress: () => {
						try {
							AsyncStorage.removeItem('@MySuperStore:list').then(() => {
								this.props.dispatch({ type: 'QR_CLEAR' })
							})
						} catch (error) {
							alert('unable to remove')
						}
					}
				}
			],
			{ cancelable: false }
		)
	}

	_clearOne = value => {
		Alert.alert(
			'Remove',
			'Do you want to remove this item ?',
			[
				{ text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{
					text: 'Yes',
					onPress: () => {
						try {
							let data = [...this.props.data]
							data.splice(value, 1)
							AsyncStorage.setItem('@MySuperStore:list', JSON.stringify({ data: data })).then(() => {
								this.props.dispatch({ type: 'QR_CLEAR_ONE', payload: { data } })
							})
						} catch (error) {
							alert('unable to remove')
						}
					}
				}
			],
			{ cancelable: false }
		)
	}

	_item = data => {
		//  console.log(`datd :${this.state.data}`)
		const lol = data.map((x, idx) => {
			const token = new TOTP(x.secret, 5).generate()

			return (
				<TouchableOpacity
					key={idx}
					style={styles.rowL}
					onLongPress={() => {
						this._clearOne(idx)
					}}
				>
					<Text>{x.label}</Text>
					<Text>{token}</Text>
					<Text>{x.issuer}</Text>
				</TouchableOpacity>
			)
		})
		return lol
	}
}

mapStateToProps = state => {
	return {
		data: state.data
	}
}

export default connect(mapStateToProps)(Home)
