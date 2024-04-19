import { Link } from "react-router-dom";
import { items } from "../../mocks/items";
import { ShopItem } from "../shop-item/shop-item";
import { AppRoute } from "../../const";
import { ReactComponent as Arrow} from "../../img/icons/redirect-arrow.svg"

export function Explore(): JSX.Element {
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
      <Link className="explore__redirect-link" to={AppRoute.Discover}>
        <span>
          Explore all
        </span>
        <Arrow/>
        </Link>
    </section>
  )
}
