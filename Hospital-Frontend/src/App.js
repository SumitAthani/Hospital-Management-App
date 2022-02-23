import React from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Addpat from "./pages/addPatient";
import Home from "./pages/home";
import AddAppointment from "./pages/addAppointment";
import { Route, Switch } from "react-router-dom";

import http from "./services/httpService";
import { apiUrl } from "./config.json";
import ProtectedRoute from "./components/common/protectedRoute";
import AllPatients from "./pages/allpatients";
import PatientDetails from "./pages/patientDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

import Profile from "./pages/profile";
import PasswordReset from "./pages/passwordReset";
import PasswordResetLink from "./pages/passwordResetLink";
import AdminLogin from "./pages/adminLogin";
import AddUser from "./pages/addUser";
import AdminDashBoard from "./pages/adminDashboard";

class App extends React.Component {
	state = {};

	async componentDidMount() {
		try {
			const userId = sessionStorage.UserId;
			// console.log("userid", userId);
			if (userId != null) {
				// console.log("herererer");
				console.log("here");
				const user = await http.get(`${apiUrl}user/${userId}`);
				// const users=getUser();

				this.setState({ user });
			}
		} catch (error) {}
	}

	render() {
		return (
			<div>
				<Navbar user={this.state.user} />

				<div className="content">
					<Switch>
						<ProtectedRoute path="/allpatients" component={AllPatients} />
						<ProtectedRoute
							path="/patientdetails"
							render={(props) => <PatientDetails {...props} />}
						/>
						<Route path="/login-admin" component={AdminLogin} />
						<Route path="/login" render={(props) => <Login {...props} />} />

						<Route path="/adduser" render={(props) => <AddUser {...props} />} />
						<Route
							path="/admin-dashboard"
							render={(props) => <AdminDashBoard {...props} />}
						/>
						<ProtectedRoute path="/addpatient" component={Addpat} />
						<ProtectedRoute path="/addappointment" component={AddAppointment} />
						{/* <Route path="/" component={PrintDetails} /> */}
						<ProtectedRoute
							path="/profile"
							render={(props) => <Profile {...props} />}
						/>
						<Route
							path="/password-reset/:id/:token"
							component={PasswordResetLink}
						/>
						<Route path="/password-reset" component={PasswordReset} />
						<Route path="/" component={Home} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
