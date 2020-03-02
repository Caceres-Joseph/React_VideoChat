import React from 'react'
import {
    RefreshControl,
    TouchableOpacity,
    StatusBar,
    FlatList, StyleSheet, View, Text
} from 'react-native'
import UserStatic from '../../services/UserStatic'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WebView } from 'react-native-webview';
import { Actions } from 'react-native-router-flux';

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

        UserStatic.updateDialogs();
        //Renderizando dialogos

        /*
		setTimeout(() => {
			this.setDialogs();
			this.setTimePassed();
        }, 4000);
        */
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    setDialogs() {
        this.setState({ dialogs: UserStatic.dialogs })
    }


    _renderDialog(dialog) {
        return <Text>Hola</Text>
    }


    exitApp() {
        Actions.auth({ type: 'replace' });
        //Actions.pop();
    }


    render() {

        if (!this.state.timePassed) {

            return (

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor="#875A7B" barStyle="light-content" />
                    <View style={styles.toolbar} title="MyApp" titleColor="white"
                    >
                        <Text style={styles.headerChatsText}></Text>

                    </View>
                    <WebView 
                        scalesPageToFit={true}
                        source={{ uri: 'http://web.sysbroc.com' }}
                        style={{ marginTop: 0 }}
                        automaticallyAdjustContentInsets={false}
                    />
                </View>
            );
        } else {

            return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor="#0a254b" barStyle="light-content" />
                    <View style={styles.toolbar} title="MyApp" titleColor="white"
                    >

                        <TouchableOpacity style={styles.button} onPress={this.exitApp}>
                            <Icon name="exit-to-app" size={34} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerChatsText}>Mis conversaciones</Text>
                        <View style={styles.camera}>

                        </View>


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
        backgroundColor: '#875A7B',
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
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
    },
    button: {
        width: 40,
        height: 50,
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
})