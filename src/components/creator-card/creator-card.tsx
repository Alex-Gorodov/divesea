import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ReactComponent as ValidationIcon} from '../../img/icons/validation-icon.svg';
import { ReactComponent as Etherium} from '../../img/icons/etherium.svg';
import { User } from "../../types/user";
import { useIsMobile } from '../../hooks/useIsMobile';

type CreatorCardProps = {
  user: User;
}

export function CreatorCard({user}: CreatorCardProps): JSX.Element {
  const isMobile = useIsMobile();
  const link = generatePath(AppRoute.UserPage, {
    id: `${user.id}`,
  });

  return (
    <div className="creator">
      <div className="creator__avatar-wrapper" style={{backgroundImage: `url(${user.collection && user.collection[1].img})`}}>
        <img className="creator__avatar" width={isMobile ? 93 : 111} height={isMobile ? 93 : 111} src={user.avatar} alt={`${user.firstname} ${user.surname.charAt(0)}`}/>
      </div>
      <div className="creator__content-wrapper">
        <Link className="creator__name-wrapper" to={link}>
          <span className="creator__name">{user.firstname} {user.surname.charAt(0)}.</span>
          <ValidationIcon/>
        </Link>
        <ul className="creator__stats-list">
          <li className="creator__stats-item">
            <span className="creator__stats-value">{user.collection && user.collection.length < 1000 ? `${user.collection.length}` : `${user.collection && user.collection.length / 1000}K`}</span>
            <span className="creator__stats-description">Items</span>
          </li>
          <li className="creator__stats-item">
            <span className="creator__stats-value">
              <Etherium/>
              {user.collection && user.collection.sort((a, b) => a.price - b.price)[0].price}</span>
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
                <li className={`creator__collection-item ${index === 2 && 'creator__collection-item--last'}`}>
                  <img src={item.img} alt={item.name} width={isMobile? 83 : 99} height={isMobile? 83 : 99} className="creator__collection-item__image" />
                  {
                    index === 2 ? <Link className='creator__collection-item__remaining' to={link}>{`+${user.collection && user.collection.length - 2}`}</Link> : ''
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
