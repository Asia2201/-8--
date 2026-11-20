// JavaScript Logic for Python GUI Lab - 8th Grade NUSH
let studentName = localStorage.getItem('py_nush_name') || '';
let studentClass = localStorage.getItem('py_nush_class') || '';

let quizScore = 0;       // Max 10 (scales to 4 points)
let simDone = false;     // Task 1: 2 points
let seqDone = false;     // Task 2: 3 points
let codeDone = false;    // Task 3: 3 points

let totalProgress = 0;
let myChart = null;

const quizQuestions = [
    { q: "1. Який віджет створює однорядкове текстове поле в Tkinter?", opts: ["Label()", "Entry()", "Button()", "Tk()"], ans: 1 },
    { q: "2. За допомогою якого методу можна зчитати вміст з Entry?", opts: ["read()", "fetch()", "get()", "text()"], ans: 2 },
    { q: "3. Що здійснює команда entry.delete(0, END)?", opts: ["Видаляє вікно", "Очищує весь текст у полі", "Вставляє символ", "Закриває програму"], ans: 1 },
    { q: "4. Як вставити слово 'Python' на початок текстового поля?", opts: ["entry.insert(0, 'Python')", "entry.add('Python')", "entry.set('Python')", "entry.get('Python')"], ans: 0 },
    { q: "5. Який параметр кнопки Button() пов'язує її з функцією?", opts: ["action=", "command=", "click=", "event="], ans: 1 },
    { q: "6. Яка бібліотека графічного інтерфейсу є стандартною у Python?", opts: ["Pygame", "Tkinter", "Math", "Random"], ans: 1 },
    { q: "7. Який метод розміщує віджети у вікні один за одним?", opts: ["pack()", "place_all()", "show()", "draw()"], ans: 0 },
    { q: "8. Що повертає метод get() текстового поля Entry?", opts: ["Рядок (str)", "Число (int)", "Список (list)", "Логічне значення"], ans: 0 },
    { q: "9. Для відображення текстових підказок та результатів використовують віджет:", opts: ["Entry", "Label", "Button", "Canvas"], ans: 1 },
    { q: "10. Що станеться, якщо уникнути виклику mainloop()?", opts: ["Код видалиться", "Вікно програми не з'явиться або миттєво закриється", "Виникне помилка get()", "Текст введеться автоматично"], ans: 1 }
];

const sequenceItems = [
    "from tkinter import *",
    "root = Tk()",
    "entry = Entry(root)",
    "entry.pack()",
    "root.mainloop()"
];

// Navigation tab switching
window.switchTab = function(tabId) {
    document.querySelectorAll('.section-block').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const targetSec = document.getElementById(tabId);
    if (targetSec) targetSec.classList.add('active');

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    if (tabId === 'block4') {
        renderReport();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Registration
window.initStudent = function() {
    const nameInp = document.getElementById('studentName');
    const classInp = document.getElementById('studentClass');

    const valName = nameInp ? nameInp.value.trim() : '';
    const valClass = classInp ? classInp.value.trim() : '';

    if (!valName || !valClass) {
        alert("Будь ласка, введи своє прізвище, ім'я та клас!");
        return;
    }

    studentName = valName;
    studentClass = valClass;

    localStorage.setItem('py_nush_name', studentName);
    localStorage.setItem('py_nush_class', studentClass);

    updateProgress(25);
    alert(`Вітаємо, ${studentName} (${studentClass})! Дані збережено.`);
    switchTab('block2');
};

function updateProgress(val) {
    totalProgress = Math.max(totalProgress, val);
    const pb = document.getElementById('progressBar');
    const pt = document.getElementById('progressText');
    if (pb) pb.style.width = totalProgress + '%';
    if (pt) pt.innerText = totalProgress + '%';
}

// Render Quiz Questions
function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    container.innerHTML = quizQuestions.map((q, idx) => `
        <div style="margin-bottom: 16px; border-bottom: 1px solid var(--card-border); padding-bottom: 12px;">
            <h4 style="margin-bottom: 8px; font-weight: 600;">${q.q}</h4>
            <div>
                ${q.opts.map((o, oIdx) => `
                    <label style="display:block; margin-bottom:6px; cursor:pointer; font-size:0.92rem;">
                        <input type="radio" name="q_${idx}" value="${oIdx}"> ${o}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Check Quiz
window.checkQuiz = function() {
    quizScore = 0;
    quizQuestions.forEach((q, idx) => {
        const sel = document.querySelector(`input[name="q_${idx}"]:checked`);
        if (sel && parseInt(sel.value) === q.ans) {
            quizScore++;
        }
    });

    const testPoints = (quizScore / 10) * 4; // Scale to 4 points
    const fb = document.getElementById('quizFeedback');
    if (fb) {
        fb.className = "feedback success";
        fb.innerText = `Тест перевірено! Твоя результат: ${quizScore} / 10 правильних відповідей (${testPoints.toFixed(1)} / 4 бали).`;
    }

    updateProgress(50);
};

// Task 1: Simulator functions
window.simGetText = function() {
    const field = document.getElementById('simEntryField');
    const out = document.getElementById('simLabelOut');
    if (field && out) {
        out.innerText = `Label: "${field.value}"`;
    }
    simDone = true;
    checkPractProgress();
};

window.simClearText = function() {
    const field = document.getElementById('simEntryField');
    const out = document.getElementById('simLabelOut');
    if (field && out) {
        field.value = "";
        out.innerText = 'Label: (поле очищено)';
    }
    simDone = true;
    checkPractProgress();
};

window.simInsertText = function() {
    const field = document.getElementById('simEntryField');
    if (field) {
        field.value = "Tkinter " + field.value;
    }
    simDone = true;
    checkPractProgress();
};

function checkPractProgress() {
    const fb = document.getElementById('simFeedback');
    if (simDone && fb) {
        fb.className = "feedback success";
        fb.innerText = "Завдання 1 виконано! (+2 бали) ✨";
    }
    updateProgress(65);
}

// Task 2: Sequence builder
function renderSequence() {
    const container = document.getElementById('sequenceContainer');
    if (!container) return;

    const shuffled = [...sequenceItems].sort(() => Math.random() - 0.5);
    
    container.innerHTML = shuffled.map((item, idx) => `
        <div style="margin-bottom: 8px;">
            <select id="seqSel_${idx}" style="padding: 8px; border-radius: 6px; background: #0f172a; color: white; border: 1px solid var(--card-border); width: 100%; max-width: 400px;">
                <option value="">-- Оберіть команду для Кроку ${idx + 1} --</option>
                ${sequenceItems.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
        </div>
    `).join('');
}

window.checkSequence = function() {
    let correct = 0;
    sequenceItems.forEach((s, idx) => {
        const el = document.getElementById(`seqSel_${idx}`);
        if (el && el.value === s) correct++;
    });

    const fb = document.getElementById('seqFeedback');
    if (!fb) return;

    if (correct === sequenceItems.length) {
        seqDone = true;
        fb.className = "feedback success";
        fb.innerText = "Супер! Алгоритм складено ідеально правильно! (+3 бали) 🎉";
        updateProgress(80);
    } else {
        seqDone = false;
        fb.className = "feedback error";
        fb.innerText = `Правильно встановлено ${correct} з ${sequenceItems.length} кроків. Спробуй ще раз!`;
    }
};

// Task 3: Interactive Workshop Code
window.workGreet = function() {
    const nameInp = document.getElementById('workNameInp');
    const out = document.getElementById('workOutput');
    const val = nameInp ? nameInp.value.trim() : '';
    if (out) {
        out.innerText = val ? `Привіт, ${val}!` : "Привіт!";
    }
};

window.workClear = function() {
    const nameInp = document.getElementById('workNameInp');
    const out = document.getElementById('workOutput');
    if (nameInp) nameInp.value = "";
    if (out) out.innerText = "";
};

window.verifyWorkshopCode = function() {
    const codeEl = document.getElementById('workshopCode');
    const fb = document.getElementById('workshopFeedback');
    if (!codeEl || !fb) return;

    const code = codeEl.value;
    if (code.includes('Entry') && code.includes('get()') && code.includes('delete') && code.includes('Label')) {
        codeDone = true;
        fb.className = "feedback success";
        fb.innerText = "Відмінно! Код містить усі необхідні методи Entry(), get(), delete() та Label! (+3 бали) 🚀";
        updateProgress(100);
    } else {
        codeDone = false;
        fb.className = "feedback error";
        fb.innerText = "Перевір наявність Entry, get(), delete() та Label у своєму коді!";
    }
};

// Page 4: Report generation & Calculation (Max 12 points)
function renderReport() {
    const nameEl = document.getElementById('repName');
    const classEl = document.getElementById('repClass');
    const dateEl = document.getElementById('repDate');
    const testPtsEl = document.getElementById('repTestPoints');
    const practPtsEl = document.getElementById('repPractPoints');
    const gradeEl = document.getElementById('repGrade');
    const lvlEl = document.getElementById('repLevelText');

    if (nameEl) nameEl.innerText = studentName || "Гість";
    if (classEl) classEl.innerText = studentClass || "8 клас";
    if (dateEl) dateEl.innerText = new Date().toLocaleDateString('uk-UA') + ' ' + new Date().toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});

    // 1. Test Points: Max 4
    const testPoints = (quizScore / 10) * 4;
    if (testPtsEl) testPtsEl.innerText = `${testPoints.toFixed(1)} / 4 бали`;

    // 2. Practical Points: Max 8 (Task 1 = 2, Task 2 = 3, Task 3 = 3)
    let practPoints = 0;
    if (simDone) practPoints += 2;
    if (seqDone) practPoints += 3;
    if (codeDone) practPoints += 3;

    if (practPtsEl) practPtsEl.innerText = `${practPoints} / 8 балів`;

    // Total Grade (Max 12)
    const totalGrade = Math.min(12, Math.round(testPoints + practPoints));
    if (gradeEl) gradeEl.innerText = `${totalGrade} / 12 балів`;

    let lvlText = "";
    if (totalGrade >= 10) lvlText = "🏆 Високий рівень! Ти майстер розробки GUI у Python!";
    else if (totalGrade >= 7) lvlText = "🌟 Достатній рівень! Тема засвоєна добре!";
    else if (totalGrade >= 4) lvlText = "👍 Середній рівень! Повтори основні методи текстового поля!";
    else lvlText = "📖 Початковий рівень! Опрацюй теорію та практичні завдання ще раз!";

    if (lvlEl) lvlEl.innerText = lvlText;

    // Render Doughnut Chart
    try {
        const canvas = document.getElementById('scoreChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (myChart) myChart.destroy();

            myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Тест (Макс 4)', 'Практика (Макс 8)', 'Втрачено'],
                    datasets: [{
                        data: [testPoints, practPoints, Math.max(0, 12 - (testPoints + practPoints))],
                        backgroundColor: ['#3b82f6', '#10b981', '#334155']
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }
    } catch(e) {
        console.log("Chart error:", e);
    }
}

// Download TXT Report
window.downloadTXTReport = function() {
    const name = studentName || "Гість";
    const pClass = studentClass || "8 клас";
    const date = new Date().toLocaleString('uk-UA');
    const testPoints = ((quizScore / 10) * 4).toFixed(1);
    
    let practPoints = 0;
    if (simDone) practPoints += 2;
    if (seqDone) practPoints += 3;
    if (codeDone) practPoints += 3;

    const totalGrade = Math.min(12, Math.round(parseFloat(testPoints) + practPoints));

    const content = `====================================================
ПІДСУМКОВИЙ ЗВІТ НАВЧАЛЬНОГО ПРАКТИКУМУ
Тема: Текстові поля в Python (Tkinter) · 8 клас НУШ
====================================================
Учень / учениця: ${name}
Клас: ${pClass}
Дата фіксації: ${date}

----------------------------------------------------
РЕЗУЛЬТАТИ ВИКОНАННЯ ЗАВДАНЬ:
1. Тестовий блок (10 запитань): ${quizScore}/10 (${testPoints}/4 бали)
2. Практичний блок (3 завдання): ${practPoints}/8 балів
   - Завдання 1 (Симулятор get, insert, delete): ${simDone ? '2/2 б.' : '0/2 б.'}
   - Завдання 2 (Конструктор алгоритму): ${seqDone ? '3/3 б.' : '0/3 б.'}
   - Завдання 3 (Кодування програми): ${codeDone ? '3/3 б.' : '0/3 б.'}

----------------------------------------------------
ПІДСУМКОВА ОЦІНКА: ${totalGrade} / 12 БАЛІВ
====================================================
Сформовано у вебзастосунку PYTHON GUI LAB (8 клас НУШ)
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Звіт_Python_GUI_${name.replace(/\s+/g, '_')}.txt`;
    link.click();
};

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    if (studentName) {
        const nameInp = document.getElementById('studentName');
        if (nameInp) nameInp.value = studentName;
    }
    if (studentClass) {
        const classInp = document.getElementById('studentClass');
        if (classInp) classInp.value = studentClass;
    }

    renderQuiz();
    renderSequence();
});
