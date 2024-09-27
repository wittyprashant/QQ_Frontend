import {
    CFormSwitch,
    CCard,
    CCardBody,
    CCardHeader,
    CDropdown,
    CRow,
    CButton,
    CDropdownToggle,
    CDropdownItem,
    CFormTextarea,
    CDropdownMenu,
    CCol,
  } from "@coreui/react";
  import { DropdownButton, Dropdown, Col } from "react-bootstrap";
  import CIcon from "@coreui/icons-react";
  import React, { Component, useState } from "react";
  import { connect } from "react-redux";
  import { CContainer } from "@coreui/react";
  import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
  } from "react-router-dom";
  import {
    cilArrowCircleRight,
    cilGarage,
    cilRestaurant,
    cilEnvelopeOpen,
    cilOptions,
  } from "@coreui/icons";
  import * as actions from "../../store/actions";
  
  function withRouter(Component) {
    return (props) => {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();
      const match = useMatch("/user/request/:memberId");
      return (
        <Component
          {...props}
          match={match}
          navigate={navigate}
          location={location}
          params={params}
        />
      );
    };
  }
  
  class TransactionDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        memberId: 0,
        primaryButton: false,
        reassignChk: false,
        businessButton: false,
        yesBtnClick: false,
        reasignSelectClick: false,
        selectedJobNumber: "",
        clickTransactionForBtn: false,
        clickDoYouInvoiceYesBtn: false,
        selectedEmployee: "Select an employee",
        colorpersonalbtn: false,
      };
    }
  
    componentDidMount() {
      let memberId = this.props.match ? this.props.match.params.memberId : "";
    }
    personalBtnClick = (e) => {
      this.setState({ primaryButton: true });
      this.setState({ businessButton: false });
      this.setState({ colorpersonalbtn: true });
    };
    reassignFunction = (e) => {
      this.state.reassignChk === true
        ? this.setState({ reassignChk: false })
        : this.setState({ reassignChk: true });
    };
  
    businessBtnClick = (e) => {
      this.setState({ primaryButton: false });
      this.setState({ businessButton: true });
      this.setState({ yesBtnClick: false });
    };
    yesPrimaryButtonClick = (e) => {
      this.state.yesBtnClick === true
        ? this.setState({ yesBtnClick: false })
        : this.setState({ yesBtnClick: true });
    };
    reasignSelectFunction(selectedKey, event) {
      this.setState({
        selectedEmployee: event.target.textContent,
      });
    }
    selectJobNumberFunction(selectedKey1, event) {
      this.setState({
        selectedJobNumber: selectedKey1,
      });
    }
    ClickOnTransactionFor = (e) => {
      this.setState({ clickTransactionForBtn: true });
    };
    clickDoYouInvoiceBtn = (e) => {
      this.setState({ clickDoYouInvoiceYesBtn: true });
    };
  
    render() {
      return (
        <div class="card mb-5">
          <CCard>
            <CCardHeader className="d-flex" component="h5">
              <div class="col-sm">Transaction Detail</div>
            </CCardHeader>
            <CCardBody className="text-center">
              <CContainer fluid>
                <div class="row mb-2">
                  <h2 class="text-primary">-$140.75</h2>
                </div>
                <div class="row mb-2">
                  <p>
                    {" "}
                    Transaction XXXXXX 2000444453531 <br />
                    Company
                  </p>
                </div>
                <div class="row mb-2">
                  <div>
                    Thu 23 Sep 2021 <br />
                    08:23 AM (SYD/MEL Time) <br />
                    Receipt #: J000000000000
                  </div>
                </div>
                <hr />
                <CRow class="transaction-row">
                  <h6 class="text-expense">What type of expense is this?</h6>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <CButton
                      class="btn-secondary"
                      onClick={this.personalBtnClick.bind(this)}
                      style={{ marginRight: "10px", marginTop: "10px" }}
                    >
                      PERSONAL
                    </CButton>
                    <CButton
                      class="btn1-secondary"
                      onClick={this.businessBtnClick.bind(this)}
                    >
                      BUSINESS
                    </CButton>
                  </CCol>
                </CRow>
  
                {this.state.primaryButton ? (
                  <CRow className="mb-2">
                    <h6 class="text-primary">
                      Do you want to ALWAYS record transactions from company as a
                      Personal Expense?
                    </h6>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.primaryButton ? (
                  <CRow className="mb-2">
                    <CCol>
                      <div class="sec1">
                        <CButton
                          size="sm"
                          style={{ marginRight: "10px" }}
                          onClick={this.yesPrimaryButtonClick.bind(this)}
                        >
                          Yes
                        </CButton>
                        <CButton size="sm">No</CButton>
                      </div>
                    </CCol>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.primaryButton === false &&
                this.state.businessButton === false ? (
                  <div class="transaction-section">
                    <CRow className="text-crow">
                      <CFormSwitch
                        className="text-switch"
                        onChange={this.reassignFunction.bind(this)}
                        value="0"
                        id="formSwitchCheckChecked"
                      ></CFormSwitch>
                      <p class="text-reassign">Reassign to a team member</p>
                    </CRow>
                  </div>
                ) : (
                  ""
                )}
  
                {this.state.reassignChk ? (
                  <CRow className="drop-row">
                    <div class="employee">
                      <DropdownButton
                        class="btn-drop1"
                        onSelect={this.reasignSelectFunction.bind(this)}
                        title={this.state.selectedEmployee}
                      >
                        <Dropdown.Item eventKey="1">Employee One</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Employee Two</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Employee Three</Dropdown.Item>
                        <Dropdown.Item eventKey="4">Employee Four</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.selectedEmployee &&
                this.state.reassignChk === true ? (
                  <CRow className="drop-text">
                    <h6 class="text-Team">
                      {" "}
                      Do you ALWAYS want to reassign transactions from Company to
                      Team Member?
                    </h6>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.selectedEmployee &&
                this.state.reassignChk === true ? (
                  <CRow className="btn-textrow">
                    <CCol>
                      <div class="btn-section">
                        <CButton
                          class="yes-btn"
                          size="sm"
                          style={{ marginRight: "10px", marginTop: "15px" }}
                        >
                          Yes
                        </CButton>
                        <CButton class="no-btn" size="sm">
                          No
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.primaryButton === true ||
                (this.state.reassignChk === true &&
                  this.state.selectedEmployee) ? (
                  <div class="transaction-mainsec">
                    <CRow className="text-switchrow">
                      <CFormSwitch
                        className="text-switchagain"
                        onChange={this.reassignFunction.bind(this)}
                        value="0"
                        id="formSwitchCheckChecked"
                      ></CFormSwitch>
                      <p class="text-Dont">Don't show me again</p>
                    </CRow>
                  </div>
                ) : (
                  ""
                )}
  
                {this.state.yesBtnClick ? (
                  <CRow className="mb-2">
                    <CCol>
                      <div class="nextquerybtn2">
                        <CButton size="sm">
                          Next Query <CIcon icon={cilArrowCircleRight} />
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.businessButton ? (
                  <CRow className="mb-2">
                    <div class="assignjobnumberheading2">
                      <h6 class="text-primary">Assign a Job Number</h6>
                    </div>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.businessButton ? (
                  <CRow className="mb-2">
                    <div class="assignjobnumberselect2">
                      <DropdownButton
                        id="split-button-dropdown"
                        onSelect={this.selectJobNumberFunction.bind(this)}
                        title="Select a Job Number"
                      >
                        <Dropdown.Item eventKey="1">
                          JOB1001 - Cambelltown
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          JOB1002 - Randwick
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3">Not Required</Dropdown.Item>
                        <Dropdown.Item eventKey="3">I am not sure</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.selectedJobNumber ? (
                  <CRow>
                    <div class="transactionheading">
                      <h6 class="text-primary">What is this transaction for?</h6>
                    </div>
                    <div class="wrapper1">
                      <div
                        class="box"
                        onClick={this.ClickOnTransactionFor.bind(this)}
                      >
                        <CIcon icon={cilGarage} size="lg" />
                        Vehicle
                      </div>
                      <div
                        class="box"
                        onClick={this.ClickOnTransactionFor.bind(this)}
                      >
                        <CIcon icon={cilRestaurant} size="lg" />
                        Food
                      </div>
                      <div
                        class="box"
                        onClick={this.ClickOnTransactionFor.bind(this)}
                      >
                        <CIcon icon={cilEnvelopeOpen} size="lg" />
                        Software
                      </div>
                      <div
                        class="box"
                        onClick={this.ClickOnTransactionFor.bind(this)}
                      >
                        <CIcon icon={cilOptions} size="lg" />
                        Other
                      </div>
                    </div>
  
                    <div className="row transactiontextarea">
                      <CFormTextarea
                        id="floatingTextarea"
                        floatingLabel="Comments"
                        placeholder="Leave a comment here"
                      ></CFormTextarea>
                    </div>
                  </CRow>
                ) : (
                  ""
                )}
                {this.state.clickTransactionForBtn ? (
                  <CRow className="mb-2">
                    <div class="invoiceheading">
                      <h6 class="text-primary">Do you have an invoice?</h6>
                    </div>
                    <div class="transactionbtn">
                      <CButton
                        size="sm"
                        style={{ marginRight: "10px" }}
                        onClick={this.clickDoYouInvoiceBtn.bind(this)}
                      >
                        Yes
                      </CButton>
                      <CButton size="sm">No</CButton>
                    </div>
                  </CRow>
                ) : (
                  ""
                )}
  
                {this.state.clickDoYouInvoiceYesBtn ? (
                  <CRow>
                    <div class="">
                      <h6 class="text-primary">Have you sent it?</h6>
                    </div>
                    <div class="transactionbtn">
                      <CButton size="sm" style={{ marginRight: "10px" }}>
                        Yes
                      </CButton>
                      <CButton size="sm">No</CButton>
                    </div>
                  </CRow>
                ) : (
                  ""
                )}
                <CRow className="mb-2">
                  <div style={{ display: "none" }} class="selectnextheading">
                    <h6 class="text-primary">Select next step</h6>
                  </div>
                </CRow>
                <CRow className="mb-2">
                  <CCol>
                    <div style={{ display: "none" }} class="selecttransaction">
                      <CDropdown variant="btn-group">
                        <CDropdownToggle size="sm"> Select </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem href="#">
                            Record aas a personal transaction
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            I'll supplier an invoice later
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            Request from someone else
                          </CDropdownItem>
                          <CDropdownItem href="#">
                            Request from supplier
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-2">
                  <Col>
                    <div style={{ display: "none" }}>
                      <CButton size="sm">
                        Next Query <CIcon icon={cilArrowCircleRight} />
                      </CButton>
                    </div>
                  </Col>
                </CRow>
              </CContainer>
              {
              }
            </CCardBody>
          </CCard>
        </div>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      data: state.userRequest.transactionDetail,
    };
  };
  
  const mapDispatchToProp = (dispatch) => {
    return {
      onTransactionDetail: (id) => dispatch(actions.TransactionDetail(id)),
    };
  };
  
  export default withRouter(
    connect(mapStateToProps, mapDispatchToProp)(TransactionDetail)
  );
  