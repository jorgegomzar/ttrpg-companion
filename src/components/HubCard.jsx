import { Play, Grid, Stars } from 'lucide-react';
import Button from './Button';

const HubCard = ({
  title = "Game title",
  subtitle = "Game subtitle",
  icon: Icon = Grid,
  cover: CoverIcon = Stars,
  children = "Game description and links",
  version = "1.2.3",
  goToGame = () => {console.log("Go to game!")},
  disabled = false,
}) => {
  if (disabled) {
    return  (
      <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
        <div className="h-48 bg-neutral-800 relative flex items-center justify-center">
          <Stars className="w-16 h-16 text-neutral-700"/>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg mb-4">
            <Grid className="text-neutral-500 w-6 h-6"/>
          </div>
          <h3 className="text-2xl font-bold text-neutral-300 mb-2">{title}</h3>
          <p className="text-neutral-500 text-sm mb-6">
            {children}
          </p>
          <Button disabled variant="secondary" className="w-full cursor-not-allowed">
            En Desarrollo
          </Button>
        </div>
      </div>
    )
  }

  return (
      <div className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-red-900/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-900/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/90 z-10 pointer-events-none"/>
        <div className="h-48 bg-neutral-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-950/20 group-hover:bg-red-950/40 transition-colors duration-500"></div>
          {CoverIcon && <CoverIcon className="absolute -bottom-4 -right-4 w-32 h-32 text-neutral-950/50 group-hover:text-red-950/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12"/>}
        </div>

        <div className="relative z-20 p-6 -mt-12">
          <div className="w-12 h-12 bg-red-900 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
            {Icon && <Icon className="text-white w-6 h-6"/>}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 font-serif">{title}</h3>
          <p className="text-neutral-400 text-sm mb-6 h-20 overflow-hidden">
            {children}
          </p>

          <div className="flex flex-col gap-3">
            <Button variant="primary" onClick={goToGame} className="w-full group-hover:bg-red-700">
              Jugar Ahora <Play className="w-4 h-4 fill-current"/>
            </Button>
            <div className="flex items-center justify-between text-xs text-neutral-600 font-mono mt-2">
              <span>{subtitle}</span>
              <span>v{version}</span>
            </div>
          </div>
        </div>
      </div>
  )
};
export default HubCard;
