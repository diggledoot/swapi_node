import { describe, expect, test } from "@jest/globals";
import { fetchFromURL } from "../src/helper";
import { SWAPI_PEOPLE_ENDPOINT } from "../src/app";

describe("helper module", () => {
  test("get a success response from fetchFromURL", async () => {
    const data = await fetchFromURL(SWAPI_PEOPLE_ENDPOINT);
    expect(data.count).toBe(82);
  });

  test("get a fail response from fetchFromURL", async () => {
    const url = "http://example.com/api/endpoint/";
    try {
      await fetchFromURL(url);
    } catch (error) {
      expect(error).toEqual(new Error(`Failed to pull data from ${url}!`));
    }
  });
});
