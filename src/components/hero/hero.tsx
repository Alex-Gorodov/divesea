import { animated, useSpring } from "react-spring"
import { items } from "../../mocks/items";
import cn from "classnames";
import { useState } from "react";
import { HeroItemSizes } from "../../const";
import React from "react";
import { SliderButtons } from "../slider-buttons/slider-buttons";

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
      {number.interpolate((val) => {
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
            <p className="section__description">Discover, Create and Sell NFTs On Our NFT Marketplace With Over Thousands Of NFTs And Get a <span className="section__description--accent">$20 bonus</span>.</p>
          </div>
          <div className="hero__buttons">
            <button className="button button--dark">Explore More</button>
            <button className="button button--light">Create nft</button>
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
            </li>
            <li className="hero-stats__item">
              <b className="hero-stats__accent">
                {
                  <CountAnimation end={159000}/>
                }
              </b>
            </li>
            <li className="hero-stats__item">
              <b className="hero-stats__accent">
                {
                  <CountAnimation end={87000}/>
                }
              </b>
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
                <img src={item.img} alt={item.name} width={activeItem === item.id ? HeroItemSizes.Active : HeroItemSizes.Inactive} height={activeItem === item.id ? HeroItemSizes.Active : HeroItemSizes.Inactive}/>
              </div>
            )
          })
        }
        <SliderButtons classNames={['hero__slider-btn--prev', 'hero__slider-btn--next']} onClickPrev={() => handleActiveItemPrev()} onClickNext={() => handleActiveItemNext()} isPrevDisabled={activeItem === 0} isNextDisabled={activeItem === items.length - 1}/>
      </div>
    </section>
  )
}
