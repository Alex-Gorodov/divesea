import { ReactComponent as BackArrow } from "../../img/icons/back-arrow.svg";
import { ReactComponent as BidIcon } from "../../img/icons/bid-icon.svg";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components/spinner/spinner";
import { NotFound } from "../not-found/not-found";
import { Item } from "../../types/item";
import { RootState } from "../../store/RootState";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components/layout/layout";
import { useIsMobileOnly } from "../../hooks/useIsMobile";
import { users } from "../../mocks/users";
import browserHistory from "../../browser-history";
import { monthNames } from "../../const";
import { BidForm } from "../../components/bid-form/bid-form";
import { toggleBidForm } from "../../store/sell/sell-actions";

export function ProductPage(): JSX.Element {
  const isFormOpened = useSelector((state: RootState) => state.sell.isBidFormOpened);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobileOnly();
  
  const [product, setProduct] = useState<Item | null>(null);
  const items = useSelector((state: RootState) => state.sell.items);

  const date = new Date();

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
    return <Spinner size={"40"} color={"#141416"}/>
  }

  if (!product) {
    return <NotFound/>
  }

  return (
    <Layout>
      <Helmet>
        <title>DiveSea | {product.name}</title>
      </Helmet>
      <main className="main">
        <section className="section section--centered product-page">
          <h1 className="visually-hidden">The page of {product.name}.</h1>
          <div className="button-wrapper product-page__breadcrumb-wrapper">
            <Link className="button button--circle product-page__breadcrumb-link"  to="#" onClick={() => browserHistory.back()}>
              <BackArrow/>
            </Link>
            <p className="product-page__breadcrumb-title">Product Detail</p>
          </div>
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
        </section>
      </main>
    </Layout>
  );
}
