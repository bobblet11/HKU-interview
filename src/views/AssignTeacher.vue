<template>
	<div class="full-w">
		<button class="back-button" @click="goBack">Back</button>
	</div>

	<div class="center">
		<section class="table col">
			<section class="table-header">
				<div class="header-item">
					Teacher
				</div>
			</section>
			<section class="table-body">
				<div v-for="(teacher, index) in teachers" :key="index">
					<TeacherRow :username="teacher.username" />
				</div>
			</section>
		</section>
	</div>
</template>

<script setup>
import { teachers } from '../backend/accountManager';
import router from '../router/index';
import TeacherRow from '../components/TeacherRow.vue';

const goBack = () => {
	router.back();
};
</script>

<style scoped>
.full-w {
	width: 100%;
	/* Full width for the back button */
	margin-bottom: 20px;
	/* Space below the button */
}


.center {
	display: flex;
	/* Use flexbox for centering */
	justify-content: center;
	/* Center content horizontally */
	align-items: flex-start;
	/* Align items to the top */
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
	/* Increased height for the header */
	display: flex;
	/* Use flexbox for layout */
	justify-content: center;
	/* Center header content */
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
}

.table-body {
	padding: 10px;
	/* Padding for the table body */
	display: flex;
	flex-direction: column;
	/* Ensure rows stack vertically */
}

.table-body>div {
	margin: 0.5rem 0;
	/* Space between teacher rows */
}
</style>