import React, { useState, useEffect } from "react";
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
} from "@coreui/react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { cilCheckCircle, cilSend, cilCalendar } from '@coreui/icons';
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

// Construct URL with params function
const constructUrlWithParams = (baseUrl, params) => {
  const query = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  return `${baseUrl}?${query}`;
};

const Payable = ({ id, invoiceType }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hiddenColumns, setHiddenColumns] = useState([0, 1, 2]);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [hiddenParagraphs, setHiddenParagraphs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isCardclose, setIsCardClose] = useState(true);
  const [cardWidth, setCardWidth] = useState('100%');
  const [columnsVisible, setColumnsVisible] = useState(true);
  const [value, setValue] = useState(0);
  const [detailsTextVisible, setDetailsTextVisible] = useState(false);
  const [commentTextVisible, setCommentTextVisible] = useState(false);
  const [job, setJob] = useState('');
  const [HistoryTextVisible, setHistoryTextVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const historydata = [
    {
        EditBy:'Edited By Daniel K',
        date:' 20 Oct 2022',
    },
    {
        EditBy:'Edited By Daniel K',
        date:' 20 Oct 2022',
    },
    {
        EditBy:'Edited By Daniel K',
        date:' 20 Oct 2022',

    },
    {
        EditBy:'Edited By Daniel K',
        date:' 20 Oct 2022',
    }
]
const [modalVisible, setModalVisible] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Daniel K.', text: 'Duis congue velit elit, at accumsan nisi malesuada fermentum.', type: 'sent' },
    { id: 2, sender: 'Rachel L.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. .', type: 'received' },
    { id: 3, sender: 'Daniel K.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. .', type: 'sent' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [transactionStatus, setTransactionStatus] = useState([
    { value: 'VOIDED', label: 'VOIDED' },
    { value: 'AUTHORISED', label: 'AUTHORISED' },
    { value: 'DELETED', label: 'DELETED' },
  ]);
  const [transactionType, setTransactionType] = useState([
    { value: 'SPEND', label: 'SPEND' },
    { value: 'AUTHORISED', label: 'AUTHORISED' },
    { value: 'DELETEDDe', label: 'DELETED' },
  ]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState(null);

  const dropdownContent = (
    <div className='custom-dropdown-content'>
         <CRow>
      <div class='logo-dropdown'>
        <select
          id="dropdown"
          class='headertext-dropdown'
         // value={this.state.selectedValue}
         // onChange={this.handleChange}
        >
          <option value="">Select Bank Account</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

       
      </div>
      </CRow>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch invoices
        const params = { invoice_type: 'ACCPAY' };
        const baseUrl = 'http://localhost:8080/api/v1/invoice/';
        const url = constructUrlWithParams(baseUrl, params);
        const responseInvoices = await axios.get(url);

        if (responseInvoices.status === 200 && Array.isArray(responseInvoices.data.data)) {
          setTableData(responseInvoices.data.data);
        } else {
          setTableData([]);
        }

        // Fetch transaction details
        // const responseTransaction = await axios.get(`http://localhost:8080/api/v1/2.0/Invoices/${id}`);
        // console.log("Transaction ID:", responseTransaction.data.data);
        // if (responseTransaction.status === 200 && responseTransaction.data.data) {
         
        //   setTransactionDetail(responseTransaction.data.data); // Set transaction detail to local state
        // } else {
        //   setTransactionDetail(null); // Handle invalid response
        // }

        // Fetch accounts if modal is visible
        if (modalVisible === 'jobNumber') {
          const responseAccounts = await axios.get('http://localhost:8080/api/v1/account');
          console.log('response: ', responseAccounts.data.data);
          setAccounts(responseAccounts.data.data);
        }

      } catch (error) {
        setShowError(true);
        setErrorMessage(error.message);
        setTableData([]);
      }
    };

    fetchData();
  }, [invoiceType, modalVisible, id,]);

  

  const toggleModal = (modalName) => {
    if (modalVisible === modalName) {
      setModalVisible(null);
    } else {
      setModalVisible(modalName); 
    }
  };
  const toggleCardVisibility = async (id) => {
    setIsCardVisible(!isCardVisible);

    setCardWidth(!isCardVisible ? '40%' : '0%');;
      try {
        const responseTransaction = await axios.get(`http://localhost:8080/api/v1/invoice/invoice-detail/${id}`);
        if (responseTransaction.status === 200 && responseTransaction.data.data) {
          console.log("Transaction ID:", id);
          setTransactionDetail(responseTransaction.data.data);
        } else {
          setTransactionDetail(null);
        }
      } catch (error) {
        console.error("Error fetching Invoice details:", error);
      }
    } 

  // const toggleCardVisibility = async (id) => {
  //   setIsCardVisible(!isCardVisible);

  //   setCardWidth(!isCardVisible ? '40%' : '0%');
  //   try {
  //     const responseTransaction =  axios.get(`http://localhost:8080/api/v1/transaction/transaction-detail/${id}`);
  //     if (responseTransaction.status === 200 && responseTransaction.data.data) {
  //       console.log("Transaction ID:", id);
  //       setTransactionDetail(responseTransaction.data.data);
  //     } else {
  //       setTransactionDetail(null);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching transaction details:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // };

  const toggleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown,
    }));
  };

  const columns = [
    {
      name: 'Invoice Number',
      selector: row => row.InvoiceNumber,
      sortable: true,
    },
    { name: 'Invoice Date', selector: row => row.Date, sortable: true },
    { name: 'Due Date', selector: row => row.DueDate, sortable: true },
    {
      name: 'Planned Date',
      selector: row => (
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
    if (row.Status === 'PAID') {
      color = '#00C365';
    } else if (row.Status === 'Awaiting Payment') {
      color = '#FFBB56';
    }
    return (
      <div style={{ color }}>
        {row.Status}
      </div>
    );
  },
  sortable: true,
},
    { name: 'Invoice Reference', selector: row => row.Reference, sortable: true },
    { name: 'Amount', selector: row => '$' + `${row.Total}`, sortable: true },
    {
      name: 'Payment Method',
      selector: row => (
        <div>
          <CFormSelect
            aria-label="Default select example"
            options={[{ label: 'AMEX', value: 'AMEX' }]}
            style={{ border: 'none' }}
          />
        </div>
      ),
      sortable: true,
    },
    { name: 'Amount To Pay', selector: row => <div></div>, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <CTooltip content="Details">
            <CButton
              onClick={(e) => {
                e.preventDefault();
                toggleCardVisibility(row.InvoiceID); // Toggle card visibility when "Details" is clicked
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
        </div>
      ),
      sortable: false,
    },
  ];
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
      <style>{`
        .details-card {
          width: 40%; /* Adjust card width as per your requirement */
          height:100%;
          z-index: 1000;
          position: absolute;; /* Fix the card to the right side */
          right: 15px; /* Aligns the card to the right side of the viewport */
          top: 20%; /* Aligns the card to the top of the viewport */
          bottom: 0; /* Aligns the card to the bottom of the viewport */
          overflow-y: auto; /* Allows vertical scrolling if the content exceeds viewport height */
          transition: all 0.3s ease-in-out;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff; /* Set background color for better visibility */
        }

      `}</style>
        <Tabs
          defaultActiveKey="ALL"
          transition={false}
          id="noanim-tab-example"
          className="tab-text"
        >
          <Tab eventKey="ALL" title="ALL">
            <CCard>
              <CCardBody className='text-bankacc'>Credit Cards AMEX</CCardBody>
              <DataTable
                columns={columns}
                data={tableData}
                defaultSortField="InvoiceNumber"
                pagination
                highlightOnHover
              />
            </CCard>
          </Tab>
          <Tab eventKey="Awaiting Approval" title="Awaiting Approval">
            {/* Content for Awaiting Approval tab */}
          </Tab>
          <Tab eventKey="Awaiting Payment" title="Awaiting Payment">
            {/* Content for Awaiting Payment tab */}
          </Tab>
        </Tabs>
      </div>

      {isCardVisible && (
        <CCard className='details-card'>
          <CCardBody>
            <CButton className='close-button' onClick={() => toggleCardVisibility()}
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
            <div>
              <div class='text-img'>
              <img alt="left-arrow" src={leftarrow} class='arrow-img'/>
              </div>
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
  
              <p class='dum-text'>{transactionDetail.Contact.Name}</p>
              {/* <p class='reassign-text'>REASSIGN</p> */}
              <div className='badge-ready'>
                <CBadge color="success" shape="rounded-pill" style={{width:'120%'}} >READY</CBadge>
              </div>
              </div> 
             </>
          ) : (
            <p>No transaction details available.</p>
          )}
              <div class='border-bottom'></div>
              <div class='avatar-badge'>
              <CAvatar src={avatar8} size="md" />
              <p class='dum-text'>Daniel K.</p>
              {/* <p class='reassign-text'>REASSIGN</p> */}
              <div className='badge-ready'>
                <CBadge color="success" shape="rounded-pill" style={{width:'120%'}} >READY</CBadge>
              </div>
              </div>           
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
            onClick={() => toggleModal('jobNumber')}
            >
              Assign
              <FaEdit className='edticon'/>
            </CButton>
            <CModal visible={modalVisible === 'jobNumber'} 
            onClose={() => toggleModal('jobNumber')} 
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
                      {account.Name}
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
                {!showDropdown ? '' : <div >
                    <p class='what-you-want'>Select what you want to do</p>
                      <div  class='select-dropdown'>
                            <Select
                            value={job}
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
                  <div class='tab-section'>               
                           <Tabs
                               value={value}
                              //  onChange={this.handleChange}
                              class='Tab-bar'
                              style={{height:'40px'}}
                              TabIndicatorProps={{ style: { background: 'transparent' } }}
                               //aria-label="scrollable force tabs example"
                           >
                             
                               <Tab label="Comments"  iconPosition='start' icon={<HistoryIcon/>}  style={{height:'40px',fontSize:'12px', paddingleft: '22px'}} className="transction-tab-button" select={selectedButton === 'button2' ? 'selected' : ''} onClick={() => this.handleButtonClick('button2')}/>
                               <Tab label="History" iconPosition='start' icon={<HistoryIcon/>}    style={{height:'40px',fontSize:'12px',paddingleft: '30px'}} className="transction-tab-button" select={selectedButton === 'button3' ? 'selected' : ''} onClick={() => this.handleButtonClick('button3')} />
                              
                           </Tabs> 
 
                   </div>
                   { commentTextVisible ? <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                      {messages.map((msg) => (
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
                       value={newMessage}
                       onChange={this.handleChanged}
                       placeholder="Textbox"
                       style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                     />
                      <button
                       onClick={this.handleSendMessage}
                       style={{
                        color:'#00C0F3',
                         border: 'none',
                            right:'45px',
                           marginTop:'1px',
                         position:'absolute'
                       }}
                      >
                     <CIcon icon={cilSend}/>
                     </button>
                   </div>
                 </div>:''
                   
                  }
        {!HistoryTextVisible?'':
        <div class='history section'>
             <CTable className="rotate-table">
           <CTableHead>
      {historydata.map((item, index) => (
        <CTableRow key={index} >
         
          <CTableHeaderCell class='querytable-text'>{item.EditBy}</CTableHeaderCell>
          <CTableHeaderCell class='valuetable-text'>{item.date}</CTableHeaderCell>
         
        </CTableRow>
      ))}
        </CTableHead>
       
    </CTable>
    
        </div>
        }

<p class='dumpy-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam condimentum congue leo, ac gravida magna fermentum a. Duis congue velit elit, at accumsan nisi malesuada fermentum. </p>
            <div class='border-bottom'></div>
            <div class='buton-edit'>
                {/* <img src={edit} class='edit-icon' style={{width:'25px', height: '17px'}}/> */}
                <button class='btn-edt' 
                // onClick={this.toggleDropdown}
                >Record Transaction</button>
                </div>
                {!showDropdown ? '' : <div >
                    <p class='what-you-want'>Select what you want to do</p>
                    <div  class='select-dropdown'>
                        <Select
                        value={job}
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
          </CCardBody>
        </CCard>
      )}


    </div>
  );
  
};

export default Payable;
