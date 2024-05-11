import { ReactComponent as Metamask } from "../../img/icons/metamask.svg";
import { ReactComponent as Trust } from "../../img/icons/trust-wallet.svg";
import { ReactComponent as Connect } from "../../img/icons/connect-icon.svg";
import { ReactComponent as Eth } from "../../img/icons/enter-eth-address-icon.svg";
import { SliderButtons } from "../slider-buttons/slider-buttons";
import React, { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { toggleWalletForm } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, generatePath } from "react-router-dom";
import { RootState } from "../../store/root-state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Spinner } from "../spinner/spinner";
import { Navigation } from "swiper/modules";
import { AppRoute, WalletPositions } from "../../const";
import cn from "classnames";

export function ConnectWallet(): JSX.Element {
  const isItemsLoaded = useSelector((state: RootState) => !state.data.isItemsDataLoading);
  const isOpened = useSelector((state: RootState) => state.page.isWalletFormOpened);
  const items = useSelector((state: RootState) => state.data.items);
  const pullerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  
  const [position, setPosition] = useState<number>(WalletPositions.Closed);
  const [translationY, setTranslationY] = useState<number>(0);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [transition, setTransition] = useState(0.3)
  
  const walletWrapperClassName = cn("connect-wallet__wrapper", {
    "connect-wallet__wrapper--opened": isOpened,
  });
  
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const deltaY = e.touches[0].clientY - touchStartY;
    setTranslationY(deltaY);
    setTransition(0.05);
    setPosition(isMobile ? WalletPositions.OpenedMobile + translationY : WalletPositions.Opened + translationY);
  };

  const handleTouchEnd = () => {
    setTouchStartY(0);
    setTranslationY(0);
    setTransition(0.3)
    if (translationY > 80) {
      dispatch(toggleWalletForm({ isWalletFormOpened: false }));
      setPosition(WalletPositions.Closed);
    } else {
      setPosition(isMobile ? WalletPositions.OpenedMobile : WalletPositions.Opened);
    }
  };

  useEffect(() => {
    if (pullerRef.current) {
      const initialY = pullerRef.current.getBoundingClientRect().top;
      setTouchStartY(initialY);
      setPosition(isMobile ? WalletPositions.OpenedMobile : WalletPositions.Opened);
    }
    isOpened ? isMobile
      ? setPosition(WalletPositions.OpenedMobile)
      : setPosition(WalletPositions.Opened)
        :
        setPosition(WalletPositions.Closed)
  }, [isOpened, isMobile]);


  return (
    <div className={walletWrapperClassName} style={{ top: isOpened ? `${position}px` : WalletPositions.Closed, transition: `${transition}s`}}>
      <h1 className="visually-hidden">Connect wallet</h1>
      <div className="connect-wallet">
        <div className="connect-wallet__form connect-wallet__inner-wrapper">
          {isMobile && (
            <button
              className="connect-wallet__mobile-puller"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={pullerRef}
            ><span></span></button>
          )}
          <h2 className="title title--3 connect-wallet__title">Choose wallet</h2>
          <ul className="connect-wallet__list">
            <li className="connect-wallet__item">
              <Link className="connect-wallet__link" to={"/"} onClick={() => dispatch(toggleWalletForm({isWalletFormOpened: false}))}>
                <Metamask/>
                <span className="connect-wallet__item-name">Metamask</span>
                <Connect/>
              </Link>
            </li>
            <li className="connect-wallet__item">
              <Link className="connect-wallet__link" to={"/"} onClick={() => dispatch(toggleWalletForm({isWalletFormOpened: false}))}>
                <Trust/>
                <span className="connect-wallet__item-name">Trust wallet</span>
                <Connect/>
              </Link>
            </li>
            <li className="connect-wallet__item">
              <Link className="connect-wallet__link" to={"/"} onClick={() => dispatch(toggleWalletForm({isWalletFormOpened: false}))}>
                <Eth/>
                <span className="connect-wallet__item-name">Enter ethereum address</span>
                <Connect/>
              </Link>
            </li>
            <li className="button button--dark">Next</li>
          </ul>
          {
            !isMobile &&
            <div className="connect-wallet__form-copyright">
              <p>Privacy policy</p>
              <p>Copyright 2024</p>
            </div>
          }
        </div>
        {!isMobile && (
          <div className="connect-wallet__preview connect-wallet__inner-wrapper wallet-preview">
            {!isItemsLoaded ? (
              <Spinner size="40" color="#aaaaaa" />
            ) : (
              <>
                <Swiper
                  spaceBetween={"100%"}
                  loop={false}
                  navigation={{
                    prevEl: ".wallet-preview__btn--prev",
                    nextEl: ".wallet-preview__btn--next",
                  }}
                  modules={[Navigation]}
                  centeredSlides={true}
                  slidesPerGroup={1}
                  slidesPerView={1}
                >
                  {items?.map((item) => {
                    const link = generatePath(AppRoute.ProductPage, {
                      id: `${item.id}`,
                    });
                    return (
                      <SwiperSlide key={`connect-wallet-preview-${item.id}`} onClick={() => dispatch(toggleWalletForm({ isWalletFormOpened: !isOpened }))}>
                        <Link className="wallet-preview__image-wrapper" to={link}>
                          <img className="wallet-preview__image" src={isItemsLoaded ? item.img : ""} alt="" width={290} height={290} />
                          <img className="wallet-preview__image-bg" src={isItemsLoaded ? item.img : ""} alt="" width={290} height={290} />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            )}
            <h2 className="title title--3">Start Your Own NFT Gallery</h2>
            <p className="wallet-preview__description">DiveSea Is A Great Platform For Discover Largest NFTs And Other Stuff!!!</p>
            <SliderButtons classNames={["wallet-preview__buttons", "wallet-preview__btn wallet-preview__btn--prev", "wallet-preview__btn wallet-preview__btn--next"]} />
          </div>
        )}
      </div>
    </div>
  );
}
