import React from 'react'
import { Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native'
import styles from './styles'

console.disableYellowBox = true

export default class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			data: [[]]
		}
	}

	render() {
		const { navigate } = this.props.navigation
		
		let listComp = this.state.data.map(x => {
			return (
				<View>
					<Text>{x[0]}</Text>
					<Text>{x[1]}</Text>
					<Text>{x[2]}</Text>
					<Text style={styles.rowL} />
				</View>
			)})

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={[styles.button, styles.green]}
					onPress={() =>
						navigate('Scan', {
							add: this._add
						})
					}
				>
					<Text style={{ fontSize: 20 }}>Add</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.red]} onPress={()=>{this._clear()}}>
					<Text style={{ fontSize: 20 }}>Clear</Text>
				</TouchableOpacity>
				<ScrollView>{listComp}</ScrollView>
			</View>
		)
	}

	_add = data => {
		const regex = /^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)$/
		let array = data.match(regex)
		if(!array){
			alert("Wrong qr Code")
			return
		}
		let label  = array[1]
		let secret = array[2]
		let issuer = array[3]
		
		this.setState({ data:[...this.state.data,[label,secret,issuer]]})
	}

	_clear(){
		this.setState({ data:[]})
	}
}
