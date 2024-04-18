import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ReactComponent as Logo} from '../../logo.svg';
import cn from "classnames";
import { useState } from 'react';

export function Header(): JSX.Element {
  const [isActive, setActive] = useState(false);
  const navLinkClassName = cn('navigation__link', {
    'navigation__link--active' : isActive,
  })
  return (
    <header className="header">
      <nav className="header__nav navigation">
        <Link to={AppRoute.Root} className="navigation__link navigation__logo">
          <Logo/>
        </Link>
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to={AppRoute.Discover} className={navLinkClassName} onClick={() => setActive(true)}>Discover</Link>
          </li>
          <li className="navigation__item">
            <Link to={AppRoute.Creators} className={navLinkClassName} onClick={() => setActive(true)}>Creators</Link>
          </li>
          <li className="navigation__item">
            <Link to={AppRoute.Sell} className={navLinkClassName} onClick={() => setActive(true)}>Sell</Link>
          </li>
          <li className="navigation__item">
            <Link to={AppRoute.Stats} className={navLinkClassName} onClick={() => setActive(true)}>Stats</Link>
          </li>
        </ul>
      </nav>
      <div className="navigation__wrapper">
        <form className="navigation__search search" action="" method="get">
          <label htmlFor="search">
            <input className="search__input" type="text" name="search" id="search" placeholder="Search Art Work / Creator"/>
          </label>
        </form>
        <button className="button button--dark">Connect wallet</button>
      </div>
    </header>
  )
}
