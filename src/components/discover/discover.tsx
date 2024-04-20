import { ShopItem } from "../shop-item/shop-item";
import { items } from "../../mocks/items";

export function Discover(): JSX.Element {
  return (
    <section className="section discover">
      <h1 className="title title--2 title--secondary">Discover NFTs</h1>
      <ul className="discover__list items__grid">
        {
          items.map((item) => {
            return (
              <li className="discover__item" key={`discover-${item.id}`}>
                <ShopItem item={item}/>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
