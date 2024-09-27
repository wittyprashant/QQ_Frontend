import React from "react";
import { CNavItem } from "@coreui/react";

const Nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    role: [1],
    class: "text-dash",
  },
  {
    component: CNavItem,
    name: "Transaction",
    to: "/transactions",
    role: [1],
  },
  {
    component: CNavItem,
    name: "Bill",
    to: "/bill",
    role: [1],
  },
  {
    component: CNavItem,
    name: "Menu Item",
    to: "/menuitem",
    role: [1],
  },
  {
    component: CNavItem,
    name: "Settings",
    to: "/setting",
    role: [1],
  }
];

export default Nav;
