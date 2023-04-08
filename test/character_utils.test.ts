import { describe, expect, test } from "@jest/globals";
import {
  extractGender,
  filterNoHeight,
  filterWithHeight,
  getCharacters,
  mapDataToCharacter,
  removeGenderProperty,
  sortGender,
} from "../src/character_utils";
import { APIResponse, Character } from "../src/models";

const MOCK_INPUT: Character[] = [
  {
    name: "Lila",
    height: "170",
    gender: "female",
  },
  {
    name: "Billy",
    height: "unknown",
    gender: "male",
  },
];

describe("character_utils module", () => {
  test("test mapDataToCharacter return results", () => {
    const mockAPIResponse: APIResponse = {
      count: 1,
      next: "",
      previous: "",
      results: [
        {
          name: "Luke Skywalker",
          height: "172",
          mass: "77",
          hair_color: "blond",
          skin_color: "fair",
          eye_color: "blue",
          birth_year: "19BBY",
          gender: "male",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/",
          ],
          species: [],
          vehicles: [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/",
          ],
          starships: [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/",
          ],
          created: "2014-12-09T13:50:51.644000Z",
          edited: "2014-12-20T21:17:56.891000Z",
          url: "https://swapi.dev/api/people/1/",
        },
      ],
    };
    const expectedResponse: Character[] = [
      {
        name: "Luke Skywalker",
        height: "172",
        gender: "male",
      },
    ];

    const result = mapDataToCharacter(mockAPIResponse);
    expect(result).toStrictEqual(expectedResponse);
  });

  test("test mapDataToCharacter return no results", () => {
    const mockAPIResponse: APIResponse = {
      count: 0,
      next: "",
      previous: "",
      results: [],
    };
    const expectedResponse: Character[] = [];

    const result = mapDataToCharacter(mockAPIResponse);
    expect(result).toStrictEqual(expectedResponse);
  });

  //This one will show a console.error but that is expected
  test("test getCharacter fail response", async () => {
    const url = "http://example.com/api/endpoint/";
    const data = await getCharacters(url);
    const expectedOutput: Character[] = [];
    expect(data).toStrictEqual(expectedOutput);
  });

  test("test sortGender", () => {
    const expectedOutput: Character[] = [
      {
        name: "Lila",
        height: "170",
        gender: "female",
      },
    ];

    const result = sortGender(MOCK_INPUT, "female");
    expect(result).toStrictEqual(expectedOutput);
  });

  test("test filterWithHeight", () => {
    const expectedOutput: Character[] = [
      {
        name: "Lila",
        height: "170",
        gender: "female",
      },
    ];

    const result = filterWithHeight(MOCK_INPUT);
    expect(result).toStrictEqual(expectedOutput);
  });

  test("test filterNoHeight", () => {
    const expectedOutput: Character[] = [
      {
        name: "Billy",
        height: "unknown",
        gender: "male",
      },
    ];

    const result = filterNoHeight(MOCK_INPUT);
    expect(result).toStrictEqual(expectedOutput);
  });

  test("test extractGender", () => {
    const expectedOutput: string[] = ["female", "male"];
    const result = extractGender(MOCK_INPUT);
    expect(result).toStrictEqual(expectedOutput);
  });

  test("test removeGenderProperty", () => {
    const expectedOutput: object[] = [
      {
        name: "Lila",
        height: "170",
      },
      {
        name: "Billy",
        height: "unknown",
      },
    ];
    const result = removeGenderProperty(MOCK_INPUT);
    expect(result).toStrictEqual(expectedOutput);
  });
});
