import { useState, useEffect } from "react";
import { CFormInput, CCard, CCardBody, CCol, CTable, CTableRow, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody } from "@coreui/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CIcon from '@coreui/icons-react';
import { cilSearch } from "@coreui/icons";
import axios from 'axios';
import React from "react";
import DataTable from 'react-data-table-component';
import { color } from "@mui/system";

const constructUrlWithParams = (baseUrl, params) => {
  const query = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  return `${baseUrl}?${query}`;
};

const Recievables = ({ invoiceType }) => {
  const [tableData, setTableData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { invoice_type: 'ACCREC' };
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
      name: 'Invoice Number',
      selector: row => row.InvoiceNumber,
      sortable: true,
    },
    {
      name: 'Ref',
      selector: row => row.Reference,
      sortable: true,
    },
    {
      name: 'To',
      selector: row => row.values, // Assuming `values` is an array
      sortable: true,
    },
    
    {
      name: 'Date',
      selector: row => row.Date, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: 'Due Date',
      selector: row => row.DueDate, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: 'Paid',
      selector: row => '-$' + `${row.AmountPaid}`, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: 'Due',
      selector: row => '-$' + `${row.AmountDue}`, // Assuming `values` is an array
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => {
        let color = 'black'; // default color
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
  ];

  const headers = (tableData.length > 0 && Array.isArray(tableData[0].values)) ? tableData[0].values : [];

  const getStatusCellStyle = (status) => {
    if (status === "Awaiting Payment") {
      return { color: "#FFBB56" }; // Yellow for Awaiting Payment
    } else if (status === "Paid") {
      return { color: "#00C365" }; // Green for Paid
    }
    return {}; // Default style if no conditions are met
  };

  const filterTableData = (Status) => {
    if (!Array.isArray(tableData)) {
      return []; // Return empty array if tableData is not an array
    }
    if (Status === "ALL") {
      return tableData;
    }
    return tableData.filter(row => row.Status === Status);
  }

  return (
    <div className='Payable'>
     <CCard class='card card-payable'>
            <div class='sum-card'>
                   <div class='invoice-text'>
                      <CCardBody class='text-invoicepay'>Scheduled Receivables</CCardBody>
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
        <Tabs  defaultActiveKey="ALL" transition={false} id="noanim-tab-example" className="tab-text">
          <Tab eventKey="ALL" title="ALL">
            <CCard>
            <CCol >
     
     <CFormInput
         // onChange={(e) => {
         //     let newFilterText = e.target.value;
         //     this.setState({ filterText: newFilterText });
         //     this.props.onTransactionFilterList(newFilterText);
         // }}
         // value={this.state.filterText}
         icon={cilSearch}
         size="sm"
         class='searchinputform'
         placeholder="Search..."
     />
 </CCol>

 <DataTable
                columns={columns}
                data={filterTableData("ALL")}
                defaultSortField="InvoiceNumber"
                pagination
                highlightOnHover
              />
            </CCard>
          </Tab>
          <Tab eventKey="Awaiting Approval" title="Awaiting Approval">
          <CCard>
            <DataTable
          columns={columns}
          data={filterTableData("Awaiting Approval")}
          defaultSortField="InvoiceNumber"
          pagination
          highlightOnHover
        />
            </CCard>
          </Tab>
          <Tab eventKey="Awaiting Payment" title="Awaiting Payment">
            <CCard>
            <DataTable
          columns={columns}
          data={filterTableData("Awaiting Payment")}
          defaultSortField="InvoiceNumber"
          pagination
          highlightOnHover
        />
            </CCard>
          </Tab>
          <Tab eventKey="Paid" title="Paid">
            <CCard>
            <DataTable
                columns={columns}
                data={filterTableData("PAID")}
                defaultSortField="InvoiceNumber"
                pagination
                highlightOnHover
              />
            </CCard>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Recievables;