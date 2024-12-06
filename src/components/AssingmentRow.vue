<template>
	<section class="table-header" v-if="currentUser.accountType === 'student'">
		<div class="assignment-name">{{ props.name }}</div>

		<div v-if="props.grade === 'not submitted'" class="submission-area">
			<button class="submit-button" @click="selectFile">Submit</button>
			<input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
		</div>

		<div v-if="props.grade !== 'not submitted'" class="grade-display">
			{{ props.grade }}
		</div>
	</section>

	<section class="table-header" v-if="currentUser.accountType === 'admin'">
		<div class="assignment-name">{{ props.name }}</div>
		<div class="grade-display">{{ props.grade }}</div>
	</section>

	<section class="table-header" v-if="currentUser.accountType === 'teacher'">
		<div class="assignment-name">{{ props.name }}</div>
		<div class="grade-area">
			<div v-if="props.grade !== 'not graded'" class="grade-display">{{ props.grade }}</div>
			<button v-if="props.grade === 'not graded'" class="grade-button"
				@click="handleGrade">Grade</button>
		</div>
	</section>
</template>

<script setup>
import { currentUser, submitAssignment } from '../backend/accountManager';
import router from '../router/index';
import { ref } from 'vue';

const props = defineProps({
	name: {
		require: true,
	},
	grade: {
		require: true,
	},
	submission_name: {
		require: true,
	},
});

const studentUsername = router.currentRoute.value.params.studentUsername;

const handleGrade = () => {
	router.push({ path: `/${currentUser.accountType}/${currentUser.username}/studentProfile/${studentUsername}/${props.submission_name}` });
};

const fileInput = ref(null);
const fileData = ref(null);

const selectFile = () => {
	fileInput.value.click(); // Trigger the file input click
};

const handleFileChange = (event) => {
	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();

		reader.onload = (e) => {
			fileData.value = {
				name: file.name,
				size: file.size,
				type: file.type,
				url: e.target.result, // Base64 encoded data URL
			};

			console.log("File data:", fileData.value); // Log file data

			// Submit the assignment if fileData is populated
			submitAssignment(studentUsername, fileData.value, file.name, props.name === 'progress report');
		};

		// Read the file as a data URL
		reader.readAsDataURL(file);
	} else {
		console.error("No file selected.");
	}
};
</script>

<style scoped>
.table-header {
	display: flex;
	justify-content: space-between;
	/* Space between assignment name and grade */
	align-items: center;
	/* Center items vertically */
	padding: 15px;
	/* Padding for better spacing */
	background-color: #1e1e1e;
	/* Dark background for header */
	border-bottom: 1px solid #444;
	/* Subtle bottom border */
}

.assignment-name {
	color: #ccc;
	/* Light gray for assignment name */
	font-size: 1.2rem;
	/* Increased font size */
	flex: 1;
	/* Allow name to take available space */
}

.submission-area {
	display: flex;
	align-items: center;
	/* Center items vertically */
}

.submission-area * {
	margin: auto;
}

.submit-button {
	padding: 10px 20px;
	/* Padding for the submit button */
	background-color: #007bff;
	/* Blue button */
	color: white;
	/* White text */
	border: none;
	/* No border */
	border-radius: 5px;
	/* Rounded corners */
	cursor: pointer;
	/* Pointer cursor on hover */
	transition: background-color 0.3s;
	/* Transition for hover effect */
	font-size: 1rem;
	/* Button font size */
}

.submit-button:hover {
	background-color: #0056b3;
	/* Darker blue on hover */
}

.grade-display {
	color: #aaa;
	/* Light gray for grade display */
	font-size: 1.2rem;
	/* Increased font size */
}

.grade-area {
	display: flex;
	align-items: center;
	/* Center items vertically */
}

.grade-area * {
	margin: auto;
}

.grade-button {
	padding: 10px 15px;
	/* Padding for the grade button */
	background-color: #28a745;
	/* Green button */
	color: white;
	/* White text */
	border: none;
	/* No border */
	border-radius: 5px;
	/* Rounded corners */
	cursor: pointer;
	/* Pointer cursor on hover */
	transition: background-color 0.3s;
	/* Transition for hover effect */
	font-size: 1rem;
	/* Button font size */
}

.grade-button:hover {
	background-color: #218838;
	/* Darker green on hover */
}
</style>