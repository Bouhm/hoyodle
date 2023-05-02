export default function useApi() {
  const baseUrl = "http://localhost:8080/api/v1/";

  function post(url: string, body: any) {
    fetch(baseUrl + url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  return {
    post
  }
}