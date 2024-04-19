import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Users } from "../../mocks/users";

export function CreatorsPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>
          DiveSea | Creators
        </title>
      </Helmet>
      <main className="main">
        <h1 className="title title--2 title--secondary">Meet Our Great Creators</h1>
        {
          Users.map((user) => {
            return (
              <div>
                <h3>{user.firstname} {user.surname.charAt(0)}.</h3>
                <p>{user.nickname}</p>
              </div>
            )
          })
        }
      </main>
    </Layout>
  )
}
