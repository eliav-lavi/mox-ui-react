import styled, { ThemeProvider } from "styled-components";
import theme from "styled-theming";
import { toggle } from "../state/configSlice";

import { useAppSelector, useAppDispatch } from '../state/hooks'

export const backgroundColor = theme("theme", {
  light: "#fff",
  dark: "#2d2d2d",
});

export const textColor = theme("theme", {
  light: "#000",
  dark: "#fff",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;

  background-color: ${backgroundColor};
  color: ${textColor};
`;

export function LearningApp() {
  const isDarkModeEnabled = useAppSelector((state) => state.configs.isDarkModeEnabled)
  const dispatch = useAppDispatch()
  const theme = isDarkModeEnabled ? "dark" : "light"

  return (
    <ThemeProvider theme={{ theme }}>
      <Container>
        <h1>My Dark Theme Is Better Than Yours</h1>
        <p>
          <input type="checkbox" onChange={() => dispatch(toggle())}></input> Use Dark Theme
        </p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
        <p>bla</p>
      </Container>
    </ThemeProvider>
  )
}