<template>
	<div class="full-w">
		<button class="back-button" @click="handleLogout">Logout</button>
	</div>

	<h1 class="admin-title">Hello Teacher</h1>
	<div class="center">
		<section class="table col">
			<section class="table-header">
				<div class="header-item">Student</div>
				<div class="header-item">Average Grade</div>
				<div class="header-item">Submissions</div>
			</section>
			<section class="table-body">
				<div v-for="(student, key) in studentList" :key="key">
					<StudentRowForTeacher :username="student.username" />
				</div>
			</section>
		</section>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { currentUser, students, logout } from '../backend/accountManager';
import StudentRowForTeacher from '../components/StudentRowForTeacher.vue';
import router from '../router/index';

const studentList = computed(() => {
	return Object.entries(students).reduce((acc, [key, value]) => {
		if (value.assignedTeacher === currentUser.username) {
			acc[key] = value;
		}
		return acc;
	}, {});
});

const handleLogout = () => {
	logout()
	router.push({ path: `/` });
}

</script>

<style scoped>
.admin-title {
	text-align: center;
	/* Center the main title */
	color: #fff;
	/* White text for visibility */
	margin-bottom: 20px;
	/* Space below the title */
	margin-top: 10rem;
}

.center {
	display: flex;
	/* Flexbox for centering */
	justify-content: center;
	/* Center content */
}

.table {
	max-width: 800px;
	/* Limit the max width of the table */
	width: 100%;
	/* Full width */
	background-color: #1e1e1e;
	/* Dark background for the table */
	border-radius: 8px;
	/* Rounded corners */
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	/* Subtle shadow */
}

.table-header {
	height: 4rem;
	/* Height of the header */
	display: flex;
	/* Flexbox layout */
	justify-content: space-between;
	/* Space between header items */
	align-items: center;
	/* Center items vertically */
	background-color: #2a2a2a;
	/* Darker header background */
	border-top-left-radius: 8px;
	/* Rounded corners */
	border-top-right-radius: 8px;
	/* Rounded corners */
}

.header-item {
	color: #bbb;
	/* Light gray for header text */
	font-weight: bold;
	/* Bold text for better visibility */
	flex: 1;
	/* Allow items to grow */
	text-align: center;
	/* Center text */
}

.table-body {
	padding: 10px;
	/* Padding for the table body */
	display: flex;
	flex-direction: column;
	/* Stack rows vertically */
}

.table-body>div {
	margin: 0.5rem 0;
	/* Space between student rows */
}
</style>