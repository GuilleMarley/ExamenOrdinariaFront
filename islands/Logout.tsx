import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";

export const Logout: FunctionComponent = () => {
  const whipeCookie = () => {
    document.cookie = "auth=;";
    return;
  };
  return (
    <>
      <a href="/login" class="logout-button" onClick={(e) => whipeCookie()}>
        Logout
      </a>
    </>
  );
};
