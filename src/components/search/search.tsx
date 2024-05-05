export function Search(): JSX.Element {
  return (
    <form className="navigation__search search" action="" method="get">
      <label htmlFor="search">
        <input className="search__input" type="text" name="search" id="search" placeholder="Search Art Work / Creator"/>
      </label>
    </form>
  )
}
