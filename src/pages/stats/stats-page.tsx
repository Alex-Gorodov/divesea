import { Layout } from "../../components/layout/layout";
import { Helmet } from "react-helmet-async";

export function StatsPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>
          DiveSea | Stats
        </title>
      </Helmet>
      <main className="main">
      </main>
    </Layout>
  )
}
