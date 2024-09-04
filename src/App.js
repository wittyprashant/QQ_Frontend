import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AxiosInterceptor } from './axios_call';
import './scss/style.scss';
import AuthenticatedRoute from './route/AuthenticatedRoute';
import UnAuthenticatedRoute from './route/UnAuthenticatedRoute';

// Containers
const DefaultLayout = React.lazy(() => import('./hoc/Layout/Layout'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const ForgotPassword =lazy(() => import('./components/auth/ForgotPassword'));
const Logout = lazy(() => import('./components/auth/Logout'));
const OTP= lazy(() => import('./components/auth/OtpScreen'));
const ChangePassword = lazy(()=> import('./components/auth/ChangePassword'))


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function withRouter(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} location={location} params={params} />;
  };
}

class App extends Component {
  render() {
    return (
      <Suspense fallback={loading}>
        <AxiosInterceptor>
          <Routes>
            <Route exact path="/login" name="Login Page" element={
              <AuthenticatedRoute redirectTo="/dashboard">
                <Login />
              </AuthenticatedRoute>
            } />
            <Route exact path='/forgotpassword' name="ForgotPassword Page" element={<ForgotPassword />} />
            <Route exact path='/otp' name="OTP Page" element={<OTP />} />
            <Route exact path='/changepassword' name="ChangePassword Page" element={<ChangePassword />} />
            <Route exact path='/register' name="Register Page" element={<Register />} />
            <Route path='/logout' element={<Logout />} />
  
            <Route path="*" name="Home" element={
              <UnAuthenticatedRoute redirectTo="/login">
                <DefaultLayout />
              </UnAuthenticatedRoute>
            } />
          </Routes>
        </AxiosInterceptor>
      </Suspense>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth?._id !== null
});

export default withRouter(connect(mapStateToProps)(App));
