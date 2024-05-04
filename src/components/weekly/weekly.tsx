import { SliderButtons } from "../slider-buttons/slider-buttons";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Swiper, SwiperSlide } from 'swiper/react';
import { ShopItem } from "../shop-item/shop-item";
import { Navigation } from 'swiper/modules';
import { useSelector } from "react-redux";
import 'swiper/css/navigation';
import 'swiper/css';
import { RootState } from "../../store/root-state";
import { Spinner } from "../spinner/spinner";

export function Weekly(): JSX.Element {
  const itemWidth = 281;
  const slidesPerView = Math.round(window.innerWidth / itemWidth)
  const spaceBetween = Math.round(window.innerWidth - itemWidth) / 2 / slidesPerView;
  const items = useSelector((state: RootState) => state.data.items)
  const isItemsLoading = useSelector((state: RootState) => state.data.isItemsDataLoading);
  const mobileSlidesPerView = window.innerWidth / (itemWidth + spaceBetween/(items?.length - 3));
  const isMobile = useIsMobile();

  return (
    <section className="section weekly">
      <h2 className="title title--2 title--secondary weekly__title">Weekly - Top NFT</h2>
      {
        isItemsLoading ? <Spinner size="40"/>
        :
        <>
          <Swiper
            spaceBetween={0}
            loop={true}
            navigation={{
              prevEl: '.weekly__slider-btn--next',
              nextEl: '.weekly__slider-btn--prev'
            }}
            modules={[Navigation]}
            centeredSlides={isMobile}
            slidesPerView={isMobile ? mobileSlidesPerView : slidesPerView}
            slidesPerGroup={isMobile ? 1 : undefined}
          >
            {items?.map((item) => (
              <SwiperSlide key={`weekly-${item.id}`}>
                <ShopItem item={item}/>
              </SwiperSlide>
            ))}
          </Swiper>
          <SliderButtons classNames={['weekly__slider-btn--prev', 'weekly__slider-btn--next']}/>
        </>
      }
    </section>
  );
}
