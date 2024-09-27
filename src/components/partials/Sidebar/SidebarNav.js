import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "../../../../src/scss/_custom.scss";

import { CBadge } from "@coreui/react";

export const SidebarNav = ({ items }) => {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("userDetail"));

  const navLink = (name, icon, badge) => {
    return (
      <>
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => {
          if (item.role.indexOf(auth.roleId) !== -1) {
            return item.items ? navGroup(item, index) : navItem(item, index);
          } else {
            return false;
          }
        })}
    </React.Fragment>
  );
};

SidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
