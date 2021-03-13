import React from 'react';
import { Table } from 'semantic-ui-react';

function MoonCatData({ moonCatDetails, showAll }) {

    const hideKeys = ["offerPrice", "requester", "requestPrice", "onlyOfferTo"]

    const genTableRows = () => {
        return Object.keys(moonCatDetails).map(key => {
            if ( !showAll && hideKeys.indexOf(key) !== -1) { return null }
            return (
                <Table.Row key={key}>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{moonCatDetails[key]}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (

        <Table definition compact>
            <Table.Body>
                {genTableRows()}
            </Table.Body>
        </Table>

    )

}

export default MoonCatData;