import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Discover } from "../../components/discover/discover";

export function DiscoverPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>DiveSea | Discover</title>
      </Helmet>
      <main className="main">
        <Discover/>
      </main>
    </Layout>
  )
}
