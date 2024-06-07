import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { getCookies } from "$std/http/cookie.ts";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserInfo = Omit<User, "password">;

export const handler = async (req: Request, ctx: FreshContext<UserInfo>) => {
  if (ctx.destination !== "route") {
    return await ctx.next();
  }
  if (ctx.route === "/login" || ctx.route === "/register") {
    return await ctx.next();
  }

  const { auth } = getCookies(req.headers);
  if (!auth) {
    return new Response("", {
      status: 307,
      headers: { location: "/login" },
    });
  }

  const payload = jwt.verify(auth, Deno.env.get("JWTSecret"));
  if (!payload) {
    return new Response("", {
      status: 307,
      headers: { location: "/login" },
    });
  }

  ctx.state = payload;
  return await ctx.next();
};
