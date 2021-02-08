import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../misc/firebase";
import { collectIdsAndDocs } from "../utils/utils";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let authUnsubscribe = null;
  let userRef = null;

  useEffect(() => {
    authUnsubscribe = auth.onAuthStateChanged((authObj) => {
      setIsLoading(true);
      if (authObj) {
        //   Logged in
        userRef = db
          .collection("profiles")
          .doc(authObj.uid)
          .onSnapshot((snapshot) => {
            const profileData = collectIdsAndDocs(snapshot);
            setProfile(profileData);
            setIsLoading(false);
          });
      } else {
        // Sign out

        setProfile(null);
        setIsLoading(false);
      }
    });
    return () => {
      authUnsubscribe();
      userRef();
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
