<template>
	<div class="full-w">
		<button class="back-button" @click="goBack">Back</button>
	</div>

	<div class="grade-submission">
		<h1 class="title">Grade Submission</h1>

		<div class="file-info">
			<p><strong>Submitted File:</strong> {{ submittedFile.name }}</p>
			<button class="download-button" @click="downloadFile">Download File</button>
		</div>

		<div class="grade-input" v-if="canGrade">
			<div class="grade-input-box">
				<label for="grade">Enter Grade:</label>
				<input type="number" id="grade" v-model.number="grade" min="0" max="100"
					placeholder="0-100" />
			</div>
			<button class="submit-button" @click="submitGrade" :disabled="!isValidGrade">Submit
				Grade</button>
		</div>

		<p v-if="submissionStatus" class="status-message">{{ submissionStatus }}</p>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { students, setGrade } from '../backend/accountManager';
import router from '../router/index';

const goBack = () => {
	router.back();
};

const studentUsername = router.currentRoute.value.params.studentUsername;
const assignmentName = router.currentRoute.value.params.submission;
const student = ref(students[studentUsername]); // Make it reactive

const assignment = computed(() => {
	return !student.value.progressReport ? student.value.finalReport : (student.value.progressReport.name === assignmentName ? student.value.progressReport : student.value.finalReport);
});

const submittedFile = ref({
	name: assignment.value.name,
	url: assignment.value.fileData // Replace with the actual file URL
});

const grade = ref(null);
const submissionStatus = ref('');
const canGrade = ref(true);

const isValidGrade = computed(() => {
	return grade.value !== null && grade.value >= 0 && grade.value <= 100;
});

const downloadFile = () => {
	const link = document.createElement('a');
	const fileData = assignment.value.data; // Ensure this is the correct reference
	link.href = fileData.url; // Use the base64 data URL
	link.download = fileData.name; // Set the file name
	document.body.appendChild(link); // Append the link to the body
	link.click(); // Trigger the download
	document.body.removeChild(link); // Remove the link after download
};

const submitGrade = () => {
	submissionStatus.value = `Grade ${grade.value} submitted successfully!`;
	canGrade.value = false;
	setGrade(studentUsername, grade.value, student.value.progressReport.name === assignmentName);
	grade.value = null;
};
</script>

<style scoped>
.full-w {
	width: 100%;
	margin-bottom: 20px;
}

.grade-input-box {
	display: flex;
	align-items: center;
	margin: 3rem 0;
}

.grade-input-box label {
	width: 40%;
}

.grade-input-box input {
	display: flex;
	flex-grow: 1;
	height: 2rem;
}

.grade-submission {
	font-size: 15pt;
	max-width: 40rem;
	margin: 20px auto;
	margin-top: 13rem;
	padding: 30px;
	border: 1px solid #ccc;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	background-color: #1e1e1e;
	color: white;
}

.title {
	font-size: 2rem;
	margin-bottom: 20px;
	color: #ccc;
	text-align: center;
}

.file-info {
	margin: 1rem 0;
	display: flex;
	align-items: center;
	justify-content: left;

	width: 100%;
}

.file-info button {
	margin-left: 3rem;
}

.grade-input {
	margin-bottom: 20px;
}

.submit-button {
	margin-left: 10px;
	padding: 20px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
	font-size: 1rem;
	width: 100%
}

.download-button {
	background-color: #28a745;
	color: white;
	margin-left: 10px;
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
	font-size: 1rem;
}

.download-button:hover {
	background-color: #218838;
}

.submit-button {
	background-color: #007bff;
	color: white;
}

.submit-button:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

.submit-button:hover:not(:disabled) {
	background-color: #0056b3;
}

input[type="number"] {
	width: 80px;
	padding: 5px;
	margin-left: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	background-color: #fff;
	color: #333;
}

.status-message {
	margin-top: 20px;
	font-size: 1.1rem;
	color: #ffc107;
	/* Yellow for status messages */
	text-align: center;
}
</style>