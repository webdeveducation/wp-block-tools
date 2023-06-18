export const query = async (wpGraphQlUrl: string, queryString: string) => {
  const response = await fetch(`${wpGraphQlUrl}/?query=${queryString}`);
  const json = await response.json();
  return json;
};
