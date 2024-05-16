import { Link, generatePath } from "react-router-dom";
import { RootState } from "../../store/root-state";
import { useSelector } from "react-redux";
import { Item } from "../../types/item";
import { User } from "../../types/user";
import { AppRoute } from "../../const";
import { useState } from "react";

export function Search(): JSX.Element {
  const users = useSelector((state: RootState) => state.data.users);
  const items = useSelector((state: RootState) => state.data.items);

  const [search, setSearch] = useState('');
  const [resultUsers, setResultUsers] = useState<User[]>([]);
  const [resultItems, setResultItems] = useState<Item[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setSearch(inputValue);
    setResultUsers(inputValue.length 
      ? users.filter((user) => 
          user.firstname.toLowerCase().includes(inputValue) ||
          user.surname.toLowerCase().includes(inputValue) ||
          user.nickname.toLowerCase().includes(inputValue)) : []);
    setResultItems(inputValue.length
      ? items.filter((item) => 
        item.name.toLowerCase().includes(inputValue)) : []);
};


  return (
    <div className="search__wrapper">
      <form className="navigation__search search" action="" method="get">
        <label htmlFor="search">
          <input className="search__input" type="text" name="search" id="search" value={search} placeholder="Search Art Work / Creator" onChange={handleInputChange}/>
        </label>
      </form>
      {
        (resultUsers.length > 0 || resultItems.length > 0) &&
        <div className="search__result-wrapper">
          <p className="search__result-title">Users:</p>
            <ul className="search__result-list">
              { 
                resultUsers.map((user) => (
                  <li key={`search-result-${user.firstname}`}>
                    <Link className="search__result-item search__user-item" to={generatePath(`${AppRoute.Creators}/${user.id}`)} title={`${user.firstname} ${user.surname}`}>
                      <img className="search__user-item__image" src={user.avatar} alt="" width={40} height={40}/>
                      <p className="search__result-item__name">{user.firstname}</p>
                    </Link>
                  </li>
                ))
              }
            </ul>
          <p className="search__result-title">Items:</p>
          <ul className="search__result-list">
            {
              resultItems.map((item) => (
                <li key={`search-result-${item.name}`}>
                    <Link className="search__result-item search__nft-item" to={generatePath(AppRoute.ProductPage, {id: `${item.id}`})}>
                      <img src={item.img} alt={item.name} width={200} height={200} />
                      <p className="search__result-item__name">{item.name}</p>
                    </Link>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}
