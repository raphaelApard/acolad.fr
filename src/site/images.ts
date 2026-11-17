import type { ImageMetadata } from 'astro';
import cnrs from '../assets/site/cnrs-images-photo-video-platform.webp';
import docteurConso from '../assets/site/docteur-conso-sustainability-platform.webp';
import obepine from '../assets/site/obepine-wastewater-monitoring-platform.webp';
import ovhcloud from '../assets/site/mission-ovhcloud.webp';
import hospital from '../assets/site/american-hospital-of-paris-website.webp';
import issy from '../assets/site/project-issy.webp';
import meetToTravel from '../assets/site/project-meettotravel.webp';
import parisSaclay from '../assets/site/project-paris-saclay.webp';
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
