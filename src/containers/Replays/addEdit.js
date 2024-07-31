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
    CButton,
    CFormLabel,
} from '@coreui/react';
import swal from 'sweetalert';

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/replays/edit/:replayId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            validated: false,
            changedProp: false,
            title: "",
            description: "",
            videoId:"",
            replaysCategory: "",
            featureImage: "",
            oldFeatureImage: "",
            discriptionClass:""
        };
        this.onFileChange = this.onFileChange.bind(this);
    }

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
            console.log("submit");
            this.props.onAddEditForm(this.state, "")
        }
    }

    onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) => {
            this.setState({
                featureImage: event.target.result,
            })
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })

        this.setState(updatedStateData)
    }

    componentDidMount() {
        let replayId = this.props.match ? this.props.match.params.replayId : ""
        if (replayId) {
            this.setState({
                id: replayId
            })
            this.props.onReplayDetail(replayId)
        }
    }

    componentDidUpdate(prevProps) {
        let replayDetail = this.props.replayDetail
        if (this.props.replayDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            replayDetail["changedProp"] = true
            replayDetail["oldFeatureImage"] = replayDetail.featureImage
            delete replayDetail.featureImage
            this.setState(replayDetail);
        }
    }

    render() {
        if (this.props.redirectTo) {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }
        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Replay {this.state.id ? "Edit" : "Add"}</div>

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
                            <CFormLabel>Description</CFormLabel>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        'description' : data
                                    })
                                }}
                                required
                            />
                            <div className={`invalid-feedback ${this.state.discriptionClass}`}>Please enter a valid description.</div>
                        </CCol>
                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="videoId"
                                label="Video ID"
                                value={this.state.videoId}
                                onChange={this.handleChange}
                                placeholder='Enter Video Id'
                                feedbackInvalid="Please enter a valid video id."
                                required
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="replaysCategory"
                                label="Category"
                                value={this.state.replaysCategory}
                                onChange={this.handleChange}
                                placeholder='Enter Category'
                                
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormInput
                                type="file"
                                id="Image"
                                label="File upload"
                                onChange={this.onFileChange}
                                accept="image/png, image/gif, image/jpeg"
                                feedbackInvalid="Please select a valid image."
                                // required
                            />
                            <small className="text-muted">Image size: 500px * 800px</small>
                        </CCol>
                        <CCol xs={12}>
                            {this.state.oldFeatureImage ?

                                (
                                    <div>
                                        <img
                                            src={this.state.oldFeatureImage}
                                            width="100px"
                                            height="100px"
                                            alt="placeholder grey 100px"
                                        />
                                        {/* <button onClick={() => this.removeImage(pic.eventAttachmentId)}>X</button> */}
                                    </div>
                                )
                                : ""
                            }
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
        redirectTo: state.replay.redirectTo,
        addEditLoading: state.replay.addEditLoading,
        addEditError: state.replay.addEditError,
        addEditSuccess: state.replay.addEditSuccess,
        replayDetail: state.replay.replayDetail,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onReplayDetail: (id, token) => dispatch(actions.getreplayDetail(id)),
        onAddEditForm: (params, token) => dispatch(actions.replayAddEdit(params, token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))