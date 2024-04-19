import { Link } from 'react-router-dom';
import { AppRoute, ScreenSizes } from '../../const';
import { ReactComponent as Logo} from '../../logo.svg';
import cn from "classnames";
import { useEffect, useState } from 'react';

export function Header(): JSX.Element {
  const [isActive, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= ScreenSizes.Tablet);
  const [isMenuOpened, setMenuOpened] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= ScreenSizes.Tablet);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navLinkClassName = cn('navigation__link', {
    'navigation__link--active' : isActive,
  })

  const navWrapperClassName = cn('navigation__wrapper', {
    'navigation__wrapper--opened' : isMenuOpened
  })

  return (
    <header className="header">
      <nav className="header__nav navigation">
        <div className="navigation__toggle-wrapper">
          <Link to={AppRoute.Root} className="navigation__link navigation__logo">
            <Logo/>
          </Link>
          {
            isMobile
            ?
              <button className="navigation__mobile-toggler" onClick={() => setMenuOpened(!isMenuOpened)}>
                <span></span>
              </button>
            : ''
          }
        </div>
        <div className={navWrapperClassName}>
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
          <div className="navigation__buttons-wrapper">
            <form className="navigation__search search" action="" method="get">
              <label htmlFor="search">
                <input className="search__input" type="text" name="search" id="search" placeholder="Search Art Work / Creator"/>
              </label>
            </form>
            <button className="button button--dark">Connect wallet</button>
          </div>
        </div>
      </nav>
    </header>
  )
}
