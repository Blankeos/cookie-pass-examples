<script>
  let { data } = $props();

  let cookieResult = $state("");
  let testCookieResult = $state("");
  let deleteCookieResult = $state("");

  function onCookieClick() {
    cookieResult = "Loading...";

    fetch("http://localhost:4001/cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/text",
        "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        Origin: "http://localhost:3000",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        cookieResult = data;
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        cookieResult = `Failed: ${error}.`;
      });
  }

  function onTestCookieClick() {
    testCookieResult = "Loading...";

    fetch("http://localhost:4001/test-cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/text",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        testCookieResult = data;
      })
      .catch((error) => {
        console.error("Error:", error);
        testCookieResult = `Failed: ${error}.`;
      });
  }

  function onDeleteCookie() {
    fetch("http://localhost:4001/delete-cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      headers: {
        "Content-Type": "application/text",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        deleteCookieResult = data;
      })
      .catch((error) => {
        console.error("Error:", error);
        deleteCookieResult = `Failed: ${error}.`;
      });
  }
</script>

<h1>Cookie Pass</h1>

<hr />

<div>
  <button onclick={onCookieClick}>/cookie (client)</button>
  <br />
  <p>Sets the `session_id` cookie on your browser.</p>
  <p>Result: {cookieResult}</p>
</div>

<hr />

<div>
  <button onclick={onTestCookieClick}>/test-cookie (client)</button>
  <br />
  <p>Gets the `session_id` cookie on your browser.</p>
  <p>Result: {testCookieResult}</p>
</div>

<hr />

<div>
  <button disabled>/test-cookie (server)</button>
  <span>(Called on page load)</span>
  <p>
    Calls the /test-cookie endpoint on the Svelte backend via the load function
    from +page.server.ts.
  </p>
  <p>Result: {data?.testCookie}</p>
</div>

<hr />

<div>
  <button onclick={onDeleteCookie}>/delete-cookie (client)</button>
  <br />
  <p>Gets the `session_id` cookie on your browser.</p>
  <p>Result: {deleteCookieResult}</p>
</div>
