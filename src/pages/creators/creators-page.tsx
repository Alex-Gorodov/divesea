import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { CreatorCard } from "../../components/creator-card/creator-card";
import { useSelector } from "react-redux";
import { RootState } from "../../store/root-state";
import { Spinner } from "../../components/spinner/spinner";

export function CreatorsPage(): JSX.Element {
  const users = useSelector((state: RootState) => state.data.users)
  const isUsersLoading = useSelector((state: RootState) => state.data.isUsersDataLoading)
  
  return (
    <Layout>
      <Helmet>
        <title>
          DiveSea | Creators
        </title>
      </Helmet>
      <main className="main">
        <section className="section creators">
          <h1 className="title title--2 title--secondary creators__title">Meet Our Great&nbsp;Creators</h1>
          <ul className="creators__list">
            {
              isUsersLoading
              ?
              <Spinner size="40"/>
              :
              users?.map((user) => {
                return (
                  <li className="creators__item" key={`user-id${user.id}`}>
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
