import { APIResponse } from "./models";
export async function fetchFromURL(url: string): Promise<APIResponse> {
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to pull data from ${url}!`);
  }
  return response.json();
}
