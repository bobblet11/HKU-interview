<template>

	<div class="full-w">
		<button class="back-button" @click="handleLogout">Logout</button>
	</div>


	<article class="admin-container">

		<div class="center">
			<h1>Hello Admin</h1>
			<section class="table">
				<section class="table-header">
					<div class="header-item">Student</div>
					<div class="header-item">Assigned Teacher</div>
					<div class="header-item">Average Grade</div>
					<div class="quarter-width">
						<button class="add-student-button" @click="handleAddStudent">
							Add Student
						</button>
					</div>
				</section>
				<section class="table-body">
					<div v-for="(student, index) in studentList" :key="index">
						<StudentRow :username="student.username" />
					</div>
				</section>
			</section>
		</div>
	</article>
</template>

<script setup>
import { computed } from 'vue';
import { currentUser, students, logout } from '../backend/accountManager';
import router from '../router/index';
import StudentRow from '../components/StudentRow.vue';

// Computed property to access students reactively
const studentList = computed(() => students);

// Handle adding a student
const handleAddStudent = () => {
	if (currentUser.accountType === "admin") {
		router.push({ path: `/admin/${currentUser.username}/addStudent` });
	}
};

const handleLogout = () => {
	logout()
	router.push({ path: `/` });
}

</script>

<style scoped>
.admin-container {
	max-width: 80vw;
	/* Increased max width of the container */
	/* Center the container */
	color: white;
	/* White text for readability */
	font-size: 18px;
	/* Increased default font size */
	margin: 0 auto;
	margin-top: 10rem;
}

.center {
	display: flex;
	justify-content: center;
	flex-direction: column;
	/* Center the table */
	/* Full width */
	text-align: center;
}

.table {
	/* Full width for the table */
	background-color: #1e1e1e;
	/* Darker table background */
	border-radius: 10px;
	/* Rounded corners */
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	/* Subtle shadow */
	display: flex;
	flex-direction: column;
}

.table-header {
	height: 4rem;
	/* Increased height for the header */
	display: flex;
	/* Use flexbox for layout */
	justify-content: space-around;
	/* Space between header items */
	align-items: center;
	/* Center items vertically */
	/* Padding for better spacing */
	background-color: #2a2a2a;
	/* Darker header background */
	border-top-left-radius: 10px;
	/* Rounded corners */
	border-top-right-radius: 10px;
	/* Rounded corners */
}

.header-item {
	flex: 1;
	/* Allow divs to grow equally */
	text-align: center;
	/* Center text horizontally */
	color: #bbb;
	/* Light gray for header text */
	font-weight: bold;
	/* Bold text for better visibility */
}

.table-body {
	/* Padding for the table body */
	display: flex;
	flex-direction: column;
	flex-grow: 1;

	/* Ensure rows stack vertically */
}

.quarter-width {
	width: 25%;
	/* Set to 25% for proper sizing */
	display: flex;
	/* Allow flexbox for the button */
}

.add-student-button {
	flex-grow: 1;
	/* Allow the button to grow */
	margin-left: 1rem;
	margin-right: 1rem;
	padding: 10px;
	/* Add padding for better touch targets */
	border: none;
	/* Remove default border */
	border-radius: 5px;
	/* Rounded corners */
	background-color: #007bff;
	/* Blue button */
	color: white;
	/* Button text color */
	font-size: 16px;
	/* Font size */
	cursor: pointer;
	/* Pointer cursor on hover */
	transition: background-color 0.3s;
	/* Smooth background transition */
}

.add-student-button:hover {
	background-color: #0056b3;
	/* Darker blue on hover */
}
</style>