import { ReactComponent as Validation} from '../../img/icons/validation-icon.svg';
import { ReactComponent as Collection} from '../../img/icons/user-collection-icon.svg';
import { ReactComponent as Activity} from '../../img/icons/activity-icon.svg';
import { ReactComponent as Instagram} from '../../img/icons/instagram.svg';
import { ReactComponent as Linkedin} from '../../img/icons/linkedin.svg';
import { ReactComponent as Facebook} from '../../img/icons/facebook.svg';
import { ReactComponent as Twitter} from '../../img/icons/twitter.svg';
import { useIsMobile } from "../../hooks/useIsMobile";
import { ShopItem } from '../shop-item/shop-item';
import { Link } from "react-router-dom";
import { User } from "../../types/user";
import { useState } from 'react';
import cn from 'classnames';
import { ActivityItem } from '../activity-item/activity-item';
import { items } from '../../mocks/items';
import { users } from '../../mocks/users';

type UserProfileProps = {
  user: User;
}

export function UserProfile({user}: UserProfileProps): JSX.Element {
  const [navActive, setNavActive] = useState('collection');

  const navBtnClassName = (btnType: string) => cn('profile-nav__btn', {
    'profile-nav__btn--active': navActive === btnType
  });

  const userNameFirst = Math.floor(Math.random() * users?.length);
  const userNameSecond = Math.floor(Math.random() * users?.length);
  const userNameThird = Math.floor(Math.random() * users?.length);

  const isMobile = useIsMobile();

  return (
    <section className="section profile">
      <div className="profile__head-bg" style={{height: `${isMobile ? 270 : 355}px`, borderRadius: `${isMobile ? 0 : 22}px`}}></div>
      <div className="profile__wrapper profile-wrapper">
        <div className="profile-wrapper__left">
          <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={user.avatar} width={isMobile ? 125 : 165} height={isMobile ? 125 : 165} alt={user.firstname}/>
            <span className="profile__avatar-validation">{<Validation/>}</span>
          </div>
          <div className="profile__name-wrapper">
            <p className="profile__name">{user.firstname} {user.surname.charAt(0)}.</p>
            <span className="profile__nickname">{`@${user.nickname}`}</span>
            <button className="profile__follow-btn button button--dark" type="button">Follow +</button>
          </div>
          <ul className="profile__stats profile-stats">
            <li className="profile-stats__item">
              <p className="profile-stats__value">{user.totalSales} ETH</p>
              <p className="profile-stats__description">Total sales</p>
            </li>
            <li className="profile-stats__item">
              <p className="profile-stats__value">{user.followers < 1000 ? user.followers : Math.floor(user.followers / 1000) + 'K'}</p>
              <p className="profile-stats__description">Followers</p>
            </li>
            <li className="profile-stats__item">
              <p className="profile-stats__value">{user.following}</p>
              <p className="profile-stats__description">Followings</p>
            </li>
          </ul>
          <div className="profile__bio">
            <p className="profile__bio-title">Bio</p>
            <p className="profile__bio-description">{user.bio}</p>
          </div>
          <div className="profile__social">
            <ul className="profile__social-list">
              <li className="profile__social-item">
                <Link to={'/'} className="profile__social-link">
                  <Instagram/>
                  <span className="visually-hidden">go to {user.firstname}'s Instagram</span>
                </Link>
              </li>
              <li className="profile__social-item">
                <Link to={'/'} className="profile__social-link">
                  <Linkedin/>
                  <span className="visually-hidden">go to {user.firstname}'s Linkedin</span>
                </Link>
              </li>
              <li className="profile__social-item">
                <Link to={'/'} className="profile__social-link">
                  <Facebook/>
                  <span className="visually-hidden">go to {user.firstname}'s Facebook</span>
                </Link>
              </li>
              <li className="profile__social-item">
                <Link to={'/'} className="profile__social-link">
                  <Twitter/>
                  <span className="visually-hidden">go to {user.firstname}'s Twitter</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-wrapper__right profile-nav">
          <div className="profile-nav__buttons-wrapper">
            <button className={navBtnClassName('collection')} onClick={() => setNavActive('collection')} type="button">
              <Collection/>
              Collection
            </button>
            <button className={navBtnClassName('activity')} onClick={() => setNavActive('activity')} type="button">
              <Activity/>
              Activity
            </button>
          </div>
          {
            navActive === 'collection'
            ?
            <div className='profile-nav__collection items__list'>
              {
                user.collection?.map((item) => {
                  return (
                    <ShopItem item={item} key={`item-${item.name}`}/>
                  )
                })
              }
            </div>
            :
            <div className="profile-nav__activity">
              <ActivityItem item={{ ...items[0], addedBy: users[userNameFirst].firstname+users[userNameFirst].surname.charAt(0) }} />
              <ActivityItem item={{ ...items[5], addedBy: users[userNameSecond].firstname+users[userNameSecond].surname.charAt(0) }} />
              <ActivityItem item={{ ...items[11], addedBy: users[userNameThird].firstname+users[userNameThird].surname.charAt(0) }} />
            </div>
          }
        </div>
      </div>
    </section>
  )
}
