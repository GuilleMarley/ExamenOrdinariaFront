import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoList } from "../components/VideoList.tsx";
import { UserInfo } from "../routes/_middleware.tsx";
import { VideoType } from "../types.ts";

type Data = {
  videos: VideoType[];
  id: string;
};

export const handler: Handlers<Data, UserInfo> = {
  GET: async (_req: Request, ctx: FreshContext<UserInfo, Data>) => {
    const id = ctx.state.id;
    console.log(`${Deno.env.get("API_URL")}/${id}`);

    const data = await fetch(
      `${Deno.env.get("API_URL")}/videos/${ctx.state.id}`,
    );

    const videos = await data.json();

    return ctx.render({ videos, id });
  },
};

export default function Page(props: PageProps<Data, UserInfo>) {
  return <VideoList videos={props.data.videos} id={props.data.id} />;
}
