const studentForm = document.querySelector("#student-login-form");
const adminForm = document.querySelector("#admin-login-form");

const accounts = {
    admin: {
        username: "admin",
        password: "Password"
    },
    students: [
        { studentId: "STUDENT01", name: "Aeran Joed Adolfo", password: "Password" },
        { studentId: "STUDENT02", name: "Allan Patrick Ebol", password: "Password" },
        { studentId: "STUDENT03", name: "Daniel Javez Ander", password: "Password" },
        { studentId: "STUDENT04", name: "John Louie Salazar", password: "Password" },
        { studentId: "STUDENT05", name: "Michael Jay Gapasangra", password: "Password" }
    ]
};

sessionStorage.removeItem("loggedInUser");

function handleLogin(form, credentialInput, getAccount, dashboardUrl) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const credential = credentialInput.value.trim();
        const passwordInput = form.querySelector('[type="password"]');
        const password = passwordInput.value;
        const error = form.querySelector("#login-error");
        const submitButton = form.querySelector('[type="submit"]');

        error.textContent = "";

        if (!credential || !password) {
            error.textContent = "Please fill in all login fields.";
            return;
        }

        const account = getAccount(credential, password);
        if (!account) {
            error.textContent = "Invalid username, Student ID, or password.";
            passwordInput.select();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Logging in...";

        sessionStorage.setItem("loggedInUser", JSON.stringify(account));
        window.location.replace(dashboardUrl);
    });
}

if (studentForm) {
    handleLogin(
        studentForm,
        studentForm.querySelector("#student-id"),
        (studentId, password) => {
            const account = accounts.students.find((item) =>
                item.studentId.toUpperCase() === studentId.toUpperCase() &&
                item.password === password
            );
            return account ? { ...account, role: "student" } : null;
        },
        "student-dashboard.html"
    );
}

if (adminForm) {
    handleLogin(
        adminForm,
        adminForm.querySelector("#admin-username"),
        (username, password) => {
            if (
                username.toLowerCase() === accounts.admin.username &&
                password === accounts.admin.password
            ) {
                return {
                    role: "admin",
                    name: "Administrator",
                    username: accounts.admin.username
                };
            }
            return null;
        },
        "admin-dashboard.html"
    );
}
