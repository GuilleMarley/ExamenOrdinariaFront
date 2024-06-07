import jwt from "jsonwebtoken";
import { setCookie } from "$std/http/cookie.ts";
import {
  FreshContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import { LoginForm } from "../components/LoginForm.tsx";
import { UserInfo } from "./_middleware.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const form = await req.formData();

    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();

    const response = await fetch(`${Deno.env.get("API_URL")}/checkuser`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.status !== 200) {
      return ctx.render("Incorrect credentials or user does not exist");
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

export default function Page(props: PageProps<string, UserInfo>) {
  return <LoginForm error={props.data} />;
}
