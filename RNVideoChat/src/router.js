import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Alert } from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux'
import { userLogout } from './actions/user'
import AuthScreen from './components/AuthScreen'
import VideoScreen from './components/VideoScreen'


import Icon from 'react-native-vector-icons/MaterialIcons'
import DialogsScreen from './components/DialogsScreen'
import { chatDisconnected } from './actions/connection'

import {TestScreen} from './components/Test/test'


const styles = StyleSheet.create({
	navBar: {
		backgroundColor: 'blue'
	},
	navTitle: {
		flex: 1,
		fontSize: 18,
		color: '#ffffff',
		textAlign: 'center'
	}
})

class AppRouter extends React.Component {
	_shouldLogout() {
		Alert.alert(
			'Log Out',
			'Do you really want to leave the chat?',
			[ 
				{ text: 'Cancel', onPress: () => {} },
				{ text: 'OK', onPress: () => this._toAuthScene() }
			]
		)
	}

	_toAuthScene() {
		
		console.log("saliendo ....")
	}

	_toCreateDialogScene() {
		if (Actions.currentScene !== "createDialog") Actions.createDialog()
	}


	render() {
		return (
			<Router navigationBarStyle={styles.navBar} titleStyle={styles.navTitle}>
				<Scene key="main">

					<Scene key="auth"
						component={AuthScreen}
						drawerLockMode="locked-closed'"
						type="replace"
						hideNavBar
					/>

					<Scene key="videochat"
						component={VideoScreen}
						title="Video Chat"
						tintColor="white"
						hideNavBar
					/>

					<Scene key="dialogs"
						component={DialogsScreen}
						title="ConnectyCube Chat"
						statusBarStyle="light-content"
						type="replace"
						onLeft={() => this._shouldLogout()}
						onRight={this._toCreateDialogScene}
						leftTitle={
							<Icon name="exit-to-app" size={26} color="white"/>
						}
						rightTitle={
							<Icon name="add-circle-outline" size={26} color="white"/>
						}
					/>



					<Scene key="test"
						component={TestScreen}
						title="Video Chat"
						tintColor="white"
						hideNavBar
					/>



				</Scene>
			</Router>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		chatDisconnected: () => dispatch(chatDisconnected()),
		userLogout: () => dispatch(userLogout())
	}
}

export default connect(null, mapDispatchToProps)(AppRouter)
