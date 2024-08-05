import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CAlert,
    CImage,
    CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser,cilEnvelopeClosed } from '@coreui/icons'
import FormControlLabel from '@mui/material/FormControlLabel';
import * as actions from '../../store/actions/index'
import { endPoint } from '../frontend_api/API/constant_api'
import { CallAPICommonDML } from '../frontend_api/API/api_call'
import Checkbox from '@mui/material/Checkbox';
import bgimage from '../../assets/Images/logo_black.png';
class Register extends Component {
    state = {
        role:3,
        first_name:"",
        last_name:"",
        email: "",
        password: "",
        confirm_password:"",
        validated: false
    }

    handleSubmit = (event) => {
        event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      const { first_name,last_name,email, password,confirm_password } = this.state;
      const allFieldsEmpty = !first_name && !last_name && !email && !password && !confirm_password;

      if (allFieldsEmpty) {
        this.setState({ validated: true, showError: true, errorMessage: "All fields are required." });
      } else {
        const requestBodyLogin = { first_name,last_name,email, password,confirm_password }; // Define requestBody here
        const url = endPoint.register;

        this.props.onRegister(first_name,last_name,email, password,confirm_password);
        
       CallAPICommonDML(url, "POST", requestBodyLogin, "UserLogin")
          .then((res) => {
            if (res.status === 400 && res.data.message.includes("email already exists")) {
              this.setState({ showError: true, errorMessage: "Email already exists. Please use a different email." });
            } else {
               alert("Success: " + res.data.result);
            }
          })
          .catch((error) => {
            this.setState({ showError: true, errorMessage: error.message });
          });
      }
    }

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }


    render() {
        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <CAlert
                    color="warning"
                    dismissible
                >
                    {this.props.error}
                </CAlert>
            )
        }

        let RegisterButton = !this.props.loading ? "Sign Up" : "Please Wait ..." 
        return (
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <div class="lgnauth">
               
               <div class="lgnform">
                    <CRow className="justify-content-center">
                        <CCol md={12}>
                            
                                        <CForm
                                            className="row g-3 needs-validation"
                                            noValidate
                                            validated={this.state.validated}
                                            onSubmit={this.handleSubmit}
                                        >
                                            <h2 class="header-txt">Create an account</h2>
                                            {/* <p className="text-medium-emphasis">Sign Up to your account</p> */}
                                            
                                            {errorMessage}
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    id="first_name"
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={this.state.first_name}
                                                    onChange={this.handleChange}
                                                    required />
                                                <CFormFeedback invalid>Please enter a first name.</CFormFeedback>
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    id="last_name"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={this.state.last_name}
                                                    onChange={this.handleChange}
                                                    required />
                                                <CFormFeedback invalid>Please enter a Last name.</CFormFeedback>
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilEnvelopeClosed} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    id="email"
                                                    type="text"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                    required />
                                                <CFormFeedback invalid>Please enter a email.</CFormFeedback>
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    required
                                                />
              
                                                <CFormFeedback invalid>Please enter password.</CFormFeedback>
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    id="confirm_password"
                                                    type="password"
                                                    placeholder=" ConfirmPassword"
                                                    value={this.state.confirm_password}
                                                    onChange={this.handleChange}
                                                    required
                                                />
              
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
                                                <CCol class="accnt-txt">
                                                    <label>Have an account? </label>
                                                    <a href='/login' style={{ cursor: 'pointer' }}><label class="logn-txt"> Sign In </label></a>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    
                        </CCol>
                    </CRow>
                </div>
                <div class="logobg">
                    <h2 class="weltxt">Welcome To</h2>
                <CImage  src={bgimage} height={'auto'} align="center" width={300} className="mainlgo"/>
                <p class="qqtxt">

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth._id !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (first_name,last_name,email, password,confirm_password) => dispatch(actions.userLogin(first_name,last_name,email, password,confirm_password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)