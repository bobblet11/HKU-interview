import { createWebHistory, createRouter } from "vue-router";

import Login from "../views/Login.vue";
import Teacher from "../views/Teacher.vue";
import Admin from "../views/Admin.vue";
import AddStudent from "../views/addStudent.vue";
import StudentProfile from "../views/StudentProfile.vue";
import AssignTeacher from "../views/AssignTeacher.vue";
import GradeAssignment from "../views/GradeAssignment.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/student/:studentUsername", component: StudentProfile },
  { path: "/teacher/:username", component: Teacher },
  { path: "/admin/:username", component: Admin },
  { path: "/:accountType/:username/studentProfile/:studentUsername", component: StudentProfile},
  { path: "/admin/:username/studentProfile/:studentUsername/assignTeacher", component: AssignTeacher },
  { path: "/teacher/:username/studentProfile/:studentUsername/:submission", component: GradeAssignment},
  { path: "/admin/:username/addStudent", component: AddStudent },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
