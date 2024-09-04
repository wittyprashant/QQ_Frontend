// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import {
//     CButton,
//     CCol,
//     CImage,
//     CForm,
//     CFormInput,
//     CInputGroup,
//     CInputGroupText,
//     CRow,
//     CAlert,
//     CFormFeedback,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import Checkbox from '@mui/material/Checkbox';
// import * as actions from '../../store/actions/index'
// import { useNavigate } from 'react-router-dom';
// import bgimage from '../../assets/Images/logo_black.png';
// import eyepass from '../../assets/Images/eye.png';
// class Login extends Component {
//     state = {
//         email: '',
//         password: '',
//         validated: false,
//     };
  
//     handleSubmit = async (event) => {
//         event.preventDefault();
//         const form = event.currentTarget;
//         this.setState({
//             validated: true,
//         });

//         if (form.checkValidity() === true) {
//             try {
//                 if (form.checkValidity() === true) {
//                     this.props.onAuth(this.state.email, this.state.password)
//                         .then((response) => {
                           
//                             if (response) {
//                               this.props.navigate('/dashboard');
//                              // Navigate to dashboard (members)
//                             }
//                         })}}
//             catch (error) {
//                 console.error("Login failed:", error);
//             }
//         } else {
//             event.stopPropagation();
//         }
//     };

//     handleChange = (event) => {
//         this.setState({
//             [event.target.id]: event.target.value,
//         });
//     };

//     render() {
//         let errorMessage = null;
//         if (this.props.error) {
//             errorMessage = (
//                 <CAlert color="warning" dismissible>
//                     {this.props.error}
//                 </CAlert>
//             );
//         }

//         let LoginButton = !this.props.loading ? 'Sign In' : 'Please Wait ...';
//         return (
            
//             <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
//                   <div class="lgnauth">
               
//                 <div class="lgnform">
//                     <CRow className="justify-content-center">
//                         <CCol md={12}>
                           
                           
//                                         <CForm
//                                             className="row g-3 needs-validation"
//                                             noValidate
//                                             validated={this.state.validated}
//                                             onSubmit={this.handleSubmit}
//                                         >
//                                             <h2 class="lgntxt">Login</h2>
                                           
//                                             {errorMessage}
//                                             <CInputGroup className="mb-2">
//                                                 <CInputGroupText>
//                                                     <CIcon icon={cilUser} />
//                                                 </CInputGroupText>
//                                                 <CFormInput
//                                                     id="email"
//                                                     type="text"
//                                                     placeholder="Email"
//                                                     value={this.state.email}
//                                                     onChange={this.handleChange}
//                                                     required
//                                                 />
//                                                 <CFormFeedback invalid>Please enter  email address.</CFormFeedback>
//                                             </CInputGroup>
//                                             <CInputGroup className="mb-3">
//                                                 <CInputGroupText>
//                                                     <CIcon icon={cilLockLocked} />
//                                                 </CInputGroupText>
//                                                 <CFormInput
//                                                     id="password"
//                                                     type="password"
//                                                     placeholder="Password"
//                                                     value={this.state.password}
//                                                     onChange={this.handleChange}
//                                                     required
//                                                 />
//                                                 <CInputGroupText class="imgpass-2">
//                                                     <CImage src={eyepass} className="eyeimge" />
//                                                 </CInputGroupText>
//                                                 <CFormFeedback invalid>Please enter password.</CFormFeedback>
//                                             </CInputGroup>

//                                             <CRow class="align-items-center">
//                                                 <CCol>
//                                                     <label style={{ cursor: 'pointer' }}>
//                                                     <Checkbox aria-label='Remember Me' />
//                                                     Remember Me
//                                                     </label>
//                                                 </CCol>
//                                                 <CCol>
//                                                     <p class="mb-0 text-right">Forgot Password?</p>
//                                                 </CCol>
//                                             </CRow>
//                                             <CRow>
//                                                 <CButton color="primary" className="px-4" type="submit">
//                                                     {LoginButton}
//                                                 </CButton>
//                                             </CRow>
//                                             <CRow>
//                                                 <CCol class="accnt-txt">
//                                                     <label>Don't have an account? </label>
//                                                     <a href='/register'><label class="logn-txt"> Sign In </label></a>
//                                                 </CCol>
//                                             </CRow>
//                                         </CForm>
                                     
                                   
//                         </CCol>
//                     </CRow>
//                     </div>
          
//                 <div class="logobg">
//                     <h2 class="weltxt">Welcome To</h2>
//                 <CImage  src={bgimage} height={'auto'} align="center" width={300} className="mainlgo"/>
//                 <p class="qqtxt">

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
//                 </div>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         loading: state.auth.loading,
//         error: state.auth.error,
//         isAuthenticated: state.auth._id !== null,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onAuth: async (email, password) => {
//             try {
//                 await dispatch(actions.userLogin(email, password));
//                 return true;
//             } catch (error) {
//                 console.error(error);
//                 return false;
//             }
//         },
//     };
// };

// const withNavigate = (Component) => {
//     return (props) => {
//         const navigate = useNavigate();
//         return <Component {...props} navigate={navigate} />;
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(Login));


import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CButton,
    CCol,
    CImage,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert,
    CFormFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import Checkbox from '@mui/material/Checkbox';
import * as actions from '../../store/actions/index';
import { useNavigate } from 'react-router-dom';
import bgimage from '../../assets/Images/logo_black.png';
import openEyeIcon from '../../assets/Images/eye-open.png'; // Open eye icon
import closedEyeIcon from '../../assets/Images/eye-closed.png'; // Closed eye icon


class Login extends Component {
    state = {
        email: '',
        password: '',
        validated: false,
        passwordVisible: false,
    };
    goForgotPassword = () => {
        this.props.navigate('/forgotpassword');
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        this.setState({
            validated: true,
        });

        if (form.checkValidity() === true) {
            try {
                this.props.onAuth(this.state.email, this.state.password).then((response) => {
                    if (response) {
                        this.props.navigate('/dashboard');
                    }
                });
            } catch (error) {
                console.error("Login failed:", error);
            }
        } else {
            event.stopPropagation();
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            passwordVisible: !prevState.passwordVisible,
        }));
    };
    
    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <CAlert color="warning" dismissible>
                    {this.props.error}
                </CAlert>
            );
        }

        let LoginButton = !this.props.loading ? 'Sign In' : 'Please Wait...';
        const eyeIcon = this.state.passwordVisible ? openEyeIcon : closedEyeIcon;

        return (
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <div className="lgnauth">
                    <div className="lgnform">
                        <CRow className="justify-content-center">
                            <CCol md={12}>
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={this.state.validated}
                                    onSubmit={this.handleSubmit}
                                >
                                    <h2 className="lgntxt">Login</h2>
                                    {errorMessage}
                                    <CInputGroup className="mb-2">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="email"
                                            type="text"
                                            placeholder="Enter username or email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <CFormFeedback invalid>Please enter email address.</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="password"
                                            type={this.state.passwordVisible ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <CInputGroupText
                                            className="imgpass-2"
                                            onClick={this.togglePasswordVisibility}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <CImage src={eyeIcon} className="eyeimge" style={{width:'20px'}}/>
                                        </CInputGroupText>
                                        <CFormFeedback invalid>Please enter password.</CFormFeedback>
                                    </CInputGroup>
                                    <CRow className="align-items-center">
                                        <CCol>
                                            <label style={{ cursor: 'pointer' }}>
                                                <Checkbox aria-label="Remember Me" />
                                                Remember Me
                                            </label>
                                        </CCol>
                                        <CCol>
                                            <p className="mb-0 text-right" onClick={this.goForgotPassword}>Forgot Password?</p>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CButton color="primary" className="px-4" type="submit">
                                            {LoginButton}
                                        </CButton>
                                    </CRow>
                                    <CRow>
                                        <CCol className="accnt-txt">
                                            <label>Don't have an account? </label>
                                            <a href="/register">
                                                <label className="logn-txt"> Sign Up </label>
                                            </a>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCol>
                        </CRow>
                    </div>
                    <div className="logobg">
                        <h2 className="weltxt">Welcome To</h2>
                        <CImage src={bgimage} height="auto" align="center" width={300} className="mainlgo" />
                        <p className="qqtxt">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth._id !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: async (email, password) => {
            try {
                await dispatch(actions.userLogin(email, password));
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    };
};

const withNavigate = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(Login));
