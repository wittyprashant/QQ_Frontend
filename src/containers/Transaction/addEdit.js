import React, { Component } from "react";
import { connect } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useMatch,
  Navigate,
} from "react-router-dom";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CCol,
  CFormInput,
  CButton,
  CFormTextarea
} from "@coreui/react";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from "../../store/Utility";
import * as actions from "../../store/actions";

function withRouter(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const match = useMatch("transactions/edit/:transactionId");
    return (
      <Component
        {...props}
        match={match}
        navigate={navigate}
        location={location}
        params={params}
      />
    );
  };
}

class AddEdit extends Component {
  constructor() {
    super();
    this.state = {
      transactionId: 0,
      validated: false,
      changedProp: false,
      title: "",
      description: "",
      category: 1,
      featureImage: "",
      documentUpload: "", //[],
      documentLink: "",
      oldFeatureImage: "",
    };
    this.onFileChange = this.onFileChange.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({
      validated: true,
    });
    if (form.checkValidity() === true) {
      this.props.onAddEditForm(this.state, "");
    }
  };

  handleChange = (event) => {
    let updatedStateData = this.state;
    if (event.target.className.includes("form-check-input")) {
      updatedStateData = updateObject(this.state, {
        category: event.target.value,
      });
    } else {
      updatedStateData = updateObject(this.state, {
        [event.target.id]: event.target.value,
      });
    }
    this.setState(updatedStateData);
  };

  async onFileChange(e) {
    let files = e.target.files;
    if (e.target.id === "featureImage") {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (event) => {
        this.setState({
          featureImage: event.target.result,
        });
      };
    } else {
      let fileReader = new FileReader();
      let arr = [];
      for (const file of files) {
        fileReader.readAsDataURL(file);
        fileReader.onload = (event) => {
          arr.push(event.target.result);
          this.setState({
            documentUpload: event.target.result,
          });
        };
      }
    }
  }

  componentDidMount() {
    let transactionId = this.props.match
      ? this.props.match.params.transactionId
      : "";
    if (transactionId) {
      this.setState({
        transactionId: transactionId,
      });
      this.props.onTransactionDetail(transactionId);
    }
  }

  componentDidUpdate(prevProps) {
    let transactionDetail = this.props.transactionDetail;
    if (this.props.transactionDetail === null) {
      return false;
    }
    if (this.state.changedProp === false) {
      transactionDetail["changedProp"] = true;
      transactionDetail["oldFeatureImage"] = transactionDetail.featureImage;
      delete transactionDetail.featureImage;
      delete transactionDetail.documentUpload;
      this.setState(transactionDetail);
    }
  }

  render() {
    if (this.props.redirectTo) {
      swal("Poof! Your Details  has been save changes !", {
        icon: "success",
      });
      return <Navigate to={this.props.redirectTo} replace />;
    }
    if (this.props.addEditError) {
      swal(this.props.addEditError, {
        icon: "error",
      });
      this.props.onErrorNull();
    }
    let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ...";
    return (
      <CCard>
        <CCardHeader className="d-flex" component="h5">
          <div className="col-sm">
            Transaction {this.state.transactionId ? "Edit" : "Add"}
          </div>
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
                placeholder="Enter Title"
                feedbackInvalid="Please enter a valid title."
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormTextarea
                id="description"
                label="Description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Enter Description"
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                id="documentLink"
                label="Document link"
                value={this.state.documentLink}
                onChange={this.handleChange}
                placeholder="Enter Document link"
                // pattern="/^/(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i"
                feedbackInvalid="Please enter a valid document link."
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="file"
                id="featureImage"
                label="Featured Image"
                onChange={this.onFileChange}
                accept="image/png, image/gif, image/jpeg"
                feedbackInvalid="Please select a valid image."
                required={this.state.transactionId ? false : true}
              />
              <small className="text-muted">Image size: 500px * 800px</small>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="file"
                id="documentUpload"
                label="Document Upload"
                multiple
                onChange={this.onFileChange}
                accept="application/msword, application/pdf"
                feedbackInvalid="Please select a valid document."
                required={this.state.transactionId ? false : true}
              />
            </CCol>
            <CCol xs={6}>
              {this.state.oldFeatureImage ? (
                <div>
                  <img
                    src={this.state.oldFeatureImage}
                    width="100px"
                    height="100px"
                    className="img-thumbnail"
                    alt="placeholder grey 100px"
                  />
                </div>
              ) : (
                ""
              )}
            </CCol>
            <CCol xs={6}></CCol>
            <CCol xs={12}>
              <CButton type="submit">{AddEditButton}</CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.transaction.loading,
    transactionDetailError: state.transaction.transactionDetailError,
    transactionDetail: state.transaction.transactionDetail,
    redirectTo: state.transaction.redirectTo,
    addEditLoading: state.transaction.addEditLoading,
    addEditError: state.transaction.addEditError,
    addEditSuccess: state.transaction.addEditSuccess,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onTransactionDetail: (id) => dispatch(actions.gettransactionDetail(id)),
    onAddEditForm: (params) => dispatch(actions.transactionAddEdit(params)),
    onErrorNull: (params) => dispatch(actions.addEditTransactionErrorNull()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit));
