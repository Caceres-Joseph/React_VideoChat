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
