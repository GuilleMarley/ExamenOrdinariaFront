import { FunctionComponent } from "preact";
import { VideoType } from "../types.ts";
import { FavButton } from "../islands/FavButton.tsx";

type Data = {
  videos: VideoType[];
  id: string;
};

export const VideoList: FunctionComponent<Data> = ({ videos, id }) => {
  return (
    <div class="video-page-container">
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      <div class="video-list-container">
        {videos.map((video: VideoType) => {
          return (
            <div class="video-item" data-fresh-key={video.id}>
              <a href={`/video/${video.id}`} class="video-link">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  class="video-thumbnail"
                />
                <div class="video-info">
                  <h3 class="video-title">{video.title}</h3>
                  <p class="video-description">{video.description}</p>
                  <p class="video-release-date">Release date: {video.date}</p>
                </div>
              </a>
              <FavButton video={video} id={id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
