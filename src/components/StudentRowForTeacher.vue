<template>
	<section @click="handleStudentPage" class="table-header clickable">
		<div class="username">{{ username }}</div>
		<div class="average-grade">{{ averageGrade }}</div>
		<div class="submissions">{{ submissions }}</div>
	</section>
</template>

<script setup>
import router from '../router/index';
import { currentUser, students } from '../backend/accountManager';
import { ref, computed } from 'vue';

const props = defineProps({
	username: {
		required: true,
	},
});

const handleStudentPage = () => {
	router.push({ path: `/${currentUser.accountType}/${currentUser.username}/studentProfile/${props.username}` });
};

const student = ref(students[props.username]);

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

	if (grades.length === 0) return 'N/A';

	const sum = grades.reduce((sum, grade) => sum + parseFloat(grade), 0);
	return ((sum / parseFloat(total)) * 100).toFixed(1) + "%";
});

const submissions = computed(() => {
	let count = 0;

	if (student.value.progressReport && student.value.progressReport.grade !== 'not submitted') {
		count += 1;
	}

	if (student.value.finalReport && student.value.finalReport.grade !== 'not submitted') {
		count += 1;
	}

	return `${count} / 2`;
});
</script>

<style scoped>
.table-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	background-color: #1e1e1e;
	/* Dark background for contrast */
	color: #ccc;
	/* Light gray text */
	border-bottom: 1px solid #444;
	/* Subtle bottom border */
	cursor: pointer;
	/* Indicate clickable area */
	transition: background-color 0.3s;
	/* Smooth background transition */
}

.table-header:hover {
	background-color: #2a2a2a;
	/* Darker background on hover */
}

.username,
.average-grade,
.submissions {
	flex: 1;
	/* Allow each column to grow equally */
	text-align: center;
	/* Center text */
}

.average-grade {
	font-weight: bold;
	/* Bold for emphasis */
}

.submissions {
	color: #ffc107;
	/* Yellow for submissions count */
}
</style>