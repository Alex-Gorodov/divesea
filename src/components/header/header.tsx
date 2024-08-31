import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useIsMobileOnly } from '../../hooks/useIsMobile';
import { ReactComponent as Logo} from '../../logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWalletForm } from '../../store/actions';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../store/root-state';
import { useEffect, useState } from 'react';
import { Search } from '../search/search';
import { AppRoute } from '../../const';
import cn from "classnames";
import React from 'react';

export function Header(): JSX.Element {

  const isWalletFormOpened = useSelector((state: RootState) => state.page.isWalletFormOpened);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [isMenuOpened, setMenuOpened] = useState(false);
  const isMobile = useIsMobileOnly();
  const location = useLocation();
  const dispatch = useDispatch();
  
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

  const handleMobileMenu = () => {
    setMenuOpened(!isMenuOpened)
    dispatch(toggleWalletForm({isWalletFormOpened: false}))
  }

  const handleWalletForm = () => {
    dispatch(toggleWalletForm({isWalletFormOpened: !isWalletFormOpened}))
    setMenuOpened(false)
  }

  return (
    <header className="header">
      <nav className="header__nav navigation">
        <div className="navigation__toggle-wrapper">
          
          {
            isMobile
            ?
            <React.Fragment>
              <button className={burgerClassName} type="button" onClick={() => handleMobileMenu()}>
                <span></span>
                <span className="visually-hidden">{isMenuOpened ? 'close menu' : 'open menu'}</span>
              </button>
              <button className="button button--dark" type="button" onClick={() => handleWalletForm()}>Connect wallet</button>
            </React.Fragment>
            : 
            <Link to={AppRoute.Root} className="navigation__link navigation__logo" onClick={() => isWalletFormOpened && dispatch(toggleWalletForm({isWalletFormOpened: false}))}>
              <Logo/>
              <span className="visually-hidden">To main page</span>
            </Link>
          }
        </div>
        <div className={navWrapperClassName} ref={menuRef}>
          <ul className="navigation__list">
            {
              isMobile ?
              <li className="navigation__item">
                <Link to={AppRoute.Root} className={navLinkClassName(AppRoute.Root)}>Home</Link>
              </li> : ''
            }
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
            {
              !isMobile && <button className="button button--dark" type="button" onClick={() => handleWalletForm()}>Connect wallet</button>
            }
          </div>
        </div>
      </nav>
    </header>
  )
}
