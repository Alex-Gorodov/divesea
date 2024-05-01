import { useEffect, useState } from "react";
import { Item } from "../../types/item";
import { Link, generatePath } from "react-router-dom";
import { AppRoute } from "../../const";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/RootState";
import { toggleBidForm } from "../../store/page/page-actions";

type ItemProps = {
  item: Item;
}

export function ShopItem({item}: ItemProps): JSX.Element {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);


  const isFormOpened = useSelector((state: RootState) => state.sell.isBidFormOpened);
  const dispatch = useDispatch();

  const link = generatePath(AppRoute.ProductPage, {
    id: `${item.id}`,
  });
  
  const difference = Math.floor((currentTime.getTime() - item.addedDate.getTime()) / 1000);
  const days = Math.floor(difference / (3600 * 24));
  const hours = Math.floor((difference % (3600 * 24)) / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = Math.floor(difference % 60);

  const shortName = () => {
    return item.name.substring(0, 15) + '...';
  }

  return (
    <div className="item">
      <div className="item__image-wrapper">
        <Link to={link}>
          <img className="item__image" src={item.img} alt={item.name} width={252} height={252}/>
        </Link>
        <p className="item__time-wrapper" style={{gridTemplateColumns: `${days !== 0 ? 'repeat(4, 36px)' : 'repeat(3, 36px)'}`}}>
          {
            days !== 0 && <span className="item__time">{days < 10 ? '0' + days : days}d</span>
          }
          <span className="item__time">{hours < 10 ? '0' + hours : hours}h </span>
          <span className="item__time">{minutes < 10 ? '0' + minutes : minutes}m </span>
          <span className="item__time">{seconds < 10 ? '0' + seconds : seconds}s </span>
        </p>
      </div>
      <p className="item__name">{item.name.length > 12 ? shortName() : item.name}</p>
      <div className="item__price-wrapper">
        <span className="item__price-description">Current bid</span>
        <span className="item__price">{item.price}</span>
        <button className="item__button button button--dark" onClick={() => 
          {
            dispatch(toggleBidForm({isOpened: !isFormOpened}));
          }
        }>Place bid</button>
      </div>
    </div>
  )
}
