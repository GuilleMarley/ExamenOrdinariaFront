import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import { FavButton } from "../islands/FavButton.tsx";

export const VideoUnique: FunctionComponent<{ video: VideoType; id: string }> =
  ({ video, id }) => {
    return (
      <div class="video-detail-container">
        <a href="/videos" class="back-button">← Go Back to List</a>
        <div class="video-frame">
          <iframe
            width="100%"
            height="400px"
            src={`https://www.youtube.com/embed/${video.youtubeid}`}
            title={video.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
          </iframe>
        </div>
        <h2 class="video-detail-title">{video.title}</h2>
        <p class="video-detail-description">{video.description}</p>
        <FavButton video={video} id={id} />
      </div>
    );
  };
