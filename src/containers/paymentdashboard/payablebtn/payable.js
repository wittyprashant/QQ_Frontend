import React, { useState,useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CCard, CCardBody, CCol, CTable, CTableRow, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody,CDropdown,CDropdownToggle,CDropdownMenu,CDropdownItem } from "@coreui/react";
import { Dropdown } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilCalendar } from "@coreui/icons";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Icon, MenuItem, Select } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import moment from 'moment';
import $ from 'jquery';
const Payable = () => {
  const [date, setDate] = useState(moment().toDate());
  const [showDatePicker, setShowDatePicker] = useState(false);


  const dateChanged = (d) => {
    setDate(d);
  };

 

  useEffect(() => {
    $(document).on('click', '.calendar-icon', function () {
      $('.dtepckr-input').focus();
    });
  }, []);




  const tableData = [
    {
      category: "Invoice Date",
      values: ["Due Date", "Planned Date", "Invoice Reference", "Amount", "Payment Method", "Amount To Pay"]
    },
    {
      category: "Supplier Name",
      values: [""]
    },
    {
      category: "2 Nov 2022",
      values: [
        "2 Dec 2022",
        <div key="calendar-1" style={{ display: 'flex', alignItems: 'center' }}>
        <CIcon
          icon={cilCalendar}
          style={{ marginLeft: '8px', cursor: 'pointer' }}
        />
      
      </div>,
        "SI1471880",
        "$883.30",
        "",
       
      ]
    },
    {
      category: "2 Nov 2022",
      values: ["2 Dec 2022",   
        <div>
      <div key="calendar-1" style={{ display: 'flex', alignItems: 'center' }}>
        <span>14 Dec 2022</span>
        <CIcon
          icon={cilCalendar}
          className="calendar-icon"
          style={{ marginLeft: '8px', cursor: 'pointer' }}
        />
        <div className="dtepckr">
          <DatePicker
            selected={date}
            className="dtepckr-input"
            onChange={dateChanged}
          />
        </div>
      </div>


    </div>, 
      "SI1471880", "$883.30", 
        
      
          
        ,]
    },
    {
      category: "2 Nov 2022",
      values: ["3 Dec 2022",   <div key="calendar-1" style={{ display: 'flex', alignItems: 'center' }}>
        <span>14 Dec 2022</span>
        <CIcon
          icon={cilCalendar}
        
          style={{ marginLeft: '8px', cursor: 'pointer' }}
        />
      
      </div>, "SI1471880", "$883.30"]
    },
    {
      category: "2 Nov 2022",
      values: ["2 Dec 2022",   <div key="calendar-1" style={{ display: 'flex', alignItems: 'center' }}>
        <span>14 Dec 2022</span>
        <CIcon
          icon={cilCalendar}
        
          style={{ marginLeft: '8px', cursor: 'pointer' }}
        />
      
      </div>, "SI1471880", "$883.30"]
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
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className="tab-text"
        >
          <Tab eventKey="ALL" title="ALL">
            <CCard>
              <CCardBody className='text-bankacc'>Credit Cards AMEX</CCardBody>
              <CTable>
                <CTableHead>
                  {/* Add table headers if needed */}
                </CTableHead>
                <CTableBody className='text-textbody'>
                  {tableData.map((rowData, index) => (
                    <CTableRow key={index} className='text-cctablerow'>
                      <CTableHeaderCell className='text-categorycell' scope="row">{rowData.category}</CTableHeaderCell>
                      {rowData.values.map((value, subIndex) => (
                        <CTableDataCell key={subIndex} className='text-cdatacell'>
                          {value}
                        
                        </CTableDataCell>
                      ))}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
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
