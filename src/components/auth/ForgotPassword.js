import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert,
    CImage,
    CFormFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons';
import Checkbox from '@mui/material/Checkbox';
import openEyeIcon from '../../assets/Images/eye-open.png'; 
import closedEyeIcon from '../../assets/Images/eye-closed.png';
import * as actions from '../../store/actions/index';  // Adjust the path according to your project structure

import bgimage from '../../assets/Images/logo_black.png';

class ForgotPassword extends Component {
    state = {
        
        email: "",
        validated: false,
        passwordVisible: false,
        confirmPasswordVisible: false,
        showSuccess: false,
        successMessage: "",
        showError: false,
        errorMessage: "",
    };

    
    handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        this.setState({

            validated: true,
        });

        if (form.checkValidity() === true) {
            try {
                this.props.onforgotpass(this.state.email).then((response) => {
                    if (response) {
                        this.props.navigate('/otpscreen');
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

    toggleConfirmPasswordVisibility = () => {
        this.setState((prevState) => ({
            confirmPasswordVisible: !prevState.confirmPasswordVisible,
        }));
    };

    render() {
        let errorMessage = null;
        if (this.props.error || this.state.showError) {
            errorMessage = (
                <CAlert color="warning" dismissible>
                    {this.props.error || this.state.errorMessage}
                </CAlert>
            );
        }

        let successMessage = null;
        if (this.state.showSuccess) {
            successMessage = (
                <CAlert color="success" dismissible>
                    {this.state.successMessage}
                </CAlert>
            );
        }

        let ForgotButton = !this.props.loading ? "Send" : "Please Wait ...";
        const passwordEyeIcon = this.state.passwordVisible ? openEyeIcon : closedEyeIcon;
        const confirmPasswordEyeIcon = this.state.confirmPasswordVisible ? openEyeIcon : closedEyeIcon;

        const inputStyle = {
            width: '100%',
        };

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
                                    <h2 className="header-txt">Forgot Password</h2>
                                    <p className="emailheader-txt">Enter your email and we'll send you a link to reset your password</p>
                                    {errorMessage}
                                    {successMessage}
                                    
                                    <CInputGroup className="mb-3" style={inputStyle}>
                                        <CInputGroupText>
                                            <CIcon icon={cilEnvelopeClosed} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="email"
                                            type="text"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                        <CFormFeedback invalid>Please enter an email.</CFormFeedback>
                                    </CInputGroup>
                                    
                                  
                                   
                                    <CRow>
                                        <CButton color="primary" className="px-4 btnsign" type="submit">
                                            {ForgotButton}
                                        </CButton>
                                    </CRow>
                                    <CRow>
                                        <CCol className="accnt-txt">
                                           
                                            <a href='/login' style={{ cursor: 'pointer' }}>
                                                <label > Back to Login </label>
                                            </a>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCol>
                        </CRow>
                    </div>
                    <div className="logobg">
                        <h2 className="weltxt">Welcome To</h2>
                        <CImage src={bgimage} height={'auto'} align="center" width={300} className="mainlgo" />
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
        onforgotpass: (email) => {
            return new Promise((resolve, reject) => {
                dispatch(actions.userForgot(email))
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
