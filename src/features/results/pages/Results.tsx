import { useRole } from "@/contexts/RoleContext";
import StudentResults from "./Results.student";
import TeacherResults from "./TeacherResults";

export default function ResultsPage() {
  const { role } = useRole();
  return role === "teacher" ? <TeacherResults /> : <StudentResults />;
}
