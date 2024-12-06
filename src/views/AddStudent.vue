<template>


	<div class="full-w">
		<button class="back-button" @click="goBack">Back</button>
	</div>

	<h1 class="title">Add Students</h1>

	<div class="form-container">
		<section class="table">
			<section class="table-header">
				<div>Username</div>
				<div>Password</div>
			</section>
			<section class="table-header">
				<div>
					<input class="input-field" v-model="username" placeholder="Enter username" />
				</div>
				<div>
					<input type="password" class="input-field" v-model="password"
						placeholder="Enter password" />
				</div>
			</section>
		</section>
		<button class="add-button" @click="addStudent">Add Student</button>
	</div>
</template>

<script setup>
import { insertAccount } from "../backend/accountManager";
import { ref } from "vue";
import router from "../router/index";

const username = ref("");
const password = ref("");

const addStudent = () => {
	if (username.value.length === 0 || password.value.length === 0) {
		alert("Invalid fields");
		return;
	}
	insertAccount(username.value, password.value, "student");
	username.value = "";
	password.value = "";
};

const goBack = () => {
	username.value = "";
	password.value = "";
	router.back();
};
</script>

<style scoped>
.title {
	text-align: center;
	margin-bottom: 20px;
	color: #ccc;
	/* Consistent with previous styles */
	font-size: 2rem;
	margin-top: 8rem
}

.full-w {
	width: 100%;
	margin-bottom: 20px;
}



.form-container {
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
}

.table {
	width: 80vw;
	background-color: #1e1e1e;
	/* Dark background for consistency */
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	margin: auto;
	padding: 20px;
}

.table-header {
	height: 3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	color: #ccc;
	/* Light gray for text */
}

.table-header div {
	flex: 1;
	text-align: center;
}

.input-field {
	width: 80%;
	padding: 10px;
	margin: 10px 0;
	border: 1px solid #ccc;
	/* Light border */
	border-radius: 4px;
	background-color: rgb(89, 98, 151)141;
	/* Default white background */
	color: #333;
	/* Dark text for input */
	transition: border-color 0.3s;
	/* Smooth transition for border color */
}

/* Focus state */
.input-field:focus {
	border-color: #007bff;
	/* Blue border on focus */
	background-color: rgb(89, 98, 151)141;
	color: white;
	/* Keep white background on focus */
	outline: none;
	/* Remove default outline */
}

/* When the input is not empty */
.input-field:not(:placeholder-shown) {
	background-color: rgb(89, 98, 151)141;
	/* Keep white background when filled */
	color: white;
}

/* Additional styles specifically for the password input */
input[type="password"]:focus {
	border-color: #007bff;
	/* Ensure the same focus color */
	background-color: rgb(89, 98, 151)141;
	color: white;
	/* Maintain white background */
}

.add-button {
	padding: 10px 20px;
	background-color: #28a745;
	/* Green consistent with previous styles */
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
	font-size: 1rem;
	margin-top: 20px;
}

.add-button:hover {
	background-color: #218838;
	/* Darker green on hover */
}
</style>