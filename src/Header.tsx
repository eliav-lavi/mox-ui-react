import Switch from "@mui/material/Switch";
import styled from "styled-components";

import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { toggle } from "./state/configSlice";
import { Color } from "./design/colors";
import { Link } from "react-router-dom";

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

const MenuItem = styled.div`
  padding-right: 10px;
`;

const menuItems: Array<{ label: string; link: string }> = [
  { label: "endpoints", link: "/endpoints" },
  { label: "config", link: "/config" },
  { label: "export", link: "/export" },
  { label: "import", link: "/import" },
];

export function Header() {
  const isDarkModeEnabled = useAppSelector(
    (state) => state.configs.isDarkModeEnabled
  );
  const dispatch = useAppDispatch();

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
            <MenuItem key={i}>
              <Link to={menuItem.link}>{menuItem.label}</Link>
            </MenuItem>
          );
        })}
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <Switch
          size={"small"}
          checked={isDarkModeEnabled}
          onChange={() => dispatch(toggle())}
        />
        {isDarkModeEnabled ? (
          <ModeNightIcon fontSize="small" />
        ) : (
          <LightModeIcon fontSize="small" />
        )}
      </div>
    </HeaderWrapper>
  );
}
