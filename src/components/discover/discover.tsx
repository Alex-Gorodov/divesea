import { useSelector } from "react-redux";
import { ShopItem } from "../shop-item/shop-item";
import { RootState } from "../../store/RootState";
import { useState } from "react";

export function Discover(): JSX.Element {
  const originalItems = useSelector((state: RootState) => state.sell.items);
  const [items, setItems] = useState([...originalItems]);

  const sortByCategory = () => {
    const sortedItems = [...originalItems].sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  };

  const sortByCollection = () => {
    const sortedItems = [...originalItems].sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  };

  const sortByPrice = () => {
    const sortedItems = [...originalItems].sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  };

  return (
    <section className="section discover">
      <h1 className="title title--2 title--secondary">Discover NFTs</h1>
      <div className="discover__buttons-wrapper">
        <button className="button button--light" onClick={() => sortByCategory()}>Category</button>
        <button className="button button--light" onClick={() => sortByCollection()}>Collection</button>
        <button className="button button--light" onClick={() => sortByPrice()}>Price</button>
      </div>
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
