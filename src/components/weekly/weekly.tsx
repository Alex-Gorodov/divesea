import { SliderButtons } from "../slider-buttons/slider-buttons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShopItem } from "../shop-item/shop-item";
import { Navigation } from 'swiper/modules';
import { items } from "../../mocks/items";
import 'swiper/css/navigation';
import 'swiper/css';

export function Weekly(): JSX.Element {
  const itemWidth = 282;
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
        slidesPerView={Math.round(window.innerWidth / itemWidth)}
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
