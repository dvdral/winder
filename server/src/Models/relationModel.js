const mongoose = require("mongoose")

//		Symbol Deriving Graph
//
//				  -
//		U1	  -		U2
//				  -
//	-ve	<-------------------> +ve
//				  -
//				  -
//				  -

let messagesSchema = mongoose.Schema(
	{
		content: String,
		/*
	 		false: sent by user[0]
		 	 true: sent by user[1]
	 	*/
		sender: Boolean,
	},
	{ timestamps: true }
)

messagesModel = mongoose.model("Messages", messagesSchema)

let relationSchema = mongoose.Schema({
	users: {
		type: [mongoose.Types.ObjectId],
		ref: "User",
		validate: [
			users => users.length === 2,
			"There can only be two users in a relationship",
		],
	},
	/*
		-1: user[1] sent like first, and waiting for approval of user[0]
		+1: user[0] sent like first, and waiting for approval of user[1]
		 0: both approved
	 */
	stat: Number,
	/*
		-n: user[1] sent n messages that are unread by user[0]
		+n: user[0] sent n messages that are unread by user[1]
		 0: both user have 0 unread messages
	 */
	unreadCount: Number,
	messages: [
		{
			type: mongoose.Types.ObjectId,
			ref: "Messages",
		},
	],
})
relationModel = mongoose.model("Relation", relationSchema)

module.exports = { messagesModel, relationModel }
