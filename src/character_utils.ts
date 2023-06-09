import { fetchFromURL } from './helper';
import { APIResponse, Character, RawCharacter } from './models';

const NO_HEIGHT = 'unknown';

export function mapDataToCharacter(data: APIResponse): Character[] {
	return data.results.map((character: RawCharacter) => {
		return {
			name: character.name,
			height: character.height,
			gender: character.gender,
		};
	});
}

export async function getCharacters(url: string): Promise<Character[]> {
	const result: Character[] = [];

	try {
		let data: APIResponse = await fetchFromURL(url);

		while (data) {
			const characters: Character[] = mapDataToCharacter(data);

			result.push(...characters); //this concats the created array into result

			if (data.next) {
				data = await fetchFromURL(data.next);
			} else {
				break;
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
	const result: Character[] = [];

	characters.forEach((character) => {
		if (character.gender === gender) {
			result.push(character);
		}
	});
	return result;
}

export function filterWithHeight(characters: Character[]): Character[] {
	const result: Character[] = [];
	characters.forEach((character) => {
		if (character.height !== NO_HEIGHT) {
			result.push(character);
		}
	});
	return result;
}

export function filterNoHeight(characters: Character[]): Character[] {
	const result: Character[] = [];
	characters.forEach((character) => {
		if (character.height === NO_HEIGHT) {
			result.push(character);
		}
	});
	return result;
}

export function extractGender(characters: Character[]): string[] {
	const result: string[] = [];
	characters.forEach((character) => {
		if (result.indexOf(character.gender) === -1) {
			result.push(character.gender);
		}
	});

	return result;
}

export function removeGenderProperty(characters: Character[]): object[] {
	const result: object[] = [];
	characters.forEach((character: Character) => {
		result.push({
			name: character.name,
			height: character.height,
		});
	});
	return result;
}
