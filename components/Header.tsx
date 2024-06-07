import { FunctionComponent } from "preact";
import { Logout } from "../islands/Logout.tsx";

export const Header: FunctionComponent<{ id: string }> = ({ id }) => {
  return (
    <header class="header-container">
      <div class="header-content">
        <span class="user-name">{id}</span>
        <Logout />
      </div>
    </header>
  );
};
