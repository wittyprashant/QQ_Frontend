import { useState, useEffect,Component } from "react";
import { CFormInput, CCard, CCardBody, CCol, CTable, CTableRow, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody } from "@coreui/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CIcon from '@coreui/icons-react';
import { cilSearch } from "@coreui/icons";
import axios from 'axios';
import React from "react";
import DataTable from 'react-data-table-component';
import { color } from "@mui/system";

class Recievables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      showError: false,
      errorMessage: '',
      filterText: '',
      filterTextpaid:'',
      selectedStatus: 'ALL',
       columns:[
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
      ] // Initialize selectedStatus with 'ALL'
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.invoiceType !== this.props.invoiceType) {
      this.fetchData();
    }
  }

  constructUrlWithParams = (baseUrl, params) => {
    const query = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    return `${baseUrl}?${query}`;
  };

  fetchData = async () => {
    try {
      const params = { invoice_type: 'ACCREC' };
      const baseUrl = 'http://localhost:8080/api/v1/invoice/';
      const url = this.constructUrlWithParams(baseUrl, params);
      console.log('Request URL:', url);

      const response = await axios.get(url);

      if (response.status === 200 && Array.isArray(response.data.data)) {
        this.setState({ tableData: response.data.data });
        console.log('res--------', response);
      } else {
        console.warn('Invalid response format or status:', response);
        this.setState({ tableData: [] });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({
        showError: true,
        errorMessage: error.message,
        tableData: [],
      });
    }
  };

  getStatusCellStyle = (status) => {
    if (status === 'Awaiting Payment') {
      return { color: '#FFBB56' }; // Yellow for Awaiting Payment
    } else if (status === 'Paid') {
      return { color: '#00C365' }; // Green for Paid
    }
    return {}; // Default style if no conditions are met
  };

  filterTableData = (data, statusFilter, filterText = '', filterTextpaid = '') => {
    if (!Array.isArray(data)) {
      console.warn('Data is not an array:', data);
      return []; // Return empty array if data is not an array
    }
  
    // Step 1: Filter by status first
    let filteredData =
      statusFilter === 'ALL' ? data : data.filter((row) => row.Status === statusFilter);
  
    // Step 2: Filter by filterText
    filteredData = filteredData.filter((item) => {
      const invoiceNumber = String(item.InvoiceNumber || ''); // Ensure it's a string
      const ref = String(item.Reference || ''); // Ensure it's a string
      const status = String(item.Status || ''); // Ensure it's a string
  
      // Check if any of the fields match filterText
      return (
        invoiceNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        ref.toLowerCase().includes(filterText.toLowerCase()) ||
        status.toLowerCase().includes(filterText.toLowerCase())
      );
    });
  
    // Step 3: Filter by filterTextpaid
    filteredData = filteredData.filter((item) => {
      const invoiceNumber = String(item.InvoiceNumber || ''); // Ensure it's a string
      const ref = String(item.Reference || ''); // Ensure it's a string
      const status = String(item.Status || ''); // Ensure it's a string
  
      // Check if any of the fields match filterTextpaid
      return (
        invoiceNumber.toLowerCase().includes(filterTextpaid.toLowerCase()) ||
        ref.toLowerCase().includes(filterTextpaid.toLowerCase()) ||
        status.toLowerCase().includes(filterTextpaid.toLowerCase())
      );
    });
  
    // Return the final filtered data
    return filteredData;
  };
  
  handleStatusChange = (event) => {
    this.setState({ selectedStatus: event.target.value });
  };

  handleFilterTextChange = (event) => {
    this.setState({ filterText: event.target.value });
  };
  handleFilterTextPaid = (event) => {
    this.setState({ filterTextpaid: event.target.value });
  };
  render() {
    const { tableData, showError, errorMessage, selectedStatus, filterText,columns,filterTextpaid } = this.state;
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
        onChange={this.handleFilterTextChange} // Update filterText when input changes
          value={filterText}  // Bind input value to filterText state
          icon={cilSearch}
          size="sm"
          className="searchinputform"  // Use className in JSX
          placeholder="Search..."
        />
 </CCol>
 <DataTable
        columns={columns}
        data={this.filterTableData(tableData, selectedStatus, filterText)}  // Pass the filtered data to DataTable
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
          data={this.filterTableData("Awaiting Approval")}
          defaultSortField="InvoiceNumber"
          pagination
          highlightOnHover
        />
            </CCard>
          </Tab>
          <Tab eventKey="AWAITINGPAYMENT" title="Awaiting Payment">
            <CCard>
            <DataTable
          columns={columns}
          data={this.filterTableData(tableData, "PAID", filterText)}
          defaultSortField="InvoiceNumber"
          pagination
          highlightOnHover
      
        />
            </CCard>
          </Tab>
          <Tab eventKey="PAID" title="Paid">
            <CCard>
            <CCol >
              
              <CFormInput
            onChange={this.handleFilterTextPaid} // Update filterText when input changes
            value={filterTextpaid}  // Bind input value to filterText state
            icon={cilSearch}
            size="sm"
            className="searchinputform"  // Use className in JSX
            placeholder="Search..."
          />
          </CCol>
            <DataTable
          columns={columns}
          data={this.filterTableData(tableData, "PAID", filterTextpaid)}
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
}
export default Recievables;