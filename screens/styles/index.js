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
		height: 8,
		alignSelf: 'stretch',
		borderColor: '#DF0101',
		backgroundColor: '#DF0101'
 }
})