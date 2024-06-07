import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import { useState } from "preact/hooks";

export const FavButton: FunctionComponent<{ video: VideoType; id: string }> = (
  { video, id },
) => {
  const [fav, setfav] = useState<boolean>(video.fav);
  const cambiarFav = async (video: VideoType, id: string) => {
    console.log(`https://videoapp-api.deno.dev/${id}/${video.id}`);

    const data = await fetch(
      `https://videoapp-api.deno.dev/fav/${id}/${video.id}`,
      { method: "post", headers: { "Content-Type": "application/json" } },
    );
    if (data.status === 200) {
      setfav(!fav);
      return;
    }
    return;
  };

  return (
    <button class="fav-button" onClick={() => cambiarFav(video, id)}>
      {fav === true ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
};
