import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

function WrapperPage() {

    return (

        <Grid>

            <Grid.Column>
                <Segment>
                    <Header>
                        Mooncat Wrapping
                        <Header.Subheader>
                            Put your Mooncat in the ERC-721 box, or out of it. Don't be a Schroedinger
                        </Header.Subheader>
                    </Header>
                </Segment>
            </Grid.Column>

        </Grid>

    )

}

export default WrapperPage;