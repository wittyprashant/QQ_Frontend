import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CRow,
  CCol,
  CTooltip,
} from "@coreui/react";
import DataTable from "react-data-table-component";
import Moment from "moment";
import swal from "sweetalert";
import * as actions from "../../store/actions";
import { NavLink } from "react-router-dom";
import { cilPen, cilTrash, cilUser, cilPlus } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

class EventList extends Component {
  state = {
    filterText: "",
    resetPaginationToggle: false,
    columnEvent: [
      {
        name: "Title",
        selector: (row) => `${row.title}`,
        sortable: true,
        maxWidth: "300px",
      },
      {
        name: "Time / date",
        selector: (row) => `${row.startDate}`,
        sortable: true,
        maxWidth: "150px",
        cell: (row) => {
          return <span>{Moment(row.startDate).format("DD-MM-YYYY")}</span>;
        },
      },

      {
        name: "Location",
        selector: (row) => `${row.address}`,
        sortable: true,
        maxWidth: "200px",
      },
      {
        name: "Phone number",
        selector: (row) => `${row.phoneNumber}`,
        sortable: true,
        maxWidth: "150px",
      },
      {
        name: "Actions",
        sortable: false,
        maxWidth: "250px",
        cell: (row) => {
          return (
            <div>
              <CTooltip content="Edit Event">
                <NavLink
                  to={`/events/edit/${row.eventId}`}
                  className="btn btn btn-sm btn-info mt-2 me-1"
                >
                  <CIcon size={"sm"} icon={cilPen} />
                </NavLink>
              </CTooltip>
              <CTooltip content="User's Event">
                <NavLink
                  to={`/events/user_list/${row.eventId}`}
                  className="btn btn btn-sm btn-primary mt-2 me-1"
                >
                  <CIcon size={"sm"} icon={cilUser} />
                </NavLink>
              </CTooltip>
              <CTooltip content="Delete Event">
                <button
                  type="button"
                  onClick={(e) => {
                    this.deleteEvent(row.eventId);
                  }}
                  className="btn btn-sm btn-danger mt-2 me-1"
                >
                  <CIcon size={"sm"} icon={cilTrash} />
                </button>
              </CTooltip>
            </div>
          );
        },
      },
    ],
  };

componentDidMount() {
    const param = {
      order: 2,
      page: 1,
    };
    this.props.onEventList(param);
  }

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  deleteEvent(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        this.props.onEventDelete(id, "");
        const param = {
          order: 7,
          page: 1,
        };
        await this.delay(1000);
        this.props.onEventList(param);
        swal("Your Details  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your details are Safe");
      }
    });
  }

  getSubHeaderComponent = () => {
    return (
      <CRow className="mb-3">
        <CCol sm={12}>
          <CFormInput
            onChange={(e) => {
              let newFilterText = e.target.value;
              this.setState({ filterText: newFilterText });
              this.props.onEventListFilter(newFilterText);
            }}
            value={this.state.filterText}
            size="sm"
            placeholder="search..."
          />
        </CCol>
      </CRow>
    );
  };

  render() {
    return (
      <CCard>
        <CCardHeader className="d-flex" component="h5">
          <div className="col-sm">Event List</div>
          <div className="col-sm text-end">
            <CTooltip content="Add Event">
              <NavLink
                to={"/events/add/"}
                type="button"
                className="btn btn-sm btn-primary mt-2 me-1"
              >
                <CIcon size={"sm"} icon={cilPlus} />
              </NavLink>
            </CTooltip>
          </div>
        </CCardHeader>
        <CCardBody>
          <DataTable
            columns={this.state.columnEvent}
            data={this.props.data}
            defaultSortFieldId={7}
            defaultSortAsc={false}
            progressPending={this.props.loading}
            pagination
            paginationResetDefaultPage={this.state.resetPaginationToggle}
            subHeader
            subHeaderComponent={this.getSubHeaderComponent()}
            theme="solarized"
            striped
          />
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
    token: state.auth.token,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onEventList: (param) => dispatch(actions.eventList(param)),
    onEventListFilter: (text) => dispatch(actions.eventListFilter(text)),
    onEventDelete: (id, token) => dispatch(actions.eventDelete(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(EventList);
