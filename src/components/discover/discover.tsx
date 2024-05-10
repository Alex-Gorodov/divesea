import { ReactComponent as Category } from "../../img/icons/category-icon.svg";
import { ReactComponent as Collection } from "../../img/icons/collection-icon.svg";
import { ReactComponent as Price } from "../../img/icons/price-icon.svg";
import { ShopItem } from "../shop-item/shop-item";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Item } from "../../types/item";
import { RootState } from "../../store/root-state";
import { Spinner } from "../spinner/spinner";
import cn from 'classnames'

export function Discover(): JSX.Element {
  const isLoading = useSelector((state: RootState) => state.data.isItemsDataLoading);
  const originalItems = useSelector((state: RootState) => state.data.items);
  const [items, setItems] = useState<Item[]>(originalItems)

  const sortByAdded = () => {
    const sortedItems = [...items].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
    setItems(sortedItems);
  };

  const sortByPopular = () => {
    const sortedItems = [...items].sort((a, b) => b.likes - a.likes);
    setItems(sortedItems);
  };

  const sortByPrice = () => {
    const sortedItems = [...items].sort((a, b) => (b.bids ? [...b.bids].sort((a,b) => b.value - a.value)[0].value : b.price) - (a.bids ? [...a.bids].sort((a,b) => b.value - a.value)[0].value : a.price));
    setItems(sortedItems);
  };

  useEffect(() => {
    setItems(originalItems);
  }, [originalItems]);

  return (
    <section className="section discover">
      <h1 className="title title--2 title--secondary">Discover NFTs</h1>
      <div className="discover__buttons-wrapper">
        <button className="button button--light discover__btn" onClick={() => sortByAdded()}>
          <Category/>
          Added
        </button>
        <button className="button button--light discover__btn" onClick={() => sortByPopular()}>
          <Collection/>
          Popular
        </button>
        <button className="button button--light discover__btn" onClick={() => sortByPrice()}>
          <Price/>
          Price
        </button>
      </div>
      <ul className="discover__list items__grid">
        {
          isLoading || !items ?
          <Spinner size={"40"}/>
          :
          items.map((item) => {
            const itemClassName = cn('discover__item', {
              'discover__item--new' : item.id === items.length - 1 && new Date(item.addedDate).getDate() === new Date().getDate()
            })

            return (
              <li className={itemClassName} key={`discover-${item.id}`}>
                <ShopItem item={item}/>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
