import React, { useEffect, useState } from "react";
import { Item } from "../../types/item";
import { Link, generatePath } from "react-router-dom";
import { AppRoute } from "../../const";
import { useSelector, useDispatch } from "react-redux";
import { toggleBidForm } from "../../store/actions";
import { RootState } from "../../store/root-state";

type ItemProps = {
  item: Item;
}

export function ShopItem({ item }: ItemProps): JSX.Element {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());
  const isItemLoading = useSelector((state: RootState) => state.data.isItemsDataLoading);
  const itemBids = useSelector((state: RootState) => state.data.items[item.id]?.bids);
  const isFormOpened = useSelector((state: RootState) => state.page.isBidFormOpened);
  const lastBid = !isItemLoading && itemBids && itemBids.length ? itemBids[itemBids.length - 1].value : item.price;

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const link = generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });

  const itemAddedDate = new Date(item.addedDate);

  const difference = Math.floor((currentTime.getTime() - itemAddedDate.getTime()) / 1000);
  const days = Math.floor(difference / (3600 * 24));
  const hours = Math.floor((difference % (3600 * 24)) / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = Math.floor(difference % 60);

  const shortName = () => {
    return item.name.substring(0, 15) + '...';
  }

  return (
    <div className="item">
      <Link to={link}>
        <div className="item__image-wrapper">
          <img className="item__image" src={item.img} alt={item.name} width={252} height={252} />
          <p className="item__time-wrapper" style={{ gridTemplateColumns: `${days !== 0 ? 'repeat(4, 36px)' : 'repeat(3, 36px)'}` }}>
            {
              days !== 0 && <span className="item__time">{days < 10 ? '0' + days : days}d</span>
            }
            <span className="item__time">{hours < 10 ? '0' + hours : hours}h </span>
            <span className="item__time">{minutes < 10 ? '0' + minutes : minutes}m </span>
            <span className="item__time">{seconds < 10 ? '0' + seconds : seconds}s </span>
          </p>
        </div>
      </Link>
      <p className="item__name" title={item.name.length > 12 ? item.name : ''}>{item.name.length > 12 ? shortName() : item.name}</p>
      <div className="item__price-wrapper">
        <span className="item__price-description">Current bid</span>
        <span className="item__price">{lastBid}</span>
        <button className="item__button button button--dark" onClick={() =>
          {
            dispatch(toggleBidForm({ isOpened: !isFormOpened, item: item }));
          }
        }>Place bid</button>
      </div>
    </div>
  )
}
