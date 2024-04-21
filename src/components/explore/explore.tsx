import { ReactComponent as Arrow} from "../../img/icons/redirect-arrow.svg";
import { ShopItem } from "../shop-item/shop-item";
import { items } from "../../mocks/items";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export function Explore(): JSX.Element {
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // const pageWidth = window.innerWidth;
  // style={{paddingInline: `${pageWidth % 281 / 2}px`}} // style for section, for link align

  return (
    <section className="section explore">
      <h2 className="title title--2 title--secondary">Explore Marketplace</h2>
      <ul className="explore__list items__list">
        {
          items.slice(0,8).map((item) => {
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
