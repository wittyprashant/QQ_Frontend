import React, { Component } from 'react';
import { CCard, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCol } from '@coreui/react';

class Summary extends Component {
  // Define the state, if necessary
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      tableData: [
        {
          category: 'Approved Bills in Xero awaiting payment',
          values: ['-$50,456', '-$45,350', '-$32,980', '-$15,634', '-$22,119'],
        },
        {
          category: 'Unapproved Bills in Xero awaiting payment',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'ATO',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'Superannuation',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'AMEX Credit Card',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'Loan Repayments',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'Total Planned Payments',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'Cash At Bank',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'Expected Customer Receipts',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
        {
          category: 'Cash After Payments & Receipts',
          values: ['-$50,456', '-', '-', '-', '-'],
        },
      ],
    };
  }

  // The render method returns the JSX
  render() {
    const { tableData } = this.state; // Destructure state for easier access
    return (
      <div>
        <CCard>
      <div class="main-card-box">
         <div class="border-right  spacecard">
            <div class='sum-card'>
               <div class='invoice'>
                  <CCardBody class='text-invoice'>Invoices</CCardBody>
                  <div  class="invoice-box">
                     <div class="border-right">
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-await'>AWAITING RECIEPT</CCardBody>
                           <CCard class='text-price'>$100,000</CCard>
                        </CCol>
                     </div>
                     <div>
                        <CCol class='text-Overdue'>
                           <CCardBody class='text-await'>OVERDUE</CCardBody>
                           <CCard class='text-overduep'>$50,000</CCard>
                        </CCol>
                     </div>
                  </div>
               </div>
               <div class='text-scheduled'>
                  <CCardBody class='text-invoice'>Scheduled Receipts</CCardBody>
                  <div  class="invoice-box">
                     <div class="border-rightdate">
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>2 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$10,657</CCard>
                        </CCol>
                     </div>
                     <div class="border-rightdate">
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>9 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$12,065</CCard>
                        </CCol>
                     </div>
                     <div>
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>16 JAN 2023</CCardBody>
                           <CCard class='text-dateprice'>$7,031</CCard>
                        </CCol>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <div class="main-card-box">
               <div class="text-bill">
                  <CCardBody class='text-invoice'>Bills</CCardBody>
                  <div  class="invoice-box">
                     <div>
                        <CCol class='text-Receipt'>
                           <CCardBody class='text-date'>AWAITING APPROVAL</CCardBody>
                           <CCard class='text-dateprice'>$100,000</CCard>
                        </CCol>
                     </div>
                  </div>
               </div>
               <div class='text-scheduled'>
                  <CCardBody class='text-invoice'>Scheduled Payments</CCardBody>
                  <div  class="invoice-box">
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
                           <CCard class='text-dateprice'>$7,031</CCard>
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
         </div>
      </div>
   </CCard>
        <div className="card-debitcard">
          <CCard className="card account">
            <CCardBody className="text-bankacc">Bank Accounts / Debit Card</CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow className="text-headercell">
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">9 Dec 2022</CTableHeaderCell>
                  <CTableHeaderCell scope="col">16 Dec 2022</CTableHeaderCell>
                  <CTableHeaderCell scope="col">23 Dec 2022</CTableHeaderCell>
                  <CTableHeaderCell scope="col">30 Dec 2022</CTableHeaderCell>
                  <CTableHeaderCell scope="col">6 Jan 2022</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableData.map((rowData, index) => (
                  <CTableRow key={index} className="text-tablerow">
                    <CTableHeaderCell className="text-cell" scope="row">
                      {rowData.category}
                    </CTableHeaderCell>
                    {rowData.values.map((value, subIndex) => (
                      <CTableDataCell
                        key={subIndex}
                        className={subIndex === 0 ? 'text-datacell' : ''}
                      >
                        {value}
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </div>
        <div>
          <CCard className="card text-creditcard">
            <CCardBody className="text-bankacc">Credit Cards AMEX</CCardBody>
            <CTable>
              <CTableHead></CTableHead>
              <CTableBody>
                {tableData.map((rowData, index) => (
                  <CTableRow key={index} className="text-ctablerow">
                    <CTableHeaderCell className="text-category" scope="row">
                      {rowData.category}
                    </CTableHeaderCell>
                    {rowData.values.map((value, subIndex) => (
                      <CTableDataCell
                        key={subIndex}
                        className={subIndex === 0 ? 'text-datacell' : ''}
                      >
                        {value}
                      </CTableDataCell>
                    ))}
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </div>
      </div>
    );
  }
}

export default Summary;
