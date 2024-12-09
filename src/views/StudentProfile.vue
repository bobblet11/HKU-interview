<template>
	<div class="full-w" v-if="currentUser.accountType === 'student'">
		<button class="back-button" @click="handleLogout">Logout</button>
	</div>

	<div class="full-w" v-if="currentUser.accountType !== 'student'">
		<button class="back-button" @click="goBack">Back</button>
	</div>

	<main>
		<article v-if="currentUser.accountType === 'student'">
			<div class="student-profile">
				<h1 class="profile-title">Student Profile</h1>
				<div class="profile-info">
					<p><strong>Username:</strong> {{ studentUsername }}</p>
					<p><strong>Assigned Teacher:</strong> {{ assignedTeacher }}</p>
				</div>
				<p><strong>Average Grade:</strong> {{ averageGrade }}</p>
				<div class="assignments">
					<h2>Reports</h2>
					<AssingmentRow name='progress report' :submission_name="progressReport.name"
						:grade="progressReport.grade" />
					<AssingmentRow name='final report' :submission_name="finalReport.name"
						:grade="finalReport.grade" />
				</div>
			</div>
		</article>

		<article v-if="currentUser.accountType === 'teacher'">
			<div class="student-profile">
				<h1 class="profile-title">Student Profile</h1>
				<div class="profile-info">
					<p><strong>Username:</strong> {{ studentUsername }}</p>
					<p><strong>Assigned Teacher:</strong> You</p>
				</div>
				<p><strong>Average Grade:</strong> {{ averageGrade }}</p>
				<div class="assignments">
					<h2>Reports</h2>
					<AssingmentRow name='progress report' :submission_name="progressReport.name"
						:grade="progressReport.grade" />
					<AssingmentRow name='final report' :submission_name="finalReport.name"
						:grade="finalReport.grade" />
				</div>
			</div>
		</article>

		<article v-if="currentUser.accountType === 'admin'">
			<div class="student-profile">
				<h1 class="profile-title">Student Profile</h1>
				<div class="profile-info">
					<p><strong>Username:</strong> {{ studentUsername }}</p>
					<p><strong>Assigned Teacher:</strong> {{ assignedTeacher }}</p>
					<button v-if="assignedTeacher === 'no teacher assigned'"
						class="assign-teacher-button" @click="handleAssignTeacher">
						Assign Teacher
					</button>
				</div>
				<p><strong>Average Grade:</strong> {{ averageGrade }}</p>
				<div class="assignments">
					<h2>Reports</h2>
					<AssingmentRow name='progress report' :submission_name="progressReport.name"
						:grade="progressReport.grade" />
					<AssingmentRow name='final report' :submission_name="finalReport.name"
						:grade="finalReport.grade" />
				</div>
			</div>
		</article>
	</main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { currentUser, students, logout } from '../backend/accountManager';
import router from '../router/index';
import AssingmentRow from '../components/AssingmentRow.vue';

const handleLogout = () => {
	logout()
	router.push({ path: `/` });
}

const studentUsername = router.currentRoute.value.params.studentUsername;
const student = ref(students[studentUsername]);

const assignedTeacher = computed(() => {
	return !student.value.assignedTeacher ? 'no teacher assigned' : student.value.assignedTeacher;
});

const progressReport = computed(() => {
	return !student.value.progressReport ? { grade: 'not submitted' } : student.value.progressReport;
});

const finalReport = computed(() => {
	return !student.value.finalReport ? { grade: 'not submitted' } : student.value.finalReport;
});

const goBack = () => {
	router.back();
};

const handleAssignTeacher = () => {
	router.push(`/admin/${currentUser['username']}/studentProfile/${studentUsername}/assignTeacher`);
};

const averageGrade = computed(() => {
	const grades = [];
	let total = 0;

	if (student.value.progressReport && student.value.progressReport.grade !== 'not submitted' && student.value.progressReport.grade !== 'not graded') {
		grades.push(student.value.progressReport.grade);
		total += student.value.progressReport.total;
	}
	if (student.value.finalReport && student.value.finalReport.grade !== 'not submitted' && student.value.finalReport.grade !== 'not graded') {
		grades.push(student.value.finalReport.grade);
		total += student.value.finalReport.total;
	}

	if (grades.length === 0) return 'not available';
	const sum = grades.reduce((sum, grade) => sum + parseFloat(grade), 0);
	return ((sum / total) * 100).toFixed(1) + "%"; // Return average grade rounded to 1 decimal place
});
</script>

<style scoped>
.full-w {
	width: 100%;
	margin-bottom: 20px;
	/* Space below the button */
}

.student-profile {
	max-width: 600px;
	margin: 0 auto;
	padding: 30px;
	/* Increased padding */
	background-color: #1e1e1e;
	/* Dark background for the profile */
	border-radius: 8px;
	/* Rounded corners */
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	/* More pronounced shadow */
	color: white;
	/* White text for readability */
}

.profile-title {
	font-size: 2rem;
	/* Larger title font size */
	margin-bottom: 20px;
	/* Space below the title */
}

.profile-info {
	margin-bottom: 20px;
	font-size: 1.2rem;
	/* Larger font size for profile info */
}

.assignments {
	margin-top: 30px;
	/* More space above assignments */
}

h2 {
	font-size: 1.5rem;
	/* Larger font size for subheadings */
	color: #ccc;
	/* Light gray for headings */
}

.assign-teacher-button {
	padding: 15px 20px;
	/* Increased padding for better touch targets */
	border: none;
	/* Remove default border */
	border-radius: 8px;
	/* Rounded corners */
	background-color: #28a745;
	/* Green button */
	color: white;
	/* Button text color */
	cursor: pointer;
	/* Pointer cursor on hover */
	transition: background-color 0.3s;
	/* Smooth background transition */
	font-size: 1.2rem;
	/* Larger font size */
}

.assign-teacher-button:hover {
	background-color: #218838;
	/* Darker green on hover */
}
</style>