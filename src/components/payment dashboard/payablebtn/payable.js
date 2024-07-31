import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CCard,CCardBody, CCol,CTable,CTableRow,CTableHead,CTableDataCell,CTableHeaderCell,CTableBody} from "@coreui/react";
import { Icon } from "@mui/material";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { Dropdown } from "react-bootstrap";
import { MenuItem } from "@mui/base";
const tableData = [
  
    {
       category: "Invoice Date",
       values: ["Due Date","Planned Date","Invoice Reference","Amount","Payment Method","Amount To Pay"]
     },
    {
       category: "Supplier Name",
       values: [""]
     },
     {
       category: "2 Nov 2022",
       values: ["2 Dec 2022", "14 Dec 2022", "SI1471880", "$883.30"]
     },
     {
      category: "2 Nov 2022",
      values: ["2 Dec 2022", "14 Dec 2022", "SI1471880", "$883.30"]
     },
     {
      category: "2 Nov 2022",
      values: ["2 Dec 2022", "14 Dec 2022", "SI1471880", "$883.30"],
      //date:[   <CDatePicker label="Date Picker" locale="en-US" />]
     },
     {
      category: "2 Nov 2022",
      values: ["2 Dec 2022", "14 Dec 2022", "SI1471880", "$883.30"]
     },
     {
      category: "2 Nov 2022",
       values: ["-$20,000", "-", "-", "-", "-"]
     },
     {
      Header: "",
      accessor: "actionColumn",
      disableSortBy: true,
      Cell: ({ original }) => (

          <div className="cursor__pointer ">
            <Dropdown
                onSelect={(eventKey) => {
                }}
            >
              <Dropdown.Toggle btnStyle="link" noCaret
              >
                <Icon className="padding5" iconName="RemoveLink" aria-hidden="true" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MenuItem header>Header</MenuItem>
                <MenuItem eventKey={1}>link</MenuItem>
                <MenuItem divider />
                <MenuItem header>Header</MenuItem>
                <MenuItem eventKey={2}>link</MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </div>
      )
    },



    // ... (repeat the structure for other rows)
  ];
const Payable =()=>
{
    return(
        <div class='Payable'>
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
        <div class='text-tabs'>
        <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="tab-text"
    >
      <Tab eventKey="ALL" title="ALL">
      <CCard> 
      <CCardBody class='text-bankacc'>Credit Cards AMEX</CCardBody>
      <CTable>
      <CTableHead>
     
      </CTableHead>
      <CTableBody class='text-textbody'>

        {tableData.map((rowData, index) => (
          <CTableRow key={index} className='text-cctablerow '>
            <CTableHeaderCell className='text-categorycell' scope="row">{rowData.category}</CTableHeaderCell>
            {rowData.values.map((value, subIndex) => (
              <CTableDataCell key={subIndex} className= 'text-cdatacell'>{value}</CTableDataCell>
            ))}  
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
      </CCard>
      </Tab>
      <Tab eventKey="Awaiting Approval" title="Awaiting Approval">
       
      </Tab>
      
      <Tab eventKey="Awaiting Payment" title="Awaiting Payment">
       
      </Tab>
    </Tabs> 
        </div>
   </div>
    );
}
export default Payable;


