import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
} from "react-router-dom";
import {
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';

import * as actions from '../../store/actions'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/events/user_list/:eventId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class UserList extends Component {
    // constructor(props){
    //     super(props)
    state = {
        mounted: false,
        columnMember: [
            {
                name: 'First Name',
                selector: row => `${row.firstName}`,
                sortable: true,
                cell: row => {
                    return (
                        <div>
                            <img alt={row.firstName} width={'50px'} height={'50px'} src={row.profileImage}></img> {row.firstName}
                        </div>
                    )
                }
            },
            {
                name: 'Last Name',
                selector: row => `${row.lastName}`,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => `${row.email}`,
                sortable: true,
            },
            {
                name: 'Mobile Number',
                selector: row => `${row.mobile}`,
            },
            {
                name: 'Address',
                selector: row => `${row.address}`,
                sortable: true,
            },
            {
                name: 'RoleName',
                selector: row => `${row.roleName}`,
                sortable: true,
            },
            {
                name: 'Create Date',
                selector: row => `${row.createdOn}`,
                sortable: true,
                cell: row => {
                    return (
                        <span>{Moment(row.createdOn).format('DD-MM-YYYY')}</span>
                    )
                }
            }
        ]
    }
    // }

    // handlePageChange = page => {
    //     const token = this.props.token
    //     const param = {
    //         order: 0,
    //         page: page
    //     }
    //     this.props.onUserList(param, token)
    // };

    componentDidMount() {
        let eventId = this.props.match ? this.props.match.params.eventId : ""
        this.props.onUserList(eventId)
    }

    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Event Register User</div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnMember}
                        data={this.props.data}
                        defaultSortFieldId={7}
                        defaultSortAsc={"flase"}
                        progressPending={this.props.loading}
                        pagination
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
        loading: state.event.userListLoading,
        data: state.event.userListData,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onUserList: (id) => dispatch(actions.eventUserList(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(UserList))