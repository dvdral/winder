import axios from "axios"
import { LOAD_USER, LOGOUT, VERIFY_MAIL } from "./types"
import { displayAlert } from "./misc"
const url = process.env.URL

export const loadUser = () => dispatch => {
	axios
		.get(url + "/settings", { withCredentials: true })
		.then(res => {
			dispatch({
				type: LOAD_USER,
				payload: res.data.user,
			})
		})
		.catch(err => {
			dispatch(displayAlert(err.response.data.error, "danger"))
			dispatch({
				type: LOGOUT,
			})
		})
}

export const emailVerifyRequest = () => dispatch => {
	axios
		.post(url + "/settings/verifyemail", {}, { withCredentials: true })
		.then(res => {
			console.log(res)
			dispatch(
				displayAlert(
					"Please check you mail box to complete verification",
					"success"
				)
			)
		})
		.catch(err => {
			dispatch(
				displayAlert(
					"Failed to sent verification mail. Please try again later",
					"danger",
					true
				)
			)
		})
}

export const verifyEmail = token => dispatch => {
	axios
		.post(url + `/settings/verifyemail/${token.token}`, {})
		.then(res => {
			dispatch(
				displayAlert(
					"Your email is verified now. Your journey to meet your soulmate begins now...",
					"success",
					true
				)
			)
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger", true))
		})
}

export const updateProfile = data => dispatch => {
	let update = JSON.parse(JSON.stringify(data))
	delete update["file"]
	delete update["images"]
	delete update["changed"]
	delete update["preview"]
	if (update.hasOwnProperty("ageL") && update.hasOwnProperty("ageH")) {
		update["age"] = [update.ageL, update.ageH]
		delete update["ageL"]
		delete update["ageH"]
	} else {
		delete update["ageL"]
		delete update["ageH"]
	}
	if (data.bio.length == 0) delete update["bio"]
	axios
		.patch(url + `/settings`, update, { withCredentials: true })
		.then(res => {
			// console.log(res)
			// dispatch(loadUser())
			dispatch(displayAlert("Profile Updated...", "success", true))
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger", true))
		})
	if (data.hasOwnProperty("file")) {
		const formData = new FormData()
		formData.append("file", data.file)
		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			withCredentials: true,
		}
		console.log(data.file)
		axios
			.post(url + `/image`, formData, config)
			.then(res => {
				console.log(res)
				// dispatch(loadUser())
				dispatch(displayAlert("Profile Updated...", "success", true))
			})
			.catch(err => {
				console.log(err)
				dispatch(
					displayAlert(err.response.data.message, "danger", true)
				)
			})
	}
}

export const upImg = img => dispatch => {
	console.log(img)
	const formData = new FormData()
	formData.append("file", img, img.name)
	axios
		.post(url + "/image", formData, { withCredentials: true })
		.then(res => {
			dispatch(
				displayAlert(
					"Your email is verified now. Your journey to meet your soulmate begins now...",
					"success",
					true
				)
			)
		})
		.catch(err => {
			console.log(err)
			dispatch(displayAlert(err.response.data.message, "danger", true))
		})
}
