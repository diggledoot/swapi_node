export interface Character
  extends Pick<RawCharacter, "name" | "height" | "gender"> {}

export interface APIResponse {
  count: number;
  next: string;
  previous: string;
  results: RawCharacter[];
}

export interface RawCharacter {
  name: string;
  height: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
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
