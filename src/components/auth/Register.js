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
import * as actions from '../../store/actions/index';
import bgimage from '../../assets/Images/logo_black.png';

class Register extends Component {
    state = {
        role_id: '6696034d90acd599f340663e',
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "123456lL",
        status: 1,
        is_deleted: 0,
        validated: false,
        passwordVisible: false,
        confirmPasswordVisible: false,
        showSuccess: false,
        successMessage: "",
        showError: false,
        errorMessage: "",
    };

    handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        
        this.setState({
            validated: true
        });
        if(form.checkValidity() === true){
            this.props.onRegister(
                this.state.role_id, 
                this.state.first_name, 
                this.state.last_name,
                this.state.email,
                this.state.password,
                this.state.confirm_password,
                this.state.status,
                this.state.is_deleted
            ).then((res) => {
                if (res.status === 200) {
                    this.setState({ showSuccess: true, successMessage: "Registration successful. Please check your email to verify your account." });
                } else {
                    this.setState({ showError: true, errorMessage: res.message });
                }
            }).catch((error) => {
                this.setState({ showError: true, errorMessage: error.message });
            });
        }
    }

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

        let RegisterButton = !this.props.loading ? "Sign Up" : "Please Wait ...";
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
                                    <h2 className="header-txt">Create an account</h2>

                                    {errorMessage}
                                    {successMessage}
                                    <CInputGroup className="mb-3" style={inputStyle}>
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="first_name"
                                            type="text"
                                            placeholder="First Name"
                                            value={this.state.first_name}
                                            onChange={this.handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                        <CFormFeedback invalid>Please enter a first name.</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3" style={inputStyle}>
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="last_name"
                                            type="text"
                                            placeholder="Last Name"
                                            value={this.state.last_name}
                                            onChange={this.handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                        <CFormFeedback invalid>Please enter a last name.</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3" style={inputStyle}>
                                        <CInputGroupText>
                                            <CIcon icon={cilEnvelopeClosed} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="email"
                                            type="text"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                        <CFormFeedback invalid>Please enter an email.</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4" style={inputStyle}>
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="password"
                                            type={this.state.passwordVisible ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                        <CInputGroupText
                                            className="imgpass-2"
                                            onClick={this.togglePasswordVisibility}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <CImage src={passwordEyeIcon} className="eyeimge" style={{ width: '20px' }} />
                                        </CInputGroupText>
                                        <CFormFeedback invalid>Please enter a password.</CFormFeedback>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4" style={inputStyle}>
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id="confirm_password"
                                            type={this.state.confirmPasswordVisible ? 'text' : 'password'}
                                            placeholder="Confirm Password"
                                            value={'123456lL'}
                                            // value={this.state.confirm_password}
                                            onChange={this.handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                        <CInputGroupText
                                            className="imgpass-2"
                                            onClick={this.toggleConfirmPasswordVisibility}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <CImage src={confirmPasswordEyeIcon} className="eyeimge" style={{ width: '20px' }} />
                                        </CInputGroupText>
                                        <CFormFeedback invalid>Please enter confirm password.</CFormFeedback>
                                    </CInputGroup>

                                    <CRow>
                                        <CCol>
                                            <Checkbox id="terms-checkbox" aria-label='Terms & Conditions' />
                                            <label htmlFor="terms-checkbox" style={{ cursor: 'pointer' }}>
                                                Terms & Conditions
                                            </label>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CButton color="primary" className="px-4 btnsign" type="submit">
                                            {RegisterButton}
                                        </CButton>
                                    </CRow>
                                    <CRow>
                                        <CCol className="accnt-txt">
                                            <label>Have an account? </label>
                                            <a href='/login' style={{ cursor: 'pointer' }}>
                                                <label className="logn-txt"> Sign In </label>
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
        onRegister: (role_id, first_name, last_name, email, password, confirm_password, status, is_deleted) => {
            return new Promise((resolve, reject) => {
                dispatch(actions.userRegister(role_id, first_name, last_name, email, password, confirm_password, status, is_deleted))
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
