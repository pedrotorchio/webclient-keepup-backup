import axios from 'axios';

describe("Async", () => {
  let data;
      data = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  it("fetches data", async () => {
    expect(data).toBeTruthy();
    expect(data).
  });

});
