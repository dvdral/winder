require("dotenv").config()

const express = require("express")
const bcrypt = require("bcrypt")

const { sendForgotPasswordEmail } = require("../Controllers/sendEmail")
const { generateToken, verifyToken } = require("../Utils/jwtUtil")
const { userModel } = require("../Models/userModel")

router = express.Router()

router
	.post("/:authtoken", async (req, res) => {
		const t = req.params.authtoken

		const { data, expired } = verifyToken(t)

		if (!expired) {
			// Updates new password
			// Removes refershtoken, so logs out from every device
			// If we want to log this current device on, we can respond with access token
			// And store a new refresh token

			const pass = await bcrypt.hash(req.body.password, 10)

			const usr = await userModel.findOneAndUpdate(
				{ email: data.email },
				{
					password: pass,
					$unset: { refreshToken: 1 },
				}
			)

			usr.save()
			res.json({ success: true })
		}
		res.json({ success: false, error: "Token expired." })
	})
	.post("/", async (req, res) => {
		const mail = req.body.email

		console.log("Received email: ", mail)

		if (await userModel.findOne({ email: mail })) {
			const token = generateToken({ email: mail }, `${10 * 60}s`)
			console.log("Token generated as: ", token)

			await sendForgotPasswordEmail(mail, token)
		}

		res.json({ success: true })
	})

module.exports = router
