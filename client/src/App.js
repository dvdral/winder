import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"
import store from "./store"
import {
	Landing,
	Login,
	Error,
	Verify,
	Explore,
	Profile,
	Notification,
	Chat,
} from "./pages"
import PrivateRoute from "./components/privateRoute"
import "./app.css"

const App = () => {
	return (
		<CookiesProvider>
			<Provider store={store}>
				<Router>
					{/* <nav>
          <Link to='/' >Dashbaord</Link>
          <Link to='/landing' >Landing</Link>
          <Link to='/login' >Login</Link>
          
        </nav> */}
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/changepassword/:token"
							element={<Verify />}
						/>
						<Route path="*" element={<Error />} />
						<Route
							path="/profile"
							element={
								<PrivateRoute>
									<Profile />
								</PrivateRoute>
							}
						/>
						<Route
							path="/notification"
							element={
								<PrivateRoute>
									<Notification />
								</PrivateRoute>
							}
						/>
						<Route
							path="/explore"
							element={
								<PrivateRoute>
									<Explore />
								</PrivateRoute>
							}
						/>
						<Route
							path="/chat"
							element={
								<PrivateRoute>
									<Chat />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Router>
			</Provider>
		</CookiesProvider>
	)
}

export default App
