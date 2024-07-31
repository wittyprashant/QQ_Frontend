import React from 'react';
import { CContainer, CHeader, CHeaderBrand, CHeaderDivider, CHeaderNav, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { HeaderDropdown } from './header/index';
import logo from '../../assets/Images/logo_white.png';

const Header = ({ headerText, dropdownContent }) => {
  const showDropdown = !!dropdownContent; // Check if dropdownContent is provided

  return (
    <CHeader className='header-section' position='fixed'>
      <CContainer fluid>
        <CRow>
          <div className='text-section'>
            <p className='text-payment'>{headerText}</p>
            {showDropdown && (
              <div className='dropdown-content'>
                {/* Render dropdown content */}
                {dropdownContent}
              </div>
            )}
          </div>
        </CRow>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand> 
        <CHeaderNav className="ms-3">
          <HeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
    </CHeader>
  );
};

export default Header;
