import fs from "fs";
import {
  getCharacters,
  extractGender,
  sortGender,
  filterWithHeight,
  filterNoHeight,
  removeGenderProperty,
} from "./character_utils";

export const SWAPI_PEOPLE_ENDPOINT: string = "https://swapi.dev/api/people/";
const FILE_NAME: string = "./output.json";

async function main() {
  let result: object[] = [];
  const data: Character[] = await getCharacters(SWAPI_PEOPLE_ENDPOINT);

  if (!data) {
    console.error("No data returned!");
    return;
  }

  const genders = extractGender(data);

  genders.forEach((gender: string) => {
    const characters = sortGender(data, gender);

    const charactersWithHeight = filterWithHeight(characters);

    charactersWithHeight.sort(
      (a, b) => parseInt(a.height) - parseInt(b.height)
    );

    const charactersNoHeight = filterNoHeight(characters);

    charactersNoHeight.sort((a, b) => (a.name < b.name ? -1 : 1));

    const mergedCharacterArray =
      charactersWithHeight.concat(charactersNoHeight);

    const finalCharacterArray = removeGenderProperty(mergedCharacterArray);

    const jsonObject = {
      gender: gender,
      characters: finalCharacterArray,
    };

    result.push(jsonObject);
  });

  fs.writeFileSync(FILE_NAME, JSON.stringify(result, null, "\t"), "utf-8");
}

main();
