(() => {
    const storageKey = "attendanceRecords";
    const dates = [
        "2026-08-10",
        "2026-08-11",
        "2026-08-12",
        "2026-08-13",
        "2026-08-14",
        "2026-08-15",
        "2026-08-17",
        "2026-08-19",
        "2026-08-21",
        "2026-08-22",
        "2026-08-26",
        "2026-08-27",
        "2026-08-28",
        "2026-08-29"
    ];
    const septemberDates = [
        "2026-09-01",
        "2026-09-02",
        "2026-09-03",
        "2026-09-05",
        "2026-09-07",
        "2026-09-08",
        "2026-09-09",
        "2026-09-10",
        "2026-09-11",
        "2026-09-12",
        "2026-09-14",
        "2026-09-15",
        "2026-09-16",
        "2026-09-17",
        "2026-09-18",
        "2026-09-19",
        "2026-09-22",
        "2026-09-23",
        "2026-09-24",
        "2026-09-26",
        "2026-09-28",
        "2026-09-29",
        "2026-09-30"
    ];
    const octoberDates = [
        "2026-10-02",
        "2026-10-03",
        "2026-10-05",
        "2026-10-06",
        "2026-10-07",
        "2026-10-08",
        "2026-10-09",
        "2026-10-10",
        "2026-10-12",
        "2026-10-17",
        "2026-10-19",
        "2026-10-20",
        "2026-10-21",
        "2026-10-22",
        "2026-10-24",
        "2026-10-26",
        "2026-10-31"
    ];
    const novemberDates = [
        "2026-11-02",
        "2026-11-03",
        "2026-11-04",
        "2026-11-05",
        "2026-11-06",
        "2026-11-07",
        "2026-11-09"
    ];
    const septemberStudentStatuses = {
        "Benedict Abon": "LAPPPPPPPPPPPPPPPPPPPPP",
        "Eissa Abul Al-rub": "PPPPPAPPPPPPPLPPPPPPPPP",
        "Aeran Joed Adolfo": "PPPPPPPPAPPPAPPPAPPPAPP",
        "Ryan Alvaro": "PPLPPPPPPPPPPPPPAPPPPPP",
        "Daniel Javez Ander": "PPPPPAPPPPPPPPPPPPPPPPP",
        "John Paul Asis": "PLLPAPPAPPPPAPPPPPLPPPA",
        "Angelo Lorenzo Aureus": "PPPPPPPPPPPPPPLPPPPPPPP",
        "Norman Barinario": "PPPPPPPPPPPPPAPPPPPPPPL",
        "Justine Bautista": "PPPPLPPPPPAAPPPPPAPPAPA",
        "John Cedrick Bayon": "PPPPAPPPLPPPPLLPPPPPPPP",
        "Lester Burce": "PPPPPAPPLPAPPPPPPPPPPLL",
        "John Vincent Cantiga": "PAPPLLPPLPAPPPLPPPPPPPP",
        "Ren Cruz": "LPAPPPPLPPPPPPPPPPPPPPP",
        "John Paul De Vera": "PPPPPPPPPPPAPPPPPPPPPPP",
        "Ritzmond Dela Torre": "PPAPPPPLPPPLAPPPPPAPPPP",
        "Krizha Mae Deluza": "ALPPPAPPPPPAPPPPPPPPPPP",
        "John Rafael Desoloc": "PPPPPAPAPPAPPPPPPPPPPPP",
        "Mateo Djino": "LAPPAAPPPPPPPPPPPPAPPPP",
        "Chito Vergel Dumlao": "PPPPPPPPPPPPPALPPPPPPPP",
        "Allan Patrick Ebol": "PAPPPPPPPPPPPPPPLPPPAPA",
        "Kenneth Elcano": "PPAPPPPPPPPPPPPPPPPPPPP",
        "Stephanie Ellorin": "LPPPPAPPPPPAPPPPLLPPPAP",
        "Natalie Esposo": "PPPPAPAPAPPLPPPPPPAPLPP",
        "Nicole Gagasa": "PPPPPPPPPPPLAALPPPPPPPP",
        "Michael Jay Gapasangra": "PAPPPPPAPPPAAPAPPPPPPPA",
        "Mark Gonio": "PPPPPPPPPPPALLPPPPPPPPP",
        "Jeric Gonzales": "PPPPAPLPAPPPAPPPPPAPPPP",
        "Shane Mae Gumban": "PPPPPPPPPPPPPPPPPPPPPPP",
        "Mark Guillen Hila": "PPPPPPPLLPPPPPPPPPAPPPP",
        "Harold Jario": "PAPPPPPPPPLPPPPPPLPPPPP",
        "Kim Lara": "PPPPLLPLPPAPPPPPPPPPPPP",
        "Stephen Lim": "APPPPAPPPPPPPPPPPPPPPPP",
        "Joeluz Riel Lorenzo": "PPAPPAPAPPPPPPPPPPPPPPP",
        "Rain Lorenzo": "PPAPPPPPPPPPPAPPPPPPPPP",
        "Richelle Ann Madnoreo": "PAPPPPPPLPPPPPPPPLPPPPP",
        "Rodrigo III Manlulu": "PPPPPPPAPPLAPAPPPPAPAPP",
        "Charlie Marcos": "PPPPPPPPPPPPPPLPPPLPPPP",
        "Eugene Nentino": "PPPPPLPLPPPPPAPPPPPPPPP",
        "Joanna Mae Nieto": "PPPPLPPPPPPPPPPPPPPPPPL",
        "Hannah Penoliar": "LPPPPAPPPPAAAPPPPAPPPPP",
        "Jacky Pentecostes": "PPPPPPPPPPPPPPPPPPLPPPP",
        "Jaderick Polvoriza": "PPPPPPPPPPPPPPPPPPPPLAP",
        "Gian Requillo": "PPPPPPPPPPPPPLPPPPPPPAP",
        "John Dave Rustia": "PLPPPPPPPPAPPPAPPPPPPPP",
        "John Louie Salazar": "PPPPPAPPPPPAPPLPPPPPPPP",
        "Kurt Justin Santillan": "PPAPPPPPPPPAPPPPAPPPPPP",
        "Jimmela Sincero": "APAPPPPPPPPPPPAPAPPPPPA",
        "Rosel Suello": "PPPPPPPPPPPPPPAPAPPPAPP",
        "Aldrien Tamba": "PPPPPPPPLPPPPPPPPPPPPPP",
        "John Paul Tugade": "LPPPPPPAPPPPALAPPPPPPPP",
        "Jake Anthony Vanzuela": "PPPPPPPPPPPPAPPPPPPPPPP",
        "Bernadette Mae Velasquez": "LPPPPPPPLPPPPPPPPPPPPAP"
    };
    const octoberStudentStatuses = {
        "Benedict Abon": "PPPPLLPPPPPPPPPPP",
        "Eissa Abul Al-rub": "PPPPAPPPPPPPPPPAP",
        "Aeran Joed Adolfo": "PPPPAPPPPPPPPLPPP",
        "Ryan Alvaro": "PPPPPPPPPPAPPPPAP",
        "Daniel Javez Ander": "PPAPPPPPPPPLPAPPP",
        "John Paul Asis": "PPPPPPPPPPAAPPPPP",
        "Angelo Lorenzo Aureus": "PPLAPPPPPPPPPPPPP",
        "Norman Barinario": "PPPPPPLPPPLAPPPPP",
        "Justine Bautista": "PPPAPPLPLPPPPPPPP",
        "John Cedrick Bayon": "APPPPPPPPPPPPPPLP",
        "Lester Burce": "PPPPPPPPAPALPPPPP",
        "John Vincent Cantiga": "PPPPPAPPPPAPPPPPP",
        "Ren Cruz": "APPPPPPPPPPPPPPPP",
        "John Paul De Vera": "PPPPPAPPPPPPPPPPP",
        "Ritzmond Dela Torre": "PPPPPPPPPPPPPPPPP",
        "Krizha Mae Deluza": "APPPPPPPPPPPPAPPP",
        "John Rafael Desoloc": "PPPPAPPPPPLPPPPPP",
        "Mateo Djino": "PPPPPPPPPPAPPPPPP",
        "Chito Vergel Dumlao": "PPPPPPPPPPPPPPPPP",
        "Allan Patrick Ebol": "PPPPPPPPPPPALPPPP",
        "Kenneth Elcano": "PPAPPPPPPPPPPPPPP",
        "Stephanie Ellorin": "PPAPPPAPLPLPAAPPP",
        "Natalie Esposo": "PPPPPPPPPPPPPLPPP",
        "Nicole Gagasa": "PPPPPPPPAPPPALPAP",
        "Michael Jay Gapasangra": "APPAPPPPPPPAPPPPP",
        "Mark Gonio": "PPPPPLPPPPPPPPPPP",
        "Jeric Gonzales": "PPPPPPPPPPPPPPPPP",
        "Shane Mae Gumban": "PPPAPPPPAPPPPPPPP",
        "Mark Guillen Hila": "PPPLPAPPPPPPAAPPP",
        "Harold Jario": "PPPAPPPPPPPPPPPPP",
        "Kim Lara": "LPPPPAPPPPALPPPPP",
        "Stephen Lim": "PPPPPPPPPPPPPPPPP",
        "Joeluz Riel Lorenzo": "PPPPPPPPPPPPPLPPP",
        "Rain Lorenzo": "PPPPLPPPPPPPPLPPP",
        "Richelle Ann Madnoreo": "PPPPPPPPAPPPPLPAP",
        "Rodrigo III Manlulu": "PPPPPPPPLPPAPAPAP",
        "Charlie Marcos": "PPPPPPLPPPPPPPPPP",
        "Eugene Nentino": "PPPPALPPPPPPPAPPP",
        "Joanna Mae Nieto": "PPPPPPPPPPPPPPPLP",
        "Hannah Penoliar": "PPLAPPPPPPPPPAPPP",
        "Jacky Pentecostes": "PPALPPPPAPPPPPPPP",
        "Jaderick Polvoriza": "PPPPPPAPPPPPPPPPP",
        "Gian Requillo": "PPPPPPPPPPPAPPPPP",
        "John Dave Rustia": "PPPLAPPPPPPPPPPPP",
        "John Louie Salazar": "PPPAPPPPPPPAAPPLP",
        "Kurt Justin Santillan": "APPPPAPPPPPAPPPPP",
        "Jimmela Sincero": "PPPPPPAPPPPLPPPPP",
        "Rosel Suello": "PPPPPLAPPPPAPPPPP",
        "Aldrien Tamba": "LPPPPPPPPPPPPPPPP",
        "John Paul Tugade": "PPPPPPPPPPPPPPPLP",
        "Jake Anthony Vanzuela": "APAAPPPPPPPPPPPPP",
        "Bernadette Mae Velasquez": "LPPAPALPPPLPPPPAP"
    };
    const novemberStudentStatuses = {
        "Benedict Abon": "PAPPPPA",
        "Eissa Abul Al-rub": "PPPPPPA",
        "Aeran Joed Adolfo": "PPPLLPA",
        "Ryan Alvaro": "APPPPPP",
        "Daniel Javez Ander": "PPPPPPA",
        "John Paul Asis": "PPPAPPP",
        "Angelo Lorenzo Aureus": "LPPPPPP",
        "Norman Barinario": "PPPPPPA",
        "Justine Bautista": "PPPPPPP",
        "John Cedrick Bayon": "PPAPLPA",
        "Lester Burce": "AAPPPPP",
        "John Vincent Cantiga": "PPPPPPA",
        "Ren Cruz": "PPPPPPP",
        "John Paul De Vera": "PPPPPPA",
        "Ritzmond Dela Torre": "PPPPPPP",
        "Krizha Mae Deluza": "PAPPAPP",
        "John Rafael Desoloc": "PAAPPPP",
        "Mateo Djino": "PPLPPPP",
        "Chito Vergel Dumlao": "PPPAAPA",
        "Allan Patrick Ebol": "PPAPPPP",
        "Kenneth Elcano": "PPPPPPP",
        "Stephanie Ellorin": "APPPPPP",
        "Natalie Esposo": "PPPLPPP",
        "Nicole Gagasa": "PPPPPPP",
        "Michael Jay Gapasangra": "PLPPPPP",
        "Mark Gonio": "PPPLPPP",
        "Jeric Gonzales": "PPPPPPP",
        "Shane Mae Gumban": "APPPPPP",
        "Mark Guillen Hila": "PPAPPPA",
        "Harold Jario": "PAPPAPL",
        "Kim Lara": "APPAPPP",
        "Stephen Lim": "APPPPPP",
        "Joeluz Riel Lorenzo": "PPPPLPP",
        "Rain Lorenzo": "PPPPPPA",
        "Richelle Ann Madnoreo": "PAPPPPP",
        "Rodrigo III Manlulu": "PPPPPPP",
        "Charlie Marcos": "PAPPPPP",
        "Eugene Nentino": "APPPAPP",
        "Joanna Mae Nieto": "PPLPPPP",
        "Hannah Penoliar": "PPPPPPP",
        "Jacky Pentecostes": "PPPPPPP",
        "Jaderick Polvoriza": "PPAPPPA",
        "Gian Requillo": "PAPPLPP",
        "John Dave Rustia": "PPPPPPP",
        "John Louie Salazar": "PPPAPPP",
        "Kurt Justin Santillan": "PPPPPPP",
        "Jimmela Sincero": "PAPAPPP",
        "Rosel Suello": "APAAPPP",
        "Aldrien Tamba": "PPPPPPP",
        "John Paul Tugade": "PPPPPPP",
        "Jake Anthony Vanzuela": "PPAPPPP",
        "Bernadette Mae Velasquez": "PPPPAPP"
    };

    let records = {};
    try {
        const savedRecords = JSON.parse(localStorage.getItem(storageKey) || "{}");
        if (savedRecords && typeof savedRecords === "object" && !Array.isArray(savedRecords)) {
            records = savedRecords;
        }
    } catch {
        records = {};
    }

    function mergeMonthAttendance(monthName, monthDates, monthStatuses) {
        if (Object.keys(monthStatuses).length !== Object.keys(studentStatuses).length) {
            throw new Error(`${monthName} attendance student list does not match the roster.`);
        }

        Object.entries(monthStatuses).forEach(([name, codes]) => {
            if (codes.length !== monthDates.length) {
                throw new Error(`${monthName} attendance status count does not match dates for ${name}.`);
            }

            monthDates.forEach((date, index) => {
                if (!records[date] || typeof records[date] !== "object" || Array.isArray(records[date])) {
                    records[date] = {};
                }
                if (!records[date][name]) {
                    records[date][name] = statusNames[codes[index]];
                }
            });
        });
    }

    mergeMonthAttendance("August", dates, studentStatuses);
    mergeMonthAttendance("September", septemberDates, septemberStudentStatuses);
    mergeMonthAttendance("October", octoberDates, octoberStudentStatuses);
    mergeMonthAttendance("November", novemberDates, novemberStudentStatuses);

    localStorage.setItem(storageKey, JSON.stringify(records));
})();