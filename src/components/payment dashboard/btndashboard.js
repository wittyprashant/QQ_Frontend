import { CContainer, CRow } from '@coreui/react';
import React, { useState } from 'react';
import Summary from './summarybtn/summarycard';
import { Color } from '../constant/color';
import Payable from './payablebtn/payable';
import Recievables from './recieveablebtn/recievedashboard';
import Header from '../partials/Header';

function Btndashboard() {
  // Initialize state to open the "Summary" section by default
  const [buttonColor, setButtonColor] = useState(true);
  const [buttonbg, setbuttonbg] = useState(true);
  const [summarytext, setsummarytext] = useState(true);
  const [payabletext, setpayabletext] = useState(false);
  const [payColor, setpayColor] = useState(false);
  const [payablebg, setpayablebg] = useState(false);
  const [receiveColor, setreceiveColor] = useState(false);
  const [receivebg, setreceivebg] = useState(false);
  const [recievetext, setreceivetext] = useState(false);

  const handleButtonClick = () => {
    // Open "Summary" and close others
    setButtonColor(true);
    setbuttonbg(true);
    setsummarytext(true);
    setpayColor(false);
    setpayablebg(false);
    setreceiveColor(false);
    setreceivebg(false);
    setpayabletext(false);
    setreceivetext(false);
  };

  const handlepayButtonClick = () => {
    // Open "Payables" and close others
    setpayColor(true);
    setpayablebg(true);
    setButtonColor(false);
    setbuttonbg(false);
    setreceiveColor(false);
    setreceivebg(false);
    setsummarytext(false);
    setpayabletext(true);
    setreceivetext(false);
  };

  const handlereceiveButtonClick = () => {
    // Open "Receivables" and close others
    setpayColor(false);
    setpayablebg(false);
    setButtonColor(false);
    setbuttonbg(false);
    setreceiveColor(true);
    setreceivebg(true);
    setsummarytext(false);
    setpayabletext(false);
    setreceivetext(true);
  };

  return (
    <CContainer>
      <Header headerText='Payment Dashboard' />
      <CRow>
        <div className='btn-color'>
          <button
            style={{ color: buttonColor ? Color.white : Color.grey, backgroundColor: buttonbg ? Color.themeSelectedColor : '' }}
            onClick={handleButtonClick}
            className='btnclick'
          >
            SUMMARY
          </button>
          <button
            style={{ color: payColor ? Color.white : Color.grey, backgroundColor: !payablebg ? '' : Color.themeSelectedColor }}
            onClick={handlepayButtonClick}
            className='payablebtn'
          >
            PAYABLES
          </button>
          <button
            style={{ color: receiveColor ? Color.white : Color.grey, backgroundColor: !receivebg ? '' : Color.themeSelectedColor }}
            onClick={handlereceiveButtonClick}
            className='receivebtn'
          >
            RECEIVABLES
          </button>
        </div>
        <CContainer>
          <CRow>
            <div className='summary-text'>
              {summarytext ? <Summary /> : ''}
            </div>
          </CRow>
          <CRow>
            <div className='Pay-text'>
              {payabletext ? <Payable /> : ''}
            </div>
          </CRow>
          <CRow>
            <div className='receive-text'>
              {recievetext ? <Recievables /> : ''}
            </div>
          </CRow>
        </CContainer>
      </CRow>
    </CContainer>
  );
}

export default Btndashboard;
