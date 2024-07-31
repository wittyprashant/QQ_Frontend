import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CFormInput,
    CRow,
    CCol,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';
import swal from 'sweetalert';

import * as actions from '../../store/actions'
import { NavLink } from 'react-router-dom';
import { cilPen, cilReportSlash, cilTrash,cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class GroupList extends Component {

    state = {
        filterText: "",
        resetPaginationToggle: false,
        columnGroup: [
            {
                name: 'Name',
                selector: row => `${ row.groupName }`,
                sortable: true,
                width: "300px",
            },
            {
                name: 'Category',
                selector: row => `${ row.categoryName }`,
                sortable: true,
                width: "250px",

            },
            {
                name: 'Date',
                selector: row => `${ row.createdOn }`,
                sortable: true,
                width: "200px",
                cell: row => {
                    return (
                        <span>{Moment(row.createdOn).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                width: "150px",
                cell: row => {
                    return (
                        <div>
                            {/*                             
                            <NavLink to={"/group_management/edit/"+row.groupId} type="button" className="btn btn-sm btn-info mt-2 me-1">Edit Group</NavLink>
                            <button type="button" onClick={(e) => { this.deleteGroup(row.groupId) }} className="btn btn-sm btn-danger mt-2">Delete</button>
                            {(row.categoryName === "Book studies" || row.categoryName ==="Challenges") &&
                            <NavLink to={"/group_activity_management/"+row.categoryName+"/"+row.groupId} type="button" className="btn btn-sm btn-success mt-2 me-1">Activities</NavLink>
                            }
                             */}
                            <CTooltip content="Edit Group"><NavLink to={"/group_management/edit/"+row.groupId} type="button" className="btn btn-sm btn-info mt-2 me-1"><CIcon size={'sm'}  icon={cilPen} /></NavLink></CTooltip>
                            <CTooltip content="Delete Group"><button type="button" onClick={(e) => { this.deleteGroup(row.groupId) }} className="btn btn-sm btn-danger mt-2 me-1"><CIcon size={'sm'}  icon={cilTrash} /></button></CTooltip>
                            {/* {(row.categoryName === "Book studies" || row.categoryName ==="Challenges") && */}
                                <CTooltip content="Activities"><NavLink to={"/group_activity_management/"+row.categoryName+"/"+row.groupId} type="button" className="btn btn-sm btn-success mt-2 me-1"><CIcon size={'sm'}  icon={cilReportSlash} /></NavLink></CTooltip>
                            {/* } */}
                            
                        </div>

                    )
                }
            },
        ]
    }

    componentDidMount() {
        const param = {
            order: 2,
            page: 1
        }
        this.props.onGroupList(param)
    }

    deleteGroup(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.onGroupDelete(id, "")
                    const param = {
                        order: 2,
                        page: 1
                    }
                    this.props.onGroupList(param)
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
                    this.props.onGroupFilterList(newFilterText);
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
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Group List</div>
                    <div className="col-sm text-end">
                    {/* <NavLink to="/group_category_management" type="button" className="btn btn btn-primary btn-sm mt-2 me-1">Categories</NavLink>  */}
                    <CTooltip content="Add Group"><NavLink to={"/group_management/add/"} type="button" className="btn btn-sm btn-primary mt-2 me-1"><CIcon size={'sm'}  icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnGroup}
                        data={this.props.data}
                        defaultSortFieldId={7}
                        progressPending={this.props.loading}
                        pagination
                        paginationResetDefaultPage={this.state.resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={this.getSubHeaderComponent()}
                        // paginationServer
                        // paginationTotalRows="11"
                        // onChangePage={this.handlePageChange}
                        theme="solarized"
                        striped
                    />

                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.group.loading,
        data: state.group.data,
        error: state.group.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onGroupList: (param) => dispatch(actions.groupList(param)),
        onGroupFilterList: (text) => dispatch(actions.groupListFilter(text)),
        onGroupDelete: (id, token) => dispatch(actions.groupDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(GroupList)