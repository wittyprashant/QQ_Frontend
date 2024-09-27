import { useState, useEffect } from "react";
import {
  CFormInput,
  CCard,
  CCardBody,
  CCol
} from "@coreui/react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { cilSearch } from "@coreui/icons";
import axios from "axios";
import React from "react";
import DataTable from "react-data-table-component";
import { color } from "@mui/system";

const constructUrlWithParams = (baseUrl, params) => {
  const query = Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
  return `${baseUrl}?${query}`;
};

const Recievables = ({ invoiceType, data }) => {
  const [tableData, setTableData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterText, setFilterText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = { invoice_type: "ACCREC" };
        const baseUrl = "http://localhost:8080/api/v1/invoice/";
        const url = constructUrlWithParams(baseUrl, params);
        const response = await axios.get(url);

        if (response.status === 200 && Array.isArray(response.data.data)) {
          setTableData(response.data.data);
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
      name: "Invoice Number",
      selector: (row) => row.InvoiceNumber,
      sortable: true,
    },
    {
      name: "Ref",
      selector: (row) => row.Reference,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.values,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: "Due Date",
      selector: (row) => row.DueDate,
      sortable: true,
    },
    {
      name: "Paid",
      selector: (row) => "-$" + `${row.AmountPaid}`,
      sortable: true,
    },
    {
      name: "Due",
      selector: (row) => "-$" + `${row.AmountDue}`,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        let color = "black";
        if (row.Status === "PAID") {
          color = "#00C365";
        } else if (row.Status === "Awaiting Payment") {
          color = "#FFBB56";
        }
        return <div style={{ color }}>{row.Status}</div>;
      },
      sortable: true,
    },
  ];

  const headers =
    tableData.length > 0 && Array.isArray(tableData[0].values)
      ? tableData[0].values
      : [];

  const getStatusCellStyle = (status) => {
    if (status === "Awaiting Payment") {
      return { color: "#FFBB56" }; 
    } else if (status === "Paid") {
      return { color: "#00C365" }; 
    }
    return {};
  };

  const filterTableData = (data, Status, filterText) => {
    if (!Array.isArray(data)) {
      console.warn("Data is not an array:", data);
      return []; 
    }

    let filteredData =
      Status === "ALL" ? data : data.filter((row) => row.Status === Status);

    return filteredData.filter((item) => {
      const invoiceNumber = item.InvoiceNumber || ""; 
      const Ref = item.Reference || "";
      const status = item.Status || ""; 

      return (
        invoiceNumber.toLowerCase().includes(filterText.toLowerCase()) ||
        Ref.toLowerCase().includes(filterText.toLowerCase()) ||
        status.toLowerCase().includes(filterText.toLowerCase())
      );
    });
  };

  return (
    <div className="Payable">
      <CCard class="card card-payable">
        <div class="sum-card">
          <div class="invoice-text">
            <CCardBody class="text-invoicepay">Scheduled Receivables</CCardBody>
          </div>
          <div class="border-solid"></div>
          <div class="text-scheduledpay">
            <div class="invoice-boxjan">
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
                  <CCard class="text-dateprice">$3,001</CCard>
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
      </CCard>
      <div className="text-tabs">
        <Tabs
          defaultActiveKey="ALL"
          transition={false}
          id="noanim-tab-example"
          className="tab-text"
        >
          <Tab eventKey="ALL" title="ALL">
            <CCard>
              <CCol>
                <CFormInput
                  onChange={(e) => setFilterText(e.target.value)} 
                  value={filterText} 
                  icon={cilSearch}
                  size="sm"
                  className="searchinputform" 
                  placeholder="Search..."
                />
              </CCol>
              <DataTable
                columns={columns}
                data={filterTableData(tableData, selectedStatus, filterText)} 
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
};

export default Recievables;
