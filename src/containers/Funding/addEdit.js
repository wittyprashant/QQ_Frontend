import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
    Navigate
} from "react-router-dom";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton,
    CFormTextarea,
    CFormLabel
} from '@coreui/react';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import Moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/funding/edit/:fundingId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    state = {
        fundingId: 0,
        validated: false,
        changedProp: false,
        title: "",
        description: "",
        dueDate: new Date(),
        categoryId:0,
        startDate: new Date(),
        endDate: new Date(),
        applyNow: "",
    };

    handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({
            validated: true
        })
        if (form.checkValidity() === true) {
            this.props.onAddEditForm(this.state)
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
    }

    componentDidMount() {
        let fundingId = this.props.match ? this.props.match.params.fundingId : ""

        this.props.onCategoryList()

        if (fundingId) {
            this.setState({
                fundingId: fundingId
            })
            this.props.onFundingDetail(fundingId)
        }

    }

    componentDidUpdate(prevProps) {
        let fundDetail = this.props.fundDetail
        if (this.props.fundDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            fundDetail["changedProp"] = true
            
            fundDetail["dueDate"] = Moment(fundDetail.dueDate)._d
            this.setState(fundDetail);
        }
    }



    render() {
        if (this.props.redirectTo !== null && this.props.redirectTo !== "") {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }

        if (this.props.fundDetailError) {
            swal(this.props.fundDetailError, {
                icon: "error",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }

        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Fund {this.state.fundingId ? "Edit" : "Add"}</div>

                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="title"
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Title'
                                required
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormTextarea
                                id="description"
                                label="Description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                placeholder='Enter Description'
                                required
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormLabel>Due Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"MM/dd/yyyy"}
                                minDate={new Date()}
                                selected={this.state.dueDate}
                                id="dueDate"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "dueDate": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormSelect
                                id="categoryId"
                                value={this.state.categoryId}
                                onChange={this.handleChange}
                                label="Category"
                            >
                                <option value={null}> --- select Category ---</option>
                                {
                                    this.props.categoryList.map((item, i) => (
                                        <option key={i} value={item.categoryId}>{item.categoryName}</option>

                                    ))
                                }
                            </CFormSelect>
                        </CCol>                        
                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="applyNow"
                                label="Apply Now"
                                placeholder='Enter Website'
                                value={this.state.applyNow}
                                onChange={this.handleChange}
                                required
                            />
                        </CCol>                        
                        <CCol xs={12}>
                            <CButton type="submit">{AddEditButton}</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        categoryList: state.fund.fundCategoryList,
        redirectTo: state.fund.redirectTo,
        addEditLoading: state.fund.addEditLoading,
        addEditError: state.fund.addEditError,
        fundDetail: state.fund.fundDetail,
        fundDetailError: state.fund.fundDetailError,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onCategoryList: () => dispatch(actions.getCategoryList()),
        onAddEditForm: (params) => dispatch(actions.fundAddEdit(params)),
        onFundingDetail : (id) => dispatch(actions.getfundDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))