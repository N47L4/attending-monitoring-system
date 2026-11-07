const tracks = [
    "STEM",
    "ABM",
    "HUMSS",
    "GAS",
    "Arts & Design",
    "ICT",
    "HE",
    "Sports Track"
];

const statuses = ["Present", "Present", "Late", "Absent", "Present"];
const students = [];

const ictGrade12Names = [
    "Aeran Joed Adolfo",
    "Allan Patrick Ebol",
    "Daniel Javez Ander",
    "John Louie Salazar",
    "Michael Jay Gapasangra"
];

ictGrade12Names.forEach((name, index) => {
    students.push({
        name,
        grade: "12",
        track: "ICT",
        section: "A",
        status: statuses[index]
    });
});

const studentRoster = [
    "Benedict Abon",
    "Eissa Abul Al-rub",
    "Ryan Alvaro",
    "John Paul Asis",
    "Angelo Lorenzo Aureus",
    "Norman Barinario",
    "Justine Bautista",
    "John Cedrick Bayon",
    "Lester Burce",
    "John Vincent Cantiga",
    "Ren Cruz",
    "Paul De Vera",
    "Ritzmond Dela Torre",
    "Mae Deluza",
    "John Rafael Desoloc",
    "Mateo Djino",
    "Chito Vergel Dumlao",
    "Kenneth Elcano",
    "Stephanie Ellorin",
    "Natalie Esposo",
    "Nicole Gagasa",
    "Mark Gonio",
    "Jeric Gonzales",
    "Shane Mae Gumban",
    "Mark Guillen Hila",
    "Harold Jario",
    "Kim Lara",
    "Stephen Lim",
    "Joeluz Riel Lorenzo",
    "Rain Lorenzo",
    "Richelle Ann Madnoreo",
    "Rodrigo III Manlulu",
    "Charlie Marcos",
    "Eugene Nentino",
    "Joanna Mae Nieto",
    "Hannah Penoliar",
    "Jacky Pentecostes",
    "Jaderick Polvoriza",
    "Gian Requillo",
    "John Dave Rustia",
    "Kurt Justin Santillan",
    "Jimmela Sincero",
    "Rosel Suello",
    "Aldrien Tamba",
    "John Paul Tugade",
    "Jake Anthony Vanzuela",
    "Bernadette Mae Velasquez"
];

function getStableIndex(name, maximum) {
    let hash = 0;
    for (let index = 0; index < name.length; index++) {
        hash = ((hash * 31) + name.charCodeAt(index)) >>> 0;
    }
    return hash % maximum;
}

studentRoster.forEach((name, index) => {
    let trackIndex = getStableIndex(name, tracks.length);
    let grade = getStableIndex(`${name}-grade`, 2) === 0 ? "11" : "12";
    let sectionIndex = getStableIndex(`${name}-section`, 3);

    if (tracks[trackIndex] === "ICT" && grade === "12" && ["A", "B", "C"][sectionIndex] === "A") {
        sectionIndex = 1;
    }

    students.push({
        name,
        grade,
        track: tracks[trackIndex],
        section: ["A", "B", "C"][sectionIndex],
        status: statuses[index % statuses.length]
    });
});

const attendanceStorageKey = "attendanceRecords";
const legacyStorageKey = "adminAttendanceStatuses";
const validStatuses = ["Present", "Late", "Absent", "No Class"];
const editableStatuses = ["Present", "Late", "Absent"];
let selectedDate = "";

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getAttendanceRecords() {
    try {
        const records = JSON.parse(localStorage.getItem(attendanceStorageKey) || "{}");
        return records && typeof records === "object" && !Array.isArray(records) ? records : {};
    } catch {
        localStorage.removeItem(attendanceStorageKey);
        return {};
    }
}

function migrateLegacyAttendance() {
    try {
        const legacyStatuses = JSON.parse(localStorage.getItem(legacyStorageKey) || "null");
        if (!legacyStatuses || typeof legacyStatuses !== "object") {
            return;
        }

        const records = getAttendanceRecords();
        if (!records[getLocalDateString(new Date())]) {
            records[getLocalDateString(new Date())] = {};
        }

        students.forEach((student) => {
            const legacyStatus = legacyStatuses[student.name];
            records[getLocalDateString(new Date())][student.name] =
                validStatuses.includes(legacyStatus) ? legacyStatus : "Present";
        });

        localStorage.setItem(attendanceStorageKey, JSON.stringify(records));
        localStorage.removeItem(legacyStorageKey);
    } catch {
        localStorage.removeItem(legacyStorageKey);
    }
}

migrateLegacyAttendance();

const gradeFilter = document.querySelector("#grade-filter");
const sectionFilter = document.querySelector("#section-filter");
const trackFilter = document.querySelector("#track-filter");
const loadButton = document.querySelector("#load-students");
const studentRows = document.querySelector(".student-rows");
const studentCount = document.querySelector(".student-count");
const studentListEyebrow = document.querySelector("#students .eyebrow");
const studentListTitle = document.querySelector("#students h2");
const attendanceChart = document.querySelector(".attendance-chart");
const saveButton = document.querySelector(".save-btn");
const sidebar = document.querySelector(".sidebar");
const menuButton = document.querySelector(".menu");
const menuText = document.querySelector(".text");
const attendanceDateInput = document.querySelector("#attendance-date");
const previousDayButton = document.querySelector("#previous-day");
const nextDayButton = document.querySelector("#next-day");
const noClassButton = document.querySelector("#no-class-button");

selectedDate = getLocalDateString(new Date());
attendanceDateInput.value = selectedDate;

function loadAttendanceForSelectedDate() {
    const records = getAttendanceRecords();
    const dayRecord = records[selectedDate] && typeof records[selectedDate] === "object"
        ? records[selectedDate]
        : {};

    students.forEach((student) => {
        const savedStatus = dayRecord[student.name];
        student.status = validStatuses.includes(savedStatus) ? savedStatus : "Present";
    });

    updateDashboard();
}

function toggleSidebar() {
    sidebar.classList.toggle("close");
    const isClosed = sidebar.classList.contains("close");
    menuButton.setAttribute("aria-expanded", String(!isClosed));
    menuButton.setAttribute("aria-label", isClosed ? "Open sidebar" : "Close sidebar");
}

menuButton.addEventListener("click", toggleSidebar);
menuText.addEventListener("click", toggleSidebar);

menuButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSidebar();
    }
});

function getFilteredStudents() {
    const selectedTrack = trackFilter.value.trim().toLowerCase();
    const selectedGrade = gradeFilter.value.trim();
    const selectedSection = sectionFilter.value.trim().toUpperCase();

    return students.filter((student) => {
        const matchesTrack = !selectedTrack || student.track.toLowerCase() === selectedTrack;
        const matchesGrade = !selectedGrade || student.grade === selectedGrade;
        const matchesSection = !selectedSection || student.section === selectedSection;

        return matchesTrack && matchesGrade && matchesSection;
    });
}

function statusClass(status) {
    return status === "No Class" ? "noclass" : status.toLowerCase();
}

function renderStudentRows(filteredStudents) {
    studentRows.innerHTML = "";

    if (filteredStudents.length === 0) {
        studentRows.innerHTML = '<p class="empty-message">No students found for this grade and section.</p>';
        return;
    }

    filteredStudents.forEach((student) => {
        const row = document.createElement("div");
        row.className = "student-row";

        const label = document.createElement("label");
        const name = document.createElement("span");
        name.textContent = student.name;
        label.append(name);

        const statusSelect = document.createElement("select");
        statusSelect.className = `status-select ${statusClass(student.status)}`;
        statusSelect.dataset.studentName = student.name;
        statusSelect.setAttribute("aria-label", `Attendance status for ${student.name}`);

        if (student.status === "No Class") {
            const noClassOption = document.createElement("option");
            noClassOption.value = "No Class";
            noClassOption.textContent = "No Class";
            noClassOption.selected = true;
            statusSelect.append(noClassOption);
        }

        editableStatuses.forEach((statusName) => {
            const option = document.createElement("option");
            option.value = statusName;
            option.textContent = statusName;
            option.selected = student.status === statusName;
            statusSelect.append(option);
        });

        statusSelect.addEventListener("change", () => {
            statusSelect.className = `status-select ${statusClass(statusSelect.value)}`;
        });

        row.append(label, statusSelect);
        studentRows.append(row);
    });
}

function updateDashboard() {
    const filteredStudents = getFilteredStudents();
    const listedTotal = filteredStudents.length;
    const countedStudents = filteredStudents.filter((student) => student.status !== "No Class");
    const total = countedStudents.length;
    const present = countedStudents.filter((student) => student.status === "Present").length;
    const late = countedStudents.filter((student) => student.status === "Late").length;
    const absent = countedStudents.filter((student) => student.status === "Absent").length;

    document.querySelector("#total-students").textContent = total;
    document.querySelector("#present-count").textContent = present;
    document.querySelector("#late-count").textContent = late;
    document.querySelector("#absent-count").textContent = absent;

    const presentPercent = total ? (present / total) * 100 : 0;
    const latePercent = total ? (late / total) * 100 : 0;
    const absentPercent = total ? (absent / total) * 100 : 0;
    const lateEnd = presentPercent + latePercent;
    const attendanceRate = total ? Math.round(((present + late) / total) * 100) : 0;

    document.querySelector("#chart-present").textContent = `${Math.round(presentPercent)}%`;
    document.querySelector("#chart-late").textContent = `${Math.round(latePercent)}%`;
    document.querySelector("#chart-absent").textContent = `${Math.round(absentPercent)}%`;
    document.querySelector("#attendance-rate").textContent = `${attendanceRate}%`;

    attendanceChart.style.background = total
        ? `conic-gradient(#6860FA 0% ${presentPercent}%, #B669FF ${presentPercent}% ${lateEnd}%, #F445A1 ${lateEnd}% 100%)`
        : "#6c757d";
    attendanceChart.setAttribute(
        "aria-label",
        `Attendance chart: ${Math.round(presentPercent)}% present, ${Math.round(latePercent)}% late, and ${Math.round(absentPercent)}% absent`
    );

    const trackLabel = trackFilter.value || "All Tracks";
    const gradeLabel = gradeFilter.value ? `Grade ${gradeFilter.value}` : "All Grades";
    const sectionLabel = sectionFilter.value ? `Section ${sectionFilter.value}` : "All Sections";

    studentListEyebrow.textContent = `${trackLabel} | ${sectionLabel}`;
    studentListTitle.textContent = `${gradeLabel} Student List`;
    studentCount.textContent = `${listedTotal} ${listedTotal === 1 ? "Student" : "Students"}`;

    const allStudentsAreNoClass = students.length > 0 &&
        students.every((student) => student.status === "No Class");
    noClassButton.classList.toggle("active", allStudentsAreNoClass);
    noClassButton.textContent = allStudentsAreNoClass
        ? "Classes / Cancel No Class"
        : "No Classes / Holiday";
    renderStudentRows(filteredStudents);
}

loadButton.addEventListener("click", updateDashboard);
trackFilter.addEventListener("change", updateDashboard);
gradeFilter.addEventListener("change", updateDashboard);
sectionFilter.addEventListener("change", updateDashboard);

attendanceDateInput.addEventListener("change", () => {
    if (!attendanceDateInput.value) {
        attendanceDateInput.value = selectedDate;
        return;
    }
    selectedDate = attendanceDateInput.value;
    loadAttendanceForSelectedDate();
});

function changeSelectedDay(numberOfDays) {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + numberOfDays);
    selectedDate = getLocalDateString(date);
    attendanceDateInput.value = selectedDate;
    loadAttendanceForSelectedDate();
}

previousDayButton.addEventListener("click", () => changeSelectedDay(-1));
nextDayButton.addEventListener("click", () => changeSelectedDay(1));

function saveAttendanceForSelectedDate() {
    studentRows.querySelectorAll(".student-row").forEach((row) => {
        const statusSelect = row.querySelector(".status-select");
        const student = students.find((item) => item.name === statusSelect.dataset.studentName);
        if (!student) {
            return;
        }
        student.status = statusSelect.value;
    });

    const records = getAttendanceRecords();
    records[selectedDate] = {};
    students.forEach((student) => {
        records[selectedDate][student.name] = student.status;
    });
    localStorage.setItem(attendanceStorageKey, JSON.stringify(records));
}

saveButton.addEventListener("click", () => {
    saveAttendanceForSelectedDate();
    updateDashboard();
});

noClassButton.addEventListener("click", () => {
    const isNoClassDay = students.length > 0 &&
        students.every((student) => student.status === "No Class");
    const newStatus = isNoClassDay ? "Present" : "No Class";

    students.forEach((student) => {
        student.status = newStatus;
    });

    const records = getAttendanceRecords();
    records[selectedDate] = {};
    students.forEach((student) => {
        records[selectedDate][student.name] = newStatus;
    });
    localStorage.setItem(attendanceStorageKey, JSON.stringify(records));

    updateDashboard();
});

loadAttendanceForSelectedDate();