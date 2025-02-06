import React from "react";
import {Link, useLocation} from 'react-router-dom';
import {Nav} from "rsuite";

type NavItem = {
    name?: string;
    icon?: React.ReactElement;
    to?: string;
    items?: NavItem[];
}

type AppSidebarNavProps = {
    items: NavItem[];
}

const NavLink = React.forwardRef<HTMLAnchorElement, {
    to: string;
    icon?: React.ReactElement;
    children: React.ReactNode
}>(
    (props, ref) => {
        const location = useLocation();
        return (
            <Nav.Item
                {...props}
                ref={ref}
                icon={props.icon}
                active={props.to === location.pathname}
                as={Link}
            >
                {props.children}
            </Nav.Item>
        );
    }
);

export const AppSidebarNav = ({items}: AppSidebarNavProps) => {

    const navItem = (item: NavItem, index: number) => {
        const {name, icon, to} = item;
        return (
            <NavLink key={index} to={to ?? '#'} icon={icon}>
                {name}
            </NavLink>
        );
    };

    const navGroup = (item: NavItem, index: number) => {
        const {name, icon, items} = item;
        return (
            <Nav.Menu
                key={index}
                eventKey={name}
                title={name}
                icon={icon || undefined}
                trigger="hover"
                placement="rightStart"
            >
                {items?.map((subItem, subIndex) =>
                    subItem.items ? navGroup(subItem, subIndex) : navItem(subItem, subIndex)
                )}
            </Nav.Menu>
        );
    };

    return (
        <Nav defaultActiveKey="home">
            {items?.map((item, index) =>
                item.items ? navGroup(item, index) : navItem(item, index)
            )}
        </Nav>
    );
};
