import {Glicko2} from 'glicko2';

const settings = {
  tau: 0.5,
  rating: 1500,
  rd: 200,
  vol: 0.06,
};
const glicko = new Glicko2(settings);

export default glicko;