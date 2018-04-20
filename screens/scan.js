import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import styles from './styles'

export default class Scan extends Component {

  constructor(){
    super()
    this.state = {
      hasCameraPermission: null,
      alreadyScanned:false
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={styles.camera}
          />
        </View>
      );
    }
  }

  _handleBarCodeRead = ({ type, data }) => {
    if(!this.state.alreadyScanned){
      this.setState({alreadyScanned:true})
      const {state,goBack} = this.props.navigation
      state.params.add(data)
      goBack()
    }
  }
  
}
