import { ReactComponent as BackArrow } from "../../img/icons/back-arrow.svg";
import { ReactComponent as BidIcon } from "../../img/icons/bid-icon.svg";
import { ReactComponent as Like } from "../../img/icons/like-icon.svg";
import { useParams, Link, generatePath } from "react-router-dom";
import { updateLikesInDatabase } from "../../services/database";
import { toggleBidForm, toggleLike } from "../../store/actions";
import { useIsMobileOnly } from "../../hooks/useIsMobile";
import { useSelector, useDispatch } from "react-redux";
import { scrollToTop } from "../../utils/scroll-to";
import browserHistory from "../../browser-history";
import { monthNames, AppRoute } from "../../const";
import { RootState } from "../../store/root-state";
import { Spinner } from "../spinner/spinner";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Item } from "../../types/item";

export function Product(): JSX.Element {
  const isFormOpened = useSelector((state: RootState) => state.page.isBidFormOpened);
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.data.users)

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobileOnly();

  const [product, setProduct] = useState<Item | null>(null);
  const items = useSelector((state: RootState) => state.data.items);

  const date = new Date();

  const [similarItemsLiked, setSimilarItemsLiked] = useState<boolean[]>([]);

  useEffect(() => {
    setSimilarItemsLiked(Array(items?.length).fill(false));
  }, [items.length]);

  const toggleSimilarItemLike = (index: number) => {
    setSimilarItemsLiked((prev) => {
      const updatedLikes = [...prev];
      updatedLikes[index] = !prev[index];
      return updatedLikes;
    });
  };

  useEffect(() => {
    const itemId = Number(id);
    const foundProduct = items.find((item) => item.id === itemId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
    setIsLoading(false);
  }, [id, items]);

  if (isLoading) {
    return <Spinner size={"40"}/>
  }

  const shortName = (s: Item) => {
    return s.name.substring(0, 15) + '...';
  }

  return (
    <>
      <Helmet>
        <title>DiveSea | {product?.name ? product.name : 'Loading...'}</title>
      </Helmet>
      <main className="main">
        <section className="section section--centered product">
          <h1 className="visually-hidden">The page of {product?.name ? product.name : 'product'}.</h1>
          <div className="button-wrapper product__breadcrumb-wrapper">
            <Link className="button button--circle product__breadcrumb-link"  to="#" onClick={() => browserHistory.back()}>
              <BackArrow/>
            </Link>
            <p className="product__breadcrumb-title">Product Detail</p>
          </div>
          {
            product ?
            <>
              <div className="product__item">
              <img className="product__item-image" src={product.img} alt={product.name} width={isMobile ? 280 : 564} height={isMobile ? 280 : 564} />
              <div className="product__item-container">
                <h2 className="title title--2">{product.name}</h2>
                <p className="product__item-description">{product.description}</p>
                <div className="product__owners-wrapper">
                  <Link className="product__owner" to={generatePath(`${AppRoute.Creators}/${users[0].id}`)} onClick={() => scrollToTop()}>
                    <div className="product__owner">
                      <img className="product__owner-avatar" width={65} height={65} src={users[0].avatar} alt={`${users[0].firstname} ${users[0].surname.charAt(0)}.`} />
                      <p>
                        <span className="product__owner-description">Created by</span>
                        <span className="product__owner-name">{product.author ? product.author.firstname : users[0].firstname}</span>
                      </p>
                    </div>
                  </Link>
                  <Link className="product__owner" to={generatePath(`${AppRoute.Creators}/${users[1].id}`)} onClick={() => scrollToTop()}>
                    <div className="product__owner">
                      <img className="product__owner-avatar" width={65} height={65} src={users[1].avatar} alt={`${users[1].firstname} ${users[1].surname.charAt(0)}.`} />
                      <p>
                        <span className="product__owner-description">Owned by</span>
                        <span className="product__owner-name">{users[1].firstname}</span>
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="product__price-wrapper">
                  <div className="product__price">
                    <span className="product__price-description">Current bid</span>
                    <span className="product__price-value">{product.bids ? product.bids[product.bids.length - 1].value : product.price}</span>
                  </div>
                  <div className="product__end">
                    <span className="product__end-description">End in</span>
                    <span className="product__end-value">
                      {
                        `${monthNames[date.getUTCMonth()]}, ${date.getDate() + 5} ${date.getFullYear()} at 15:08`
                      }
                    </span>
                  </div>
                </div>
                <button className="button button--dark product__btn" onClick={() => dispatch(toggleBidForm({ isOpened : !isFormOpened, item: product}))}>
                  <BidIcon/>
                  Place Bid
                </button>
              </div>
            </div>
            <div className="product__similar">
              <h2 className="title title--2 product__similar-title">From creator</h2>
              <ul className="product__similar-list">
                {
                  items?.slice(0,5).map((item) => (
                    <li className="item product__similar-item" key={`similar-${item.name}`}>
                      <Link className="item__image-wrapper" to={generatePath(AppRoute.ProductPage, {id: `${item.id}`})} onClick={() => scrollToTop()}>
                        <img className="item__image" src={item.img} alt={item.name} width={188} height={164}/>
                        <p className="item__name">{item.name.length > 12 ? shortName(item) : item.name}</p>
                      </Link>
                      <div className="item__price-wrapper">
                        <span className="item__price product__similar-price">{item.bids[item.bids.length - 1].value}</span>
                        <button
                          className={`product__likes-btn ${similarItemsLiked[item.id] && 'product__likes-btn--liked' }`}
                          type="button"
                          onClick={() => {
                            const newLikesCount = similarItemsLiked[item.id] ? item.likes - 1 : item.likes + 1;
                            dispatch(toggleLike({ like: !similarItemsLiked[item.id], item: { ...item, likes: newLikesCount } }));
                            toggleSimilarItemLike(item.id);
                            updateLikesInDatabase({ ...item, likes: newLikesCount });
                          }}
                        >
                          <Like/>
                          <span className="product__likes-count">{item.likes}</span>
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            </>
            :
            <Spinner size={"40"}/>
          }
        </section>
      </main>
    </>
  );

}
