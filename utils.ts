async function fetchFromURL(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to pull data from ${url}!`);
  }
  return response.json();
}

function mapDataToCharacter(data: any): Character[] {
  return data.results.map((character: any) => {
    return {
      name: character.name,
      height: character.height,
      gender: character.gender,
    };
  });
}

export async function getCharacters(url: string): Promise<Character[]> {
  let result: Character[] = [];

  try {
    let data = await fetchFromURL(url);

    while (data) {
      let characters = mapDataToCharacter(data);

      result.push(...characters);

      if (data.next) {
        data = await fetchFromURL(data.next);
      } else {
        data = null;
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }

  return result;
}

export function sortGender(
  characters: Character[],
  gender: string
): Character[] {
  let result: Character[] = [];

  characters.forEach((character) => {
    if (character.gender === gender) {
      result.push(character);
    }
  });
  return result;
}

export function filterWithHeight(characters: Character[]): Character[] {
  let result: Character[] = [];
  characters.forEach((character) => {
    if (character.height !== "unknown") {
      result.push(character);
    }
  });
  return result;
}

export function filterNoHeight(characters: Character[]): Character[] {
  let result: Character[] = [];
  characters.forEach((character) => {
    if (character.height === "unknown") {
      result.push(character);
    }
  });
  return result;
}

export function extractGender(characters: Character[]): string[] {
  let result: string[] = [];
  characters.forEach((character) => {
    if (result.indexOf(character.gender) === -1) {
      result.push(character.gender);
    }
  });

  return result;
}

export function removeGenderProperty(characters: Character[]): object[] {
  let result: object[] = [];
  characters.forEach((character: Character) => {
    result.push({
      name: character.name,
      height: character.height,
    });
  });
  return result;
}
