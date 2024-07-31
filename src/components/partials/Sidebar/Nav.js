import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilUser,
  // cilGroup,
  cilLibrary,
  cilHistory,
  cilCommentSquare,
  cilBug,
  cibEleventy,
  cilMoney,
  cilContact,
  cilShieldAlt,
  cilUserX,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const Nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashbord',
  //   to: '/dashbord',
  //   icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    role : [1],
    class:'text-dash'
  },
  {
    component: CNavItem,
    name: 'Transaction',
    to: '/transactions',
    role : [1]
  },
  // {
  //   component: CNavItem,
  //   name: 'Group',
  //   to: '/group_management',
  //   icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  //   role : [1,2,3,4]
  // },
  // {
  //   component: CNavItem,
  //   name: 'Digital Library',
  //   to: '/digital_library',
  //   icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
  //   role : [1,2,3,4]
  // },
  {
    component: CNavItem,
    name: 'Bill',
    to: '/bill',
    role : [1]
  },
  // {
  //   component: CNavItem,
  //   name: 'Replays',
  //   to: '/replays',
  //   icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
  //   role : [1,2,3,4]
  // },
  // {
  //   component: CNavItem,
  //   name: 'Events',
  //   to: '/events',
  //   icon: <CIcon icon={cibEleventy} customClassName="nav-icon" />,
  //   role : [1,2,3,4]
  // },
  // {
  //   component: CNavItem,
  //   name: 'Funding',
  //   to: '/funding',
  //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  //   role : [1,2,3,4]
  // },
  {
    component: CNavItem,
    name: 'Menu Item',
    to: '/menuitem',
    role : [1]
  }, 
  {
    component: CNavItem,
    name: 'Settings',
    to: '/setting',
    role : [1]
  },
 /* {
    component: CNavItem,
    name: 'User Request',
    to: '/user_request',
    icon: <CIcon icon={cilUserX} customClassName="nav-icon" />,
    role : [1]
  }, */
  // {
  //   component: CNavItem,
  //   name: 'Billing info',
  //   to: '/billing_info',
  //   icon: <CIcon icon={cilScrubber} customClassName="nav-icon" />,
  // }
]

export default Nav
