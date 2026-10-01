const students = [];

const studentForm = document.getElementById("student-form");
const studentList = document.getElementById("student-list");
const errorMessage = document.getElementById("error-message");
const studentCount = document.getElementById("student-count");
const emptyMessage = document.getElementById("empty-message");

studentForm.addEventListener("submit", function (event) {
	event.preventDefault();

	const studentName = document.getElementById("student-name").value.trim();
	const age = document.getElementById("age").value.trim();
	const course = document.getElementById("course").value.trim();
	const gradeInput = document.getElementById("grade").value.trim();
	const grade = Number(gradeInput);

	if (!studentName || !age || !course || !gradeInput) {
		errorMessage.textContent = "Please fill in all the fields.";
		return;
	}

	if (grade < 0 || grade > 100) {
		errorMessage.textContent = "Grade must be between 0 and 100.";
		return;
	}

	const student = {
		name: studentName,
		age: age,
		course: course,
		grade: grade,
		status: grade >= 50 ? "Passed" : "Failed"
	};

	students.push(student);
	addStudentCard(student);
	studentForm.reset();
	errorMessage.textContent = "";
	studentCount.textContent = students.length + (students.length === 1 ? " student" : " students");
});

function addStudentCard(student) {
	emptyMessage.remove();

	const card = document.createElement("article");
	card.className = "rounded-lg border border-slate-200 bg-white p-5 shadow-sm";

	const heading = document.createElement("h3");
	heading.className = "text-lg font-semibold text-slate-900";
	heading.textContent = student.name;

	const details = document.createElement("p");
	details.className = "mt-2 text-sm text-slate-600";
	details.textContent = "Age: " + student.age + " | Course: " + student.course;

	const result = document.createElement("p");
	result.className = "mt-3 text-sm font-medium text-slate-700";
	result.textContent = "Grade: " + student.grade + " / 100";

	const status = document.createElement("span");
	status.className = student.status === "Passed"
		? "mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800"
		: "mt-3 inline-block rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-800";
	status.textContent = student.status;

	card.append(heading, details, result, status);
	studentList.appendChild(card);
}
