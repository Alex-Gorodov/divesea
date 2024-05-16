import { SliderButtons } from "../slider-buttons/slider-buttons";
import { RootState } from "../../store/root-state";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShopItem } from "../shop-item/shop-item";
import { Spinner } from "../spinner/spinner";
import { useEffect, useState } from "react";
import { Navigation } from 'swiper/modules';
import { useSelector } from "react-redux";
import 'swiper/css/navigation';
import 'swiper/css';

export function Weekly(): JSX.Element {
  const itemWidth = 281;
  const items = useSelector((state: RootState) => state.data.items)
  const isItemsLoading = useSelector((state: RootState) => state.data.isItemsDataLoading);
  const [slidesPerView, setSlidesPerView] = useState(Math.round(window.innerWidth / itemWidth));
  const [spaceBetween, setSpaceBetween] = useState(Math.round(window.innerWidth - itemWidth) / 2 / slidesPerView);
  const [mobileSlidesPerView, setMobileSlidesPerView] = useState(window.innerWidth / (itemWidth + spaceBetween/(items?.length - 3)));
  
  useEffect(() => {
    const updateDimensions = () => {
      setSlidesPerView(Math.round(window.innerWidth / itemWidth));
      setSpaceBetween(Math.round(window.innerWidth - itemWidth) / 2 / slidesPerView);
      setMobileSlidesPerView(window.innerWidth / (itemWidth + spaceBetween/(items?.length - 3)));
    };

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [itemWidth, items?.length, slidesPerView, spaceBetween]);

  return (
    <section className="section weekly">
      <h2 className="title title--2 title--secondary weekly__title">Weekly - Top NFT</h2>
      {
        isItemsLoading ? <Spinner size="40"/>
        :
        <>
          <Swiper
            spaceBetween={40}
            loop={true}
            navigation={{
              prevEl: '.weekly__slider-btn--next',
              nextEl: '.weekly__slider-btn--prev'
            }}
            modules={[Navigation]}
            centeredSlides={true}
            slidesPerView={mobileSlidesPerView}
          >
            {
              items?.map((item) => (
                <SwiperSlide key={`weekly-${item.id}`}>
                  <ShopItem item={item}/>
                </SwiperSlide>
              )
            )}
          </Swiper>
          <SliderButtons classNames={['weekly__slider-btn--prev', 'weekly__slider-btn--next']}/>
        </>
      }
    </section>
  );
}
