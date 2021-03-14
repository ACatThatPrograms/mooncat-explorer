import React from 'react'
import MoonCatData from '../components/MoonCatData';
import { Form, Segment, Button, Grid, Image, Header } from 'semantic-ui-react';
import ethHandler from '../eth/EthHandler';
import axios from 'axios'

function MainPage() {

    const [mooncatId, setMooncatId] = React.useState("");
    const [mooncatDetails, setMoonCatDetails] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [showAllChecked, setShowAllChecked] = React.useState(false);

    const [totalWrappedCats, setTotalWrappedCats] = React.useState(false); // Hard set base number

    const updateMooncatId = (e) => {
        let value = e.target.value;
        if (isNaN(parseInt(value))) {
            console.log('hit')
            value = ""
        }
        else {
            value = parseInt(value);
        }
        setMooncatId(value);
    };

    const toggleShowAll = (e) => setShowAllChecked(!showAllChecked);

    const nextCat = () => {
        if (parseInt(mooncatId) + 1 < 25000) {
            setMooncatId(s => String(parseInt(s) + 1))
        }
    }
    const backCat = () => {
        if (parseInt(mooncatId) - 1 >= 1) {
            setMooncatId(s => String(parseInt(s) - 1))
        }
    }
    const randoCat = () => {
        // Hard coded for now til I setup an opensea call
        setMooncatId(Math.floor(Math.random() * Math.floor(totalWrappedCats)))
    }

    React.useEffect(() => {

        const getCatDetails = async () => {
            if (!mooncatId) { return }
            setLoading(true);
            let details = await ethHandler.getCatDetails(mooncatId);
            setMoonCatDetails(details);
            setLoading(false);
        }

        const updateCatCount = async () => {
            try {
                let latest = await axios.get('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&asset_contract_address=0x7c40c393dc0f283f318791d746d894ddd3693572&limit=1');
                // Estimate amount based on latest token minted's token_id
                let amount = latest.data && latest.data.assets && latest.data.assets[0].token_id;
                setTotalWrappedCats(amount);
            } catch (ex){
                console.warn("Error fetching total cats from OS api");
            }
            
        }

        if (totalWrappedCats === false) {
            updateCatCount();
        }

        getCatDetails();

    }, [mooncatId, totalWrappedCats])

    return (

        <Grid>

            <Grid.Column width={16}>

                <Segment>
                    <Form>
                        <Form.Input
                            label="Wrapped Mooncat #"
                            placeholder="Type A Wrapped Mooncat #"
                            value={mooncatId}
                            onChange={updateMooncatId}
                        />

                        <Button
                            content={!mooncatDetails ? "Awaiting Input. . ." : "Mooncat Loaded!"}
                            disabled={mooncatId.length <= 0}
                            loading={loading}
                            color={mooncatDetails ? "green" : "red"}
                            className="non-btn"
                        />

                        {!mooncatDetails ? null : (<>

                            <Button
                                content="Previous Mooncat!"
                                onClick={backCat}
                                disabled={!mooncatDetails}
                            />

                            <Button
                                content="Next Mooncat!"
                                onClick={nextCat}
                                disabled={!mooncatDetails}
                            />

                        </>)}

                        <Button
                            content="Rando Mooncat!"
                            onClick={randoCat}
                            secondary
                            inverted
                        />


                    </Form>
                </Segment>

            </Grid.Column>

            <Grid.Column width={16} className="pt-1">

                {!mooncatDetails && mooncatId ? (
                    <Segment color="red">
                        This mooncat doesn't seem to exist!
                    </Segment>
                ) : null}


                {!mooncatDetails ? null : (<>

                    <Segment>

                        <Grid padded>

                            <Grid.Column computer={4} tablet={16} textAlign="center">
                                {mooncatDetails.name ? (
                                    <Header as="h2">
                                        {mooncatDetails.name ? mooncatDetails.name : ""}
                                        <Header.Subheader>
                                            {mooncatDetails.catId} | {mooncatDetails.wrapperId}
                                        </Header.Subheader>
                                    </Header>
                                ) : (
                                        <Header sub>
                                            {mooncatDetails.catId} | {mooncatDetails.wrapperId}
                                        </Header>
                                    )}
                                <Image className="catImg" centered src={"https://api.polyself.xyz/mooncats/image/" + mooncatDetails.wrapperId} />
                            </Grid.Column>

                            <Grid.Column computer={12} tablet={16}>
                                <MoonCatData moonCatDetails={mooncatDetails} showAll={showAllChecked} />
                                <Form className="showAllForm">
                                    <Form.Checkbox
                                        label="Show All Details?"
                                        checked={showAllChecked}
                                        onChange={toggleShowAll}
                                    />
                                </Form>
                            </Grid.Column>

                        </Grid>

                    </Segment>

                </>)}

            </Grid.Column>


        </Grid>

    )

}

export default MainPage;