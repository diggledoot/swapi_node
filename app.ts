import fs from "fs";
import {
  getCharacters,
  extractGender,
  sortGender,
  filterWithHeight,
  filterNoHeight,
  removeGenderProperty,
} from "./utils";

const SWAPI_URL = "https://swapi.dev/api/people/";

async function main() {
  let result: object[] = [];
  const data: Character[] = await getCharacters(SWAPI_URL);

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

  fs.writeFileSync(
    "./output.json",
    JSON.stringify(result, null, "\t"),
    "utf-8"
  );
}

main();
