import ConnectyCube from 'connectycube-reactnative'
import Message from '../models/Message'

class ChatService {
	// Chat - Core
	connect(user) {
		return new Promise((resolve, reject) => {
			if (!user) reject()

			ConnectyCube.chat.connect(
				{
					userId: user.id,
					password: user.password,
				},
				(error, contacts) => {
					if (!error && contacts) {
						resolve(contacts)
					} else {
						reject(error)
					}
				},
			)
		})
	}

	disonnect() {
		ConnectyCube.chat.disconnect()
	}


	// Chat - Dialogs
	getConversations() {
		return new Promise((resolve, reject) => {
			ConnectyCube.chat.dialog.list({ sort_desc: 'updated_at' }, (error, result) => {
				if (!error && result) {
					const items = result.items

					



					resolve(items)
				} else if (error.code === 404) {
					console.log("###getConversation Fail :(")
					resolve([])
				} else {
					console.log("###getConversation Fail2 :(")

					reject(error)
				}
			})
		})
	}



	// Chat - Messages
	getHistory(dialogId) {
		return new Promise((resolve, reject) => {
 
			ConnectyCube.chat.message.list({
				chat_dialog_id: dialogId,
				sort_desc: 'date_sent', 
				limit: 20
			}, (error, result) => {
				if (!error) {
					let history = []
					const messages = result.items

					for (let i = 0; i < messages.length; i++) {
						history.push(new Message(messages[i]))
					}
					//console.log(messages.length);

					this.readAllMessages(dialogId)

					resolve(history)
				} else {
					reject(error)
				}
			})
		})
	}


	readMessage(id, dialogId) {
		ConnectyCube.chat.message.update(id, {
			chat_dialog_id: dialogId,
			read: 1
		}, error => {
			return new Promise((resolve, reject) => {
				// error ? reject(error) : resolve()
				resolve()
			})
		})
	}

	readAllMessages(dialogId) {
		ConnectyCube.chat.message.update(null, {
			chat_dialog_id: dialogId,
			read: 1
		}, error => {
			return new Promise((resolve, reject) => {
				// error ? reject(error) : resolve()
				resolve()
			})
		})
	}

}

// create instance
const Chat = new ChatService()

// lock instance
Object.freeze(Chat)

export default Chat
