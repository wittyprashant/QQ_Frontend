import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CRow,
  CCol,
  CFormSelect,
  CTooltip,
  CBadge,
  CImage,
  CAvatar,
  CTable,
  CTableRow,
  CTableDataCell,
  CTableHeaderCell,
  CTableHead,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
} from "@coreui/react";
import { CButton } from "@coreui/react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import Moment from "moment";
import swal from "sweetalert";
import * as actions from "../../store/actions";
import { NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from "../../store/Utility";

import {
  cilEyedropper,
  cilArrowRight,
  cilCheckAlt,
  cilXCircle,
  cilX,
  cilPencil,
  cilCheckCircle,
  cilInfo,
  cilSend,
  cilSearch,
} from "@coreui/icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatar8 from "./../../assets/Images/avatars/default_user.png";
import filter from "./../../assets/Images/filter.png";
import leftarrow from "./../../assets/Images/leftarrow.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import HistoryIcon from "@mui/icons-material/History";
import edit from "./../../assets/Images/whiteedit.png";
import Header from "../../components/partials/Header";
import { FaCalendarAlt, FaEdit, FaRegQuestionCircle } from "react-icons/fa";
import axios from "axios";

const historydata = [
  {
    EditBy: "Edited By Daniel K",
    date: " 20 Oct 2022",
  },
];
class Transaction extends Component {
  handleChange = async (event, newValue) => {
    this.setState({ value: newValue });

    if (newValue === 1) {
      this.setState({ commentTextVisible: true, historyTextVisible: false });
    } else if (newValue === 2) {
      this.setState({ historyTextVisible: true, commentTextVisible: false });
    }
  };
  handledropdown = (event) => {
    this.setState({ job: event.target.value });
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  };
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      resetPaginationToggle: false,
      value: 0,
      detailsTextVisible: false,
      commentTextVisible: false,
      HistoryTextVisible: false,
      modalVisible: false,
      showDropdown: false,
      job: "",
      selectedStatustrans: 'ALL',
      selectedButton: null,
      filterVisible: true,
      filterMarginLeft: "20px",
      items: [
        { query: "Expense Type", value: "" },
        { query: "Job Number", value: "" },
        { query: "Invoice Required", value: "" },
        { query: "Invoice Status", value: "" },
      ],
      columnTransaction: [
        {
          name: "Date",
          selector: (row) => `${row.createdOn}`,
          sortable: true,
          cell: (row) => {
            return <span>{row.DateString}</span>;
          },
        },
        {
          name: "Description",
          selector: (row) => {
            const bankAccountName = row.BankAccount
              ? row.BankAccount.Name
              : "No Account Name";
            return `${row.BankTransactionID} - ${bankAccountName}`;
          },
          sortable: true,
        },
        {
          name: "Amount",
          selector: (row) => "$" + `${row.Total}`,
          sortable: true,
        },
        {
          name: "Invoice",
          selector: (row) => {
            if (row.IsReconciled) {
              return (
                <CIcon
                  icon={cilCheckAlt}
                  style={{ color: "green", fontSize: "20px" }}
                  className="checkicon"
                />
              );
            } else {
              return (
                <CIcon
                  icon={cilX}
                  style={{ color: "red", fontSize: "20px" }}
                  className="crossicon"
                />
              ); // or you can return another icon or text if needed
            }
          },
          sortable: true,
        },
        {
          name: "Assigned To",
          selector: (row) => (
            <div>
              <CAvatar src={avatar8} size="md" /> {"Daniel K."}{" "}
            </div>
          ),
          sortable: true,
        },
        {
          name: "Status",
          selector: (row) => {
            let badgeColor = "info"; // default color
            if (row.Status === "AUTHORISED") {
              badgeColor = "success"; // green
            } else if (row.Status === "VOIDED") {
              badgeColor = "danger"; // red
            }
            return (
              <CBadge color={badgeColor} shape="rounded-pill">
                {row.Status}
              </CBadge>
            );
          },
          sortable: true,
        },
        {
          sortable: true,
          cell: (row) => {
            return (
              <div>
                <CTooltip content="Details">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      this.toggleVisibility(
                        [3, 4, 5],
                        ["assignedTo", "invoice", "status"],
                        "60%"
                      );
                      this.fetchTransactionDetail(row.BankTransactionID);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      fontSize: "12px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    Details{" "}
                  </button>
                </CTooltip>
              </div>
            );
          },
        },
      ],
      hiddenColumns: [],
      hiddenParagraphs: [],
      isCardVisible: false,
      visible: false,
      modalVisible: null,
      isCardclose: true,
      cardWidth: "100%",
      BankTranscationAccounts: [],
      columnsVisible: true,
      messages: [
        {
          id: 1,
          sender: "Daniel K.",
          text: "Duis congue velit elit, at accumsan nisi malesuada fermentum.",
          type: "sent",
        },
        {
          id: 2,
          sender: "Rachel L.",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. .",
          type: "received",
        },
      ],
      newMessage: "",
      transactionStatus: [
        { value: "VOIDED", label: "VOIDED" },
        { value: "AUTHORISED", label: "AUTHORISED" },
        { value: "DELETED", label: "DELETED" },
      ],
      transactionType: [
        { value: "SPEND", label: "SPEND" },
        { value: "AUTHORISED", label: "AUTHORISED" },
        { value: "DELETED", label: "DELETED" },
      ],
      selectedStatus: "",
      selectedType: "",
      startDate: null,
      transactionDetail: null,
      selectedTransactionId: null,
      filterText: "",
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.fetchTransactionDetail = this.fetchTransactionDetail.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChanged = this.handleChanged.bind(this);
    this.toggleCardVisibility = this.toggleCardVisibility.bind(this);
    this.toggleVisibilitycard = this.toggleVisibilitycard.bind(this);
  }
  handleButtonClick = (buttonName) => {
    this.setState({ selectedButton: buttonName });
  };
  handleSelectChange = (event) => {
    this.setState({ selectedStatus: event.target.value });
  };
  handleSelectChangeType = (event) => {
    this.setState({ selectedType: event.target.value });
  };
  handleSubmit = () => {
    const { selectedStatus, selectedType, startDate, endDate } = this.state;
    const filterParams = {
      status: selectedStatus.toString(),
      type: selectedType.toString(),
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
      // order: 2,
      // page: 1,
    };
    
    this.props.onTransactionList(filterParams);
    this.setState({ modalVisible: false });
    //this.toggleModal('filter');
  };
  handleSendMessage = () => {
    const { messages, newMessage } = this.state;
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        sender: "Daniel K.",
        text: newMessage,
        type: "sent",
      };
      this.setState({
        messages: [...messages, newMsg],
        newMessage: "",
      });
    }
  };

  handleChanged = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ startDate: date });
  };
  handleDateChangeend = (date) => {
    this.setState({ endDate: date });
  };
  toggleCardVisibility = (cardWidth) => {
    // Hide columns 3, 4, 5 and adjust card width
    this.toggleVisibilitycard([3, 4, 5], cardWidth);

    const { filterVisible } = this.state;
    this.setState((prevState) => ({
      isCardclose: !prevState.isCardclose,
      cardWidth: prevState.isCardclose ? "100%" : cardWidth, // Toggle between full and custom width
      filterVisible: filterVisible,
      filterMarginRight: filterVisible ? "3%" : "0%",
    }));
  };
  filterTableData = (data, statusFilter, filterText) => {
    if (!Array.isArray(data)) {
      console.warn("Data is not an array:", data);
      return []; // Return empty array if data is not an array
    }
  
    // Filter by status first
    let filteredData = statusFilter === "ALL" ? data : data.filter(row => row.Status === statusFilter);
  
    // Then filter by filterText
    return filteredData.filter((item) => {
      const BankTransactionID = item.BankTransactionID || ""; // Default to empty string if undefined
      const status = item.Status || ""; // Default to empty string if undefined
      
      return (
        BankTransactionID.toLowerCase().includes(filterText.toLowerCase()) ||
        status.toLowerCase().includes(filterText.toLowerCase())
      );
    });
  };
  handleFilterTextChange = (event) => {
    this.setState({ filterText: event.target.value });
  };
  toggleModal = (id) => {
    this.setState((prevState) => ({
      modalVisible: prevState.modalVisible === id ? null : id, // Toggle the modal visibility
    }));
  };
  toggleVisibilitycard = (columnIndices, cardWidth) => {
    const { hiddenColumns, isCardVisible } = this.state;
    let updatedHiddenColumns = [...hiddenColumns];
    let updatedCardVisibility = !isCardVisible;

    // Toggle visibility for specified columns
    columnIndices.forEach((columnIndex) => {
      const columnIndexInHidden = updatedHiddenColumns.indexOf(columnIndex);
      if (columnIndexInHidden !== -1) {
        updatedHiddenColumns.splice(columnIndexInHidden, 1); // Remove from hidden columns (make visible)
      } else {
        updatedHiddenColumns.push(columnIndex); // Add to hidden columns (hide)
      }
    });

    // Set card width based on visibility state
    const updatedCardWidth = updatedCardVisibility ? cardWidth : "100%";

    this.setState({
      hiddenColumns: updatedHiddenColumns,
      isCardVisible: updatedCardVisibility,
      cardWidth: updatedCardWidth,
    });
  };

  toggleVisibility = (columnIndices, paragraphIds, cardWidth) => {
    const { hiddenColumns, isCardVisible } = this.state;
    let updatedHiddenColumns = isCardVisible ? [...hiddenColumns] : [0, 1, 2]; // Indices of Date, Description, Amount columns

    // Toggle visibility for specified columns
    columnIndices.forEach((columnIndex) => {
      const columnIndexInHidden = updatedHiddenColumns.indexOf(columnIndex);
      if (columnIndexInHidden !== -1) {
        // Column is visible, so remove from hiddenColumns
        updatedHiddenColumns.splice(columnIndexInHidden, 1);
      } else {
        // Column is hidden, so add to hiddenColumns
        updatedHiddenColumns.push(columnIndex);
      }
    });

    // Adjust the card's visibility and width
    this.setState({
      hiddenColumns: updatedHiddenColumns,
      isCardVisible: !isCardVisible,
      cardWidth: !isCardVisible ? cardWidth : "100%", // Set the width to 100% or the provided width
    });
  };

  componentDidMount() {
    const param = {
      order: 2,
      page: 1,
    };
    this.props.onTransactionList(param);
    this.BankAccountTransactionDetails();
  }
  BankAccountTransactionDetails() {
    axios
      .get("http://localhost:8080/api/v1/transaction/bankDetails")
      .then((response) => {
        const transactionDatabank = response.data.data;

        // Ensure the state is updated properly
        this.setState({ BankTranscationAccounts: transactionDatabank }, () => {
          console.log(
            "Updated Bank Transaction Accounts:",
            this.state.BankTranscationAccounts
          );
        });
      })
      .catch((error) =>
        console.log("Error fetching bank transaction details:", error)
      );
  }

  formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`); // Parse the time string
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format it to HH:MM
  };
  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  fetchTransactionDetail = async (id) => {
    try {
      const response = await this.props.getransactionDetail(id); // Await the API call
      if (response && response.data && response.data.data) {
        const transactionData = response.data.data; // Store the whole transaction data

        this.setState({ transactionDetail: transactionData });
      } else {
        console.log("Response or response.data is undefined:", response);
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  deleteTransaction(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        this.props.onTransactionDelete(id, "");
        const param = {
          order: 5,
          page: 1,
        };
        await this.delay(1000);
        this.props.onTransactionList(param);
        swal("Your Details  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your details are Safe");
      }
    });
  }

  render() {
    const { data, label } = this.props;
    const {
      columnTransaction,
      hiddenColumns,
      isCardVisible,
      transactionDetail,
      BankTranscationAccounts,
      isCardclose,
      items,
      messages,
      newMessage,
      modalVisible,
      selectedStatus,
      transactionStatus,
      transactionType,
      selectedType,
      startDate,
      filterText,
      selectedStatustrans,
      endDate,
    } = this.state;
    const {
      value,
      commentTextVisible,
      showDropdown,
      job,
      HistoryTextVisible,
      selectedButton,
      filterVisible,
      filterMarginRight,
    } = this.state;

    const filteredData = this.state.filterText
      ? data.filter((item) => {
          const idMatch =
            item.bankTransactionID !== undefined &&
            item.bankTransactionID.toString().includes(this.state.filterText);
          const statusMatch =
            item.Status &&
            item.Status.toLowerCase().includes(
              this.state.filterText.toLowerCase()
            );

          return idMatch || statusMatch;
        })
      : data;

    return (
      <div>
        <div class="header-dropdown">
          <Header
            headerText="Transactions"
            dropdownContent={
              <div className="custom-dropdown-content">
                <CRow>
                  <div className="logo-dropdown">
                    <CFormSelect>
                      <option>Select a Bank Account</option>
                      {BankTranscationAccounts &&
                      BankTranscationAccounts.length > 0 ? (
                        BankTranscationAccounts.map((account) => (
                          <option
                            key={account.AccountID}
                            value={account.AccountID}
                          >
                            {account.Name}
                          </option>
                        ))
                      ) : (
                        <option>Loading accounts...</option>
                      )}
                    </CFormSelect>
                  </div>
                </CRow>
              </div>
            }
          />
        </div>

        <div class="search-section">
          {
            <CRow className="mb-3">
              <CCol sm={12}>
                <CFormInput
                  onChange={this.handleFilterTextChange} // Update filterText when input changes
                  value={filterText}  // Bind input value to filterText state
                  icon={cilSearch}
                  size="sm"
                  className="inputsearch"
                  placeholder="Search..."
                />
              </CCol>
            </CRow>
          }

          {filterVisible && (
            <div
              class="filter-section"
              style={{ marginRight: filterMarginRight }}
              onClick={() => this.toggleModal("filter")}
            >
              <p class="filter-text">Filters</p>
              <img src={filter} className="filter-icon" />
            </div>
          )}
        </div>
        <CModal
          visible={modalVisible === "filter"}
          onClose={() => this.toggleModal("filter")}
          className="tablemodalboxfilter"
        >
          <CModalHeader>
            <h5>Filter</h5>
          </CModalHeader>
          <CModalBody>
            <div>
              <p class="typtx">Status:</p>
              <CFormSelect
                onChange={this.handleSelectChange}
                value={selectedStatus}
              >
                <option value="">Select a Transaction Status</option>
                {transactionStatus.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div>
              <p class="typtx">Start_date:</p>
              <div className="date-picker-wrapper">
                <DatePicker
                  selected={startDate}
                  onChange={this.handleDateChange}
                  className="date-picker-input"
                  placeholderText="Select Start date"
                />
              </div>
            </div>
            <div>
              <p class="typtx">End_date:</p>
              <DatePicker
                selected={endDate}
                onChange={this.handleDateChangeend}
                className="date-picker-input"
                placeholderText="Select End date"
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={this.handleSubmit}>
              Save changes
            </CButton>
          </CModalFooter>
        </CModal>
        <DataTable
          columns={this.state.columnTransaction}
          data={this.filterTableData(filteredData, selectedStatustrans, filterText)}
          defaultSortFieldId={5}
          defaultSortAsc={false}
          progressPending={this.props.loading}
          pagination
          paginationResetDefaultPage={this.state.resetPaginationToggle}
          className="trasaction_data_table"
          onChangePage={this.handlePageChange}
          theme="solarized"
          striped
          style={{ width: this.state.cardWidth }}
        />

        {isCardVisible && isCardclose && (
          <CCard
            className="card-right-side"
            style={{
              width: "400px",
              position: "absolute",
              top: "12%",
              right: "0",
            }}
          >
            <CCardBody>
              <div>
                <div class="text-img">
                  <p class="text-close" onClick={this.toggleCardVisibility}>
                    close
                  </p>
                  <img alt="image-arrow" src={leftarrow} class="arrow-img" />
                </div>

                {transactionDetail ? (
                  <>
                    <p className="dollar-amt">-${transactionDetail.Total}</p>
                    <p className="traction-text">
                      {transactionDetail.BankTransactionID}{" "}
                    </p>
                    <p className="compny-text">
                      company:{transactionDetail.company}
                    </p>
                    <p className="traction-text">
                      {this.formatDate(transactionDetail.Date)}
                    </p>
                    <p className="sydtime-text">{transactionDetail.Date}</p>
                    <p className="sydtime-text">
                      Receipt #: {transactionDetail.receiptNumber}
                    </p>

                    <div class="border-bottom fullbrder"></div>
                    <div class="avatar-badge">
                      <CAvatar src={avatar8} size="md" />
                      <p class="dum-text">{transactionDetail.Contact.Name}</p>
                      <div className="badge-ready">
                        <CBadge
                          color="success"
                          shape="rounded-pill"
                          style={{ width: "120%" }}
                        >
                          READY
                        </CBadge>
                      </div>
                    </div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}

                <div>
                  <p class="query-text">Query Details</p>
                  <CTable class="transcationtble">
                    <CTableRow className="exptble">
                      <CTableHeaderCell className="headertble">
                        Expense Type
                      </CTableHeaderCell>
                      <CTableDataCell className="datatxt">
                        Business
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton color="#000F24" className="btnEdit">
                          Edit
                          <FaEdit className="edticon" />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          className="iconchck"
                          icon={cilCheckCircle}
                          color="#00C365"
                        />
                      </CTableDataCell>
                    </CTableRow>

                    <CTableRow className="exptble">
                      <CTableHeaderCell className="headertble">
                        Account
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        <CButton color="#000F24" className="btnedit">
                          Assign
                          <FaEdit className="edticon" />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <FaRegQuestionCircle color="#FFBB56" />
                      </CTableDataCell>
                    </CTableRow>

                    <CTableRow className="exptble">
                      <CTableHeaderCell className="headertble">
                        GST Code
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        <CButton color="#000F24" className="btnedit">
                          Assign
                          <FaEdit className="edticon" />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <FaRegQuestionCircle color="#FFBB56" />
                      </CTableDataCell>
                    </CTableRow>

                    <CTableRow className="exptble">
                      <CTableHeaderCell className="headertble">
                        Job Number
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="#000F24"
                          className="btnedit"
                          onClick={() => this.toggleModal("jobNumber")}
                        >
                          Assign
                          <FaEdit className="edticon" />
                        </CButton>
                        <CModal
                          visible={modalVisible === "jobNumber"}
                          onClose={() => this.toggleModal("jobNumber")}
                          className="tablemodalbox"
                        >
                          <CModalHeader>
                            <h5>Assign Job Number</h5>
                          </CModalHeader>
                          <CModalBody>
                            <CFormSelect>
                              <option>Select an Account</option>
                              <option value="1">Option 1</option>
                              <option value="2">Option 2</option>
                              <option value="3">Option 3</option>
                            </CFormSelect>
                          </CModalBody>
                        </CModal>
                      </CTableDataCell>
                      <CTableDataCell>
                        <FaRegQuestionCircle color="#FFBB56" />
                      </CTableDataCell>
                    </CTableRow>

                    <CTableRow className="exptble">
                      <CTableHeaderCell className="headertble">
                        Invoice
                      </CTableHeaderCell>
                      <CTableDataCell className="datatxt">
                        Matched
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="#000F24"
                          className="btnEdit"
                          onClick={() => this.toggleModal("invoice")}
                        >
                          Edit
                          <FaEdit className="edticon" />
                        </CButton>
                        <CModal
                          visible={modalVisible === "invoice"}
                          onClose={() => this.toggleModal("invoice")}
                          className="tablemodalbox"
                        >
                          <CModalHeader>
                            <h5>Edit Invoice</h5>
                          </CModalHeader>
                          <CModalBody>
                            <CFormSelect>
                              <option>Select an Account</option>
                              <option value="1">Option 1</option>
                              <option value="2">Option 2</option>
                              <option value="3">Option 3</option>
                            </CFormSelect>
                          </CModalBody>
                        </CModal>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon className="iconchck" icon={cilCheckCircle} />
                      </CTableDataCell>
                    </CTableRow>

                    <CTableRow>
                      <CTableHeaderCell className="headertble">
                        What is this expense for?
                      </CTableHeaderCell>
                      <CTableDataCell></CTableDataCell>
                      <CTableDataCell>
                        <CButton color="#000F24" className="btnEdit">
                          Edit
                          <FaEdit className="edticon" />
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell>
                        <FaRegQuestionCircle color="#FFBB56" />
                      </CTableDataCell>
                    </CTableRow>
                  </CTable>

                  <p class="dumpy-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam condimentum congue leo, ac gravida magna fermentum a.
                    Duis congue velit elit, at accumsan nisi malesuada
                    fermentum.{" "}
                  </p>
                  <div class="border-bottom"></div>
                  <div class="buton-edit">
                    <button class="btn-edt" onClick={this.toggleDropdown}>
                      Record Transaction
                    </button>
                  </div>
                  {!showDropdown ? (
                    ""
                  ) : (
                    <div>
                      <p class="what-you-want">Select what you want to do</p>
                      <div class="select-dropdown">
                        <Select
                          value={job}
                          className="edit-select-box"
                          onChange={this.handledropdown}
                          displayEmpty
                        >
                          <MenuItem value="">
                            <em>Select Account</em>
                          </MenuItem>
                          <MenuItem value={10}>Assign Job Number</MenuItem>
                          <MenuItem value={20}>Assign GST Code</MenuItem>
                          <MenuItem value={30}>Assign Account Number</MenuItem>
                          <MenuItem value={40}>Record Transaction</MenuItem>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
                <div class="tab-section">
                  <Tabs
                    value={value}
                    onChange={this.handleChange}
                    class="Tab-bar"
                    style={{ height: "40px" }}
                    TabIndicatorProps={{ style: { background: "transparent" } }}
                  >
                    <Tab
                      label="Comments"
                      iconPosition="start"
                      icon={<HistoryIcon />}
                      style={{
                        height: "40px",
                        fontSize: "12px",
                        paddingleft: "22px",
                      }}
                      className="transction-tab-button"
                      select={selectedButton === "button2" ? "selected" : ""}
                      onClick={() => this.handleButtonClick("button2")}
                    />
                    <Tab
                      label="History"
                      iconPosition="start"
                      icon={<HistoryIcon />}
                      style={{
                        height: "40px",
                        fontSize: "12px",
                        paddingleft: "30px",
                      }}
                      className="transction-tab-button"
                      select={selectedButton === "button3" ? "selected" : ""}
                      onClick={() => this.handleButtonClick("button3")}
                    />
                  </Tabs>
                </div>
                {commentTextVisible ? (
                  <div
                    style={{
                      padding: "20px",
                      maxWidth: "600px",
                      margin: "0 auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "20px",
                      }}
                    >
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          style={{
                            alignSelf:
                              msg.type === "sent" ? "flex-end" : "flex-start",
                            background:
                              msg.type === "sent" ? "#00aaff" : "#e0e0e0",
                            color: msg.type === "sent" ? "#fff" : "#000",
                            borderRadius: "10px",
                            padding: "10px",
                            marginBottom: "10px",
                            maxWidth: "80%",
                          }}
                        >
                          <div>{msg.text}</div>
                          <div
                            style={{
                              fontSize: "0.8em",
                              textAlign: "right",
                              marginTop: "5px",
                            }}
                          >
                            {msg.sender}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={this.handleChanged}
                        placeholder="Textbox"
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <button
                        onClick={this.handleSendMessage}
                        style={{
                          color: "#00C0F3",
                          border: "none",
                          right: "45px",
                          marginTop: "1px",
                          position: "absolute",
                        }}
                      >
                        <CIcon icon={cilSend} />
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {HistoryTextVisible ? (
                  ""
                ) : (
                  <div class="history section">
                    <CTable className="rotate-table">
                      <CTableHead>
                        {historydata.map((item, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell class="querytable-text">
                              {item.EditBy}
                            </CTableHeaderCell>
                            <CTableHeaderCell class="valuetable-text">
                              {item.date}
                            </CTableHeaderCell>
                          </CTableRow>
                        ))}
                      </CTableHead>
                    </CTable>
                  </div>
                )}
              </div>
            </CCardBody>
            {/* Card content */}
          </CCard>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.transaction.loading,
    data: state.transaction.data,
    error: state.transaction.error,
    token: state.auth.token,
    transactionStatus: state.transactionStatus,
    transactionType: state.transactionType,
    transactionDetail: state.transaction.data,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    onTransactionList: (param) => dispatch(actions.transactionList(param)),
    onTransactionFilterList: (text) =>
      dispatch(actions.transactionListFilter(text)),
    onTransactionDelete: (id, token) =>
      dispatch(actions.transactionDelete(id, token)),
    getransactionDetail: (id, token) =>
      dispatch(actions.gettransactionDetail(id, token)),
    // getBankAccountDetails:() => dispatch(actions.getBankAccountDeatils())
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Transaction);
