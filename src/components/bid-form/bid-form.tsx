import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/RootState"
import cn from "classnames";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { addBid, toggleBidForm } from "../../store/page/page-actions";
import { monthNames } from "../../const";
import { FormEvent, useState } from "react";
import { useEthPrice, useBtcPrice } from "../../hooks/useEthPrice";
import { ReactComponent as BidIcon } from "../../img/icons/bid-icon.svg"
import { ReactComponent as Ethereum } from "../../img/icons/ethereum.svg"
import { ReactComponent as CloseCross } from "../../img/icons/cross.svg"
import { users } from "../../mocks/users";
import { useIsMobileOnly } from "../../hooks/useIsMobile";

export function BidForm(): JSX.Element {
  const isFormOpened = useSelector((state: RootState) => state.sell.isBidFormOpened);
  const bids = useSelector((state: RootState) => state.sell.bids)
  const dispatch = useDispatch();
  const [isFormCorrect, setFormCorrectness] = useState(true);
  const isMobile = useIsMobileOnly();
  
  const formClassName = cn('bid-form', {
    'bid-form--opened' : isFormOpened,
  })

  const handleCloseForm = () => {
    dispatch(toggleBidForm({isOpened : false}));
    setFormCorrectness(true);
    setFormData({
      bidCurrency: 'ETH',
      bidValue: '',
    });
  }

  const ref = useOutsideClick(() => {
    handleCloseForm();
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
      bidCurrency: value,
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
      price = Number((Number(formData.bidValue) / Number(ethPrice)).toFixed(3));
      break;
  }

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.bidValue) {
      setFormCorrectness(false);
      return;
    }

    formData.bidValue
      ?
        dispatch(addBid({bid: {
          id: bids.length,
          user: users[Math.round(Math.random() * (users.length - 1))],
          date: new Date(),
          price: price
        }}))
      :
        window.alert('Place your bid first!')
    setFormData({
      bidCurrency: 'ETH',
      bidValue: '',
    });
  }

  return (
    <div className={formClassName}>
      <div className="bid-form__wrapper" ref={ref}>
        <h3 className="title title--3">History of Bid</h3>
        <button className="bid-form__close-btn" type="button" onClick={handleCloseForm}>
          <CloseCross/>
        </button>
        <span className="bid-form__date">{`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</span>
        <ul className="bid-form__bids-list">
          {
            bids.slice(0,3).map((bid) => (
              <li className="bid-form__bids-item bid-item">
                <div className="bid-item__image-wrapper">
                  <img className="bid-item__image" src={bid.user.avatar} alt={bid.user.firstname} width={isMobile ? 45 : 64} height={isMobile ? 45 : 64}/>
                </div>
                <div className="bid-item__text">
                  <span className="bid-item__username">{bid.user.firstname}</span>
                  <span className="bid-item__date">{monthNames[bid.date.getMonth()] + ' ' + bid.date.getDate() + ', ' + bid.date.getFullYear() + ` at ${(bid.date.getHours() < 10 ? '0' + bid.date.getHours() : bid.date.getHours())}:${bid.date.getMinutes() < 10 ? '0' + bid.date.getMinutes() : bid.date.getMinutes()}`}</span>
                </div>
                <div className="bid-item__price-wrapper">
                  <Ethereum/>
                  <span className="bid-item__price">{bid.price}</span>
                </div>
                
              </li>
            ))
          }
        </ul>
        <form className="bid-form__form" action="/" onSubmit={submit}>
          {
            !isFormCorrect &&
            <div className="create-form__error-message">
              <p>
                Place your bid!
              </p>
              <button className="button button--dark" onClick={() => setFormCorrectness(true)} >Close</button>
            </div>
          }
          <h3 className="title title--3">Your bid</h3>
          <label htmlFor="price" className="bid-form__label bid-form__label--price">
            <select className="bid-form__input bid-form__input--currency" name="price-currency" id="price-currency" onChange={(e) => {setFormData({...formData, bidCurrency: e.target.value}); handleCurrencyChange(e)}} value={formData.bidCurrency}>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="USDT">USDT</option>
            </select>
            <input 
              type="number" 
              className="bid-form__input bid-form__input--value" 
              id="price" 
              onChange={(e) => setFormData({...formData, bidValue: e.target.value})}
              value={formData.bidValue}
            />
          </label>
          <button className="button button--dark bid-form__btn" type="submit">
            <BidIcon/>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
