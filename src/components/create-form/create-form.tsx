import { FormEvent, useState } from "react";
import { FormCheckbox } from "./form-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { createNFT, redirectToRoute, setUploadedNftPath } from "../../store/sell/sell-actions";
import { RootState } from "../../store/RootState";
import { AppRoute } from "../../const";

export function CreateForm(): JSX.Element {
  const items = useSelector((state: RootState) => state.sell.items)
  const dispatch = useDispatch();
  const uploadedUrl = useSelector((state: RootState) => state.sell.uploadedNftPath)
  const [isFormCorrect, setFormCorrectness] = useState(true);

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
        price: parseFloat(formData.priceValue),
        addedDate: new Date()
      }
    }));

    dispatch(setUploadedNftPath({path: null}));

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

      <label htmlFor="name" className="create-form__label create-form__label--full-size">
        Name
        <input type="text" className="create-form__input" id="name" placeholder="ArtWork Name" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
      </label>

      <label htmlFor="description" className="create-form__label create-form__label--full-size">
        Description
        <textarea className="create-form__input create-form__input--textarea" id="description" rows={5} placeholder="Enter Your Description" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
      </label>

      <div className="create-form__inner-wrapper">
        <label htmlFor="royalty" className="create-form__label create-form__label--select  create-form__label--first-col">
          Royalty
          <select className="create-form__input create-form__input--select" id="royalty" onChange={(e) => {setFormData({...formData, name: e.target.value}); handleRoyaltyChange(e);}} value={formData.royalty} style={{color: `${formData.royalty === 'Royalty' ? '#9596a6' : ''}`}}>
            <option className="create-form__input--option" value="Royalty" disabled>Royalty</option>
            <option className="create-form__input--option" value="Fixed">Fixed</option>
            <option className="create-form__input--option" value="Percentage">Percentage</option>
          </select>
        </label>

        <label htmlFor="size" className="create-form__label  create-form__label--second-col">
          Size
          <input type="text" className="create-form__input" id="size" placeholder="Ex - 100 x 100"/>
        </label>
      </div>

      <label htmlFor="tags" className="create-form__label create-form__label--full-size">
        Tags
        <input type="text" className="create-form__input" id="tags" placeholder="Beautiful Castle, Monkeys ETC"/>
      </label>

      <div className="create-form__inner-wrapper">
        <label htmlFor="price" className="create-form__label  create-form__label--two-cols">
          Price
          <input type="number" className="create-form__input" id="price" placeholder="0.00007 ETC" onChange={(e) => setFormData({...formData, priceValue: e.target.value})}/>
        </label>

        <label htmlFor="in-stock" className="create-form__label create-form__label--last-col">
          In Stock
          <input type="text" className="create-form__input" id="in-stock"/>
        </label>
      </div>


      <FormCheckbox label={"Put On Sale"} id={"putOnSale"} description={"People Will Bids On Your NFT Project"} checked={true} className={'create-form__label--full-size'}/>

      <FormCheckbox label={"Direct Sale"} id={"directSale"} description={"No Bids - Only Direct Selling"} checked={false} className={'create-form__label--full-size'}/>

      <button className="button button--dark create-form__button" type="submit">Create</button>
    </form>
  );
}