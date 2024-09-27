import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CButton, CCol, CForm, CFormInput,
    CInputGroup, CInputGroupText, CRow, CAlert, CImage, CFormFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import openEyeIcon from '../../assets/Images/eye-open.png';
import closedEyeIcon from '../../assets/Images/eye-closed.png';
import * as actions from '../../store/actions/index';
import bgimage from '../../assets/Images/logo_black.png';

class ChangePassword extends Component {
    state = {
   
        password: "",
        confirm_password: "",
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
        this.setState({ validated: true });
    
        if (form.checkValidity() === true) {
            try {
                this.props.onchangepass( this.state.password, this.state.confirm_password)
                    .then((response) => {
                        if (response) {
                            this.props.navigate('/otpscreen'); // Navigate to the OTP screen
                        }
                    });
            } catch (error) {
                console.error("Change password failed:", error);
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
        const { error, loading } = this.props;
        const { showSuccess, successMessage, showError, errorMessage } = this.state;

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
                                    <h2 className="header-txt">Reset Password</h2>
                                    <p className="emailheader-txt">Enter your email and we'll send you a link to reset your password</p>
                                    {showError && (
                                        <CAlert color="warning" dismissible>
                                            {error || errorMessage}
                                        </CAlert>
                                    )}
                                    {showSuccess && (
                                        <CAlert color="success" dismissible>
                                            {successMessage}
                                        </CAlert>
                                    )}
                                    <CInputGroup className="mb-4" style={inputStyle}>
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
                                            placeholder="Enter confirm password"
                                            value={this.state.confirm_password}
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
                                        <CButton color="primary" className="px-4 btnsign" type="submit">
                                            {!loading ? "Send" : "Please Wait ..."}
                                        </CButton>
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
       // id: state.auth.userData ? state.auth.userData._id : null, // Access the id from userData
        isAuthenticated: !!state.auth.token, // Or check userData if required
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onchangepass: async (password,confirm_password) => {
            try {
                await dispatch(actions.userChangePassword( password,confirm_password));
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
