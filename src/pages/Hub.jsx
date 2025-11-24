import { Skull, Stars, Grid, Play } from 'lucide-react';
import Button from '../components/Button';
import Layout from '../components/Layout';

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
        
        {/* APP 1: VAMPIRE */}
        <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-red-900/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/90 z-10 pointer-events-none"/>
          
          <div className="h-48 bg-neutral-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-950/20 group-hover:bg-red-950/40 transition-colors duration-500"></div>
            <Skull className="absolute -bottom-4 -right-4 w-32 h-32 text-neutral-950/50 group-hover:text-red-950/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12"/>
          </div>

          <div className="relative z-20 p-6 -mt-12">
            <div className="w-12 h-12 bg-red-900 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <Skull className="text-white w-6 h-6"/>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-serif">Un Vampiro de Mil Años</h3>
            <p className="text-neutral-400 text-sm mb-6 h-20 overflow-hidden">
              Un juego de rol en solitario (o cooperativo) sobre la pérdida de la memoria y la humanidad a lo largo de siglos de existencia.
              Para jugar es necesario poseer el <a href="https://www.elrefugioeditorial.com/un-vampiro-de-mil-anos"><b><u>JUEGO ORIGINAL</u></b></a>
            </p>
            
            <div className="flex flex-col gap-3">
              <Button variant="primary" onClick={() => onNavigate('vampire')} className="w-full group-hover:bg-red-700">
                Jugar Ahora <Play className="w-4 h-4 fill-current"/>
              </Button>
              <div className="flex items-center justify-between text-xs text-neutral-600 font-mono mt-2">
                <span>Edición Multijugador</span>
                <span>v1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* APP 2: COMING SOON */}
        <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
          <div className="h-48 bg-neutral-800 relative flex items-center justify-center">
            <Stars className="w-16 h-16 text-neutral-700"/>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg mb-4">
              <Grid className="text-neutral-500 w-6 h-6"/>
            </div>
            <h3 className="text-2xl font-bold text-neutral-300 mb-2">Próximamente</h3>
            <p className="text-neutral-500 text-sm mb-6">
              Espacio reservado para futuras herramientas: generadores de mazmorras, gestores de inventario o nuevos juegos narrativos.
            </p>
            <Button disabled variant="secondary" className="w-full cursor-not-allowed">
              En Desarrollo
            </Button>
          </div>
        </div>

      </div>
    </div>
  </Layout>
);

export default Hub;
