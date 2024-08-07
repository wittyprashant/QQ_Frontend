
import { CContainer, CRow } from '@coreui/react';
import React, { useState } from 'react';
import Summary from './summarybtn/summarycard';
import { Color } from '../../components/constant/color';
import Header from '../../components/partials/Header';
import Payable from './payablebtn/payable';
import Recievables from './recieveablebtn/recievedashboard';



function Btndashboard() {
  const [buttonColor, setButtonColor] = useState(false);
  const[buttonbg,setbuttonbg]=useState(false);
  const[summarytext,setsummarytext]=useState(false);
  const[payabletext,setpayabletext]=useState(false);
  const [payColor, setpayColor] = useState(false);
  const[payablebg,setpayablebg]=useState(false);
  const [receiveColor, setreceiveColor] = useState(false);
  const[receivebg,setreceivebg]=useState(false);
  const[recievetext,setreceivetext]=useState(false);


  const handleButtonClick = () => {
    // Change the color to a different one when the button is clicked
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
    // Change the color to a different one when the button is clicked
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
    // Change the color to a different one when the button is clicked
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
         <div class='btn-color'>
      <button
        style={{ color: buttonColor?Color.white:Color.grey,backgroundColor:buttonbg?Color.themeSelectedColor:''}}
        onClick={handleButtonClick}
        class='btnclick'
      >
        SUMMARY
      </button>
  
      <button
        style={{ color: payColor?Color.white:Color.grey,backgroundColor:!payablebg?'':Color.themeSelectedColor }}
        onClick={handlepayButtonClick}
        class='payablebtn'
      >
        PAYABLES
      </button>
      <button
        style={{ color: receiveColor?Color.white:Color.grey,backgroundColor:!receivebg?'':Color.themeSelectedColor }}
        onClick={handlereceiveButtonClick}
        class='receivebtn'
      >
        RECEIVABLES
      </button>
    </div>
   <CContainer>
   <CRow>
   <div class='summary-text'>
      {
        summarytext ?<Summary/>:''
      }
    </div>
   </CRow>
   <CRow>
   <div class='Pay-text'>
      {
        payabletext ?<Payable/>:''
      }
    </div>
   </CRow>
   <CRow>
   <div class='receive-text'>
      {
        recievetext ?<Recievables/>:''
      }
    </div>
   </CRow>
   </CContainer>
    </CRow>
    </CContainer>
    
   
  );
}

export default Btndashboard ;
