// State Management
let studentName = localStorage.getItem('py_gimp_student') || '';
let quizScore = 0;
let totalProgress = 0;

const quizQuestions = [
    { q: "1. Який віджет створює однорядкове текстове поле в Tkinter?", opts: ["Label()", "Entry()", "Button()", "Tk()"], ans: 1 },
    { q: "2. За допомогою якого методу можна зчитати вміст Entry?", opts: ["read()", "fetch()", "get()", "text()"], ans: 2 },
    { q: "3. Що робить команда entry.delete(0, END)?", opts: ["Видаляє вікно", "Очищує весь текст у полі", "Вставляє символ", "Закриває програму"], ans: 1 },
    { q: "4. Як вставити слово 'Python' на початок текстового поля?", opts: ["entry.insert(0, 'Python')", "entry.add('Python')", "entry.set('Python')", "entry.get('Python')"], ans: 0 },
    { q: "5. Який параметр кнопки пов'язує її з функцією обробником?", opts: ["action=", "command=", "click=", "event="], ans: 1 },
    { q: "6. Яка біблітека графічного інтерфейсу є стандартною в Python?", opts: ["Pygame", "Tkinter", "Math", "Random"], ans: 1 },
    { q: "7. Який метод розміщує віджет у вікні один за одним?", opts: ["pack()", "place_all()", "show()", "draw()"], ans: 0 },
    { q: "8. Що повертає метод get() текстового поля?", opts: ["Рядок (str)", "Число (int)", "Список (list)", "Логічне значення"], ans: 0 },
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

function switchTab(tabId) {
    document.querySelectorAll('.section-block').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.nav-tabs button').forEach(b => b.classList.remove('active'));

    const targetSec = document.getElementById(tabId);
    if (targetSec) targetSec.classList.add('active');

    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');

    if (tabId === 'block4') {
        renderReport();
    }
}

function initStudent() {
    const input = document.getElementById('studentName');
    const val = input ? input.value.trim() : '';
    if (!val) {
        alert("Будь ласка, введи своє ім'я!");
        return;
    }
    studentName = val;
    localStorage.setItem('py_gimp_student', studentName);
    updateProgress(25);
    alert(`Вітаємо, ${studentName}! Прогрес збережено.`);
    switchTab('block1');
}

function updateProgress(val) {
    totalProgress = Math.max(totalProgress, val);
    document.getElementById('progressBar').style.width = totalProgress + '%';
    document.getElementById('progressText').innerText = totalProgress + '%';
}

function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container) return;
    container.innerHTML = quizQuestions.map((q, idx) => `
        <div style="margin-bottom: 15px; border-bottom: 1px solid var(--card-border); padding-bottom: 10px;">
            <h4 style="margin-bottom: 6px;">${q.q}</h4>
            <div>
                ${q.opts.map((o, oIdx) => `
                    <label style="display:block; margin-bottom:4px; cursor:pointer; font-size:0.9rem;">
                        <input type="radio" name="q_${idx}" value="${oIdx}"> ${o}
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function checkQuiz() {
    quizScore = 0;
    quizQuestions.forEach((q, idx) => {
        const sel = document.querySelector(`input[name="q_${idx}"]:checked`);
        if (sel && parseInt(sel.value) === q.ans) {
            quizScore++;
        }
    });
    alert(`Твій результат тестування: ${quizScore} / ${quizQuestions.length}`);
    updateProgress(50);
}

// Simulators JS
function simGetText() {
    const val = document.getElementById('simEntryField').value;
    document.getElementById('simLabelOut').innerText = `Label: "${val}"`;
}

function simClearText() {
    document.getElementById('simEntryField').value = "";
    document.getElementById('simLabelOut').innerText = 'Label: (поле очищено)';
}

function simInsertText() {
    const el = document.getElementById('simEntryField');
    el.value = "Tkinter " + el.value;
}

function renderSequence() {
    const container = document.getElementById('sequenceContainer');
    if (!container) return;
    const shuffled = [...sequenceItems].sort(() => Math.random() - 0.5);
    
    container.innerHTML = shuffled.map((item, idx) => `
        <div style="margin-bottom: 8px;">
            <select id="seqSel_${idx}" style="padding: 6px; border-radius: 6px; background: #0f172a; color: white; border: 1px solid var(--card-border);">
                <option value="">-- Крок ${idx + 1} --</option>
                ${sequenceItems.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
        </div>
    `).join('');
}

function checkSequence() {
    let correct = 0;
    sequenceItems.forEach((s, idx) => {
        const el = document.getElementById(`seqSel_${idx}`);
        if (el && el.value === s) correct++;
    });
    const fb = document.getElementById('seqFeedback');
    if (correct === sequenceItems.length) {
        fb.className = "feedback success";
        fb.innerText = "Супер! Послідовність встановлено правильно! 🎉";
        updateProgress(75);
    } else {
        fb.className = "feedback error";
        fb.innerText = `Правильно ${correct} з ${sequenceItems.length}. Спробуй ще!`;
    }
}

// Practical Code Workshop Sims
function workShow() {
    const fn = document.getElementById('workFn').value;
    const ln = document.getElementById('workLn').value;
    document.getElementById('workOutput').innerText = `Вітаємо: ${fn} ${ln}`;
}

function workClear() {
    document.getElementById('workFn').value = "";
    document.getElementById('workLn').value = "";
    document.getElementById('workOutput').innerText = "";
}

function verifyWorkshopCode() {
    const code = document.getElementById('workshopCode').value;
    const fb = document.getElementById('workshopFeedback');
    if (code.includes('Entry') && code.includes('get()') && code.includes('delete')) {
        fb.className = "feedback success";
        fb.innerText = "Чудово! Код містить усі необхідні елементи Entry, get() та delete()! ✨";
        updateProgress(85);
    } else {
        fb.className = "feedback error";
        fb.innerText = "Перевір наявність Entry(), get() та delete() у своєму коді!";
    }
}

function checkOpenQuestions() {
    const q1 = document.getElementById('openText1').value.toLowerCase();
    const q2 = document.getElementById('openText2').value.toLowerCase();
    const fb = document.getElementById('openFeedback');

    if (q1.trim() && q2.trim()) {
        fb.className = "feedback success";
        fb.innerText = "Відповіді збережено успішно! Учитель врахує їх при підсумковому оцінюванні.";
        updateProgress(100);
    } else {
        fb.className = "feedback error";
        fb.innerText = "Будь ласка, дай відповіді на обидва запитання!";
    }
}

function renderReport() {
    document.getElementById('repName').innerText = studentName || "Гість";
    document.getElementById('repDate').innerText = new Date().toLocaleString('uk-UA');
    document.getElementById('repTestScore').innerText = `${quizScore} / 10`;
    
    const percent = Math.round((quizScore / 10) * 100);
    document.getElementById('repPercent').innerText = `${percent}%`;

    let grade = quizScore + (totalProgress >= 85 ? 2 : 0);
    if (grade > 12) grade = 12;
    document.getElementById('repGrade').innerText = `${grade} балів`;

    let lvlText = "";
    if (quizScore >= 9) lvlText = "🏆 Високий рівень! Ти майстер текстових полів Python!";
    else if (quizScore >= 7) lvlText = "🌟 Достатній рівень! Добре засвоєна тема!";
    else if (quizScore >= 5) lvlText = "👍 Середній рівень! Повтори окремі команди!";
    else lvlText = "📖 Початковий рівень! Потренуйся ще!";

    document.getElementById('repLevelText').innerText = lvlText;

    try {
        const ctx = document.getElementById('scoreChart').getContext('2d');
        if (window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Правильно', 'Помилки'],
                datasets: [{
                    data: [quizScore, 10 - quizScore],
                    backgroundColor: ['#10b981', '#ef4444']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    } catch(e) {
        console.log("Chart error:", e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (studentName) {
        const nameInp = document.getElementById('studentName');
        if (nameInp) nameInp.value = studentName;
    }
    renderQuiz();
    renderSequence();
});
