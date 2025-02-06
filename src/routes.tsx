import Statistics from "./views/statistics/Statistics.tsx";
import StatisticDetail from "./views/statisticDetail/StatisticDetail.tsx";
import Dashboard from "./views/dashboard/Dashboard.tsx";
import News from "./views/news/News.tsx";

const routes = [
    { path: '/home', element: Dashboard },
    { path: '/statistics', element: Statistics },
    { path: '/statistic-detail', element: StatisticDetail },
    { path: '/news', element: News },
]

export default routes
