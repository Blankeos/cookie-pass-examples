import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: ["http://localhost:3000"],
    credentials: true, // This allows the server to receive cookies from the client
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/cookie", (c) => {
  setCookie(c, "session_id", "12345678", {
    /**
     * For testing purposes.
     */
    httpOnly: true, // can't be accessed by javascript
    secure: false,

    /**
     * For production:
     */
    // secure: true, // https
    // sameSite: "Lax" // POST cross-site is not allowed.
  });

  return c.text("Cookie `session_id` is set");
});

app.get("test-cookie", (c) => {
  const session_id = getCookie(c, "session_id");

  setCookie(c, "Access-Control-Allow-Credentials", "true");

  if (session_id) {
    return c.text(
      `Cookie \`session_id\` is FOUND from ${
        c.req.header("origin") ?? "undefined (Another Server)"
      }.`
    );
  }

  return c.text(
    `Cookie \`session_id\` is NOT FOUND from ${
      c.req.header("origin") ?? "undefined (Another Server)"
    }.`
  );
});

app.get("delete-cookie", (c) => {
  deleteCookie(c, "session_id");

  return c.text("Deleted cookie `session_id`.");
});

const port = 4001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
