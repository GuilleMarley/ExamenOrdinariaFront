import jwt from "jsonwebtoken";
import { setCookie } from "$std/http/cookie.ts";
import { FreshContext, Handlers, RouteConfig } from "$fresh/server.ts";
import { RegisterForm } from "../components/RegisterForm.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const form = await req.formData();

    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const name = form.get("name")?.toString();

    const response = await fetch(`${Deno.env.get("API_URL")}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    });

    if (response.status !== 200) {
      return ctx.render();
    }

    const data = await response.json();
    const token = await jwt.sign(data, Deno.env.get("JWTSecret"));

    const headers = new Headers();
    setCookie(headers, {
      name: "auth",
      value: token,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });
    headers.set("location", "/videos");
    return new Response(null, {
      status: 302,
      headers,
    });
  },
};

export default function Page() {
  return <RegisterForm />;
}
