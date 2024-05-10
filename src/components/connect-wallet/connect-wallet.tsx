import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/root-state";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderButtons } from "../slider-buttons/slider-buttons";
import { Navigation } from "swiper/modules";
import { Spinner } from "../spinner/spinner";
import { toggleWalletForm } from "../../store/actions";
import { useIsMobileOnly } from "../../hooks/useIsMobile";
import { Link, generatePath } from "react-router-dom";
import { AppRoute } from "../../const";
import cn from "classnames";

export function ConnectWallet(): JSX.Element {
  const isItemsLoaded = useSelector((state: RootState) => !state.data.isItemsDataLoading);
  const isOpened = useSelector((state: RootState) => state.page.isWalletFormOpened);
  const items = useSelector((state: RootState) => state.data.items);
  const isMobile = useIsMobileOnly();
  const dispatch = useDispatch();

  const walletWrapperClassName = cn("connect-wallet__wrapper", {
    "connect-wallet__wrapper--opened": isOpened,
  });

  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [translationY, setTranslationY] = useState<number>(0);

  // Создаем ссылку на элемент "puller"
  const pullerRef = useRef<HTMLButtonElement>(null);

  // Обработчик начала касания
  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  // Обработчик перемещения при касании
  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const deltaY = e.touches[0].clientY - touchStartY;
    setTranslationY(deltaY);
  };

  // Обработчик завершения касания
  const handleTouchEnd = () => {
    setTouchStartY(0);
    setTranslationY(0);
    console.log('translation:', translationY);
    
    if (translationY > 90) dispatch(toggleWalletForm({ isWalletFormOpened: false }));
  };

  // Записываем начальную позицию "puller" при монтировании компонента
  useEffect(() => {
    if (pullerRef.current) {
      const initialY = pullerRef.current.getBoundingClientRect().top;
      setTouchStartY(initialY);
    }
  }, []);

  return (
    <div className={walletWrapperClassName} style={{ transform: `translateY(${translationY}px)` }}>
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
          <h2 className="title title--3">Choose wallet</h2>
          <button className="button button--dark" onClick={() => dispatch(toggleWalletForm({ isWalletFormOpened: !isOpened }))}>close</button>
          <div className="connect-wallet__form-copyright">
            <p>Privacy policy</p>
            <p>Copyright 2024</p>
          </div>
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
