import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoUnique } from "../../components/VideoUnique.tsx";
import { VideoType } from "../../types.ts";
import { UserInfo } from "../_middleware.tsx";

export const handler: Handlers<VideoType, UserInfo> = {
  GET: async (req: Request, ctx: FreshContext<UserInfo, VideoType>) => {
    const response = await fetch(
      `${Deno.env.get("API_URL")}/video/${ctx.state.id}/${ctx.params.id}`,
    );
    const video = await response.json();
    return ctx.render(video);
  },
};

export default function Page(props: PageProps<VideoType, UserInfo>) {
  return <VideoUnique video={props.data} id={props.state.id} />;
}
