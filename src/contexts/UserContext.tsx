import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  name: string;
  email: string;
  setUser: (name: string, email: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState(() => localStorage.getItem("kernel-user-name") || "John Doe");
  const [email, setEmail] = useState(() => localStorage.getItem("kernel-user-email") || "john@kernel.dev");

  const setUser = (n: string, e: string) => {
    setName(n);
    setEmail(e);
    localStorage.setItem("kernel-user-name", n);
    localStorage.setItem("kernel-user-email", e);
  };

  return (
    <UserContext.Provider value={{ name, email, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
