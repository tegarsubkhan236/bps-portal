import {DashboardLayoutProvider} from "./DashboardLayoutContext.tsx";
import {Outlet} from "react-router-dom";
import {Container, Content,} from 'rsuite';
import {AppHeader, AppSidebar} from "../components";

const DashboardLayout = () => {
    return (
        <DashboardLayoutProvider>
            <Container className="sidebar-page">
                <AppSidebar/>
                <Container>
                    <AppHeader/>
                    <Content>
                        <Outlet/>
                    </Content>
                </Container>
            </Container>
        </DashboardLayoutProvider>
    );
};

export default DashboardLayout;
