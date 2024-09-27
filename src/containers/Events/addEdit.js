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
  CFormSelect,
  CButton,
  CFormTextarea,
  CFormLabel,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import swal from "sweetalert";
import Moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from "../../store/Utility";
import * as actions from "../../store/actions";

function withRouter(Component) {
  return (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const match = useMatch("/events/edit/:eventId");
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
      eventId: 0,
      validated: false,
      changedProp: false,
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      address: "",
      city: "",
      country: "0",
      state: "0",
      zipCode: "",
      phoneNumber: "",
      website: "",
      featureImage: "",
      oldFeatureImage: "",
    };
    this.onFileChange = this.onFileChange.bind(this);
  }

  async onFileChange(e) {
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = (event) => {
      this.setState({
        featureImage: event.target.result,
      });
    };
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
    if (event.target.id === "Image") {
      updatedStateData = updateObject(this.state, {
        [event.target.id]: event.target.files,
      });
    } else {
      if (event.target.id === "country") {
        this.props.onStateList(event.target.value, "");
      }
      updatedStateData = updateObject(this.state, {
        [event.target.id]: event.target.value,
      });
    }
    this.setState(updatedStateData);
  };

  async componentDidMount() {
    let eventId = this.props.match ? this.props.match.params.eventId : "";
    await this.props.onCountryList();
    this.setState({
      country: "United States",
    });
    await this.props.onStateList("United States", "");
    if (eventId) {
      this.setState({
        eventId: eventId,
      });
      this.props.onEventDetail(eventId);
    }
  }

  async componentDidUpdate(prevProps) {
    let eventDetail = this.props.eventDetail;
    if (this.props.eventDetail === null) {
      return false;
    }
    if (this.state.changedProp === false) {
      eventDetail["changedProp"] = true;
      eventDetail["oldFeatureImage"] = eventDetail.featureImage;
      eventDetail["startDate"] = Moment(eventDetail.startDate)._d;
      eventDetail["endDate"] = Moment(eventDetail.endDate)._d;
      delete eventDetail.featureImage;

      await this.props.onStateList(eventDetail.country, "");

      this.setState(eventDetail);
    }
  }

  render() {
    if (this.props.redirectTo) {
      swal("Poof! Your Details  has been save changes !", {
        icon: "success",
      });
      return <Navigate to={this.props.redirectTo} replace />;
    }
    let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ...";
    return (
      <CCard>
        <CCardHeader className="d-flex" component="h5">
          <div className="col-sm">
            Event {this.state.eventId ? "Edit" : "Add"}
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
                feedbackInvalid="Please enter a valid description."
                required
              />
            </CCol>
            <h4>Time / date</h4>
            <CCol md={6}>
              <CFormLabel>Start</CFormLabel>
              <DatePicker
                className="form-control"
                dateFormat={"MM/dd/yyyy"}
                minDate={new Date()}
                selected={this.state.startDate}
                id="startDate"
                required
                ariaInvalid="Please select a valid start date."
                onChange={(date) => {
                  let updatedStateData = updateObject(this.state, {
                    startDate: date,
                    endDate: "",
                  });
                  this.setState(updatedStateData);
                }}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>End</CFormLabel>
              <DatePicker
                className="form-control"
                dateFormat={"MM/dd/yyyy"}
                minDate={this.state.startDate}
                selected={this.state.endDate}
                id="endDate"
                required
                ariaInvalid="Please select a valid end date."
                onChange={(date) => {
                  let updatedStateData = updateObject(this.state, {
                    endDate: date,
                  });
                  this.setState(updatedStateData);
                }}
              />
            </CCol>
            <h4>Location</h4>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="address"
                label="Address"
                placeholder="Enter address"
                value={this.state.address}
                onChange={this.handleChange}
                feedbackInvalid="Please enter a valid address."
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="city"
                label="City"
                placeholder="Enter City"
                value={this.state.city}
                onChange={this.handleChange}
                feedbackInvalid="Please enter a valid city."
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="country"
                value={this.state.country}
                onChange={this.handleChange}
                label="Country"
                feedbackInvalid="Please select a valid country."
                required
              >
                <option selected="" disabled="" value="">
                  {" "}
                  --- Select country ---
                </option>
                {this.props.countryList.map((item, i) => (
                  <option key={i} value={item.countryId}>
                    {item.countryName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormSelect
                id="state"
                label="State"
                value={this.state.state}
                onChange={this.handleChange}
                feedbackInvalid="Please select a valid state."
                required
              >
                <option selected="" disabled="" value="">
                  {" "}
                  --- Select State ---
                </option>
                {this.props.stateList.map((item, i) => (
                  <option key={i} value={item.stateId}>
                    {item.stateName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="text"
                id="zipCode"
                label="PostCode"
                placeholder="Enter ZipCode"
                value={this.state.zipCode}
                onChange={this.handleChange}
                feedbackInvalid="Please enter a valid zipCode."
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="number"
                id="phoneNumber"
                label="Phone Number"
                placeholder="Enter Phone Number"
                value={this.state.phoneNumber}
                onChange={this.handleChange}
                min="1000000000"
                max="999999999999"
                feedbackInvalid="Please enter a valid phone number."
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="text"
                id="website"
                label="Website"
                placeholder="Enter Website"
                value={this.state.website}
                onChange={this.handleChange}
                feedbackInvalid="Please enter a valid website."
                required
              />
            </CCol>
            <CCol md={12}>
              <CFormInput
                type="file"
                id="featureImage"
                label="Feature Image"
                onChange={this.onFileChange}
                accept="image/png, image/gif, image/jpeg"
                feedbackInvalid="Please select a valid image."
                required={this.state.eventId ? false : true}
              />
              <small className="text-muted">Image size: 500px * 800px</small>
            </CCol>
            <CCol xs={12}>
              {this.state.oldFeatureImage ? (
                <div>
                  <img
                    src={this.state.oldFeatureImage}
                    width="100px"
                    height="100px"
                    alt="placeholder grey 100px"
                  />
                </div>
              ) : (
                ""
              )}
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

const mapStateToProps = (state) => {
  return {
    loading: state.event.loading,
    data: state.event.data,
    error: state.event.error,
    countryList: state.event.eventCountryList,
    stateList: state.event.eventStateList,
    redirectTo: state.event.redirectTo,
    addEditLoading: state.event.addEditLoading,
    addEditError: state.event.addEditError,
    addEditSuccess: state.event.addEditSuccess,
    eventDetail: state.event.eventDetail,
    eventDetailError: state.event.eventDetailError,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onEventList: (param) => dispatch(actions.eventList(param)),
    onEventDelete: (id) => dispatch(actions.eventDelete(id)),
    onEventDetail: (id) => dispatch(actions.getEventDetail(id)),
    onCountryList: () => dispatch(actions.getCountryList()),
    onStateList: (id) => dispatch(actions.getStateList(id)),
    onAddEditForm: (params) => dispatch(actions.eventAddEdit(params)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit));
