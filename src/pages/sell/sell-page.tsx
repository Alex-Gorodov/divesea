import { Helmet } from "react-helmet-async";
import { Layout } from "../../components/layout/layout";
import { CreateForm } from "../../components/create-form/create-form";
import { Upload } from "../../components/create-form/upload";

export function SellPage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>
          DiveSea | Sell
        </title>
      </Helmet>
      <main className="main">
        <section className="section sell">
          <h1 className="title title--2 title--secondary sell__title">Create Your NFT</h1>
          <div className="sell__wrapper">
            <CreateForm/>
            <Upload/>
          </div>
        </section>
      </main>
    </Layout>
  )
}
