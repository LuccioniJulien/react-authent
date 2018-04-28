import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import styles from './styles'
import { connect } from 'react-redux'

class Scan extends Component {
	constructor() {
		super()
		this.state = {
			hasCameraPermission: null,
			alreadyScanned: false
		}
	}

	async componentWillMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({ hasCameraPermission: status === 'granted' })
	}

	render() {
		const { hasCameraPermission } = this.state
		const { goBack              } = this.props.navigation
		if (hasCameraPermission === null) {
			return <Text>Requesting for camera permission</Text>
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>
		} else {
			return (
				<View style={{ flex: 1 }} >
					<BarCodeScanner onBarCodeRead={this._handleBarCodeRead} style={styles.camera}/>
				</View>
			)
		}
	}

	_handleBarCodeRead = ({ type, data }) => {
		if (!this.state.alreadyScanned) {
			this.setState({ alreadyScanned: true })
			const regex = /^otpauth:\/\/totp\/(.+)\?secret=(.+)&issuer=(.*)$/
			let array = data.match(regex)

			if (!array) {
				alert('Wrong qr Code')
				return
			}

			let label  = array[1]
			let secret = array[2]
			let issuer = array[3]

			for (const attribut of this.props.data) {
				if (attribut.secret === secret) {
					this.setState({ alreadyScanned: false })
					const { goBack } = this.props.navigation
					alert('QRCode Already saved')
					goBack()
					return
				}
			}
			this._setItem({ label, secret, issuer })
		}
	}

	_setItem(QRCode) {
		try {
			const { goBack } = this.props.navigation
			AsyncStorage.setItem('@MySuperStore:list', JSON.stringify({ data: [...this.props.data, QRCode] })).then(() => {
				this.props.dispatch({ type: 'QR_ADD', payload: { QRCode } })
				goBack()
			})
		} catch (error) {
			alert("Save didn't work")
		}
	}
}

mapStateToProps = state => {
	return {
		data: state.data
	}
}

export default connect(mapStateToProps)(Scan)
