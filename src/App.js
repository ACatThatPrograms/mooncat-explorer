import React from 'react';
import { Header, Container, Segment } from 'semantic-ui-react';

import MainPage from './pages/MainPage';
import ethHandler from './eth/EthHandler';
import NotConnected from './pages/NotConnected';

import Footer from './components/Footer';

function App() {

  const [isConnected, setIsConnected] = React.useState(ethHandler.isConnected());

  return (

    <Container className="main-wrap" >

      <Segment>

        <Header as="h3" className="P2F">
          Wrapped Moon Cat Explorer
          <Header.Subheader>
            Investigate Those Wrapped Mooncats
          </Header.Subheader>
        </Header>

      </Segment>

      {isConnected ? <MainPage /> : <NotConnected setIsConnected={setIsConnected} />}

      <Footer/>

    </Container>

  );

}

export default App;
