import ConnectyCube from 'connectycube-reactnative'
import UserService from './UserService'
import Dialog from '../models/Dialog'
import Chat from './ChatService';

class UserStatic {


    constructor() {
        this.user = new UserService();
        this.jhosef = "";
        this.chatConectado = true;
        this.dialogs = [];
    }


    static saludar() {
        console.log("Hola")
    }

    static updateDialogs() {
        Chat.getConversations()
            .then(items => {
                let dialogs = [];

                Chat.connect(this.user, items);

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

                    /*
                    console.log("Dialog ...")
                    console.log(dialog.name)
                    console.log("/Dialog ...")
                    */
                }

                this.dialogs = dialogs;

            })
            .then(() => {
                this.chatConectado = true;
            })
            .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
            .then(
                e => {
                    Chat.disonnect();
                    this.chatConectado = false;
                }
            );
    }

}

export default UserStatic;
