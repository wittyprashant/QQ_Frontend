import React from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CTable,
  CTableRow,
  CTableHead,
  CTableDataCell,
  CTableHeaderCell,
  CTableBody,
} from "@coreui/react";
const columns = [
  {
    key: "id",
    label: "",
    _props: { scope: "col" },
  }
];
const tableData = [
  {
    category: "",
    values: [
      "9 Dec 2022",
    ],
  },
  {
    category: "Approved Bills to be paid by AMEX in Xero awaiting payment",
    values: ["-$50,456", "-$45,350", "-$32,980", "-$15,634", "-$22,119"],
  }
];
const Summary = () => {
  return (
    <div>
      <CCard>
        <div class="main-card-box">
          <div class="border-right  spacecard">
            <div class="sum-card">
              <div class="invoice">
                <CCardBody class="text-invoice">Invoices</CCardBody>
                <div class="invoice-box">
                  <div class="border-right">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-await">AWAITING RECIEPT</CCardBody>
                      <CCard class="text-price">$100,000</CCard>
                    </CCol>
                  </div>
                  <div>
                    <CCol class="text-Overdue">
                      <CCardBody class="text-await">OVERDUE</CCardBody>
                      <CCard class="text-overduep">$50,000</CCard>
                    </CCol>
                  </div>
                </div>
              </div>
              <div class="text-scheduled">
                <CCardBody class="text-invoice">Scheduled Receipts</CCardBody>
                <div class="invoice-box">
                  <div class="border-rightdate">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">2 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$10,657</CCard>
                    </CCol>
                  </div>
                  <div class="border-rightdate">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">9 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$12,065</CCard>
                    </CCol>
                  </div>
                  <div>
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">16 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$7,031</CCard>
                    </CCol>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="main-card-box">
              <div class="text-bill">
                <CCardBody class="text-invoice">Bills</CCardBody>
                <div class="invoice-box">
                  <div>
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">AWAITING APPROVAL</CCardBody>
                      <CCard class="text-dateprice">$100,000</CCard>
                    </CCol>
                  </div>
                </div>
              </div>
              <div class="text-scheduled">
                <CCardBody class="text-invoice">Scheduled Payments</CCardBody>
                <div class="invoice-box">
                  <div class="border-rightdate">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-await">2 JAN 2023</CCardBody>
                      <CCard class="text-price">$10,657</CCard>
                    </CCol>
                  </div>
                  <div class="border-rightdate">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">9 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$12,065</CCard>
                    </CCol>
                  </div>
                  <div class="border-rightdate">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">16 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$7,031</CCard>
                    </CCol>
                  </div>
                  <div class="border-rightdate">
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">23 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$7,031</CCard>
                    </CCol>
                  </div>
                  <div>
                    <CCol class="text-Receipt">
                      <CCardBody class="text-date">30 JAN 2023</CCardBody>
                      <CCard class="text-dateprice">$500</CCard>
                    </CCol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCard>
      <div class="card-debitcard">
        <CCard class="card account">
          <CCardBody class="text-bankacc">Bank Accounts / Debit Card</CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow class="text-headercell">
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">9 Dec 2022</CTableHeaderCell>
                <CTableHeaderCell scope="col">16 Dec 2022</CTableHeaderCell>
                <CTableHeaderCell scope="col">23 Dec 2022</CTableHeaderCell>
                <CTableHeaderCell scope="col">30 Dec 2022</CTableHeaderCell>
                <CTableHeaderCell scope="col">6 Jan 2022</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Approved Bills in Xero awaiting payment
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-$45,350</CTableDataCell>
                <CTableDataCell>-$32,980</CTableDataCell>
                <CTableDataCell>-$15,634</CTableDataCell>
                <CTableDataCell>-$22,119</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Unapproved Bills in Xero awaiting payment
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  ATO
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Superannuation
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  AMEX Credit Card
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Loan Repayments
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Total Planned Payments
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Cash At Bank
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Expected Customer Receipts
                </CTableHeaderCell>
                <CTableDataCell class="text-datacell">-$50,456</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
              <CTableRow class="text-tablerow">
                <CTableHeaderCell class="text-cell" scope="row">
                  Cash After Payments & Receipts
                </CTableHeaderCell>
                <CTableDataCell class="text-datacashcell">
                  -$50,456
                </CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
                <CTableDataCell>-</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCard>
      </div>
      <div>
        <CCard class="card text-creditcard">
          <CCardBody class="text-bankacc">Credit Cards AMEX</CCardBody>
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
                      className={subIndex === 0 ? "text-datacell" : ""}
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
};
export default Summary;
