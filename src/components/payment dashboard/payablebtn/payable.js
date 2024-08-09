import React, { useState,useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CCard, CCardBody, CCol, CTable, CTableRow,CInputGroup,CFormSelect,CButton,CFormInput, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody,CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem } from "@coreui/react";
import { Dropdown } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilCalendar } from "@coreui/icons";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Icon, MenuItem, Select } from "@mui/material";
import { FaEdit, FaRegCalendar } from "react-icons/fa";
import moment from 'moment';
import axios from 'axios';

import DataTable from 'react-data-table-component';
const constructUrlWithParams = (baseUrl, params) => {
  const query = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  return `${baseUrl}?${query}`;
};

const Payable = ({ invoiceType }) => {
 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  // const dateChanged = (d) => {
  //   setDate(d);
  // };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { invoice_type: 'ACCPAY' };
        const baseUrl = 'http://localhost:8080/api/v1/invoice/';
        const url = constructUrlWithParams(baseUrl, params);
        console.log("Request URL:", url);
        const response = await axios.get(url);

        if (response.status === 200 && Array.isArray(response.data.data)) {
          setTableData(response.data.data);
          console.log("res--------",response)
         
        } else {
          console.warn("Invalid response format or status:", response);
          setTableData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowError(true);
        setErrorMessage(error.message);
        setTableData([]);
      }
    };

    fetchData();
  }, [invoiceType]);
  const columns = [
    {
      name: 'Invoice Date',
      selector: row => row.Date,
      sortable: true,
    },
    {
      name: 'Due Date',
      selector: row => row.DueDate, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: ' Planned Date',
      selector: row => <div>  
        <DatePicker
     
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd MMM yyyy"
      className="paybledtpckr"
      
    />  
  
      </div>, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: 'Invoice Reference',
      selector: row => row.Reference,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row => '-$' + `${row.Total}`, // Assuming `values` is an array
      sortable: true,
    },
    
   
   
    {
      name: 'Payment Method',
      selector: row => <div>
      <CFormSelect 
  aria-label="Default select example"
  options={[
    { label: 'AMEX', value: 'AMEX' },
  ]}
  style={{border:'none'}}
/>
      </div>, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: 'Amount To Pay',
      selector: row =><div>
    
      </div>, // Assuming `values` is an array
      sortable: true,
    },
    
  ];

  return (
    <div className='Payable'>
      <CCard class='card card-payable'>
        <div class='sum-card'>
               <div class='invoice-text'>
                  <CCardBody class='text-invoicepay'>Scheduled Payments</CCardBody>
               </div>
               <div class="border-solid"></div>
               <div class='text-scheduledpay'>
                
               <div  class="invoice-boxjan">
                     <div class="border-rightdate">
                        <CCol class='text-Receipt'>
                       
                           <CCardBody class='text-await'>2 JAN 2023</CCardBody>
                           <CCard class='text-price'>$10,657</CCard>
                          
                        </CCol>
                     </div>
                     
                     <div class="border-rightdate">
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>9 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$12,065</CCard>
                        </CCol>
                     </div>
                     <div class="border-rightdate">
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>16 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$7,031</CCard>
                        </CCol>
                     </div>
                     <div class="border-rightdate">
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>23 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$3,001</CCard>
                        </CCol>
                     </div>
                     <div >
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>30 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$500</CCard>
                        </CCol>
                     </div>
                  </div>
                  </div>
                 
                  </div>
        </CCard>
      <div className='text-tabs'>
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
    </div>
  );
}

export default Payable;
