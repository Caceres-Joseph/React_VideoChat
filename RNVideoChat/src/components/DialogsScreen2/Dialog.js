import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ProfileIcon from '../Helpers/ProfileIcon';
import DialogTitles from './DialogTitles';

export default class Dialog extends Component {
    toChat(dialog) {
        if (Actions.currentScene !== 'chat') {
            
            
            
            console.log("Abriendo el chat....");
            console.log(dialog.name);
            Actions.chat({
                dialog: dialog,
                title: dialog.name
            })
        }
    }

    render() {
        const { dialog } = this.props

        return (
            <TouchableOpacity onPress={() => this.toChat(dialog)}>
                <View style={styles.container}>
                    <ProfileIcon
                        photo={dialog.photo}
                        name={dialog.name}
                        iconSize="large" />
					<View style={styles.border} >
						<DialogTitles
							name={dialog.name}
							message="..."/>
					</View>

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 10
    },
    border: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey'
    },
    infoContainer: {
        maxWidth: 75,
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingVertical: 10,
        marginLeft: 5
    }
})
