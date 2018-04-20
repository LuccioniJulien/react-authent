import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center'
	},

	button: {
		width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    justifyContent: 'center',
		margin: 3,
		borderRadius: 3,
		height: 40
	},

	green: {
		backgroundColor: '#33cc33'
	},

	red: {
		backgroundColor: '#ff0000'
	},

	camera:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height
	},

	rowL: { 
		borderWidth: 1,
		width:Dimensions.get('window').width -20,
		borderRadius: 3,
		margin: 3,
		alignSelf: 'stretch',
		borderColor: '#f4dc42',
		backgroundColor: '#f4dc42'
 }
})