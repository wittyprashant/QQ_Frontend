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
import { cilPen, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class Funding extends Component {

    state = {
        filterText: "",
        resetPaginationToggle: false,
        columnFunding: [
            {
                name: 'Title',
                sortable: true,
                selector: row => `${row.title}`,
                width: "300px",
            },
            {
                name: 'Due Date',
                selector: row => `${row.dueDate}`,
                sortable: true,
                width: "150px",
            },

            {
                name: 'Category',
                selector: row => `${row.category}`,
                sortable: true,
                width: "150px",
            },
            {
                name: 'Date',
                selector: row => `${row.createOn}`,
                sortable: true,
                width: "150px",
                cell: row => {
                    return (
                        <span>{Moment(row.createOn).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                width: "250px",
                cell: row => {
                    return (
                        <div>
                            {/* <NavLink to={`/funding/edit/${row.fundingId}`} onClick={(e) => { this.GetbyFundingforms(row.fundingId) }} className="btn btn btn-sm btn-info mt-2 me-1">Edit</NavLink>
                            <button type="button" onClick={(e) => { this.deleteFund(row.fundingId) }} className="btn btn-sm btn-danger mt-2">Delete</button> */}
                            <CTooltip content="Edit Fund"><NavLink to={`/funding/edit/${row.fundingId}`} onClick={(e) => { this.GetbyFundingforms(row.fundingId) }} className="btn btn btn-sm btn-info mt-2 me-1"><CIcon size={'sm'} icon={cilPen} /></NavLink></CTooltip>
                            <CTooltip content="Delete Fund"><button type="button" onClick={(e) => { this.deleteFund(row.fundingId) }} className="btn btn-sm btn-danger mt-2"><CIcon size={'sm'} icon={cilTrash} /></button></CTooltip>
                        </div>
                    )
                }
            },
        ]
    }
    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    componentDidMount() {
        const token = this.props.token
        const param = {
            order: 2,
            page: 1
        }
        this.props.onFundList(param, token)
    }

    deleteFund(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.props.onFundDelete(id, "")
                    const token = this.props.token
                    const param = {
                        order: 6,
                        page: 1
                    }
                    await this.delay(1000)
                    this.props.onFundList(param, token)
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
                    this.props.onFundListFilter(newFilterText);
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
                    <div className="col-sm">Funding List</div>
                    <div className="col-sm text-end">
                        {/* <NavLink to="/funding/add" type="button" className="btn btn btn-primary btn-sm">Add Fund</NavLink> */}
                        <CTooltip content="Add Fund"><NavLink to="/funding/add" type="button" className="btn btn btn-primary btn-sm"><CIcon size={'sm'} icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnFunding}
                        data={this.props.data}
                        defaultSortFieldId={6}
                        defaultSortAsc={false}
                        progressPending={this.props.loading}
                        pagination
                        paginationResetDefaultPage={this.state.resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={this.getSubHeaderComponent()}
                        // selectableRows
                        // paginationServer
                        // paginationTotalRows="11"
                        // onChangePage={this.handlePageChange}
                        persistTableHead
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
        loading: state.fund.loading,
        data: state.fund.data,
        error: state.fund.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onFundList: (param) => dispatch(actions.fundList(param)),
        onFundListFilter: (filterText) => dispatch(actions.fundListFilter(filterText)),
        onFundDelete: (id, token) => dispatch(actions.fundDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Funding)