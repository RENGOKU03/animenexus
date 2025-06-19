import { useState, useEffect } from "react";
import { account } from "../lib/appwrite";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setCurrentUser(user);
      } catch (err) {
        setUserError("Please log in to save chat history.");
      }
    };
    fetchUser();
  }, []);

  return { currentUser, userError };
};
