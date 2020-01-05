import React from 'react'
import { RefreshControl, StatusBar, FlatList, StyleSheet, View, Text } from 'react-native'
import Dialog from './Dialog'
import UserStatic from '../../services/UserStatic'


export default class DialogScreen2 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timePassed: false,
			dialogs: []
		};
		this.dialogs = []
	}

	componentDidMount() {

		console.log("----     Esto es lo primero que se ejecuta");
		UserStatic.updateDialogs();
		console.log("Renderizando dialogs");


		setTimeout(() => {
			this.setDialogs();
			this.setTimePassed();
		}, 4000);
	}

	setTimePassed() {
		this.setState({ timePassed: true });
	}

	setDialogs() {
		this.setState({ dialogs: UserStatic.dialogs })
	}


	_renderDialog(dialog) {
		return <Dialog dialog={dialog} />
	}

	render() {

		//Cargando la lista de mensajes

		//console.log(UserStatic.dialogs);


		const dialogs = [];
		//const dialogs = UserStatic.dialogs;

		/*
		setTimeout(() => {
			//const dialogs = UserStatic.dialogs;
			console.log("Despues de unos 2 segundos")
		}, 5000);
*/

		console.log("------- Renderizando vistas -------  ");

		if (UserStatic.dialogs.length != null) {
			console.log("Obteniendo la longitud del elemento ....");
			console.log(UserStatic.dialogs.length);

		}

		if (!this.state.timePassed) {

			return (

				<View style={{ flex: 1, backgroundColor: 'white' }}>
					<StatusBar backgroundColor="#0a254b" barStyle="light-content" />
					<View style={styles.toolbar} title="MyApp" titleColor="white"
					>
						<Text style={styles.headerChatsText}>Mis chats</Text>

					</View>

					<View style={styles.noChats}>
						<Text style={styles.noChatsText}>Cargando mensajes ...</Text>
					</View>
				</View>
			);
		} else {

			return (
				<View style={{ flex: 1, backgroundColor: 'white' }}>
					<StatusBar backgroundColor="#0a254b" barStyle="light-content" />
					<View style={styles.toolbar} title="MyApp" titleColor="white"
					>
						<Text style={styles.headerChatsText}>Mis chats</Text>

					</View>
					<FlatList
						data={this.state.dialogs}
						keyExtractor={item => item.id}
						renderItem={({ item }) => this._renderDialog(item)}
					/>
				</View>
			)

		}


	}
}



const styles = StyleSheet.create({
	toolbar: {
		backgroundColor: '#084B8A',
		height: 56,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	noChats: {
		position: 'absolute',
		alignSelf: 'center',
		top: '42%'
	},
	noChatsText: {
		fontSize: 20
	},
	headerChatsText: {
		fontSize: 20,
		color: "white",
		alignContent: "center"
	}
})