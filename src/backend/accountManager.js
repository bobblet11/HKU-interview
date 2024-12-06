import { reactive } from "vue";

export const checkLogin = (username, password) => {
  for (let [u, data] of Object.entries(accounts)) {
    if (username === u && password == data.password) {
      currentUser = accounts[username];
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      return true;
    }
  }
  return false;
};

export const logout = () => {
  currentUser = undefined;
  saveAccountState();
};

export const insertAccount = (username, password, accountType) => {
  if (accounts[username] !== undefined) {
    alert("user already exists");
    return;
  }

  accounts[username] = { username, password, accountType };

  if (accountType === "student") {
    students[username] = {
      username,
      assignedTeacher: "no teacher assigned",
      progressReport: null,
      finalReport: null,
    };
  }

  if (accountType === "teacher") {
    teachers[username] = { username, assignedStudents: "no student assigned" };
  }
  alert("successfully inserted account");
  saveAccountState();
};

export const assignTeacher = (studentUsername, teacherUsername) => {
  students[studentUsername]["assignedTeacher"] = teacherUsername;
  const teacher = teachers[teacherUsername];
  if (!teacher.assignedStudents) {
    teacher.assignedStudents = [];
  }
  teacher.assignedStudents.push(studentUsername);
  saveAccountState();
};

export const setGrade = (studentUsername, grade, isProgressReport) => {
  if (isProgressReport) {
    students[studentUsername].progressReport.grade = grade;
    students[studentUsername].progressReport.total = 100;
  } else {
    students[studentUsername].finalReport.grade = grade;
    students[studentUsername].finalReport.total = 100;
  }
  saveAccountState();
};

export const submitAssignment = (
  studentUsername,
  data,
  filename,
  isProgressReport
) => {
  if (isProgressReport) {
    students[studentUsername].progressReport = {
      grade: "",
      name: "",
      data: "",
      total: "",
    };
    students[studentUsername].progressReport.grade = "not graded";
    students[studentUsername].progressReport.data = data;
    students[studentUsername].progressReport.name = filename;
  } else {
    students[studentUsername].finalReport = {
      grade: "",
      name: "",
      data: "",
      total: "",
    };
    students[studentUsername].finalReport.grade = "not graded";
    students[studentUsername].finalReport.data = data;
    students[studentUsername].finalReport.name = filename;
  }
  saveAccountState();
};

export let currentUser = reactive({});

const accounts = reactive({
  admin: { username: "admin", password: "admin", accountType: "admin" },

  u4820193: { username: "u4820193", password: "1234", accountType: "student" },
  u7614382: { username: "u7614382", password: "1234", accountType: "student" },
  u2945761: { username: "u2945761", password: "1234", accountType: "student" },
  u8371204: { username: "u8371204", password: "1234", accountType: "student" },
  u1509837: { username: "u1509837", password: "1234", accountType: "student" },

  Mei_Ling_Chan: {
    username: "Mei_Ling_Chan",
    password: "1234",
    accountType: "teacher",
  },
  David_Wong: {
    username: "David_Wong",
    password: "1234",
    accountType: "teacher",
  },
  Sophia_Lam: {
    username: "Sophia_Lam",
    password: "1234",
    accountType: "teacher",
  },
  Eric_Yip: { username: "Eric_Yip", password: "1234", accountType: "teacher" },
  Anita_Cheung: {
    username: "Anita_Cheung",
    password: "1234",
    accountType: "teacher",
  },
});

export const students = reactive({
  u4820193: {
    username: "u4820193",
    assignedTeacher: "no teacher assigned",
    progressReport: null,
    finalReport: null,
  },
  u7614382: {
    username: "u7614382",
    assignedTeacher: "no teacher assigned",
    progressReport: null,
    finalReport: null,
  },
  u2945761: {
    username: "u2945761",
    assignedTeacher: "no teacher assigned",
    progressReport: null,
    finalReport: null,
  },
  u8371204: {
    username: "u8371204",
    assignedTeacher: "no teacher assigned",
    progressReport: null,
    finalReport: null,
  },
  u1509837: {
    username: "u1509837",
    assignedTeacher: "no teacher assigned",
    progressReport: null,
    finalReport: null,
  },
});
export const teachers = reactive({
  Mei_Ling_Chan: {
    username: "Mei_Ling_Chan",
    assignedStudents: null,
  },
  David_Wong: {
    username: "David_Wong",
    assignedStudents: null,
  },
  Sophia_Lam: {
    username: "Sophia_Lam",
    assignedStudents: null,
  },
  Eric_Yip: {
    username: "Eric_Yip",
    assignedStudents: null,
  },
  Anita_Cheung: {
    username: "Anita_Cheung",
    assignedStudents: null,
  },
});

const loadAccountState = () => {
  let storedTeachers = sessionStorage.getItem("teachers");
  let storedUser = sessionStorage.getItem("currentUser");
  let storedAccounts = sessionStorage.getItem("accounts");
  let storedStudents = sessionStorage.getItem("students");
  if (storedTeachers) {
    Object.assign(teachers, reactive(JSON.parse(storedTeachers)));
  }
  if (storedUser) {
    Object.assign(currentUser, reactive(JSON.parse(storedUser)));
  }
  if (storedAccounts) {
    Object.assign(accounts, reactive(JSON.parse(storedAccounts)));
  }
  if (storedStudents) {
    Object.assign(students, reactive(JSON.parse(storedStudents)));
  }
};

loadAccountState();

const saveAccountState = () => {
  sessionStorage.setItem("accounts", JSON.stringify(accounts));
  sessionStorage.setItem("students", JSON.stringify(students));
  sessionStorage.setItem("teachers", JSON.stringify(teachers));
};
