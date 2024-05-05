import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { ReactComponent as Logo} from '../../logo.svg';
import cn from "classnames";
import { useEffect, useState } from 'react';
import { useIsMobileOnly } from '../../hooks/useIsMobile';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { Search } from '../search/search';

export function Header(): JSX.Element {
  const location = useLocation();
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === AppRoute.Creators ||
      pathname === AppRoute.Discover ||
      pathname === AppRoute.Stats ||
      pathname === AppRoute.Sell) {
        setCurrentPage(pathname);
      } else {
        setCurrentPage(null);
      }
    }, [location.pathname]);
    
  const isMobile = useIsMobileOnly();

  const navWrapperClassName = cn('navigation__wrapper', {
    'navigation__wrapper--opened' : isMenuOpened
  })

  const burgerClassName = cn('navigation__mobile-toggler', {
    'navigation__mobile-toggler--opened' : isMenuOpened
  })

  const navLinkClassName = (page: string) =>
    cn('navigation__link', {
      'navigation__link--current': currentPage === page,
    });

  const menuRef = useOutsideClick(() => {
    isMobile && setMenuOpened(false);
  }) as React.RefObject<HTMLDivElement>;

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
              <button className={burgerClassName} type="button" onClick={() => setMenuOpened(!isMenuOpened)}>
                <span></span>
              </button>
            : ''
          }
        </div>
        <div className={navWrapperClassName} ref={menuRef}>
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link to={AppRoute.Discover} className={navLinkClassName(AppRoute.Discover)}>Discover</Link>
            </li>
            <li className="navigation__item">
              <Link to={AppRoute.Creators} className={navLinkClassName(AppRoute.Creators)}>Creators</Link>
            </li>
            <li className="navigation__item">
              <Link to={AppRoute.Sell} className={navLinkClassName(AppRoute.Sell)}>Sell</Link>
            </li>
            <li className="navigation__item">
              <Link to={AppRoute.Stats} className={navLinkClassName(AppRoute.Stats)}>Stats</Link>
            </li>
          </ul>
          <div className="navigation__buttons-wrapper">
            <Search/>
            <button className="button button--dark" type="button">Connect wallet</button>
          </div>
        </div>
      </nav>
    </header>
  )
}
