import {createContext, ReactNode, useContext, useState} from "react";

interface IDashboardLayoutContext {
    sidebarShow: boolean;
    setSidebarShow: (value: boolean) => void;
}

const DashboardLayoutContext = createContext<IDashboardLayoutContext | null>(null);

const DashboardLayoutProvider = ({children} : {children: ReactNode}) => {
    const [sidebarShow, setSidebarShow] = useState<boolean>(true);

    return (
        <DashboardLayoutContext.Provider
            value={{
                sidebarShow,
                setSidebarShow,
            }}
        >
            {children}
        </DashboardLayoutContext.Provider>
    );
};

const useDashboardLayoutContext = () => {
    const context = useContext(DashboardLayoutContext);
    if (!context) {
        throw new Error("DashboardLayoutContext must be used within a DashboardLayoutProvider");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DashboardLayoutContext, DashboardLayoutProvider, useDashboardLayoutContext };
