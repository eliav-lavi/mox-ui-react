import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { Color } from "./design/colors";

const HeaderWrapper = styled.div`
  background-color: ${Color.Gray200};
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
`;

const MenuItem = styled(NavLink)`
  padding-right: 10px;
  text-decoration: none;
  &:visited {
    color: inherit;
  }
  &:hover {
    color: ${Color.Purple200}
  }
  &:focus {
    color: ${Color.Purple300}
  }
`;

const menuItems: Array<{ label: string; link: string }> = [
  { label: "endpoints", link: "/endpoints" },
  { label: "config", link: "/config" },
  { label: "export", link: "/export" },
  { label: "import", link: "/import" },
];


export function Header() {

  return (
    <HeaderWrapper>
      <div style={{ flex: 30 }}>
        <code> m o x</code>
      </div>
      <div
        style={{
          flex: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {menuItems.map((menuItem, i) => {
          return (
            <MenuItem key={i} to={menuItem.link}>
              <code>{menuItem.label}</code>
            </MenuItem>
          );
        })}
      </div>
    </HeaderWrapper>
  );
}
