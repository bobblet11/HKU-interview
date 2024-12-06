<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
	<RouterView />
</template>

<style>
body {
	/* Dark background for the entire page */
	margin: 0;
	/* Remove default margin */
	padding: 0;
	margin: 0;
}

.back-button {
	margin-left: 5rem;
	margin-top: 5rem;
	padding: 10px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
	font-size: 1.1rem;
}

.back-button:hover {
	background-color: #0056b3;
	/* Darker blue on hover */
}

.flex {
	display: flex;
}

.col {
	flex-direction: column;
}

.full-w {
	width: 100%;
}

.mv-1 {
	margin-top: 1rem;
	margin-bottom: 1rem;
}

.mh-1 {
	margin-left: 1rem;
	margin-right: 1rem;
}

.gap-1 {
	gap: 1rem;
}

.grow {
	flex-grow: 1;

}

.flex-center {
	justify-content: center;
}


.clickable {
	cursor: pointer;
}
</style>
