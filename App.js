import React from 'react'
import { StackNavigator } from 'react-navigation'
import Home from './screens/home'
import Scan from  './screens/scan'

const Mainstack = StackNavigator({
	Home: {
		screen: Home,
		navigationOptions: ({ navigation }) => ({
			title: 'AUTHENTIFICATOR',
			headerStyle: {
				backgroundColor: '#4286f4',
			}
		})
	}
})

export default StackNavigator(
  {
    Main: {
      screen: Mainstack,
    },
    Scan: {
      screen: Scan,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);