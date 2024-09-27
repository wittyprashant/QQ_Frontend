import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CRow,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from "@coreui/react";
import { SidebarNav } from "./Sidebar/SidebarNav";
import logoNegative from "../../assets/Images/logo_white.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import navigation from "./Sidebar/Nav";

const Sidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.site.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.site.sidebarShow);

  return (
    <CSidebar position="fixed" unfoldable={unfoldable} visible={sidebarShow}>
      <CSidebarBrand className="QQ-log" to="/">
        <img
          src={logoNegative}
          alt="logo"
          size="md"
          style={{ width: "180px", marginLeft: "-20px" }}
        />
      </CSidebarBrand>
      <CRow>
        <div class="border-logo"></div>
      </CRow>
      <CRow>
        <div class="logo-dropdown">
          <select
            id="dropdown"
            class="text-dropdown"
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
    </CSidebar>
  );
};

export default React.memo(Sidebar);
