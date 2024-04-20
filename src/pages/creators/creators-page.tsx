import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Users } from "../../mocks/users";
import { CreatorCard } from "../../components/creator-card/creator-card";

export function CreatorsPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>
          DiveSea | Creators
        </title>
      </Helmet>
      <main className="main">
        <section className="section creators">
          <h1 className="title title--2 title--secondary creators__title">Meet Our Great Creators</h1>
          <ul className="creators__list">
            {
              Users.map((user) => {
                return (
                  <li className="creators__item">
                    <CreatorCard user={user}/>
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
