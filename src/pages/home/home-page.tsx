import { Explore } from '../../components/explore/explore';
import { Hero } from '../../components/hero/hero';
import { Layout } from '../../components/layout/layout';
import { Parallax } from '../../components/parallax/parallax';
import { Weekly } from '../../components/weekly/weekly';
import { Helmet } from 'react-helmet-async';

export function HomePage(): JSX.Element {
  return (
    <Layout>
      <Helmet>
        <title>DiveSea</title>
      </Helmet>
      <main className="main">
        <Hero/>
        <Weekly/>
        <Explore/>
        <Parallax/>
      </main>
    </Layout>
  );
}
