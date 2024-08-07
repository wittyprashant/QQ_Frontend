import { useState, useEffect } from "react";
import { CFormInput, CCard, CCardBody, CCol, CTable, CTableRow, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody } from "@coreui/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CIcon from '@coreui/icons-react';
import { cilSearch } from "@coreui/icons";
import axios from 'axios';
import React from "react";
const constructUrlWithParams = (baseUrl, params) => {
  const query = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  return `${baseUrl}?${query}`;
};
const Recievables = ({  invoiceType }) => {
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
    
        // Check response status and structure
        if (response.status === 200 && Array.isArray(response.data.data)) {
          console.log("Valid data received:", response.data.data);
          setTableData(response.data.data);
        } else {
          console.warn("Invalid response structure or status:", response);
          setTableData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowError(true);
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, [ invoiceType]);


  const headers = tableData.length > 0 ? tableData[0].values : [];

  const getStatusCellStyle = (status) => {
    if (status === "Awaiting Payment") {
      return { color: "#FFBB56" }; // Yellow for Awaiting Payment
    } else if (status === "Paid") {
      return { color: "#00C365" }; // Green for Paid
    }
    return {}; // Default style if no conditions are met
  };

  const filterTableData = (status) => {
    return tableData.filter(row => row.values[6] === status);
  };

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
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="tab-text">
          <Tab eventKey="ALL" title="ALL">
            <CCard>
              <CCol>
                <CFormInput
                  icon={cilSearch}
                  size="sm"
                  className='searchinputform'
                  placeholder="Search..."
                />
              </CCol>
              <CTable>
                <CTableHead></CTableHead>
                <CTableBody className='text-textbody'>
  {Array.isArray(tableData) && tableData.map((rowData, index) => (
    <CTableRow key={index} className='text-cctablerow'>
      <CTableHeaderCell className='text-categorycell' scope="row">{rowData.category}</CTableHeaderCell>
      {Array.isArray(rowData.values) && rowData.values.map((value, subIndex) => (
        <CTableDataCell key={subIndex} className='text-cdatacell' style={getStatusCellStyle(value)}>
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
          </Tab>
          <Tab eventKey="Awaiting Payment" title="Awaiting Payment">
            <CCard>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    {headers.map((header, index) => (
                      <CTableHeaderCell key={index} className='text-categorycell'>
                        {header}
                      </CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-textbody'>
                  {filterTableData("Awaiting Payment").map((rowData, index) => (
                    <CTableRow key={index} className='text-cctablerow'>
                      <CTableHeaderCell className='text-categorycell'>
                        {rowData.category}
                      </CTableHeaderCell>
                      {rowData.values.map((value, subIndex) => (
                        <CTableDataCell key={subIndex} className='text-cdatacell' style={getStatusCellStyle(value)}>
                          {value}
                        </CTableDataCell>
                      ))}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCard>
          </Tab>
          <Tab eventKey="Paid" title="Paid">
            <CCard>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    {headers.map((header, index) => (
                      <CTableHeaderCell key={index} className='text-categorycell'>
                        {header}
                      </CTableHeaderCell>
                    ))}
                  </CTableRow>
                </CTableHead>
                <CTableBody className='text-textbody'>
                  {filterTableData("Paid").map((rowData, index) => (
                    <CTableRow key={index} className='text-cctablerow'>
                      <CTableHeaderCell className='text-categorycell'>
                        {rowData.category}
                      </CTableHeaderCell>
                      {rowData.values.map((value, subIndex) => (
                        <CTableDataCell key={subIndex} className='text-cdatacell' style={getStatusCellStyle(value)}>
                          {value}
                        </CTableDataCell>
                      ))}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCard>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Recievables;
