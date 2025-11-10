import type { AccountProps } from "@utils/types";

const Account = ({ onSignOut }: AccountProps) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>You are logged in.</p>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default Account;
