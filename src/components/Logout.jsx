import { account } from "../lib/appwrite";

const Logout = () => {
  return (
    <div>
      <button
        onClick={async () => {
          await account.deleteSession("current");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
