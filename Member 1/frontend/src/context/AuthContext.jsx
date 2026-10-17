import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check saved login when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("healthmate_user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("healthmate_user");
      }
    }

    setLoading(false);
  }, []);

  // SIGN UP
  const signup = ({ name, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();

    const existingAccount = localStorage.getItem(
      `healthmate_account_${cleanEmail}`
    );

    if (existingAccount) {
      return {
        success: false,
        message: "This email is already registered.",
      };
    }

    const account = {
      name: name.trim(),
      email: cleanEmail,
      password,
    };

    // Save account
    localStorage.setItem(
      `healthmate_account_${cleanEmail}`,
      JSON.stringify(account)
    );

    // Automatically login after signup
    const loggedUser = {
      name: account.name,
      email: account.email,
    };

    localStorage.setItem(
      "healthmate_user",
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);

    return {
      success: true,
    };
  };

  // SIGN IN
  const signin = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();

    const savedAccount = localStorage.getItem(
      `healthmate_account_${cleanEmail}`
    );

    if (!savedAccount) {
      return {
        success: false,
        message: "No account found with this email.",
      };
    }

    let account;

    try {
      account = JSON.parse(savedAccount);
    } catch (error) {
      return {
        success: false,
        message: "Unable to read account information.",
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        message: "Incorrect password.",
      };
    }

    const loggedUser = {
      name: account.name,
      email: account.email,
    };

    localStorage.setItem(
      "healthmate_user",
      JSON.stringify(loggedUser)
    );

    setUser(loggedUser);

    return {
      success: true,
    };
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("healthmate_user");
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),

    signup,
    signin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}