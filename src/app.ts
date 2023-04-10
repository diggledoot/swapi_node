import fs from "fs";
import {
  getCharacters,
  extractGender,
  sortGender,
  filterWithHeight,
  filterNoHeight,
  removeGenderProperty,
} from "./character_utils";
import { Character } from "./models";

export const SWAPI_PEOPLE_ENDPOINT: string = "https://swapi.dev/api/people/";
const FILE_NAME: string = "./output.json";

async function main() {
  let result: object[] = [];
  const data: Character[] = await getCharacters(SWAPI_PEOPLE_ENDPOINT);

  if (!data) {
    console.error("No data returned!");
    return;
  }

  const genders: string[] = extractGender(data);

  genders.forEach((gender: string) => {
    const characters: Character[] = sortGender(data, gender);

    const charactersWithHeight: Character[] = filterWithHeight(characters);

    charactersWithHeight.sort(
      (a, b) => parseInt(a.height) - parseInt(b.height)
    );

    const charactersNoHeight: Character[] = filterNoHeight(characters);

    charactersNoHeight.sort((a, b) => (a.name < b.name ? -1 : 1));

    const mergedCharacterArray: Character[] =
      charactersWithHeight.concat(charactersNoHeight);

    const finalCharacterArray: object[] =
      removeGenderProperty(mergedCharacterArray);

    const jsonObject: object = {
      gender: gender,
      characters: finalCharacterArray,
    };

    result.push(jsonObject);
  });

  fs.writeFileSync(FILE_NAME, JSON.stringify(result, null, "\t"), "utf-8");
}

main();
