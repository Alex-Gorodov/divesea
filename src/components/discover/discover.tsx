import { useSelector } from "react-redux";
import { ShopItem } from "../shop-item/shop-item";
import { RootState } from "../../store/RootState";

export function Discover(): JSX.Element {
  const items = useSelector((state: RootState) => state.sell.items)
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
