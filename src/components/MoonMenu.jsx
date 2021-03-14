import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

function MoonMenu() {

    const pathname = useLocation().pathname;

    return (
        <Segment>

            <Menu secondary pointing>

                <Menu.Item
                    as={Link}
                    name="Main"
                    to="/"
                    active={pathname === '/'}
                />

                <Menu.Item
                    as={Link}
                    name="Wrapping"
                    to="/wrapping"
                    active={pathname === '/wrapping'}
                />

                <Menu.Item
                    as={Link}
                    name="Naming"
                    to="/naming"
                    active={pathname === '/naming'}
                />




            </Menu>

        </Segment>

    )

}

export default MoonMenu;