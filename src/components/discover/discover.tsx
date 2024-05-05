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
  const originalItems = useSelector((state: RootState) => state.data.items);
  const isLoading = useSelector((state: RootState) => state.data.isItemsDataLoading);
  const [items, setItems] = useState<Item[]>(originalItems)

  const sortByCategory = () => {
    const sortedItems = [...items].sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  };

  const sortByCollection = () => {
    const sortedItems = [...items].sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  };

  const sortByPrice = () => {
    const sortedItems = [...items].sort((a, b) => b.price - a.price);
    setItems(sortedItems);
  };

  useEffect(() => {
    setItems(originalItems);
  }, [originalItems]);



  return (
    <section className="section discover">
      <h1 className="title title--2 title--secondary">Discover NFTs</h1>
      <div className="discover__buttons-wrapper">
        <button className="button button--light discover__btn" onClick={() => sortByCategory()}>
          <Category/>
          Category
        </button>
        <button className="button button--light discover__btn" onClick={() => sortByCollection()}>
          <Collection/>
          Collection
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
              'discover__item--new' : item.id === items.length - 1
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
