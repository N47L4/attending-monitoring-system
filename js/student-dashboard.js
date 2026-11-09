const sidebar = document.querySelector(".sidebar");
const menuIcon = document.querySelector(".menu");
const menuText = document.querySelector(".text");

function toggleMenu() {
    sidebar.classList.toggle("close");
}

menuIcon.addEventListener("click", toggleMenu);
menuText.addEventListener("click", toggleMenu);

const calendar = document.querySelector(".calendar");
const calendarTitle = document.querySelector("#calendar-title");
const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");
const attendanceStorageKey = "attendanceRecords";
const today = new Date();
let displayedDate = new Date(today.getFullYear(), today.getMonth(), 1);

const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser") || "null");

if (!loggedInUser || loggedInUser.role !== "student") {
    window.location.replace("login-student.html");
} else {
    const headerTitle = document.querySelector(".header h1");
    if (headerTitle) {
        headerTitle.textContent = `Welcome ${loggedInUser.name}`;
    }
}

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
        return {};
    }
}

function getStudentStatus(dateKey) {
    if (!loggedInUser) {
        return null;
    }
    const dayRecord = getAttendanceRecords()[dateKey];
    if (!dayRecord || typeof dayRecord !== "object") {
        return null;
    }
    const status = dayRecord[loggedInUser.name];
    return ["Present", "Late", "Absent", "No Class"].includes(status) ? status : null;
}

function getAttendanceEntries() {
    const records = getAttendanceRecords();
    const entries = [];

    Object.keys(records).forEach((dateKey) => {
        const status = getStudentStatus(dateKey);
        if (status && status !== "No Class") {
            entries.push({ dateKey, status });
        }
    });

    return entries.sort((a, b) => b.dateKey.localeCompare(a.dateKey));
}

function getAttendanceClass(year, month, day, weekday) {
    const status = getStudentStatus(getLocalDateString(new Date(year, month, day)));
    if (status === "No Class") {
        return "noclass";
    }
    return status ? status.toLowerCase() : "noclass";
}

function renderCalendar() {
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = displayedDate.toLocaleString("default", { month: "long" });
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    calendar.innerHTML = "";
    calendarTitle.textContent = `${monthName} ${year}`;

    weekdays.forEach((weekday) => {
        const header = document.createElement("div");
        header.className = "day weekday";
        header.textContent = weekday;
        calendar.appendChild(header);
    });

    for (let index = 0; index < firstWeekday; index++) {
        const blank = document.createElement("div");
        blank.className = "day blank";
        calendar.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const weekday = new Date(year, month, day).getDay();
        const dateKey = getLocalDateString(new Date(year, month, day));
        const dateCell = document.createElement("div");
        dateCell.className = `day ${getAttendanceClass(year, month, day, weekday)}`;
        dateCell.textContent = day;
        dateCell.title = getStudentStatus(dateKey) || "No record";

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dateCell.classList.add("today");
        }
        calendar.appendChild(dateCell);
    }
}

function renderAttendanceSummary() {
    const entries = getAttendanceEntries();
    const present = entries.filter((entry) => entry.status === "Present").length;
    const late = entries.filter((entry) => entry.status === "Late").length;
    const absent = entries.filter((entry) => entry.status === "Absent").length;
    const total = entries.length;
    const attendanceRate = total ? Math.round(((present + late) / total) * 100) : 0;

    document.querySelector("#student-attendance-rate").textContent = `${attendanceRate}%`;
    document.querySelector("#student-present-count").textContent = present;
    document.querySelector("#student-late-count").textContent = late;
    document.querySelector("#student-absent-count").textContent = absent;

    const absenceAlert = document.querySelector("#absence-alert");
    absenceAlert.hidden = absent < 3;
    if (!absenceAlert.hidden) {
        document.querySelector("#absence-alert-text").textContent =
            `You have ${absent} recorded absences. Please contact your instructor if you need support.`;
    }

    const score = document.querySelector(".health .score");
    const healthStatus = document.querySelector("#attendance-health-status");
    score.textContent = `${attendanceRate}%`;
    if (total === 0) {
        healthStatus.textContent = "No attendance records";
    } else if (attendanceRate >= 90) {
        healthStatus.textContent = "Excellent";
    } else if (attendanceRate >= 75) {
        healthStatus.textContent = "Good";
    } else {
        healthStatus.textContent = "Needs Improvement";
    }

    const historyBody = document.querySelector("#attendance-history-body");
    historyBody.innerHTML = "";
    entries.slice(0, 10).forEach((entry) => {
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        const statusCell = document.createElement("td");
        const displayDate = new Date(`${entry.dateKey}T12:00:00`);

        dateCell.textContent = displayDate.toLocaleDateString("default", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
        statusCell.textContent = entry.status;
        row.append(dateCell, statusCell);
        historyBody.append(row);
    });

    if (entries.length === 0) {
        historyBody.innerHTML = '<tr><td colspan="2">No attendance records</td></tr>';
    }

}

function renderHeatMap() {
    const heatmap = document.querySelector(".heatmap");
    heatmap.innerHTML = "";
    const year = displayedDate.getFullYear();
    const month = displayedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= 28; day++) {
        const cell = document.createElement("div");
        cell.className = "box";

        if (day <= daysInMonth) {
            const date = new Date(year, month, day);
            const status = getStudentStatus(getLocalDateString(date));
            if (status === "No Class") {
                cell.classList.add("gray");
            } else if (status) {
                cell.classList.add(status.toLowerCase() === "present" ? "green"
                    : status.toLowerCase() === "absent" ? "red" : "yellow");
            } else {
                cell.classList.add("gray");
            }
            cell.title = `${day}: ${status || "No record"}`;
        } else {
            cell.classList.add("gray");
        }
        heatmap.appendChild(cell);
    }
}

function renderDashboard() {
    renderCalendar();
    renderAttendanceSummary();
    renderHeatMap();
}

previousMonthButton.addEventListener("click", () => {
    displayedDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1, 1);
    renderDashboard();
});

nextMonthButton.addEventListener("click", () => {
    displayedDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1);
    renderDashboard();
});

window.addEventListener("storage", (event) => {
    if (event.key === attendanceStorageKey) {
        renderDashboard();
    }
});

renderDashboard();
