import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

export function NotFound(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>DiveSea | 404</title>
      </Helmet>
      <main className="main not-found">
        <h1 className="title title--1">404</h1>
        <Link className="not-found__link" to={AppRoute.Root}>Back to main</Link>
      </main>
    </Layout>
  )
}
