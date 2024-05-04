import { ReactComponent as BackArrow } from "../../img/icons/back-arrow.svg";
import { ReactComponent as BidIcon } from "../../img/icons/bid-icon.svg";
import { ReactComponent as Like } from "../../img/icons/like-icon.svg";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, generatePath, useParams } from "react-router-dom";
import { Spinner } from "../../components/spinner/spinner";
import { Item } from "../../types/item";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components/layout/layout";
import { useIsMobileOnly } from "../../hooks/useIsMobile";
import { users } from "../../mocks/users";
import browserHistory from "../../browser-history";
import { AppRoute, monthNames } from "../../const";
import { toggleBidForm, toggleLike } from "../../store/actions";
import { RootState } from "../../store/root-state";
import { updateLikesInDatabase } from "../../services/database";

export function ProductPage(): JSX.Element {
  const isFormOpened = useSelector((state: RootState) => state.page.isBidFormOpened);
  const dispatch = useDispatch();

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
    <Layout>
      <Helmet>
        <title>DiveSea | {product?.name ? product.name : 'Loading...'}</title>
      </Helmet>
      <main className="main">
        <section className="section section--centered product-page">
          <h1 className="visually-hidden">The page of {product?.name ? product.name : 'product'}.</h1>
          <div className="button-wrapper product-page__breadcrumb-wrapper">
            <Link className="button button--circle product-page__breadcrumb-link"  to="#" onClick={() => browserHistory.back()}>
              <BackArrow/>
            </Link>
            <p className="product-page__breadcrumb-title">Product Detail</p>
          </div>
          {
            product ?
            <>
              <div className="product-page__item">
              <img className="product-page__item-image" src={product.img} alt={product.name} width={isMobile ? 280 : 564} height={isMobile ? 280 : 564} />
              <div className="product-page__item-container">
                <h2 className="title title--2">{product.name}</h2>
                <p className="product-page__item-description">{product.description}</p>
                <div className="product-page__owners-wrapper">
                  <div className="product-page__owner">
                    <img className="product-page__owner-avatar" width={65} height={65} src={users[0].avatar} alt={`${users[0].firstname} ${users[0].surname.charAt(0)}.`} />
                    <p>
                      <span className="product-page__owner-description">Created by</span>
                      <span className="product-page__owner-name">{users[0].firstname}</span>
                    </p>
                  </div>
                  <div className="product-page__owner">
                    <img className="product-page__owner-avatar" width={65} height={65} src={users[1].avatar} alt={`${users[1].firstname} ${users[1].surname.charAt(0)}.`} />
                    <p>
                      <span className="product-page__owner-description">Owned by</span>
                      <span className="product-page__owner-name">{users[1].firstname}</span>
                    </p>
                  </div>
                </div>
                <div className="product-page__price-wrapper">
                  <div className="product-page__price">
                    <span className="product-page__price-description">Current bid</span>
                    <span className="product-page__price-value">{product.price}</span>
                  </div>
                  <div className="product-page__end">
                    <span className="product-page__end-description">End in</span>
                    <span className="product-page__end-value">
                      {
                        `${monthNames[date.getUTCMonth()]}, ${date.getDate() + 5} ${date.getFullYear()} at 15:08`
                      }
                    </span>
                  </div>
                </div>
                <button className="button button--dark product-page__btn" onClick={() => dispatch(toggleBidForm({ isOpened : !isFormOpened}))}>
                  <BidIcon/>
                  Place Bid
                </button>
              </div>
            </div>
            <div className="product-page__similar">
              <h2 className="title title--2 product-page__similar-title">From creator</h2>
              <ul className="product-page__similar-list">
                {
                  items?.slice(0,5).map((item) => (
                    <div className="item product-page__similar-item" key={`similar-${item.name}`}>
                      <div className="item__image-wrapper">
                        <Link to={generatePath(AppRoute.ProductPage, {id: `${item.id}`})}>
                          <img className="item__image" src={item.img} alt={item.name} width={188} height={164}/>
                        </Link>
                      </div>
                      <p className="item__name">{item.name.length > 12 ? shortName(item) : item.name}</p>
                      <div className="item__price-wrapper">
                        <span className="item__price product-page__similar-price">{item.price}</span>
                        <button
                          className={`product-page__likes-btn ${similarItemsLiked[item.id] && 'product-page__likes-btn--liked' }`}
                          type="button"
                          onClick={() => {
                            const newLikesCount = similarItemsLiked[item.id] ? item.likes - 1 : item.likes + 1;
                            dispatch(toggleLike({ like: !similarItemsLiked[item.id], item: { ...item, likes: newLikesCount } }));
                            toggleSimilarItemLike(item.id);
                            updateLikesInDatabase({ ...item, likes: newLikesCount });
                          }}
                        >
                          <Like/>
                          <span className="product-page__likes-count">{item.likes}</span>
                        </button>
                      </div>
                    </div>
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
    </Layout>
  );
}
