import React from 'react'
import {AppSidebarNav} from './AppSidebarNav'
import {HStack, Sidebar, Sidenav, Text} from "rsuite";
import {FaReact} from "react-icons/fa";

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
    return (
        <Sidebar
            style={{ display: 'flex', flexDirection: 'column' }}
            width={230}
        >
            <Sidenav.Header>
                <HStack className="page-brand" spacing={12}>
                    <FaReact size={26} />
                    <Text>BPS Stats</Text>
                </HStack>
            </Sidenav.Header>
            <Sidenav appearance="subtle">
                <Sidenav.Body>
                    <AppSidebarNav items={navigation}/>
                </Sidenav.Body>
            </Sidenav>
        </Sidebar>
    )
}

export default React.memo(AppSidebar)
