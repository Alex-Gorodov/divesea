import { FormEvent, useState } from "react";
import { FormCheckbox } from "./form-checkbox";
import { useDispatch, useSelector } from "react-redux";
import { createNFT, redirectToRoute } from "../../store/sell/sell-actions";
import { RootState } from "../../store/RootState";
import { AppRoute } from "../../const";

export function CreateForm(): JSX.Element {
  const [isFormSend, setFormSend] = useState(false);

  const items = useSelector((state: RootState) => state.sell.items)
  const dispatch = useDispatch();
  const uploadedUrl = useSelector((state: RootState) => state.sell.uploadedNftPath)

  console.log(uploadedUrl);
  

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
    dispatch(createNFT({
      item: {
        id: items.length,
        name: formData.name,
        img: uploadedUrl ? uploadedUrl : '',
        price: parseFloat(formData.priceValue),
        addedDate: new Date()
      }
    }));

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

    setFormSend(true);
    setTimeout(() => {
      setFormSend(false);
    }, 300);
    isFormSend && console.log('send');

    dispatch(redirectToRoute(AppRoute.Discover));
  }


  return (
    <form className="create-form" action={AppRoute.Discover} onSubmit={handleAddItem}>

      <label htmlFor="name" className="create-form__label">
        Name
        <input type="text" className="create-form__input" id="name" placeholder="ArtWork Name" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
      </label>

      <label htmlFor="description" className="create-form__label">
        Description
        <textarea className="create-form__input create-form__input--textarea" id="description" rows={5} placeholder="Enter Your Description" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
      </label>

      <label htmlFor="royalty" className="create-form__label create-form__label--select">
        Royalty
        <select className="create-form__input create-form__input--select" id="royalty" onChange={(e) => {setFormData({...formData, name: e.target.value}); handleRoyaltyChange(e);}} value={formData.royalty} style={{color: `${formData.royalty === 'Royalty' ? '#9596a6' : ''}`}}>
          <option className="create-form__input--option" value="Royalty" disabled>Royalty</option>
          <option className="create-form__input--option" value="Fixed">Fixed</option>
          <option className="create-form__input--option" value="Percentage">Percentage</option>
        </select>
      </label>

      <label htmlFor="size" className="create-form__label">
        Size
        <input type="text" className="create-form__input" id="size" placeholder="Ex - 100 x 100"/>
      </label>

      <label htmlFor="tags" className="create-form__label">
        Tags
        <input type="text" className="create-form__input" id="tags" placeholder="Beautiful Castle, Monkeys ETC"/>
      </label>

      <label htmlFor="price" className="create-form__label">
        Price
        <input type="number" className="create-form__input" id="price" placeholder="0.00007 ETC" onChange={(e) => setFormData({...formData, priceValue: e.target.value})}/>
      </label>

      <label htmlFor="in-stock" className="create-form__label">
        In Stock
        <input type="text" className="create-form__input" id="in-stock"/>
      </label>

      <FormCheckbox label={"Put On Sale"} id={"putOnSale"} description={"People Will Bids On Your NFT Project"} checked={true}/>

      <FormCheckbox label={"Direct Sale"} id={"directSale"} description={"No Bids - Only Direct Selling"} checked={false}/>

      <button className="button button--dark" type="submit">Create</button>
    </form>
  );
}
