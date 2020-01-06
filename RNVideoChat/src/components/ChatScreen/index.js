import React, { Component } from 'react';
import ConnectyCube from 'connectycube-reactnative';
import {
    AppState,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator,
    FlatList,
    StatusBar,
    Platform,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

//import {fetchMessages, pushMessage} from '../../actions/messages';
//import {sortDialogs} from '../../actions/dialogs';
//import {setSelected, removeSelected} from '../../actions/selected';
import Chat from '../../services/ChatService';
//import MessageModel from '../../models/Message';
import Message from '../../models/Message'
import UserStatic from '../../services/UserStatic'
import Message2 from './Message2';
import { Actions } from 'react-native-router-flux';

export class ChatScreen extends Component {
    constructor(props) {
        super(props);

        //this.setState({ inProgress: true });

        this.state = {
            inProgress: true,
            messageValue: '',
            timePassed: false,
            history: [],
            flagComponent: false
        };

        var mypromise;
    }


    listenerOnMessage() {

        console.log("Agregando el lsitener");
        ConnectyCube.chat.onMessageListener = (userId, message) => {
            console.log("Listener ...... ");
            if (this.state.flagComponent) {
                console.log("llamando al history ....");
                this.getAllHistory();
            } else {
                console.log("no está montado ...");
            }


        };
    }
    componentDidMount() {

        console.log("Montando el componente");
        this.setState({ flagComponent: true });
        this.listenerOnMessage();
        this.getAllHistory();
        //setSelected(dialog);

    }

    getAllHistory() {
        const { dialog } = this.props;
        Chat.getHistory(dialog.id)
            .then(res => {
                this.setDialogs(res);
                this.setTimePassed();
            })
            .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
            .then(() => this.setState({ inProgress: false }));
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }


    setDialogs(history2) {
        this.setState({ history: history2 })
    }

    componentWillUnmount() {
        console.log("Desmontando el componente");
        this.setState({ flagComponent: false });
    }

    onTypeMessage = messageValue => this.setState({ messageValue });

    sendMessage = () => {
        //const { user, dialog, pushMessage, sortDialogs } = this.props;
        const text = this.state.messageValue.trim();
        const date = Math.floor(Date.now() / 1000);
        const { dialog } = this.props;
        const { history } = this.state;


        if (!text) return;

        if (dialog.type === 3) {
            dialog.destination = ConnectyCube.chat.helpers.getRecipientId(
                dialog.occupants_ids,
                UserStatic.user.id,
            )
        }

        let msg = {
            type: dialog.xmpp_type,
            body: text,
            extension: {
                save_to_history: 1,
                dialog_id: dialog.id,
                sender_id: UserStatic.user.id,
                date_sent: date,
            },
            markable: 1,
        };


        console.log("Enviando el mensaje ..")
        console.log(msg);
        console.log(dialog.destination);
        msg.id = ConnectyCube.chat.send(dialog.destination, msg);

        this.componentDidMount();
        this.setState({ messageValue: '' })
    };


    back() {
        Actions.pop();
    }

    _renderMessageItem(message) {
        const { dialog } = this.props;
        var isOtherSender = message.sender_id !== UserStatic.user.id;
        return (
            <Message2 dialog={dialog} otherSender={isOtherSender} message={message} key={message.id} />
        );
    }

    render() {
        const { messageValue, inProgress, history } = this.state;
        const { dialog } = this.props;

        if (!this.state.timePassed) {

            return (

                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor="#0a254b" barStyle="light-content" />
                    <View style={styles.toolbar} title="MyApp" titleColor="white"
                    >
                        <Text style={styles.headerChatsText}>Cargando mensajes ...</Text>

                    </View>

                </View>
            );
        } else {

            return (
                <KeyboardAvoidingView
                    style={{ flex: 1, backgroundColor: 'white' }}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? Header.HEIGHT + 20 : 0}>

                    <StatusBar backgroundColor="#0a254b" barStyle="light-content" />
                    <View style={styles.toolbar} title="MyApp" titleColor="white"
                    >
                        <TouchableOpacity style={styles.button} onPress={this.back}>
                            <Icon name="arrow-back" size={34} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerChatsText}>{dialog.name}</Text>
                        <View style={styles.camera}>
                            <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
                                <Icon name="videocam" size={34} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <FlatList
                        inverted
                        data={this.state.history}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => this._renderMessageItem(item)}
                    />

                    <View style={styles.container}>
                        <AutoGrowingTextInput
                            style={styles.textInput}
                            placeholder="Escribe un mensaje ..."
                            value={messageValue}
                            onChangeText={this.onTypeMessage}
                            maxHeight={170}
                            minHeight={50}
                            enableScrollToCaret
                        />
                        <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
                            <Icon name="send" size={32} color="#084B8A" />
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
        padding: 12,
    },
    activityIndicator: {
        position: 'absolute',
        alignSelf: 'center',
        paddingTop: 25,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '300',
        borderRadius: 25,
        paddingHorizontal: 12,
        paddingTop: Platform.OS === 'ios' ? 14 : 10,
        paddingBottom: Platform.OS === 'ios' ? 14 : 10,
        backgroundColor: 'whitesmoke',
    },
    button: {
        width: 40,
        height: 50,
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {
        backgroundColor: '#084B8A',
        height: 56,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headerChatsText: {
        fontSize: 20,
        color: "white",
        alignContent: "center"
    },
    camera: {
        backgroundColor: '#084B8A',
        borderEndWidth: 21,
        borderColor: '#084B8A',
    }
});
