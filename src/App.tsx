import {Suspense} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import routes from "./routes.tsx";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import Login from "./views/auth/Login.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Loader} from "rsuite";

const queryClient = new QueryClient();

const App = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Suspense
                    fallback={
                        <Loader center content="loading..."/>
                    }
                >
                    <Routes>
                        <Route index path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route element={<DashboardLayout/>}>
                            {routes.map((route, idx) => {
                                return (
                                    route.element && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            element={<route.element/>}
                                        />
                                    )
                                )
                            })}
                            <Route path="/" element={<Navigate to="dashboard" replace/>}/>
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
