import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import browserHistory from "../../browser-history";
import { store } from "../../store";
import { HistoryRouter } from "../history-route/history-route";
import { AppRoute } from "../../const";
import { HomePage } from "../../pages/home/home-page";
import { DiscoverPage } from "../../pages/discover/discover-page";
import { CreatorsPage } from "../../pages/creators/creators-page";
import { SellPage } from "../../pages/sell/sell-page";
import { StatsPage } from "../../pages/stats/stats-page";
import "../../styles/style.sass"

export function App() {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory} basename="/">
        <Provider store={store}>
          <Routes>
            <Route path={AppRoute.Root} element={<HomePage/>}/>
            <Route path={AppRoute.Discover} element={<DiscoverPage/>}/>
            <Route path={AppRoute.Creators} element={<CreatorsPage/>}/>
            <Route path={AppRoute.Sell} element={<SellPage/>}/>
            <Route path={AppRoute.Stats} element={<StatsPage/>}/>
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
