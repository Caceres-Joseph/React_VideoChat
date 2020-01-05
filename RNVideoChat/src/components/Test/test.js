import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ToolbarAndroid,
    StatusBar
} from 'react-native'
import Chat from '../../services/ChatService';
import { Acttions } from 'react-native-router-flux';
import { userLogin } from '../../actions/user';
import UserService from '../../services/UserService';
import User from '../../services/UserService'
import UserStatic from '../../services/UserStatic'
import Dialog from '../../models/Dialog'
import CurrentUser from '../../services/CurrentUserDataService'
import Icon from 'react-native-vector-icons/MaterialIcons'

export class TestScreen extends React.Component {



    action2() {

        try {
            UserStatic.updateDialogs()
        }
        catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }

    }


    action() {


        console.log("---- inicio ---- ");

        //console.log(UserStatic.user);


        Chat.getConversations()
            .then(items => {

                let dialogs = [];


                for (let i = 0; i < items.length; i++) {
                    if (items[i].type === 1) continue

                    let dialog = new Dialog(items[i])

                    if (dialog.type === 3) {
                        /*dialog.destination = ConnectyCube.chat.helpers.getRecipientId(
                            dialog.occupants_ids,
                            CurrentUser.getProp('id'),
                        )*/
                    } else {
                        dialog.destination = dialog.room_jid
                    }

                    dialogs.push(dialog);

                    console.log("Dialog ...")
                    console.log(dialog.name)
                    console.log("/Dialog ...")
                }

                UserService.dialogs = dialogs;

                /*
                console.log("obteniendo los dialogos");
                Chat.connect(UserStatic.user, items);
                console.log(items)
                console.log(items[0].last_message_user_id)
                console.log("Ya obtuve los dialogos")
                */





            })
            .then(() => {
                UserStatic.chatConectado = true;
                //console.log("Hay que desconectar el chat")
                //chatConnected();
            })
            .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
            .then(
                e => {
                    Chat.disonnect();
                    console.log("Desconectando el chat");
                    UserStatic.chatConectado = false;
                }
            );



        console.log("----- fin -----");
    }

    onActionSelected() {
        console.log("Seleccionado ...");
    }

    render() {

        return (
            <View >

                <StatusBar backgroundColor="#0a254b" barStyle="light-content" />
                <View style={styles.toolbar} title="MyApp" titleColor="white"
                >
                    <Text style={styles.noChatsText}>No hay chats aún</Text>

                </View>


                <Text
                >
                    Vista 2
                </Text>


                <TouchableOpacity onPress={() => this.action2()}>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonLabel}>Button</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb0000'
    },
    wlecome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }, buttonContainer: {
        height: 50,
        borderRadius: 25,
        backgroundColor: '#00e3cf',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
    },
    buttonContainer: {
        height: 50,
        borderRadius: 25,
        backgroundColor: '#00e3cf',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
	noChatsText: {
        fontSize: 20,
        color:"white", 
        alignContent:"center"
	}
})
