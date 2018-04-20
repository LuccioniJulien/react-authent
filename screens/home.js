import React from 'react'
import { Text, View, TouchableOpacity, Modal, ScrollView, AsyncStorage } from 'react-native'
import styles from './styles'

console.disableYellowBox = true

export default class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			data: []
		}
	}

	componentWillMount(){
		this._getItem()
	}

	render() {
		const { navigate } = this.props.navigation
		
		let listComp = this._item()
		// = this._item()

		return (
			<View style={styles.container}>
				<ScrollView>{listComp}</ScrollView>
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
				
			</View>
		)
	}
	
	async _getItem(){
		const value = await AsyncStorage.getItem('@MySuperStore:list')
		const oui = JSON.parse(value)

		console.log(oui)

		if(oui){
			this.setState(oui)
			return
		}
		this.setState({data:[]})
	}

	async _setItem(value){
		await AsyncStorage.setItem('@MySuperStore:list',JSON.stringify(value) )
		this._getItem()
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
		
		for (const attribut of this.state.data) {
				if(attribut.secret === secret){
					alert("Already save da code ya know")
					return
				}
		}
		this._setItem({ data:[...this.state.data,{label,secret,issuer}]})
	}

	_clear = async () => {
		await AsyncStorage.removeItem('@MySuperStore:list');
		this._getItem()
	}

	_clearOne = (value) => {
		let data = this.state.data
		for (let index = 0; index < data.length; index++) {
			if (data[index].secret===value)
			{
				data.splice(index,1)
				this._setItem({data:data})
				return
			}
		}
	}

	_item = () => {
		console.log(`datd :${this.state.data}`)
		const lol = this.state.data.map(x => {
			return (
				<TouchableOpacity style={styles.rowL} onPress={()=>{this._clearOne(x.secret)}}>
					<Text>{x.label}</Text>
					<Text>{x.secret}</Text>
					<Text>{x.issuer}</Text>
				</TouchableOpacity>
			)})
			return lol
	}

}
