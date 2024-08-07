// import { CFormInput } from '@coreui/react';
// //import { CIcon } from '@coreui/icons-react'; // Import the CIcon component
// import { cilSearch } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';

// const BillingInfo = () => {
//     return (
//         <>
//             <div>
//                 <div className='bill-section'>
//                     <div>
                    
//                         <CFormInput
//                             size="sm"
//                             className='searchinputformbill'
//                             placeholder="Search..."
//                             //prepend={<CIcon name="cilSearch" />} // Add the icon using the prepend prop
//                             icon={cilSearch}
//                         />
//                         <p className='outstanding-billtext'>Outstanding Bills</p>
//                     </div>
//                     <div>
//                         content
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default BillingInfo;
// import { CFormInput, CCard, CCardBody, CCardTitle, CCardText, CButton,CTableHead,CTableHeaderCell,CTableRow,CTableBody,CTableDataCell,CTable } from '@coreui/react';
// import { cilCheckAlt, cilSearch, cilX } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import XeroLogo from '../../assets/Images/XeroLogo.png';
// import notlogo from '../../assets/Images/not.png';
// import edit from '../../assets/Images/edit.png';
// import dropdown from '../../assets/Images/dropdown.png';
// import file from '../../assets/Images/file.png';
// import rightdrop from '../../assets/Images/leftarrow.png';

// import Sidebar from '../../components/partials/Sidebar';
// import { useState } from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
// import Header from '../../components/partials/Header';



// const Textarea = (props) => {
//   return <textarea {...props} />;
// };

// const BillingInfo = () => {
//     const [showSidebar, setShowSidebar] = useState('');
//     const [sidebarVisible, setSidebarVisible] = useState(false);
//     const toggleSidebar = () => {
//         setShowSidebar(true);
//         setSidebarVisible(!sidebarVisible);
//     }
//     // Sample bill data array
//     const bills = [
//         { id: 1, title: 'Bill XXXXXXXX', name: 'From Suppliers Name',account:'X,XXX.XX AUD' ,companyname:'To Company Name'},
//         { id: 2, title: 'Bill XXXXXXXX', name: 'From Suppliers Name',account:'X,XXX.XX AUD' ,companyname:'To Company Name'},
//         { id: 3, title: 'Bill XXXXXXXX', name: 'From Suppliers Name',account:'X,XXX.XX AUD' ,companyname:'To Company Name'},
//         { id: 4, title: 'Bill XXXXXXXX', name: 'From Suppliers Name',account:'X,XXX.XX AUD' ,companyname:'To Company Name'},
//         { id: 5, title: 'Bill XXXXXXXX', name: 'From Suppliers Name',account:'X,XXX.XX AUD' ,companyname:'To Company Name'},
//     ]
   

//     return (
        
//             <div>
//           <Header headerText='Bills' />
           
//                 <div className='bill-section'>
//                     <div className='outstanding-section'>
//                         <CFormInput
//                             size="sm"
//                             className='searchinputformbill'
//                             placeholder="Search..."
//                             icon={cilSearch}
//                         />
//                         <p className='outstanding-billtext'>Outstanding Bills</p>
//                         <div className='bill-cards'>
//                         {bills.map(bill => (
//                             <CCard className='card-bill' key={bill.id}>
//                                 <CCardBody>
//                                     <CCardTitle>{bill.title}</CCardTitle>
//                                     <CCardText className='bills-text'> {bill.name}</CCardText>
//                                     <CCardText className='bills-cardtext'> {bill.account}</CCardText>
//                                     <CCardText className='bills-cardtext'> {bill.companyname}</CCardText>
//                                 </CCardBody>
//                             </CCard>
//                         ))}
//                     </div>
//                     </div>
//                 <div class='section-card'>
//                     <CCard>
//                         <CCardBody>
//                             <div className='card-section'>
//                             <p className='outstanding-billtext'>Bill INV-XXXX from Suppliers Name</p>
//                             <p className='outstanding-billtext'>X,XXX.XX AUD</p>
//                             </div>
//                           <p class='tax-text'>Tax ID: 00000000000</p>
//                           <div class='button-bill'>
//                             <div>
//                             <CIcon icon={cilX} className='btn-icon' />
//                           <CButton class='btn-reject'  >REJECT
//                           </CButton>
//                             </div>
                         
//                           <div>
//                           <CIcon icon={cilCheckAlt} className='btn-icon-right' />
//                           <CButton class='btn-Accept'>  Approve
//                           </CButton>
//                           </div>
//                           </div>
//                           <div class='logo-icon'>
//                           <img src={XeroLogo} size="sm" class='img-logo' />
//                             <div class='logo-text'>
//                                 <p class='createxero-text'>Created In XERO</p>
//                                 <p class='company-text'>CompanyName</p>
//                             </div>
//                           </div>
//                           <div class='bg'>
//                             <div class='edit-bill'>
//                                 <img src={notlogo} class='logo-not'/>
//                                 <p class='approvalbill-text'>Please fill in the missing information before you approval this Bill.</p>
//                                 <div class='editbill-section'>
//                                 <img src={edit} class='edit-logo' />
//                                 <p class='editbill-text'>Edit Bill</p>
//                                 </div>
                               
//                             </div>
//                           </div>
//                           <div class='main-section'>
//                             <div class='date-section'>
//                                 <p class='date-text'>Date</p>
//                                 <p class='datenov-text'>14 Nov 2022</p>
//                             </div>
//                             <div class='duedate-section'>
//                                 <p class='duedate-text'>DueDate</p>
//                                 <p class='year-text'>23 Nov 2022</p>
//                             </div>
//                             <div class='ref-section'>
//                                 <p class='ref-text'>References</p>
//                                 <p class='inv-text'>INV-XXXX</p>
//                             </div>
                            
//                           </div>
//                           <div>
//                             <CTable>
//                           <CTableHead>
//     <CTableRow class='table-section'>
//       <CTableHeaderCell scope="col">Description</CTableHeaderCell>
//       <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
//       <CTableHeaderCell scope="col">Unit price</CTableHeaderCell>
//       <CTableHeaderCell scope="col">Account</CTableHeaderCell>
//       <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
//       <CTableHeaderCell scope="col">Amount AUD</CTableHeaderCell>
//     </CTableRow>
//     </CTableHead>
//     <CTableBody>
//     <CTableRow class='tbale-row'>
//       <CTableHeaderCell scope="row">Description on invoice goes here</CTableHeaderCell>
//       <CTableDataCell>1.00</CTableDataCell>
//       <CTableDataCell>XXX.XX</CTableDataCell>
//       <CTableDataCell>51000 – Account</CTableDataCell>
//       <CTableDataCell>GST on Expenses (XXX)</CTableDataCell>
//       <CTableDataCell>XXX.XX</CTableDataCell>
//     </CTableRow>
//     <CTableRow>
//         <CTableDataCell class='tabledatecell-section text-right border-bottom-none' colspan='6'>Amounts are Tax Exclusive</CTableDataCell>
//     </CTableRow>
//     </CTableBody>
    
//     </CTable>
//                           </div>
                          
//                           <div class='file-table'>
//                             <div class='file-section'>
//                             <img src={XeroLogo} size="sm" class='img-logo' />
//                             <p class='open-text'>Open In Xero</p>
//                              <img src={dropdown} size="sm" class='dropdown-logo' />
//                              <img src={file} class='file-logo'/>
//                              <p class='open-text' onClick={toggleSidebar}>View File</p>
//                              <img src={dropdown} size="sm" class='dropdown-logo' />
//                              <img src={file} class='file-logo'/>
//                              <p class='open-text'>Match With PO</p>
//                             </div>
                            
//                             <div class='tble-section'>
//                                 <CTable>
//                                 <CTableHead >
//                                 <CTableRow class='table-section1 borderbottom'>
//                                 <CTableHeaderCell scope="col">Sub Total</CTableHeaderCell>
//                                 <CTableHeaderCell scope="col" class='aud-text'>X,XXX.XX AUD</CTableHeaderCell>
//                                 </CTableRow>
//                                 <CTableRow class='table-section1'>
//                                 <CTableHeaderCell scope="col">Total Tax (10%)</CTableHeaderCell>
//                                 <CTableHeaderCell scope="col" class='aud-text'>X,XXX.XX AUD</CTableHeaderCell>
//                                 </CTableRow>
//                                 </CTableHead>
//                                 </CTable>
//                                 <div class='total-section'>
//                                 <p class='total-text'>Total</p>
//                                 <p class='xaud-text'>X,XXX.XX AUD</p>  
//                                 </div>
                               
//                             </div>
//                           </div>
//                           <div class='bottom-border'>
//                              </div>
//                              <p class='workflow-text'>Approval Workflow</p>
//                              <div>
//                                 <button >JOB CODE REQURIED</button>
//                                 <img src={rightdrop} class='rightdrop-logo'/>
//                                 <button class='btn-step'>REVIEW STEP</button>
//                                 <img src={rightdrop} class='rightdrop-logo'/>
//                                 <button class='btn-step'>APPROVAL STEP</button>
                              
//                              </div>
//                              <p class='workflow-text'>History</p>
//                              <div class='bottom-border'>
//                              </div>
//                              <Textarea placeholder="Type something..." />
                            
//                         </CCardBody>
                       
//                     </CCard>
//                     {showSidebar?<div class='bg-color'>
        
//                     </div>
//                 :null}
                
//                 </div>
//                 </div>
              
             
//             </div>
      


            
        
//     );
// }
// const styles = StyleSheet.create({
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#FFFFFF',
//       marginLeft:20,
//       width:'90%',
//       height:'100%',
//       marginTop:20,
    
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1,
//       color:'black',
     
//     }
//   });

// export default BillingInfo;



import { useState } from 'react';
import {
  COffcanvasBody,
  COffcanvas,
  CCloseButton,
  COffcanvasHeader,
  COffcanvasTitle,
  CFormInput,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTable,
  CFormTextarea
} from '@coreui/react';
import { cilCheckAlt, cilSearch, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import XeroLogo from '../../assets/Images/XeroLogo.png';
import notlogo from '../../assets/Images/not.png';
import edit from '../../assets/Images/edit.png';
import pdffile from '../../assets/sample.pdf';
import dropdown from '../../assets/Images/dropdown.png';
import file from '../../assets/Images/file.png';
import rightdrop from '../../assets/Images/leftarrow.png';
import Sidebar from '../../components/partials/Sidebar';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Header from '../../components/partials/Header';
// import { Document, pdfjs } from 'react-pdf';

const BillComponent = ({ bills, showSidebar, toggleSidebar }) => {

  // pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs`;
  const [visible, setVisible] = useState(false);
  // const [numPages, setNumPages] = useState(null);
	// const [pageNumber, setPageNumber] = useState(1);

	// const onDocumentLoadSuccess = ({ numPages }) => {
	// 	setNumPages(numPages);
	// };

	// const goToPrevPage = () =>
	// 	setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

	// const goToNextPage = () =>
	// 	setPageNumber(
	// 		pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
	// 	);

  return (
    <div>
      <Header headerText='Bills' />
      <div className='bill-section'>
        <COffcanvas placement="start" visible={visible} onHide={() => setVisible(false)}>
          <COffcanvasHeader>
            <COffcanvasTitle>Invoice</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
          </COffcanvasHeader>
          <COffcanvasBody>
          <iframe src={pdffile} title="test" frameborder="10" height="500px" width="100%"></iframe>
          </COffcanvasBody>
        </COffcanvas>
        <div className='outstanding-section'>
          <CFormInput
            size="sm"
            className='search-input-form-bill'
            placeholder="Search..."
            icon={cilSearch}
          />
          <p className='outstanding-bill-text'>Outstanding Bills</p>
          <div className='bill-cards'>
            <CCard className='card-bill' key={'bill.id'}>
              <CCardBody>
                <CCardTitle>{'Test'}</CCardTitle>
                <CCardText className='bills-text'>{'bill.name'}</CCardText>
                <CCardText className='bills-card-text'>{'bill.account'}</CCardText>
                <CCardText className='bills-card-text'>{'bill.companyname'}</CCardText>
              </CCardBody>
            </CCard>
            {/* {bills.map(bill => (
              <CCard className='card-bill' key={bill.id}>
                <CCardBody>
                  <CCardTitle>{bill.title}</CCardTitle>
                  <CCardText className='bills-text'>{bill.name}</CCardText>
                  <CCardText className='bills-card-text'>{bill.account}</CCardText>
                  <CCardText className='bills-card-text'>{bill.companyname}</CCardText>
                </CCardBody>
              </CCard>
            ))} */}
          </div>
        </div>
        <div className='section-card'>
          <CCard>
            <CCardBody>
              <div className='card-section'>
                <p className='outstanding-bill-text'>Bill INV-XXXX from Supplier's Name</p>
                <p className='outstanding-bill-text'>X,XXX.XX AUD</p>
              </div>
              <p className='tax-text'>Tax ID: 00000000000</p>
              <div className='button-bill'>
                {/* <div>
                  <CIcon icon={cilX} className='btn-icon' />
                  <CButton className='btn-reject'>REJECT</CButton>
                </div> */}
                <div className="icon-button-wrapper">
                  {/* <CIcon icon={cilX} className="btn-icon" /> */}
                  <CButton color="light" size="sm"> REJECT </CButton>
                </div>
                
                {/* <div>
                  <CIcon icon={cilCheckAlt} className='btn-icon-right' />
                  <CButton color="info" shape="rounded-0">Approve</CButton>
                </div> */}
                <div className="icon-button-wrapper">
                  {/* <CIcon icon={cilCheckAlt} className="btn-icon-right " /> */}
                  <CButton color="info" size="sm"> APPROVE </CButton>
                </div>
              </div>
              <div className='logo-icon'>
                <img src={XeroLogo} alt='Xero Logo' className='img-logo' />
                <div className='logo-text'>
                  <p className='createxero-text'>Created In XERO</p>
                  <p className='company-text'>CompanyName</p>
                </div>
              </div>
              <div className='bg'>
                <div className='edit-bill'>
                  <img src={notlogo} alt='Notification Logo' className='logo-not' />
                  <p className='approvalbill-text'>Please fill in the missing information before you approve this Bill.</p>
                  <div className='editbill-section'>
                    <img src={edit} alt='Edit Logo' className='edit-logo' />
                    <p className='editbill-text'>Edit Bill</p>
                  </div>
                </div>
              </div>
              <div className='main-section'>
                <div className='date-section'>
                  <p className='date-text'>Date</p>
                  <p className='datenov-text'>14 Nov 2022</p>
                </div>
                <div className='duedate-section'>
                  <p className='duedate-text'>Due Date</p>
                  <p className='year-text'>23 Nov 2022</p>
                </div>
                <div className='ref-section'>
                  <p className='ref-text'>References</p>
                  <p className='inv-text'>INV-XXXX</p>
                </div>
              </div>
              <div>
                <CTable>
                  <CTableHead>
                    <CTableRow className='table-section'>
                      <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Qty</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Unit price</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Account</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Amount AUD</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow className='table-row'>
                      <CTableHeaderCell scope="row">Description on invoice goes here</CTableHeaderCell>
                      <CTableDataCell>1.00</CTableDataCell>
                      <CTableDataCell>XXX.XX</CTableDataCell>
                      <CTableDataCell>51000 – Account</CTableDataCell>
                      <CTableDataCell>GST on Expenses (XXX)</CTableDataCell>
                      <CTableDataCell>XXX.XX</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell className='table-datecell-section text-right border-bottom-none' colSpan='6'>Amounts are Tax Exclusive</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </div>
              <div className='file-table'>
                <div className='file-section'>
                  <img src={XeroLogo} alt='Xero Logo' className='img-logo' />
                  <p className='open-text'>Open In Xero</p>
                  <img src={dropdown} alt='Dropdown Logo' className='dropdown-logo' />
                  <img src={file} alt='File Logo' className='file-logo' />
                  <p className='open-text' onClick={() => setVisible(true)}>View File</p>
                  <img src={dropdown} alt='Dropdown Logo' className='dropdown-logo' />
                  <img src={file} alt='File Logo' className='file-logo' />
                  <p className='open-text'>Match With PO</p>
                </div>
                <div className='table-section'>
                  <CTable>
                    <CTableHead>
                      <CTableRow className='table-section1 border-bottom'>
                        <CTableHeaderCell scope="col">Sub Total</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='aud-text'>X,XXX.XX AUD</CTableHeaderCell>
                      </CTableRow>
                      <CTableRow className='table-section1'>
                        <CTableHeaderCell scope="col">Total Tax (10%)</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='aud-text'>X,XXX.XX AUD</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                  </CTable>
                  <div className='total-section'>
                    <p className='total-text'>Total</p>
                    <p className='xaud-text'>X,XXX.XX AUD</p>
                  </div>
                </div>
              </div>
              <div className='bottom-border'></div>
              <p className='workflow-text'>Approval Workflow</p>
              <div>
                {/* <button className='job-code-btn'>JOB CODE REQUIRED</button> */}
                <CButton color="light" size="sm"> JOB CODE REQUIRED </CButton>
                <img src={rightdrop} alt='Right Dropdown' className='rightdrop-logo' />
                {/* <button className='btn-step'>REVIEW STEP</button> */}
                <CButton color="light" size="sm"> REVIEW STEP </CButton>
                <img src={rightdrop} alt='Right Dropdown' className='rightdrop-logo' />
                {/* <button className='btn-step'>APPROVAL STEP</button> */}
                <CButton color="light" size="sm"> APPROVAL STEP </CButton>
              </div>
              <p className='workflow-text'>History</p>
              <div className='bottom-border'></div>
              <CFormTextarea
                id="floatingTextarea"
                floatingLabel="Comments"
                placeholder="Leave a comment here"
              ></CFormTextarea>
            </CCardBody>
          </CCard>
          {showSidebar ? <div className='bg-color'></div> : null}
        </div>
      </div>
    </div>
  );
};

export default BillComponent;
