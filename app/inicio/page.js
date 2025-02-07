import AdminMainComponent from "./components/inicio_admin";
import StudentMainComponent from "./components/inicio_alumno";
import TeacherMainComponent from "./components/inicio_profesor";

export default function MainPage() {
    const user = {
        id: 1,
        role: "teacher"
    }
    return (
        <div>
            {user.role === "admin" && <AdminMainComponent/>}
            {user.role === "teacher" && <TeacherMainComponent/>}
            {user.role === "student" && <StudentMainComponent/>}
        </div>

    );
}