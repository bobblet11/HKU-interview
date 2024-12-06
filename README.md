# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).



Technical Questions:


Background: We would like to implement a dissertation management system for students. 

The students will submit 2 reports.

The progress report and the final reports. Try to implement the flow such that The admin can

1. Input the student lists

2. Assign students to responsible teacher

3. Show the status of all students (including teacher assignments, student grades, etc)


The teacher can

1. Find the student list assigned to him/her

2. Input the student grades

3. Submit the grades if they are ready

Instructions:

1. Use ONLY Vue.js.

2. Save the code onto GitHub, and send us the link


USE INSTRUCTIONS:

This submission has no backend and relies on sessionStorage as a database. all changes made to the website will be lost when the session closes.
Run the webpage using "npm run dev" in the terminal. To reset the data, close the tab and re-open the webpage.

accounts are:
```
ADMIN
admin:admin

STUDENTS
u4820193:1234
u7614382:1234
u2945761:1234
u8371204:1234
u1509837:1234

TEACHERS
Mei_Ling_Chan:1234
David_Wong:1234
Sophia_Lam:1234
Eric_Yip:1234
Anita_Cheung:1234
```

to upload an assignment, select a PDF and press upload.
to grade an assignment, download the pdf, read it, and then insert a grade out of 100.
