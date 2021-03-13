import React from 'react'
import MoonCatData from '../components/MoonCatData';
import { Form, Segment, Button, Grid, Image, Header } from 'semantic-ui-react';
import ethHandler from '../eth/EthHandler';

function MainPage() {

    const [mooncatId, setMooncatId] = React.useState("");
    const [mooncatDetails, setMoonCatDetails] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [showAllChecked, setShowAllChecked] = React.useState(false);

    const updateMooncatId = (e) => {
        let value = e.target.value;
        // Allow CAT Ids
        if (value[1] === 'x' && value.length === 12) {
            setMooncatId(value)
        } else {

            if (isNaN(parseInt(value))) {
                console.log('hit')
                value = ""
            }
            else {
                value = parseInt(value);
            }
            setMooncatId(value);
        }
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

    React.useEffect(() => {

        const getCatDetails = async () => {
            if (!mooncatId) { return }
            setLoading(true);
            let details = await ethHandler.getCatDetails(mooncatId);
            setMoonCatDetails(details);
            setLoading(false);
        }

        getCatDetails();

    }, [mooncatId])

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

                    </Form>
                </Segment>

            </Grid.Column>

            <Grid.Column width={16}>

                {!mooncatDetails && mooncatId ? (
                    <Segment color="red">
                        This mooncat doesn't seem to exist!
                    </Segment>
                ) : null}


                {!mooncatDetails ? null : (<>

                    <Segment>

                        <Grid padded>

                            <Grid.Column computer={4} tablet={16} textAlign="center">
                                <Header as="h2">
                                    {mooncatDetails.name ? mooncatDetails.name : ""}
                                    <Header.Subheader>
                                        {mooncatDetails.catId} | {mooncatDetails.wrapperId}
                                    </Header.Subheader>
                                </Header>
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