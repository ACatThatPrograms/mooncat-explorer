import React from 'react';
import { Segment, Icon, Header } from 'semantic-ui-react';
import { copyToClipboard } from '../util/util';

const donateAddress = "0xE6DB65e54A287FfFe2c9542A6443d448a689E39D";

function Footer() {

    const [hideMe, setHideMe] = React.useState(false);

    return (<>

        {!hideMe ? (
            <Segment color="olive" >

                <div className="close-tr-x" onClick={()=>setHideMe(true)}>
                    <Icon name="x"/>
                </div>

                <Header as="h4" className="nm-t" >I love mooncats and want to donate!</Header>
                <p className="P2F sz10">Me too! Thank you in advance! Mooncat Love to all!</p>
                <div className="click-icon">
                    <b>{donateAddress} <Icon name="copy" onClick={() => copyToClipboard(donateAddress)} /> </b>
                </div>

                <Header sub>
                        PS: I also accept Mooncats!
                </Header>
            </Segment>
        ) : null}


        <Segment>
            <Header>Helpful Links</Header>
            <a rel="noreferrer" target="_blank" href="https://github.com/ACatThatPrograms/mooncat-explorer">
                <Icon name="github" size="big" className="icon-link" />
            </a>
            <a rel="noreferrer" target="_blank" href="https://mooncatrescue.com/">
                <Icon name="moon" size="big" className="icon-link" />
            </a>
        </Segment>

    </>)

}

export default Footer;