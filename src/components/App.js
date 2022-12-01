import { lazy, Suspense, Fragment, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "../components/Auth/login.component";
import Register from "../components/Auth/register.component"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import "../App.css";
import { FaCalendarAlt, FaDoorOpen, FaUsers, FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import UserPicker from "./Users/UserPicker.js";
import PageSpinner from "./UI/PageSpinner";
import { UserProvider } from "./Users/UserContext";

import ErrorBoundary from "./UI/ErrorBoundary";
import AuthService from "../services/auth.service";

const BookablesPage = lazy(() => import("./Bookables/BookablesPage"));
const BookingsPage = lazy(() => import("./Bookings/BookingsPage"));
const UsersPage = lazy(() => import("./Users/UsersPage"));

const queryClient = new QueryClient();

export default function App() {
  const userData = AuthService.getCurrentUser();
  const [user, setUser] = useState(userData);

  function logOut() {
    AuthService.logout();
    setUser(undefined)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="App">
            <header className="header-button">
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt />
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen />
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <ul className="header-end">
                <li>
                  {user ? <Link to="/profile" className="btn btn-header">
                    <span>{user.username}</span>
                  </Link> :
                    <Link to="/login" className="btn btn-header">
                      <FaSignInAlt />
                      <span>Sign In</span>
                    </Link>
                  }
                </li>
                <li>
                  {user ? <Link to="/logout" className="btn btn-header" onClick={logOut}>
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </Link> :
                    <Link to="/signup" className="btn btn-header">
                      <FaUserPlus />
                      <span>Sign Up</span>
                    </Link>
                  }
                </li>
              </ul>
              <UserPicker />
            </header>

            <ErrorBoundary
              fallback={
                <Fragment>
                  <h1>Something went wrong!</h1>
                  <p>Try reloading the page.</p>
                </Fragment>
              }
            >
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/bookables/*" element={<BookablesPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Register />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}