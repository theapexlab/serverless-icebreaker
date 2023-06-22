// basic hello world function with small file size and fast cold start
export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify("hello world")
  };
}
