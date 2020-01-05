import ConnectyCube from 'connectycube-reactnative'

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

					let dialogs = [],
						contactsIds = []

						/*
					for (let i = 0; i < items.length; i++) {
						if (items[i].type === 1) continue

						let dialog = new Dialog(items[i])

						if (dialog.type === 3) {
							dialog.destination = ConnectyCube.chat.helpers.getRecipientId(
								dialog.occupants_ids,
								CurrentUser.getProp('id'),
							)
						} else {
							dialog.destination = dialog.room_jid
						}

						contactsIds = [...new Set(contactsIds.concat(dialog.occupants_ids))]
						dialogs.push(dialog)
					}
					*/


					console.log("obteniendo los dialogos2"); 
					console.log(items) 
					console.log("Length")
					console.log(items.length) 
					console.log("Ya obtuve los dialogos2")





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
}

// create instance
const Chat = new ChatService()

// lock instance
Object.freeze(Chat)

export default Chat
