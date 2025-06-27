import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // New loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUser(true); // Start loading
        const user = await account.get();
        setCurrentUser(user);

        console.log("Current user:", user);
      } catch (err) {
        setUserError("Please log in to save chat history.");
      } finally {
        setLoadingUser(false); // End loading regardless of success/failure
      }
    };
    fetchUser();
  }, []);

  return { currentUser, userError, loadingUser }; // Return loading state
};
