import { describe, expect, test, jest } from "@jest/globals";
import { fetchFromURL } from "./helper";
import { SWAPI_PEOPLE_ENDPOINT } from "./app";

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
