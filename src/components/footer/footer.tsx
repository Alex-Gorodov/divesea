import { Link } from "react-router-dom";
import { ReactComponent as Logo} from '../../logo.svg';
import { AppRoute } from "../../const";
import { ReactComponent as Instagram} from '../../img/icons/instagram.svg';
import { ReactComponent as Linkedin} from '../../img/icons/linkedin.svg';
import { ReactComponent as Facebook} from '../../img/icons/facebook.svg';
import { ReactComponent as Twitter} from '../../img/icons/twitter.svg';
import { useIsMobile } from "../../hooks/useIsMobile";

export function Footer(): JSX.Element {
  const isMobile = useIsMobile();

  return (
    <footer className="footer">
      <div className={`footer__wrapper footer__wrapper--left ${isMobile && 'footer__wrapper--mobile'}`}>
        <Link className="footer__logo" to={AppRoute.Root}>
          <Logo/>
          <span>DiveSea</span>
        </Link>
        {
          isMobile &&
          <ul className="footer__social footer__social--mobile">
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Instagram/>
                <span className="visually-hidden">Instagram</span>
              </Link>
            </li>
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Linkedin/>
                <span className="visually-hidden">Linkedin</span>
              </Link>
            </li>
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Facebook/>
                <span className="visually-hidden">Facebook</span>
              </Link>
            </li>
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Twitter/>
                <span className="visually-hidden">Twitter</span>
              </Link>
            </li>
          </ul>
        }
        <ul className="footer__links">
          <li className="footer__links-item">
            <Link className="footer__link" to={'#'}>Privacy Policy</Link>
          </li>
          <li className="footer__links-item">
            <Link className="footer__link" to={'#'}>Term & Conditions</Link>
          </li>
          <li className="footer__links-item">
            <Link className="footer__link" to={'#'}>About Us</Link>
          </li>
          <li className="footer__links-item">
            <Link className="footer__link" to={'#'}>Contact</Link>
          </li>
        </ul>
      </div>
      <div className="footer__wrapper footer__wrapper--right">
        <span>© 2024 EATLY All Rights Reserved.</span>
        {
          !isMobile &&
          <ul className="footer__social">
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Instagram/>
                <span className="visually-hidden">Instagram</span>
              </Link>
            </li>
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Linkedin/>
                <span className="visually-hidden">Linkedin</span>
              </Link>
            </li>
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Facebook/>
                <span className="visually-hidden">Facebook</span>
              </Link>
            </li>
            <li className="footer__social-item">
              <Link className="footer__social-link" to={""}>
                <Twitter/>
                <span className="visually-hidden">Twitter</span>
              </Link>
            </li>
          </ul>
        }
      </div>
    </footer>
  )
}
