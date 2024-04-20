import { useEffect, useState } from "react";
import { Item } from "../../types/item";

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
  
  const difference = Math.floor((currentTime.getTime() - item.addedDate.getTime()) / 1000);
  const days = Math.floor(difference / (3600 * 24));
  const hours = Math.floor((difference % (3600 * 24)) / 3600);
  const minutes = Math.floor((difference % 3600) / 60);
  const seconds = Math.floor(difference % 60);

  return (
    <div className="item">
      <div className="item__image-wrapper">
        <img className="item__image" src={item.img} alt={item.name} width={252} height={252}/>
        <p className="item__time-wrapper" style={{gridTemplateColumns: `${days !== 0 ? 'repeat(4, 36px)' : 'repeat(3, 36px)'}`}}>
          {
            days !== 0 && <span className="item__time">{days < 10 ? '0' + days : days}d</span>
          }
          <span className="item__time">{hours < 10 ? '0' + hours : hours}h </span>
          <span className="item__time">{minutes < 10 ? '0' + minutes : minutes}m </span>
          <span className="item__time">{seconds < 10 ? '0' + seconds : seconds}s </span>
        </p>
      </div>
      <p className="item__name">{item.name}</p>
      <div className="item__price-wrapper">
        <span className="item__price-description">Current bid</span>
        <span className="item__price">{item.price}</span>
        <button className="item__button button button--dark">Place bid</button>
      </div>
    </div>
  )
}
