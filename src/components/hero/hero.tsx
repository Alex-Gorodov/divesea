import { animated, useSpring } from "react-spring"
import cn from "classnames";
import { useState } from "react";
import { AppRoute, HeroItemSizes } from "../../const";
import React from "react";
import { SliderButtons } from "../slider-buttons/slider-buttons";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/RootState";

interface Props {
  end: number;
}

const CountAnimation: React.FC<Props> = ({ end }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: end },
    config: { duration: 2000, easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  });

  return (
    <animated.span style={{animationTimingFunction: 'ease-out'}}>
      {number.to((val) => {
        if (val >= 10000) {
          return `${Math.floor(val / 1000)}K+`;
        } else {
          return Math.floor(val);
        }
      })}
    </animated.span>
  );
};

export function Hero(): JSX.Element {

  const [activeItem, setActiveItem] = useState(0);
  
  const isMobile = useIsMobile();

  const items = useSelector((state: RootState) => state.sell.items)
  
  const handleActiveItemPrev = () => {
    setActiveItem(activeItem - 1)
  }

  const handleActiveItemNext = () => {
    setActiveItem(activeItem + 1)
  }

  return (
    <section className="section hero">
      <div className="hero__left">
        <div className="hero__wrapper">
          <div className="hero__text">
            <h1 className="section__title title title--1">Discover And Create NFTs</h1>
            <p className="hero__description section__description">Discover, Create and Sell NFTs On Our NFT Marketplace With Over Thousands Of NFTs And Get a <span className="section__description--accent">$20 bonus</span>.</p>
          </div>
          <div className="hero__buttons">
            <Link className="button button--dark" to={AppRoute.Discover}>Explore More</Link>
            <Link className="button button--light" to={AppRoute.Sell}>Create nft</Link>
          </div>
        </div>
        <div className="hero__stats hero-stats">
          <ul className="hero-stats__list">
            <li className="hero-stats__item">
              <b className="hero-stats__accent">
                {
                  <CountAnimation end={430000}/>
                }
              </b>
              <span className="hero-stats__description">Art Works</span>
            </li>
            <li className="hero-stats__item">
              <b className="hero-stats__accent">
                {
                  <CountAnimation end={159000}/>
                }
              </b>
              <span className="hero-stats__description">Creators</span>
            </li>
            <li className="hero-stats__item">
              <b className="hero-stats__accent">
                {
                  <CountAnimation end={87000}/>
                }
              </b>
              <span className="hero-stats__description">Collections</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="hero__right">
          {
            items.map((item) => {
              const itemClassName = cn('hero__item', {
                'hero__item--inactive' : item.id === activeItem + 1 || (item.id === 0 && activeItem === items.length - 1),
                'hero__item--invisible' : item.id < activeItem || item.id > activeItem + 1 
              })
              return (
                <div className={itemClassName} key={`hero-${item.name}`}>
                  <img
                    src={item.img}
                    alt={item.name} 
                    width={
                      activeItem === item.id
                      ? isMobile
                        ? HeroItemSizes.ActiveMobile : HeroItemSizes.Active
                      : isMobile
                        ? HeroItemSizes.InactiveMobile : HeroItemSizes.Inactive
                    }
                    height={
                      activeItem === item.id
                      ? isMobile
                        ? HeroItemSizes.ActiveMobile : HeroItemSizes.Active
                      : isMobile
                        ? HeroItemSizes.InactiveMobile : HeroItemSizes.Inactive
                    }/>
                </div>
              )
            })
          }
        <SliderButtons classNames={['hero__slider-buttons', 'hero__slider-btn--prev', 'hero__slider-btn--next']} onClickPrev={() => handleActiveItemPrev()} onClickNext={() => handleActiveItemNext()} isPrevDisabled={activeItem === 0} isNextDisabled={activeItem === items.length - 1}/>
      </div>
    </section>
  )
}
