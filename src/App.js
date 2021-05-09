import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";

import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
	const { user } = useAuthListener();

	return (
		<UserContext.Provider value={{ user }}>
			{" "}
			<Router>
				<Header />
				<Suspense fallback={<Loader />}>
					<Switch>
						<IsUserLoggedIn
							user={user}
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.LOGIN}
							exact
						>
							<Login />
						</IsUserLoggedIn>
						<IsUserLoggedIn
							user={user}
							loggedInPath={ROUTES.DASHBOARD}
							path={ROUTES.SIGNUP}
							exact
						>
							<Route exact path={ROUTES.SIGNUP} component={Signup} />
						</IsUserLoggedIn>
						<ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>
						<Route path={ROUTES.PROFILE} component={Profile} exact />
						<Route exact path="/heart" component={Dashboard} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
