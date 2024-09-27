import React, { Component } from "react";
import { connect } from "react-redux";
import { CCard, CCardHeader, CCardBody, CTooltip } from "@coreui/react";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import * as actions from "../../store/actions";
import { cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

class ContactList extends Component {
  state = {
    columnContact: [
      {
        name: "Name",
        selector: (row) => `${row.name}`,
        sortable: true,
        width: "200px",
      },
      {
        name: "Email",
        selector: (row) => `${row.emailId}`,
        sortable: true,
        width: "200px",
      },
      {
        name: "Message",
        sortable: true,
        selector: (row) => `${row.message}`,
        width: "300px",
      },
      {
        name: "Action",
        sortable: false,
        width: "100px",
        cell: (row) => {
          return (
            <div>
              <CTooltip content="Delete">
                <button
                  type="button"
                  onClick={(e) => {
                    this.deleteContact(row.id);
                  }}
                  className="btn btn-sm btn-danger mt-2"
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
    const token = this.props.token;
    const param = {
      order: 2,
      page: 1,
    };
    this.props.onContactList(param, token);
  }

  deleteContact(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.onContactDelete(id, "");
        const token = this.props.token;
        const param = {
          order: 2,
          page: 1,
        };
        this.props.onContactList(param, token);
        swal("Your Details  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your details are Safe");
      }
    });
  }

  render() {
    return (
      <CCard>
        <CCardHeader className="d-flex" component="h5">
          <div className="col-sm">Contact List</div>
        </CCardHeader>
        <CCardBody>
          <DataTable
            columns={this.state.columnContact}
            data={this.props.data}
            defaultSortFieldId={4}
            progressPending={this.props.loading}
            pagination
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
    loading: state.group.loading,
    data: state.group.data,
    error: state.group.error,
    token: state.auth.token,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onContactList: (param, token) =>
      dispatch(actions.contactList1(param, token)),
    onContactDelete: (id, token) => dispatch(actions.contactDelete(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(ContactList);
