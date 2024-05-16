import { ReactComponent as ValidationIcon} from '../../img/icons/validation-icon.svg';
import { ReactComponent as Etherium} from '../../img/icons/ethereum.svg';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Link, generatePath } from 'react-router-dom';
import { User } from "../../types/user";
import { AppRoute } from '../../const';

type CreatorCardProps = {
  user: User;
}

export function CreatorCard({user}: CreatorCardProps): JSX.Element {
  const isMobile = useIsMobile();
  const link = generatePath(AppRoute.UserPage, {
    id: `${user.id}`,
  });

  return (
    <Link className="creator__redirect-wrapper" to={link}>
      <div className="creator">
        <div className="creator__avatar-wrapper" style={{backgroundImage: `url(${user.collection && user.collection[1].img})`}}>
          <img className="creator__avatar" width={isMobile ? 93 : 111} height={isMobile ? 93 : 111} src={user.avatar} alt={`${user.firstname} ${user.surname.charAt(0)}`}/>
        </div>
        <div className="creator__content-wrapper">
          <div className="creator__name-wrapper">
            <span className="creator__name">{user.firstname} {user.surname.charAt(0)}.</span>
            <ValidationIcon/>
          </div>
          <ul className="creator__stats-list">
            <li className="creator__stats-item">
              <span className="creator__stats-value">{user.collection && user.collection.length < 1000 ? `${user.collection.length}` : `${user.collection && user.collection.length / 1000}K`}</span>
              <span className="creator__stats-description">Items</span>
            </li>
            <li className="creator__stats-item">
              <span className="creator__stats-value">
                <Etherium/>
                {user.collection && [...user.collection].sort((a, b) => a.price - b.price)[0].price}</span>
              <span className="creator__stats-description">Floor Price</span>
            </li>
            <li className="creator__stats-item">
              <span className="creator__stats-value">
                <Etherium/>
                {user.totalSales < 1000 ? user.totalSales : `${user.totalSales / 1000}K`}</span>
              <span className="creator__stats-description">Traded</span>
            </li>
          </ul>
          <ul className="creator__collection">
            {
              user.collection && user.collection.slice(0,3).map((item, index) => {
                return (
                  <li className={`creator__collection-item ${ index === 2 ? 'creator__collection-item--last' : ''}`} key={`item-id${item.id}`}>
                    <img src={item.img} alt={item.name} width={isMobile? 83 : 99} height={isMobile? 83 : 99} className="creator__collection-item__image" />
                    {
                      index === 2 && user.collection && user.collection.length > 3 ? <span className='creator__collection-item__remaining'>{`+${user.collection && user.collection.length - 2}`}</span> : ''
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </Link>
  )
}
