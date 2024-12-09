import { reactive } from "vue";

const dbName = "SchoolDB";
const dbVersion = 1;
let db;

// Original data
const initialAccounts = {
  admin: { username: "admin", password: "admin", accountType: "admin" },
  u4820193: { username: "u4820193", password: "1234", accountType: "student" },
  u7614382: { username: "u7614382", password: "1234", accountType: "student" },
  u2945761: { username: "u2945761", password: "1234", accountType: "student" },
  u8371204: { username: "u8371204", password: "1234", accountType: "student" },
  u1509837: { username: "u1509837", password: "1234", accountType: "student" },
  Mei_Ling_Chan: { username: "Mei_Ling_Chan", password: "1234", accountType: "teacher" },
  David_Wong: { username: "David_Wong", password: "1234", accountType: "teacher" },
  Sophia_Lam: { username: "Sophia_Lam", password: "1234", accountType: "teacher" },
  Eric_Yip: { username: "Eric_Yip", password: "1234", accountType: "teacher" },
  Anita_Cheung: { username: "Anita_Cheung", password: "1234", accountType: "teacher" },
};

const initialStudents = {
  u4820193: { username: "u4820193", assignedTeacher: "no teacher assigned", progressReport: null, finalReport: null, submissions: [] },
  u7614382: { username: "u7614382", assignedTeacher: "no teacher assigned", progressReport: null, finalReport: null, submissions: [] },
  u2945761: { username: "u2945761", assignedTeacher: "no teacher assigned", progressReport: null, finalReport: null, submissions: [] },
  u8371204: { username: "u8371204", assignedTeacher: "no teacher assigned", progressReport: null, finalReport: null, submissions: [] },
  u1509837: { username: "u1509837", assignedTeacher: "no teacher assigned", progressReport: null, finalReport: null, submissions: [] },
};

const initialTeachers = {
  Mei_Ling_Chan: { username: "Mei_Ling_Chan", assignedStudents: [] },
  David_Wong: { username: "David_Wong", assignedStudents: [] },
  Sophia_Lam: { username: "Sophia_Lam", assignedStudents: [] },
  Eric_Yip: { username: "Eric_Yip", assignedStudents: [] },
  Anita_Cheung: { username: "Anita_Cheung", assignedStudents: [] },
};

// Reactive state declarations
export const accounts = reactive({ ...initialAccounts });
export const students = reactive({ ...initialStudents });
export const teachers = reactive({ ...initialTeachers });
export const currentUser = reactive({});

// Open IndexedDB
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore("accounts", { keyPath: "username" });
      db.createObjectStore("students", { keyPath: "username" });
      db.createObjectStore("teachers", { keyPath: "username" });
      db.createObjectStore("currentUser", { keyPath: "id" });
      console.log("Database setup complete.");
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Load account state from IndexedDB
const loadAccountState = async () => {
  await openDB();

  const transaction = db.transaction(["accounts", "students", "teachers", "currentUser"], "readonly");
  const accountsStore = transaction.objectStore("accounts");
  const studentsStore = transaction.objectStore("students");
  const teachersStore = transaction.objectStore("teachers");
  const currentUserStore = transaction.objectStore("currentUser");

  const accountsRequest = accountsStore.getAll();
  const studentsRequest = studentsStore.getAll();
  const teachersRequest = teachersStore.getAll();
  const currentUserRequest = currentUserStore.get("currentUser");

  accountsRequest.onsuccess = () => {
    accountsRequest.result.forEach(account => {
      accounts[account.username] = account;
    });
    console.log("Accounts loaded:", accounts);
  };

  studentsRequest.onsuccess = () => {
    studentsRequest.result.forEach(student => {
      students[student.username] = student;
    });
    console.log("Students loaded:", students);
  };

  teachersRequest.onsuccess = () => {
    teachersRequest.result.forEach(teacher => {
      teachers[teacher.username] = teacher;
    });
    console.log("Teachers loaded:", teachers);
  };

  currentUserRequest.onsuccess = () => {
    if (currentUserRequest.result) {
      Object.assign(currentUser, currentUserRequest.result);
      console.log("Current user loaded:", currentUser);
    }
  };

  // Initialize with original data if no data exists
  if (Object.keys(accounts).length === 0) {
    Object.assign(accounts, initialAccounts);
    console.log("Initialized accounts with default data.");
  }
  if (Object.keys(students).length === 0) {
    Object.assign(students, initialStudents);
    console.log("Initialized students with default data.");
  }
  if (Object.keys(teachers).length === 0) {
    Object.assign(teachers, initialTeachers);
    console.log("Initialized teachers with default data.");
  }
};

// Utility to create a deep copy of an object
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Delay function
const delaySave = (time) => new Promise(resolve => setTimeout(resolve, time));

// Save account state to IndexedDB
const saveAccountState = async () => {
  await delaySave(100); // Delay for 100ms to allow UI to update

  await openDB(); // Ensure the database is open

  const transaction = db.transaction(["accounts", "students", "teachers", "currentUser"], "readwrite");
  const accountsStore = transaction.objectStore("accounts");
  const studentsStore = transaction.objectStore("students");
  const teachersStore = transaction.objectStore("teachers");
  const currentUserStore = transaction.objectStore("currentUser");

  // Clear existing data
  accountsStore.clear();
  studentsStore.clear();
  teachersStore.clear();
  currentUserStore.clear();

  // Create deep copies of the data
  const accountsToSave = deepCopy(Object.values(accounts));
  const studentsToSave = deepCopy(Object.values(students));
  const teachersToSave = deepCopy(Object.values(teachers));

  accountsToSave.forEach(account => {
    const request = accountsStore.add(account);
    request.onsuccess = () => {
      console.log(`Account saved: ${account.username}`);
    };
    request.onerror = (event) => {
      console.error(`Error saving account: ${event.target.error}`);
    };
  });

  studentsToSave.forEach(student => {
    const request = studentsStore.add(student);
    request.onsuccess = () => {
      console.log(`Student saved: ${student.username}`);
    };
    request.onerror = (event) => {
      console.error(`Error saving student: ${event.target.error}`);
    };
  });

  teachersToSave.forEach(teacher => {
    const request = teachersStore.add(teacher);
    request.onsuccess = () => {
      console.log(`Teacher saved: ${teacher.username}`);
    };
    request.onerror = (event) => {
      console.error(`Error saving teacher: ${event.target.error}`);
    };
  });

  // Save current user only if it has data
  if (Object.keys(currentUser).length > 0) {
    const request = currentUserStore.put({ id: "currentUser", ...deepCopy(currentUser) });
    request.onsuccess = () => {
      console.log("Current user saved:", currentUser);
    };
    request.onerror = (event) => {
      console.error(`Error saving current user: ${event.target.error}`);
    };
  } else {
    console.log("No current user to save.");
  }

  console.log("Data save operation initiated.");
};

// Save PDF files
export const savePDF = (studentUsername, file) => {
  const transaction = db.transaction("students", "readwrite");
  const studentsStore = transaction.objectStore("students");

  studentsStore.get(studentUsername).onsuccess = (event) => {
    const student = event.target.result;

    if (!student.submissions) {
      student.submissions = [];
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      student.submissions.push({ name: file.name, data: reader.result });
      studentsStore.put(student);
      saveAccountState(); // Save state after updating
    };
    reader.readAsArrayBuffer(file);
  };
};

// Check Login
export const checkLogin = (username, password) => {
  for (let [u, data] of Object.entries(accounts)) {
    if (username === u && password === data.password) {
      Object.assign(currentUser, accounts[username]); // Ensure currentUser is reactive
      saveAccountState(); // Update currentUser in IndexedDB
      return true;
    }
  }
  return false;
};

// Logout
export const logout = () => {
  Object.assign(currentUser, {}); // Clear currentUser
  saveAccountState();
};

// Insert Account
export const insertAccount = (username, password, accountType) => {
  if (accounts[username]) {
    alert("User already exists");
    return;
  }

  accounts[username] = { username, password, accountType };

  if (accountType === "student") {
    students[username] = {
      username,
      assignedTeacher: "no teacher assigned",
      progressReport: null,
      finalReport: null,
      submissions: [],
    };
  }

  if (accountType === "teacher") {
    teachers[username] = { username, assignedStudents: [] };
  }
  
  alert("Successfully inserted account");
  saveAccountState();
};

// Assign Teacher
export const assignTeacher = (studentUsername, teacherUsername) => {
  students[studentUsername].assignedTeacher = teacherUsername;
  if (!teachers[teacherUsername].assignedStudents) {
    teachers[teacherUsername].assignedStudents = [];
  }
  teachers[teacherUsername].assignedStudents.push(studentUsername);
  saveAccountState();
};

// Set Grade
export const setGrade = (studentUsername, grade, isProgressReport) => {
  if (isProgressReport) {
    students[studentUsername].progressReport = { grade, total: 100 };
  } else {
    students[studentUsername].finalReport = { grade, total: 100 };
  }
  saveAccountState();
};

// Submit Assignment
export const submitAssignment = (studentUsername, data, filename, isProgressReport) => {
  if (isProgressReport) {
    students[studentUsername].progressReport = {
      grade: "not graded",
      name: filename,
      data,
      total: 100,
    };
  } else {
    students[studentUsername].finalReport = {
      grade: "not graded",
      name: filename,
      data,
      total: 100,
    };
  }
  saveAccountState();
};

// Load initial account state
loadAccountState();