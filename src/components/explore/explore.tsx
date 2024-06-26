import { ReactComponent as Arrow} from "../../img/icons/redirect-arrow.svg";
import { useIsMobile } from "../../hooks/useIsMobile";
import { scrollToTop } from "../../utils/scroll-to";
import { RootState } from "../../store/root-state";
import { ShopItem } from "../shop-item/shop-item";
import { Spinner } from "../spinner/spinner";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export function Explore(): JSX.Element {
  const items = useSelector((state: RootState) => state.data.items)
  const isLoading = useSelector((state: RootState) => state.data.isItemsDataLoading);

  const isMobile = useIsMobile();

  return (
    <section className="section section--centered explore">
      <h2 className="title title--2 title--secondary">Explore Marketplace</h2>
      <ul className="explore__list items__list">
        {
          isLoading ? <Spinner size="40"/>
          :
          items?.slice(0, isMobile ? 4 : 8).map((item) => {
            return (
              <li className="explore__item" key={`explore-${item.id}`}>
                <ShopItem item={item}/>
              </li>
            )
          })
        }
      </ul>
      <Link className="explore__redirect-link" to={AppRoute.Discover} onClick={() => scrollToTop()}>
        <span>
          Explore all
        </span>
        <Arrow/>
        </Link>
    </section>
  )
}
