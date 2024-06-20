import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useApi from "../hooks/useApi";
import { useEffect } from "react";
import MySnackbar from "../global/MySnackbar";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const LOCAL_DATA_KEY = "userData";
  const { getItem, setItem } = useLocalStorage();
  const [user, setUser] = useState(getItem(LOCAL_DATA_KEY));
  const { post: signInPost, data: signInData, error: signInError } = useApi();

  const saveUser = (newUser) => {
    setUser(newUser);
    setItem(LOCAL_DATA_KEY, newUser);
  };
  const signIn = (body) => {
    signInPost("/auth/signin", body);
  };
  useEffect(() => {
    if (signInData?.message === "success") {
      saveUser(signInData.userdata);
    }
  }, [signInData]);

  useEffect(() => {
    if (signInError) {
      setErrorSnackbarMessage(signInError);
      setOpenErrorSnackbar(true);
    }
  }, [signInError]);

  const signOut = () => {
    setUser(null);
    setItem(LOCAL_DATA_KEY, null);
  };

  const getRole = () => {
    return user?.role;
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, getRole }}>
      <MySnackbar
        severity="error"
        content={errorSnackbarMessage}
        open={openErrorSnackbar}
        handleClose={() => {
          setOpenErrorSnackbar(false);
        }}
      />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
