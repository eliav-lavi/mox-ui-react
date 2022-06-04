import { Provider } from 'react-redux'
import { store } from './state/store'
import styled from 'styled-components'

import { Header } from './Header';
import { EndpointsTable } from './endpoints/EndpointsTable';
import { Color } from './design/colors';
import { Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column ;
  justify-content: space-between;
  height: 100vh;
  padding: 0;
  margin: 0;
`


const Content = styled.div`
  overflow: auto;
  height: 100%;
`
const Footer = styled.div`
  background-color: ${Color.Gray200} ;
  display: flex;
  justify-content: end;
  padding-right: 20px;
`

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Header />
        <Content>
          <EndpointsTable />
        </Content>
        <Footer>
          <Typography variant="caption"><code>eliavlavi {new Date().getFullYear()}</code></Typography>
        </Footer>
      </Container>
    </Provider>
  )
}

export default App;
