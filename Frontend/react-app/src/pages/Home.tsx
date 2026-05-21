import Hero from '../components/Hero';
import Services from '../components/Services';
import Catalog from '../components/Catalog';
import About from '../components/About';
import OrderForm from '../components/OrderForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Catalog />
      <About />
      <OrderForm />
    </main>
  );
}
