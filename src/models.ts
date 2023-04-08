export interface Character {
  name: string;
  height: string;
  gender: string;
}

export interface APIResponse {
  count: number;
  next: string;
  previous: string;
  results: RawCharacter[];
}

export interface RawCharacter {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}
