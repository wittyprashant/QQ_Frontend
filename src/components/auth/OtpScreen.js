import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CInputGroup,
    CRow,
    CAlert,
    CImage,
} from '@coreui/react';
import * as actions from '../../store/actions/index'; // Adjust the path according to your project structure
import bgimage from '../../assets/Images/logo_black.png';

class OTP extends Component {
    state = {
        otp: ['', '', '', ''],
        validated: false,
        showSuccess: false,
        successMessage: "",
        showError: false,
        errorMessage: "",
    };

    handleChange = (event, index) => {
        const { value } = event.target;
        if (/^[0-9]?$/.test(value)) { // Only allow numbers
            const otp = [...this.state.otp];
            otp[index] = value;
            this.setState({ otp });

            // Auto-focus on next input
            if (value && index < 3) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !this.state.otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        this.setState({ validated: true });

        if (form.checkValidity() === true) {
            const otpValue = this.state.otp.join('');
            try {
                this.props.onVerifyOTP(otpValue).then((response) => {
                    if (response) {
                        this.props.navigate('/changepassword');
                    }
                });
            } catch (error) {
                console.error("OTP verification failed:", error);
            }
        } else {
            event.stopPropagation();
        }
    };

    render() {
        const { otp } = this.state;

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
                                    <h2 className="header-txt">Verification</h2>
                                    <p >Enter the 4-digit OTP sent to your email</p>
                                    {errorMessage}
                                    {successMessage}
                                    
                                    <CRow className="mb-3">
                                        {otp.map((value, index) => (
                                            <CCol xs="3" key={index}>
                                                <CInputGroup>
                                                    <CFormInput
                                                        id={`otp-input-${index}`}
                                                        type="text"
                                                        maxLength="1"
                                                        value={value}
                                                        onChange={(e) => this.handleChange(e, index)}
                                                        onKeyDown={(e) => this.handleKeyDown(e, index)}
                                                        required
                                                        autoFocus={index === 0}
                                                    />
                                                </CInputGroup>
                                            </CCol>
                                        ))}
                                    </CRow>

                                    <CRow>
                                        <CButton color="primary" className="px-4 btnsign" type="submit">
                                            Verify OTP
                                        </CButton>
                                    </CRow>
                                    <CRow>
                                        <CCol className="accnt-txt">
                                            <a href='/resend-otp' style={{ cursor: 'pointer' }}>
                                                <label> Resend OTP </label>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onVerifyOTP: (otp) => {
            return new Promise((resolve, reject) => {
                dispatch(actions.userOTP(otp))
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
