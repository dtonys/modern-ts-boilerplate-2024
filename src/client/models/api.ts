function timeout(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default {
  async test() {
    const response: Response = await fetch('/api/test');
    const json = (await response.json()) as unknown;
    console.log(json); // eslint-disable-line no-console
  },
  async echo(str: string) {
    const response: Response = await fetch('/api/echo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: str }),
    });
    const json = (await response.json()) as unknown;
    return json;
  },
};
