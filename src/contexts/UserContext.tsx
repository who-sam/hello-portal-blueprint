import { createContext, useContext, useState, useMemo, ReactNode } from "react";

interface UserContextType {
  firstName: string;
  middleName: string;
  lastName: string;
  studentId: string;
  email: string;
  /** Full display name derived from first/middle/last */
  name: string;
  setUser: (data: { firstName: string; middleName?: string; lastName: string; email: string; studentId?: string }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function buildName(first: string, middle: string, last: string) {
  return [first, middle, last].filter(Boolean).join(" ");
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [firstName, setFirstName] = useState(() => localStorage.getItem("kernel-user-firstName") || "");
  const [middleName, setMiddleName] = useState(() => localStorage.getItem("kernel-user-middleName") || "");
  const [lastName, setLastName] = useState(() => localStorage.getItem("kernel-user-lastName") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("kernel-user-email") || "");
  const [studentId, setStudentId] = useState(() => localStorage.getItem("kernel-user-studentId") || "");

  const name = useMemo(() => buildName(firstName, middleName, lastName), [firstName, middleName, lastName]);

  const setUser = (data: { firstName: string; middleName?: string; lastName: string; email: string; studentId?: string }) => {
    setFirstName(data.firstName);
    setMiddleName(data.middleName || "");
    setLastName(data.lastName);
    setEmail(data.email);
    setStudentId(data.studentId || "");
    localStorage.setItem("kernel-user-firstName", data.firstName);
    localStorage.setItem("kernel-user-middleName", data.middleName || "");
    localStorage.setItem("kernel-user-lastName", data.lastName);
    localStorage.setItem("kernel-user-email", data.email);
    localStorage.setItem("kernel-user-studentId", data.studentId || "");
  };

  return (
    <UserContext.Provider value={{ firstName, middleName, lastName, studentId, email, name, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
