import { FormEvent, useState } from "react";
import { FormCheckbox } from "./form-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { createNFT, redirectToRoute, setUploadedNftPath } from "../../store/actions";
import { AppRoute } from "../../const";
import { useEthPrice } from "../../hooks/useEthPrice";
import { RootState } from "../../store/root-state";
import { addItemToDatabase } from "../../services/database";
import { useBtcPrice } from "../../hooks/useBtcPrice";

export function CreateForm(): JSX.Element {
  const items = useSelector((state: RootState) => state.data.items);
  const dispatch = useDispatch();
  const uploadedUrl = useSelector((state: RootState) => state.page.uploadedNftPath)
  const [isFormCorrect, setFormCorrectness] = useState(true);
  const ethPrice = useEthPrice();
  const btcPrice = useBtcPrice();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    royalty: 'Royalty',
    size: '',
    tags: '',
    priceCurrency: 'ETH',
    priceValue: '',
    inStock: 0,
    isPutOnSale: true,
    isDirectSale: false,
    upload: '',
  });

  const handleRoyaltyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      royalty: value,
    }));
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      priceCurrency: value,
    }));
  };

  let price: number;
  switch (formData.priceCurrency) {
    case 'ETH':
      price = Number(parseFloat(formData.priceValue).toFixed(2));
      break;
    case 'BTC':
      price = Number((Number(Number(formData.priceValue) * Number(btcPrice)) / Number(ethPrice)).toFixed(2));
      break;
    default:
      price = Number((Number(formData.priceValue) / Number(ethPrice)).toFixed(2));
      break;
  }

  const handleAddItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.priceValue || !uploadedUrl) {
      setFormCorrectness(false);
      return;
    }

    dispatch(createNFT({
      item: {
        id: items.length,
        name: formData.name,
        img: uploadedUrl ? uploadedUrl : '',
        price: price,
        addedDate: new Date(),
        description: formData.description,
        likes: 0
      }
    }));

    dispatch(setUploadedNftPath({path: null}));
    addItemToDatabase({
      id: items.length,
      name: formData.name,
      img: uploadedUrl ? uploadedUrl : '',
      price: price,
      addedDate: new Date(),
      description: formData.description,
      likes: 0
    });
    setFormData({
      name: '',
      description: '',
      royalty: 'Royalty',
      size: '',
      tags: '',
      priceCurrency: 'ETH',
      priceValue: '',
      inStock: 0,
      isPutOnSale: true,
      isDirectSale: false,
      upload: '',
    });

    dispatch(redirectToRoute(AppRoute.Discover));
  }

  return (
    <form className="create-form" action={AppRoute.Discover} onSubmit={handleAddItem}>

      {
        !isFormCorrect &&
        <div className="create-form__error-message">
          <p>
            Please fill in all required fields (Name, Price, and upload the file).
          </p>
          <button className="button button--dark" onClick={() => setFormCorrectness(true)} >Close</button>
        </div>
      }

      <label htmlFor="name" className="create-form__label">
        Name
        <input type="text" className="create-form__input" id="name" placeholder="ArtWork Name" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
      </label>

      <label htmlFor="description" className="create-form__label">
        Description
        <textarea className="create-form__input create-form__input--textarea" id="description" rows={5} placeholder="Enter Your Description" onChange={(e) => setFormData({...formData, description: e.target.value})}/>
      </label>

      <div className="create-form__inner-wrapper">
        <label htmlFor="royalty" className="create-form__label">
          Royalty
          <select className="create-form__input create-form__input--select" id="royalty" onChange={(e) => {setFormData({...formData, royalty: e.target.value}); handleRoyaltyChange(e);}} value={formData.royalty} style={{color: `${formData.royalty === 'Royalty' ? '#9596a6' : ''}`}}>
            <option className="create-form__input--option" value="Royalty" disabled>Royalty</option>
            <option className="create-form__input--option" value="Fixed">Fixed</option>
            <option className="create-form__input--option" value="Percentage">Percentage</option>
          </select>
        </label>

        <label htmlFor="size" className="create-form__label">
          Size
          <input type="text" className="create-form__input create-form__input--right" id="size" placeholder="Ex - 100 x 100"/>
        </label>
      </div>

      <label htmlFor="tags" className="create-form__label">
        Tags
        <input type="text" className="create-form__input" id="tags" placeholder="Beautiful Castle, Monkeys ETC"/>
      </label>

      <div className="create-form__inner-wrapper">
        <label htmlFor="price" className="create-form__label create-form__label--price">
          Price
          <select className="create-form__input create-form__input--select-currency" name="price-currency" id="price-currency" onChange={(e) => {setFormData({...formData, priceCurrency: e.target.value}); handleCurrencyChange(e)}}>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
            <option value="USDT">USDT</option>
          </select>
          <input 
            type="number" 
            className="create-form__input create-form__input--currency" 
            id="price" 
            placeholder={`0.00007 ${formData.priceCurrency}`}
            step={0.1}
            onChange={(e) => setFormData({...formData, priceValue: e.target.value})} 
          />
        </label>

        <label htmlFor="in-stock" className="create-form__label">
          In Stock
          <input type="text" className="create-form__input create-form__input--right" id="in-stock"/>
        </label>
      </div>


      <FormCheckbox label={"Put On Sale"} id={"putOnSale"} description={"People Will Bids On Your NFT Project"} checked={true}/>

      <FormCheckbox label={"Direct Sale"} id={"directSale"} description={"No Bids - Only Direct Selling"} checked={false}/>

      <button className="button button--dark create-form__button" type="submit">Create</button>
    </form>
  );
}
