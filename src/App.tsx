import { Provider } from "react-redux";
import styled from "styled-components";
import { store } from "./state/store";

import { Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Color } from "./design/colors";
import { EndpointsTable } from "./endpoints/EndpointsTable";
import { Header } from "./Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 0;
  margin: 0;
`;

const Content = styled.div`
  overflow: auto;
  height: 100%;
`;
const Footer = styled.div`
  background-color: ${Color.Gray200};
  display: flex;
  justify-content: end;
  padding-right: 20px;
`;

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container>
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<EndpointsTable />}></Route>
              <Route path="/endpoints" element={<EndpointsTable />}></Route>
              <Route path="/config" element={<div>Config!</div>}></Route>
            </Routes>
          </Content>
          <Footer>
            <Typography variant="caption">
              <code>eliavlavi {new Date().getFullYear()}</code>
            </Typography>
          </Footer>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
