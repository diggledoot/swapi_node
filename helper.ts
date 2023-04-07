export async function fetchFromURL(url: string): Promise<APIResponse> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to pull data from ${url}!`);
  }
  return response.json();
}
