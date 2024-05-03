import { DiscoverPage } from "../../pages/discover/discover-page";
import { CreatorsPage } from "../../pages/creators/creators-page";
import { HistoryRouter } from "../history-route/history-route";
import { ProductPage } from "../../pages/product/product-page";
import { NotFound } from "../../pages/not-found/not-found";
import { StatsPage } from "../../pages/stats/stats-page";
import { Profile } from "../../pages/profile/profile";
import { HomePage } from "../../pages/home/home-page";
import { SellPage } from "../../pages/sell/sell-page";
import { HelmetProvider } from "react-helmet-async";
import browserHistory from "../../browser-history";
import { Route, Routes } from "react-router-dom";
import 'firebase/compat/database';
import { AppRoute } from "../../const";
import { Provider } from "react-redux";
import { store } from "../../store";
import "../../styles/style.sass";

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
            <Route path={AppRoute.ProductPage} element={<ProductPage/>}/>
            <Route path={AppRoute.Sell} element={<SellPage/>}/>
            <Route path={AppRoute.Stats} element={<StatsPage/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
