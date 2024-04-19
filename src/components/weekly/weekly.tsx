import { SliderButtons } from "../slider-buttons/slider-buttons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShopItem } from "../shop-item/shop-item";
import { Navigation } from 'swiper/modules';
import { items } from "../../mocks/items";
import 'swiper/css/navigation';
import 'swiper/css';
import { useEffect, useState } from "react";
import { ScreenSizes } from "../../const";

export function Weekly(): JSX.Element {
  const itemWidth = 281;
  const slidesPerView = Math.round(window.innerWidth / itemWidth)
  const spaceBetween = Math.round(window.innerWidth - itemWidth) / 2 / slidesPerView;
  const mobileSlidesPerView = window.innerWidth / (itemWidth + spaceBetween/(items.length - 3));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= ScreenSizes.Tablet);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= ScreenSizes.Tablet);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  console.log(window.innerWidth / (itemWidth + spaceBetween/(items.length - 3)));
  

  return (
    <section className="section weekly">
      <h2 className="title title--2 weekly__title">Weekly - Top NFT</h2>
      <Swiper
        spaceBetween={20}
        loop={true}
        navigation={{
          prevEl: '.weekly__slider-btn--prev',
          nextEl: '.weekly__slider-btn--next'
        }}
        modules={[Navigation]}
        centeredSlides={isMobile}
        slidesPerView={isMobile ? mobileSlidesPerView : slidesPerView}
        slidesPerGroup={isMobile ? 1 : undefined}
      >
        {items.map((item) => (
          <SwiperSlide className="item" key={`weekly-${item.id}`}>
            <ShopItem item={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
      <SliderButtons classNames={['weekly__slider-btn--prev', 'weekly__slider-btn--next']}/>
    </section>
  );
}
