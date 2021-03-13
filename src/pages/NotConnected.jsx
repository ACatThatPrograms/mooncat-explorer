import React from 'react'
import { Header, Segment, Button } from 'semantic-ui-react';
import ethHandler from '../eth/EthHandler';

function NotConnected({setIsConnected}) {

    const [loading, setLoading] = React.useState(false);
    const [web3Err, setWeb3Err] = React.useState("");

    const connect = async () => {
        setLoading(true);
        let res = await ethHandler.connect();
        if (res.error) {
            setLoading(false);
            return setWeb3Err(res.message);
        }
        setLoading(false);
        setIsConnected(true);
    }

    return (<>

        <Segment color="orange">
            <Header>
                Hold up!
                <Header.Subheader>
                    You need to connect with a Web3 wallet to check out these Mooncats!
                </Header.Subheader>
            </Header>
            <Button color="green" content="Connect Web3" onClick={connect} loading={loading} />
        </Segment>

        {web3Err ? (
            <Segment color="red">
                {web3Err}
            </Segment>
        ) : null}

    </>)

}

export default NotConnected;