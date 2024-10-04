import React, { useState, useEffect,Componen, Component } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
  CCard,
    CCardBody,
    CRow,
    CFormSelect,
    CTooltip,
    CBadge,
    CButton,
    CAvatar,
    CTable,CTableRow,CTableDataCell,CTableHeaderCell,CTableHead,
    CModal,
    CModalHeader,
    CModalBody,
    CCol,
    CFormInput,
} from "@coreui/react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { cilCheckCircle, cilSend, cilCalendar, cilSearch } from '@coreui/icons';
import CIcon from "@coreui/icons-react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import leftarrow from '../../../assets/Images/leftarrow.png';
// import rightarrow from '../../../assets/Images/rightarrow.png';
import avatar8 from '../../../assets/Images/avatars/default_user.png'
import filter from '../../../assets/Images/filter.png';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import HistoryIcon from '@mui/icons-material/History';
import edit  from '../../../assets/Images/whiteedit.png';
import Header from '../../../components/partials/Header';
import { FaCalendarAlt, FaEdit, FaRegQuestionCircle } from 'react-icons/fa';
import Transaction from "../../../containers/Transaction";
import { Button, ButtonGroup } from "@mui/material";

// Construct URL with params function
// const constructUrlWithParams = (baseUrl, params) => {
//   const query = Object.keys(params)
//     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     .join('&');
//   return `${baseUrl}?${query}`;
// };
class Payable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      tableData: [],
      showError: false,
      errorMessage: "",
      hiddenColumns: [0, 1, 2],
      hiddenParagraphs: [],
      showDropdown: false,     
      isCardVisible: false,
      cardWidth: '0%',
      transactionDetail: null,
      columnsVisible: true,
      value: 0,
      selectedStatus: 'ALL',
      commentTextVisible: false,
      job: '',
      filterText:'',
      historyTextVisible: false,
      selectedButton: null,
      accounts: [],
      modalVisible: null,
      newMessage: '',
      transactionStatus: [
        { value: 'VOIDED', label: 'VOIDED' },
        { value: 'AUTHORISED', label: 'AUTHORISED' },
        { value: 'DELETED', label: 'DELETED' },
      ],
      transactionType: [
        { value: 'SPEND', label: 'SPEND' },
        { value: 'AUTHORISED', label: 'AUTHORISED' },
        { value: 'DELETED', label: 'DELETED' },
      ],
      startDate: null, // Define startDate here
    };

    // Define columns as a class property
    this.columns = [
      { name: 'Invoice Number', selector: row => row.InvoiceNumber, sortable: true },
      { name: 'Invoice Date', selector: row => row.Date, sortable: true },
      { name: 'Due Date', selector: row => row.DueDate, sortable: true },
      {
        name: 'Planned Date',
        selector: row => (
          <div>
            <DatePicker
              selected={this.state.startDate} // Use this.state.startDate
              onChange={(date) => this.setState({ startDate: date })}
              dateFormat="dd MMM yyyy"
              className="paybledtpckr"
            />
            <CIcon icon={cilCalendar} style={{ position: 'absolute', right: 32, top: 12 }} />
          </div>
        ),
        sortable: true,
      },
      {
        name: 'Status',
        selector: row => {
          let color = 'black';
          if (row.Status === 'PAID') color = '#00C365';
          else if (row.Status === 'Awaiting Payment') color = '#FFBB56';
          return <div style={{ color }}>{row.Status}</div>;
        },
        sortable: true,
      },
      { name: 'Invoice Reference', selector: row => row.Reference, sortable: true },
      { name: 'Amount', selector: row => '$' + row.Total, sortable: true },
      {
        name: 'Payment Method',
        selector: row => (
          <CFormSelect
            aria-label="Default select example"
            options={[{ label: 'AMEX', value: 'AMEX' }]}
            style={{ border: 'none' }}
          />
        ),
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row => (
          <CTooltip content="Details">
            <CButton
              onClick={(e) => {
                e.preventDefault();
                this.toggleCardVisibility(row.InvoiceID); // Toggle card visibility when "Details" is clicked
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontSize: '12px',
                color: 'gray',
                cursor: 'pointer'
              }}
            >
              Details
            </CButton>
          </CTooltip>
        ),
        sortable: false,
      },
    ];
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.modalVisible !== this.state.modalVisible || prevProps.invoiceType !== this.props.invoiceType) {
      this.fetchData();
    }
  }
  filterTableData = (data, statusFilter, filterText) => {
    if (!Array.isArray(data)) {
      console.warn("Data is not an array:", data);
      return []; // Return empty array if data is not an array
    }
  
    // Filter by status first
    let filteredData = statusFilter === "ALL" ? data : data.filter(row => row.Status === statusFilter);
  
    // Then filter by filterText
    return filteredData.filter((item) => {
      const invoiceNumber = item.InvoiceNumber || ""; // Default to empty string if undefined
      const ref = item.Reference || "";
      const status = item.Status || ""; // Default to empty string if undefined
      
      return (
        invoiceNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        ref.toLowerCase().includes(filterText.toLowerCase()) ||
        status.toLowerCase().includes(filterText.toLowerCase())
      );
    });
  };
  async fetchData() {
    try {
      const params = { invoice_type: 'ACCPAY' };
      const baseUrl = 'http://localhost:8080/api/v1/invoice/';
      const url = this.constructUrlWithParams(baseUrl, params);
      const responseInvoices = await axios.get(url);
      if (responseInvoices.status === 200 && Array.isArray(responseInvoices.data.data)) {
        this.setState({ tableData: responseInvoices.data.data });
        console.log("invoiceresponse",responseInvoices.data.data)
      } else {
        this.setState({ tableData: [] });
      }

      if (this.state.modalVisible === 'jobNumber') {
        const responseAccounts = await axios.get('http://localhost:8080/api/v1/account');
        this.setState({accounts: responseAccounts.data.data });
      }

    } catch (error) {
      this.setState({
        showError: true,
        errorMessage: error.message,
        tableData: [],
      });
    }
  }

  constructUrlWithParams(baseUrl, params) {
    const query = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `${baseUrl}?${query}`;
  }

  
  toggleModal = (id) => {
    this.setState((prevState) => ({
      modalVisible: prevState.modalVisible === id ? null : id, // Toggle the modal visibility
    }));
  };

  toggleCardVisibility = async (id) => {
    // Toggle the card visibility state
    this.setState((prevState) => ({
        isCardVisible: !prevState.isCardVisible,
        cardWidth: !prevState.isCardVisible ? '40%' : '0%',
    }));

    try {
        const responseTransaction = await axios.get(`http://localhost:8080/api/v1/invoice/invoice-detail/${id}`);
        if (responseTransaction.status === 200 && responseTransaction.data.data) {
            console.log("Transaction ID:", id);
            // Set transaction detail in state
            this.setState({ transactionDetail: responseTransaction.data.data });
        } else {
            this.setState({ transactionDetail: null });
        }
    } catch (error) {
        console.error("Error fetching Invoice details:", error);
    }
}
handleFilterTextChange = (event) => {
  this.setState({ filterText: event.target.value });
};
handleChange = (event, newValue) => {
  this.setState({ value: newValue });
};

handleButtonClick = (buttonName) => {
  this.setState({ selectedButton: buttonName });
};

  handleSendMessage = () => {
    const { newMessage, messages } = this.state;
    if (newMessage.trim()) {
      this.setState({
        messages: [...messages, { id: Date.now(), text: newMessage, type: 'sent', sender: 'You' }],
        newMessage: '',
      });
    }
  };
 
  render() {
    const {
      tableData,selectedStatus, startDate, isCardVisible, cardWidth, transactionDetail,value,selectedButton,modalVisible,accounts,HistoryTextVisible,commentTextVisible,historydata,filterText
    } = this.state;

  

    return (
      <div className='Payable'>
        <CCard className='card card-payable'>
          <div className='sum-card'>
            <div className='invoice-text'>
              <CCardBody className='text-invoicepay'>Scheduled Payments</CCardBody>
            </div>
            <div className="border-solid"></div>
          </div>
        </CCard>
  
        <div className='text-tabs'>
        <style>
          {`
            .details-card {
              width: 40%; /* Adjust card width as per your requirement */
              height: 100%;
              z-index: 1000;
              position: absolute; /* Fix the card to the right side */
              right: 15px; /* Aligns the card to the right side of the viewport */
              top: 20%; /* Aligns the card to the top of the viewport */
              bottom: 0; /* Aligns the card to the bottom of the viewport */
              overflow-y: auto; /* Allows vertical scrolling if the content exceeds viewport height */
              transition: all 0.3s ease-in-out;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              background-color: #fff; /* Set background color for better visibility */
            }
          `}
        </style>
          <Tabs
            defaultActiveKey="ALL"
            transition={false}
            id="noanim-tab-example"
            className="tab-text"
          >
            <Tab eventKey="ALL" title="ALL">
              <CCard>
                {/* <CCardBody className='text-bankacc'>Credit Cards AMEX</CCardBody> */}
           
                <CRow className="d-flex align-items-center">
          <CCol className="d-flex justify-content-between">
          <CFormInput
            onChange={this.handleFilterTextChange} // Update filterText when input changes
            value={filterText}  // Bind input value to filterText state
            icon={cilSearch}
            size="sm"
            className="searchinputform"  // Use className in JSX
            placeholder="Search..."
          />
          <CButton className="btn-batchpayment ms-2">Create Batch Payment</CButton>
        </CCol>
        </CRow>
  
     
                <DataTable
                  columns={this.columns}
                  data={this.filterTableData(tableData, selectedStatus, filterText)}
                  defaultSortField="InvoiceNumber"
                  pagination
                  highlightOnHover
                />
              </CCard>
            </Tab>
            <Tab eventKey="AWAITINGAPPROVAL" title="Awaiting Approval">
            <DataTable
          columns={this.columns}
          data={this.filterTableData(tableData, "AWAITINGAPPROVAL", filterText)}
          defaultSortField="InvoiceNumber"
          pagination
          highlightOnHover
      
        />
            </Tab>
            <Tab eventKey="AWAITINGPAYMENT" title="Awaiting Payment">
            <CCard>
            <DataTable
          columns={this.columns}
          data={this.filterTableData(tableData, "AWAITINGPAYMENT", filterText)}
          defaultSortField="InvoiceNumber"
          pagination
          highlightOnHover
      
        />
            </CCard>
          </Tab>
          </Tabs>
        </div>
  
        {isCardVisible && (
          <CCard className='details-card'>
            <CCardBody>
              <div class='icontext-img'>
                  <CButton className='close-button' onClick={() => this.toggleCardVisibility()}
                 style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '20px',
                  fontWeight:'bold',
                  color: 'black',
                  cursor: 'pointer'
                }}
                >
            
               Close
              </CButton>
              <div class='text-img'>
                <img alt="left-arrow" src={leftarrow} class='arrow-img'/>
                </div>
              </div>
              <div>
                
                {transactionDetail ? (
                  <>
              <div>
                <p className='dollar-amt'>-${transactionDetail.Total}</p>
                <p className='traction-text'>{transactionDetail.InvoiceID} {transactionDetail.companyName}</p>
                <p className='traction-text'>{transactionDetail.Date} </p>
                <p className='sydtime-text'>{transactionDetail.Date} (SYD/MEL Time)</p>
                <p className='sydtime-text'>Receipt #: {transactionDetail.receiptNumber}</p>
              </div>
              <div class='border-bottom'></div>
                <div class='avatar-badge'>
                <CAvatar src={avatar8} size="md" />
                <p class='dum-text'>Daniel K.</p>
                {/* <p class='reassign-text'>REASSIGN</p> */}
                <div className='badge-ready'>
                  <CBadge color="success" shape="rounded-pill" style={{width:'120%'}} >READY</CBadge>
                </div>
                </div> 
               </>
            ) : (
              <p>No transaction details available.</p>
            )}
     
                           
            <div>
             <p class='query-text'>Query Details</p>
             <CTable class="transcationtble">
        <CTableRow className='exptble'>
          <CTableHeaderCell className="headertble">Expense Type</CTableHeaderCell>
          <CTableDataCell className='datatxt'>Business</CTableDataCell>
          <CTableDataCell>
            <CButton color="#000F24" className='btnEdit'>
             
              Edit
              <FaEdit className='edticon'/>
            </CButton>
           
          </CTableDataCell>
          <CTableDataCell>
            <CIcon className="iconchck" icon={cilCheckCircle} color='#00C365' />
          </CTableDataCell>
        </CTableRow>
  
        <CTableRow className='exptble'>
          <CTableHeaderCell className="headertble">Account</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell>
          <CButton color="#000F24" className='btnedit'>
            Assign
            <FaEdit className='edticon'/>
           </CButton>
          </CTableDataCell>
          <CTableDataCell>
          <FaRegQuestionCircle color='#FFBB56'/>
          </CTableDataCell>
        </CTableRow>
  
        <CTableRow className='exptble'>
          <CTableHeaderCell className="headertble">GST Code</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell>
            <CButton color="#000F24" className='btnedit'>
         
              Assign
              <FaEdit className='edticon'/>
            </CButton>
          </CTableDataCell>
          <CTableDataCell>
          <FaRegQuestionCircle color='#FFBB56' />
          </CTableDataCell>
        </CTableRow>
  
        <CTableRow className='exptble'>
            <CTableHeaderCell className="headertble">Job Number</CTableHeaderCell>
            <CTableDataCell></CTableDataCell>
            <CTableDataCell>
              <CButton color="#000F24" className='btnedit' 
              onClick={() => this.toggleModal('jobNumber')}
              >
                Assign
                <FaEdit className='edticon'/>
              </CButton>
              <CModal visible={modalVisible === 'jobNumber'} 
              onClose={() => this.toggleModal('jobNumber')} 
              className='tablemodalbox'
              >
                <CModalHeader>
                  <h5>All Accounts</h5>
                </CModalHeader>
                <CModalBody>
                <CFormSelect>
  <option>Select an Account</option>
  {accounts.length > 0 ? (
  accounts.map(account => (
      <option key={account.AccountID} value={account.AccountID}>
        {account.Code} - {account.Name}
      </option>
    ))
  ) : (
    <option>Loading accounts...</option>
  )}
</CFormSelect>
                </CModalBody>
              </CModal>
            </CTableDataCell>
            <CTableDataCell>
              <FaRegQuestionCircle color='#FFBB56'/>
            </CTableDataCell>
          </CTableRow>
  
          <CTableRow className='exptble'>
            <CTableHeaderCell className="headertble">Invoice</CTableHeaderCell>
            <CTableDataCell className='datatxt'>Matched</CTableDataCell>
            <CTableDataCell>
              <CButton color="#000F24" className='btnEdit' 
              // onClick={() => this.toggleModal('invoice')}
              >
                Edit
                <FaEdit className='edticon'/>
              </CButton>
              <CModal visible={modalVisible === 'invoice'} 
              // onClose={() => this.toggleModal('invoice')} 
              className='tablemodalbox'>
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
  
        <CTableRow >
          <CTableHeaderCell className="headertble">What is this expense for?</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell>
          <CButton color="#000F24" className='btnEdit'>
             
             Edit
             <FaEdit className='edticon'/>
           </CButton>
          
          </CTableDataCell>
          <CTableDataCell>
          <FaRegQuestionCircle color='#FFBB56'/>
          </CTableDataCell>
        </CTableRow>
      </CTable>
            
              <p class='dumpy-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum congue leo, ac gravida magna fermentum a. Duis congue velit elit, at accumsan nisi malesuada fermentum. </p>
              <div class='border-bottom'></div>
              <div class='buton-edit'>
                  {/* <img src={edit} class='edit-icon' style={{width:'25px', height: '17px'}}/> */}
                  {/* <button class='btn-edt' onClick={this.toggleDropdown}>Record Transaction</button> */}
                  </div>
                  {!this.showDropdown ? '' : <div >
                      <p class='what-you-want'>Select what you want to do</p>
                        <div  class='select-dropdown'>
                              <Select
                              value={this.job}
                              className='edit-select-box'
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
                      </div>}
                    </div>
                    <div className="tab-section">
              <ButtonGroup  aria-label="Basic button group">
              <Button class="comment-btnn">Comments</Button>
              <Button class="history-btnn">History</Button>
              
            </ButtonGroup>
            
              
        {commentTextVisible && (
          <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              {this.messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                    background: msg.type === 'sent' ? '#00aaff' : '#e0e0e0',
                    color: msg.type === 'sent' ? '#fff' : '#000',
                    borderRadius: '10px',
                    padding: '10px',
                    marginBottom: '10px',
                    maxWidth: '80%',
                  }}
                >
                  <div>{msg.text}</div>
                  <div style={{ fontSize: '0.8em', textAlign: 'right', marginTop: '5px' }}>{msg.sender}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={this.newMessage}
                onChange={(e) => this.setNewMessage(e.target.value)}
                placeholder="Textbox"
                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
              />
              <button
                onClick={this.handleSendMessage}
                style={{
                  color: '#00C0F3',
                  border: 'none',
                  right: '45px',
                  marginTop: '1px',
                  position: 'absolute',
                }}
              >
                <CIcon icon={cilSend} />
              </button>
            </div>
          </div>
        )}
  
        {HistoryTextVisible && (
          <div className="history-section">
            <CTable className="rotate-table">
              <CTableHead>
                {historydata.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell className="querytable-text">{item.EditBy}</CTableHeaderCell>
                    <CTableHeaderCell className="valuetable-text">{item.date}</CTableHeaderCell>
                  </CTableRow>
                ))}
              </CTableHead>
            </CTable>
          </div>
        )}
      </div>
  
  {/* <p class='dumpy-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum congue leo, ac gravida magna fermentum a. Duis congue velit elit, at accumsan nisi malesuada fermentum. </p> */}
           
              
                          </div>
            </CCardBody>
          </CCard>
        )}
  
  
      </div>
    );
  }
}

export default Payable;

