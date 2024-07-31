import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CRow, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

import { SidebarNav } from './Sidebar/SidebarNav'

import logoNegative from '../../assets/Images/logo_white.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'


// sidebar nav config
import navigation from './Sidebar/Nav'

const Sidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.site.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.site.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
    >
      <CSidebarBrand className="QQ-log" to="/">
        <img src={logoNegative} alt="logo" size="md" style={{width:"180px",marginLeft:"-20px"}} />
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      
      </CSidebarBrand>
      <CRow>
        <div class='border-logo'></div>
      </CRow>
      <CRow>
      <div class='logo-dropdown'>
        <select
          id="dropdown"
          class='text-dropdown'
         // value={this.state.selectedValue}
         // onChange={this.handleChange}
        >
          <option value="">Select Workspace</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

       
      </div>
      </CRow>
      <CSidebarNav>
        <SimpleBar>
          <SidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'SITE_SIDEBAR', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(Sidebar)

