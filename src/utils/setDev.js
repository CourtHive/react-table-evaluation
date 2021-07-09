import { drawEngine, tournamentEngine, competitionEngine, utilities } from 'tods-competition-factory';

export function setDev() {
  window.dev = {};

  addDev({ drawEngine, tournamentEngine, competitionEngine, utilities });
}

let addDevErrors = 0;
export function addDev(variable) {
  try {
    Object.keys(variable).forEach((key) => (window.dev[key] = variable[key]));
  } catch (err) {
    if (!addDevErrors) {
      addDevErrors += 1;
    }
  }
}
