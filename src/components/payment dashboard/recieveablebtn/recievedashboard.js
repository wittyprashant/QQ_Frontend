import react from "react";
import {CFormInput, CCard,CCardBody, CCol,CTable,CTableRow,CTableHead,CTableDataCell,CTableHeaderCell,CTableBody} from "@coreui/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CIcon from '@coreui/icons-react';
import { cilSearch } from "@coreui/icons";
const tableData = [
  
    {
       category: "Invoice Number",
       values: ["Ref","To","Date","Due Date","Paid","Due","Status"]
     },
    {
       category: "INV-0030",
       values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
     },
     {
        category: "INV-0029",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0028",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0027",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0026",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0025",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0024",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0023",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0022",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0021",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
       {
        category: "INV-0020",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0019",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Awaiting Payment"]
      },
      {
        category: "INV-0018",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Paid"]
      },
      {
        category: "INV-0017",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Paid"]
      },
      {
        category: "INV-0016",
        values: ["-","Customer Name","21 Dec 2022","28 Dec 2022","$0.00","$5,530","Paid"]
      },
    ]
const Recievables=()=>
{
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
    const filterTableDataPaid = (status) => {
      return tableData.filter(row => row.values[6] === status);
  };
    return(
      
            <div class='Payable'>
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
            <div class='text-tabs'>
           
        <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="tab-text"
    >
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
     {/* <CCardBody class='text-bankacc'>Credit Cards AMEX</CCardBody> */}
      <CTable>
      <CTableHead>
     
      </CTableHead>
      <CTableBody class='text-textbody'>

        {tableData.map((rowData, index) => (
          <CTableRow key={index} className='text-cctablerow '>
            <CTableHeaderCell className='text-categorycell' scope="row">{rowData.category}</CTableHeaderCell>
            {rowData.values.map((value, subIndex) => (
              <CTableDataCell key={subIndex} className= 'text-cdatacell' style={getStatusCellStyle(value)}>{value}</CTableDataCell>
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
                 
                </CTableHead>
                <CTableRow>
                    {headers.map((header, index) => (
                      <CTableHeaderCell key={index} className='text-categorycell'>
                        {header}
                      </CTableHeaderCell>
                    ))}
                    
                  </CTableRow>
                <CTableBody className='text-textbody'>
                  
                  {filterTableData("Paid").map((rowData, index) => (
                    <CTableRow key={index} className='text-cctablerow'>
                      <CTableDataCell >
                        {rowData.category}
                      </CTableDataCell>
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