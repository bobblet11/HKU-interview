<template>
  <section @click="handleStudentPage" class="table-row clickable">
    <div class="student-info">{{ username }}</div>
    <div class="student-info">{{ assignedTeacher }}</div>
    <div class="student-info table-gap">{{ averageGrade }}</div>
  </section>
</template>

<script setup>
import router from '../router/index';
import { currentUser, students } from '../backend/accountManager';
import { computed, ref } from 'vue';

const props = defineProps({
  username: {
    required: true,
  },
});

const handleStudentPage = () => {
  router.push({ path: `/${currentUser.accountType}/${currentUser.username}/studentProfile/${props.username}` });
};

const student = ref(students[props.username]);

// Compute average grade based on available grades
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
  return ((sum / total) * 100).toFixed(2) + "%"; // Return average grade rounded to 2 decimal places
});

const assignedTeacher = computed(() => {
  return !student.value.assignedTeacher ? 'no teacher assigned' : student.value.assignedTeacher;
});
</script>

<style scoped>
.table-row {
  display: flex;
  /* Use flexbox for layout */
  justify-content: space-between;
  /* Space items evenly */
  align-items: center;
  /* Center items vertically */
  padding: 1rem;
  /* Padding for better touch targets */
  background-color: #1e1e1e;
  /* Consistent background */
  border-radius: 8px;
  /* Rounded corners */
  margin: 0.5rem 0;
  /* Space between rows */
  transition: background-color 0.3s;
  /* Smooth background transition */
}

.table-row:hover {
  background-color: #2a2a2a;
  /* Darker background on hover */
}

.student-info {
  flex: 1;
  /* Allow divs to grow equally */
  text-align: center;
  /* Center text horizontally */
  color: #ddd;
  /* Slightly lighter text for readability */
}

.table-gap {
  margin-right: 25%;
}
</style>