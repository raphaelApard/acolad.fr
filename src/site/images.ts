import type { ImageMetadata } from 'astro';
import cnrs from '../assets/site/cnrs-images-photo-video-platform.webp';
import docteurConso from '../assets/site/docteur-conso-sustainability-platform.webp';
import obepine from '../assets/site/obepine-wastewater-monitoring-platform.webp';
import ovhcloud from '../assets/site/ovhcloud-website.webp';
import hospital from '../assets/site/american-hospital-of-paris-website.webp';
import issy from '../assets/site/issy-les-moulineaux-city-website.webp';
import meetToTravel from '../assets/site/meet-to-travel-social-network.webp';
import parisSaclay from '../assets/site/paris-saclay-university-website.webp';
import syndex from '../assets/site/syndex-website.webp';
import ovhcloudLogo from '../assets/media/logo-ovhcloud.webp';
import cnrsLogo from '../assets/media/logo-cnrs.webp';
import hospitalLogo from '../assets/media/logo-american-hospital-paris.webp';
import pantheonSorbonneLogo from '../assets/media/logo-pantheon-sorbonne.webp';
import eyFabernovelLogo from '../assets/media/logo-ey-fabernovel.webp';
import parisSaclayLogo from '../assets/media/logo-paris-saclay.webp';
import syndexLogo from '../assets/media/logo-syndex.webp';
import muzeoLogo from '../assets/media/logo-muzeo.webp';
import docteurConsoLogo from '../assets/media/logo-docteur-conso.webp';
import axessLogo from '../assets/media/logo-axess-ows.webp';
import issyLogo from '../assets/media/logo-issy-com.webp';
import humansConnexionLogo from '../assets/media/logo-humans-connexion.webp';
import makinaCorpusLogo from '../assets/media/logo-makina-corpus.webp';
import type { ClientId, ProjectId } from './types';

/** Screenshot of each project, shared by every locale. */
export const projectImages: Record<ProjectId, ImageMetadata> = {
  ovhcloud,
  docteurConso,
  cnrs,
  obepine,
  issy,
  syndex,
  hospital,
  meetToTravel,
  parisSaclay,
};

/**
 * Application screens whose navigation and titles sit on the left: when the frame is narrower
 * than the screenshot, keep that side and crop the right one instead of cropping both.
 */
const leftAnchored: ProjectId[] = ['obepine', 'docteurConso'];

/** CSS classes of a project screenshot. */
export function shotClass(project: ProjectId, ...modifiers: string[]): string {
  return ['shot', ...modifiers, ...(leftAnchored.includes(project) ? ['shot--left'] : [])].join(' ');
}

/**
 * Logo of each client of the home page band, shared by every locale. `height` is the rendered
 * height in px, tuned per logo so wide wordmarks and square emblems carry the same visual weight.
 */
export const clientLogos: Record<ClientId, { image: ImageMetadata; height: number }> = {
  ovhcloud: { image: ovhcloudLogo, height: 52 },
  cnrs: { image: cnrsLogo, height: 62 },
  hospital: { image: hospitalLogo, height: 56 },
  pantheonSorbonne: { image: pantheonSorbonneLogo, height: 96 },
  eyFabernovel: { image: eyFabernovelLogo, height: 54 },
  parisSaclay: { image: parisSaclayLogo, height: 96 },
  syndex: { image: syndexLogo, height: 72 },
  muzeo: { image: muzeoLogo, height: 38 },
  docteurConso: { image: docteurConsoLogo, height: 70 },
  axess: { image: axessLogo, height: 40 },
  issy: { image: issyLogo, height: 68 },
  humansConnexion: { image: humansConnexionLogo, height: 40 },
  makinaCorpus: { image: makinaCorpusLogo, height: 72 },
};
