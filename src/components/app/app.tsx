import { DiscoverPage } from "../../pages/discover/discover-page";
import { CreatorsPage } from "../../pages/creators/creators-page";
import { HistoryRouter } from "../history-route/history-route";
import { StatsPage } from "../../pages/stats/stats-page";
import { HomePage } from "../../pages/home/home-page";
import { SellPage } from "../../pages/sell/sell-page";
import { HelmetProvider } from "react-helmet-async";
import browserHistory from "../../browser-history";
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { AppRoute } from "../../const";
import { store } from "../../store";
import "../../styles/style.sass"
import { Profile } from "../../pages/profile/profile";
import { NotFound } from "../../pages/not-found/not-found";

export function App() {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory} basename="/">
        <Provider store={store}>
          <Routes>
            <Route path={AppRoute.Root} element={<HomePage/>}/>
            <Route path={AppRoute.Discover} element={<DiscoverPage/>}/>
            <Route path={AppRoute.Creators} element={<CreatorsPage/>}/>
            <Route path={AppRoute.UserPage} element={<Profile/>}/>
            <Route path={AppRoute.Sell} element={<SellPage/>}/>
            <Route path={AppRoute.Stats} element={<StatsPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
