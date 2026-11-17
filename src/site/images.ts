import type { ImageMetadata } from 'astro';
import cnrs from '../assets/site/mission-cnrs-images.webp';
import docteurConso from '../assets/site/mission-docteur-conso-2026.webp';
import obepine from '../assets/site/mission-obepine.webp';
import ovhcloud from '../assets/site/mission-ovhcloud.webp';
import hospital from '../assets/site/project-american-hospital.webp';
import issy from '../assets/site/project-issy.webp';
import meetToTravel from '../assets/site/project-meettotravel.webp';
import syndex from '../assets/site/project-syndex.webp';
import type { ProjectId } from './types';

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
};
