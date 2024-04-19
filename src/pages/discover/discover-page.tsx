import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Users } from "../../mocks/users";
import { ShopItem } from "../../components/shop-item/shop-item";
import { items } from "../../mocks/items";

export function DiscoverPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>DiveSea | Discover</title>
      </Helmet>
      <main className="main">
        <section className="section discover">
          <h1 className="title title--2 title--secondary">Discover NFTs</h1>
          <ul className="discover__list">
            {
              items.map((item) => {
                return (
                  <li className="discover__item" key={`discover-${item.id}`}>
                    <ShopItem item={item}/>
                  </li>
                )
              })
            }
          </ul>
        </section>
      </main>
    </Layout>
  )
}
