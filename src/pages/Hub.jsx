import { Skull, Stars, Grid, Play } from 'lucide-react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import HubCard from '../components/HubCard';

const Hub = ({ onNavigate }) => (
  <Layout>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-6">
          Tu Colección de Narrativa
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          Herramientas digitales para juegos de rol analógicos. Selecciona una experiencia para comenzar tu sesión.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <HubCard
          title="Un Vampiro de Mil Años"
          subtitle="Edición Multijugador"
          version="1.0"
          goToGame={() => onNavigate('vampire')}
          icon={Skull}
          cover={Skull}
        >
          Un juego de rol en solitario (o cooperativo) sobre la pérdida de la memoria y la humanidad a lo largo de siglos de existencia.
          Para jugar es necesario poseer el <a class="underline decoration-dashed" href="https://www.elrefugioeditorial.com/un-vampiro-de-mil-anos"><b>JUEGO ORIGINAL</b></a>
        </HubCard>

        <HubCard
          title="Próximamente"
          disabled={true}
        >
          Espacio reservado para futuras herramientas: generadores de mazmorras, gestores de inventario o nuevos juegos narrativos.
        </HubCard>

      </div>
    </div>
  </Layout>
);

export default Hub;
