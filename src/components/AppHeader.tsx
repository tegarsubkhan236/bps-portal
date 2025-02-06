import {Breadcrumb, Header} from "rsuite";

const AppHeader = () => {

    return (
        <Header className="page-header">
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="##">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Overview</Breadcrumb.Item>
            </Breadcrumb>
        </Header>
    )
};

export default AppHeader;
