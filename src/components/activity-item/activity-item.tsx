import { Item } from "../../types/item";
import { ReactComponent as Validation } from '../../img/icons/validation-icon.svg';
import { ReactComponent as Ethereum } from '../../img/icons/ethereum.svg';
import { useEthPrice } from "../../hooks/useEthPrice";

type ActivityItemProps = {
  item: Item;
}

export function ActivityItem({item}: ActivityItemProps): JSX.Element {
  const minutes = new Date().getMinutes() + item.id;
  return (
    <div className="activity-item">
      <div className="activity-item__container">
        <div className="activity-item__wrapper activity-item__wrapper--left">
          <img src={item.img} width={65} height={65} alt={item.name} />
          <div className="activity-item__inner-wrapper">
            <span className="activity-item__name">{item.name}</span>
            {
              item.addedBy &&
              <span className="activity-item__author">
                {item.addedBy}
                <Validation/>
              </span>
            }
          </div>
        </div>
        <div className="activity-item__wrapper activity-item__wrapper--right">
          <span className="activity-item__type">Sale</span>
          <span className="activity-item__price">
            <Ethereum/>
            {item.price}
          </span>
          <span className="activity-item__term">
            {minutes < 60 ? `${minutes} minutes ago` : `${Math.floor(minutes / 60)} hours ${minutes - 60 !== 0 ? minutes - 60 + ' minutes ago' : ''}`} 
          </span>
        </div>
      </div>
      <div className="activity-item__container">
        <ul className="activity-item__stats">
          <li className="activity-item__stats-item stats-item">
            <span className="stats-item__description">USD Price</span>
            <span className="stats-item__value">${(useEthPrice() * item.price / 1000).toFixed(0)}K</span>
          </li>
          <li className="activity-item__stats-item stats-item">
            <span className="stats-item__description">Quantity</span>
            <span className="stats-item__value">14.9K</span>
          </li>
          <li className="activity-item__stats-item stats-item">
            <span className="stats-item__description">Floor price</span>
            <span className="stats-item__value">
              <Ethereum/>
              {item.price}
            </span>
          </li>
          <li className="activity-item__stats-item stats-item">
            <span className="stats-item__description">Traded</span>
            <span className="stats-item__value">
              <Ethereum/>
              {item.price}
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
