import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/RootState"
import cn from "classnames";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { toggleBidForm } from "../../store/sell/sell-actions";
import { monthNames } from "../../const";
import { useState } from "react";
import { useEthPrice, useBtcPrice } from "../../hooks/useEthPrice";
import { ReactComponent as BidIcon } from "../../img/icons/bid-icon.svg"

export function BidForm(): JSX.Element {
  const isFormOpened = useSelector((state: RootState) => state.sell.isBidFormOpened);
  const dispatch = useDispatch();
  
  const formClassName = cn('bid-form', {
    'bid-form--opened' : isFormOpened,
  })


  const ref = useOutsideClick(() => {
    dispatch(toggleBidForm({isOpened : false}));
  }) as React.RefObject<HTMLDivElement>;

  const date = new Date();

  const [formData, setFormData] = useState({
    bidCurrency: 'ETH',
    bidValue: '',
  });

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      priceCurrency: value,
    }));
  };

  const ethPrice = useEthPrice();
  const btcPrice = useBtcPrice();

  let price: number;
  switch (formData.bidCurrency) {
    case 'ETH':
      price = Number(parseFloat(formData.bidValue).toFixed(2));
      break;
    case 'BTC':
      price = Number((Number(btcPrice) / Number(ethPrice)).toFixed(2));
      break;
    default:
      price = Number((Number(formData.bidValue) / Number(ethPrice)).toFixed(2));
      break;
  }

  return (
    <div className={formClassName}>
      <div className="bid-form__wrapper" ref={ref}>
        <h3 className="title title--3">History of Bid</h3>
        <span className="bid-form__date">{`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</span>
        <ul className="bid-form__bids-list">
          <li className="bid-form__bids-item">item1</li>
          <li className="bid-form__bids-item">item2</li>
          <li className="bid-form__bids-item">item3</li>
        </ul>
        <form className="bid-form__form" action="#">
          <h3 className="title title--3">Your bid</h3>
          <label htmlFor="price" className="bid-form__label bid-form__label--price">
            <select className="bid-form__input bid-form__input--select-currency" name="price-currency" id="price-currency" onChange={(e) => {setFormData({...formData, bidCurrency: e.target.value}); handleCurrencyChange(e)}}>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="USDT">USDT</option>
            </select>
            <input 
              type="number" 
              className="bid-form__input bid-form__input--currency" 
              id="price" 
              onChange={(e) => setFormData({...formData, bidValue: e.target.value})} 
            />
          </label>
          <button className="button button--dark bid-form__btn">
            <BidIcon/>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
