import React from "react";
import {Icon, Grid, BarChart, TextImage} from "@rsuite/icons";

type NavItem = {
    name: string;
    to: string;
    icon?: React.ReactElement;
}

type NavGroup = {
    name: string;
    to?: string;
    icon?: React.ReactElement;
    items: NavItem[];
}


type NavItemType = NavItem | NavGroup;

const _nav: NavItemType[] = [
    {
        name: 'Dashboard',
        to: '/home',
        icon: <Icon as={Grid}/>
    },
    {
        name: 'Statistics',
        to: '/statistics',
        icon: <Icon as={BarChart}/>
    },
    {
        name: 'News',
        to: '/news',
        icon: <Icon as={TextImage}/>
    },
];

export default _nav;
