<template>
	<section class="table-header clickable">
		<div class="username">{{ username }}</div>
		<div class="table-gap">
			<button class="assign-button" @click="handleAssignTeacher">
				Assign
			</button>
		</div>
	</section>
</template>

<script setup>
import { assignTeacher } from '../backend/accountManager';
import router from '../router/index';

const props = defineProps({
	username: {
		required: true,
	},
});

const studentUsername = router.currentRoute.value.params.studentUsername;

const handleAssignTeacher = () => {
	assignTeacher(studentUsername, props.username);
	alert(`Assigned ${props.username}`);
	router.back();
}
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
	transition: background-color 0.3s;
	/* Smooth background transition */
	cursor: pointer;
	/* Indicate clickable area */
}

.table-header:hover {
	background-color: #2a2a2a;
	/* Darker background on hover */
}

.username {
	flex: 1;
	/* Allow the username to grow */
	text-align: left;
	/* Left-align username */
}

.table-gap {
	margin-left: 15px;
	/* Space between username and button */
}

.assign-button {
	padding: 10px 15px;
	/* Button padding */
	background-color: #007bff;
	/* Primary button color */
	color: white;
	/* Text color */
	border: none;
	/* No border */
	border-radius: 5px;
	/* Rounded corners */
	cursor: pointer;
	/* Pointer cursor on hover */
	transition: background-color 0.3s;
	/* Smooth transition */
}

.assign-button:hover {
	background-color: #0056b3;
	/* Darker blue on hover */
}
</style>