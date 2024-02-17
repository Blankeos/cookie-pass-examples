import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (c) => {
  const cookies = c.request.headers.get("cookie");
  console.log("my cookies", cookies);

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/text");
  if (cookies) requestHeaders.append("Cookie", cookies);

  const response = await fetch("http://127.0.0.1:4001/test-cookie", {
    method: "GET",
    credentials: "include", // Include cookies in the request
    headers: requestHeaders,
  });

  if (response.ok) {
    const data = await response.text();
    return {
      status: response.status,
      testCookie: data,
    };
  }

  console.error("Error fetching data:", response.statusText);

  return {
    status: response.status,
    error: new Error(response.statusText),
  };
};
