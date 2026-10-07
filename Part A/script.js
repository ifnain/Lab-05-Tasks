// ==========================================
// 1. SELECT FORM ELEMENTS
// ==========================================

// Using getElementById()
const form = document.getElementById("studentForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const program = document.getElementById("program");
const semester = document.getElementById("semester");


// Using querySelector()
const previewCard = document.querySelector("#previewCard");
const studentList = document.querySelector("#studentList");
const modeButton = document.querySelector("#modeButton");


// Preview elements
const previewName = document.querySelector("#previewName");
const previewEmail = document.querySelector("#previewEmail");
const previewProgram = document.querySelector("#previewProgram");
const previewSemester = document.querySelector("#previewSemester");


// Error elements
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const programError = document.querySelector("#programError");
const semesterError = document.querySelector("#semesterError");


// ==========================================
// 2. LIVE PREVIEW USING INPUT EVENT
// ==========================================

fullName.addEventListener("input", function () {

    previewName.textContent = fullName.value;

});


email.addEventListener("input", function () {

    previewEmail.textContent = "Email: " + email.value;

});


program.addEventListener("input", function () {

    previewProgram.textContent = "Program: " + program.value;

});


semester.addEventListener("input", function () {

    previewSemester.textContent = "Semester: " + semester.value;

});


// ==========================================
// 3. FORM SUBMIT
// ==========================================

form.addEventListener("submit", function (event) {

    // Stop page from refreshing
    event.preventDefault();


    // Clear old error messages
    nameError.textContent = "";
    emailError.textContent = "";
    programError.textContent = "";
    semesterError.textContent = "";


    // Validation flag
    let valid = true;


    // ======================================
    // NAME VALIDATION
    // ======================================

    if (fullName.value.trim() === "") {

        nameError.textContent = "Full Name is required.";

        valid = false;
    }


    // ======================================
    // EMAIL VALIDATION
    // ======================================

    if (email.value.trim() === "") {

        emailError.textContent = "Email is required.";

        valid = false;
    }


    // ======================================
    // PROGRAM VALIDATION
    // ======================================

    if (program.value === "") {

        programError.textContent = "Please select a program.";

        valid = false;
    }


    // ======================================
    // SEMESTER VALIDATION
    // ======================================

    if (
        semester.value === "" ||
        semester.value < 1 ||
        semester.value > 8
    ) {

        semesterError.textContent =
            "Semester must be between 1 and 8.";

        valid = false;
    }


    // ======================================
    // IF FORM IS VALID
    // ======================================

    if (valid === true) {

        // Create new list item
        const li = document.createElement("li");


        // Put student information inside li
        li.textContent =
            fullName.value +
            " | " +
            email.value +
            " | " +
            program.value +
            " | Semester " +
            semester.value;


        // Add li to student list
        studentList.appendChild(li);


        // Clear form
        form.reset();


        // Reset preview
        previewName.textContent = "Student Name";
        previewEmail.textContent = "Email: example@email.com";
        previewProgram.textContent = "Program: Not Selected";
        previewSemester.textContent = "Semester: Not Selected";
    }

});


// ==========================================
// 4. DARK / LIGHT MODE
// ==========================================

modeButton.addEventListener("click", function () {

    previewCard.classList.toggle("dark");

});