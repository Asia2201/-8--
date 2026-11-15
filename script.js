// Python Lists Interactive Trainer - Main Script
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// App State Management
const state = {
    currentSection: 'home',
    currentQuestionIndex: 0,
    answers: Array(15).fill(null), // stores selected option index or null
    score: 0,
    studentName: localStorage.getItem('py_student_name') || ''
};

// 15 Comprehensive Quiz Questions across 3 difficulty levels
const quizQuestions = [
    // Початковий рівень (1-5)
    {
        id: 1,
        level: 'easy',
        levelText: 'Початковий рівень',
        question: 'Який із наведених варіантів правильно створює список Python із трьох елементів?',
        code: null,
        options: [
            'fruits = (яблуко, банан, груша)',
            'fruits = ["яблуко", "банан", "груша"]',
            'fruits = {"яблуко", "банан", "груша"}',
            'fruits = "яблуко", "банан", "груша"'
        ],
        correct: 1,
        explanation: 'Списки в Python оголошуються за допомогою квадратних дужок [ ].'
    },
    {
        id: 2,
        level: 'easy',
        levelText: 'Початковий рівень',
        question: 'З якого індексу починається нумерація елементів у списках Python?',
        code: null,
        options: [
            'З 1',
            'З -1',
            'З 0',
            'З будь-якого числового значення'
        ],
        correct: 2,
        explanation: 'У Python індексація всіх послідовностей та списків завжди починається з 0.'
    },
    {
        id: 3,
        level: 'easy',
        levelText: 'Початковий рівень',
        question: 'Щоб дізнатися загальну кількість елементів у списку, використовують функцію:',
        code: null,
        options: [
            'count()',
            'size()',
            'length()',
            'len()'
        ],
        correct: 3,
        explanation: 'Вбудована функція len(list) повертає кількість елементів у списку.'
    },
    {
        id: 4,
        level: 'easy',
        levelText: 'Початковий рівень',
        question: 'Що буде виведено на екран після виконання коду?',
        code: 'colors = ["червоний", "зелений", "синій"]
print(colors[1])',
        options: [
            'червоний',
            'зелений',
            'синій',
            'Помилка IndexError'
        ],
        correct: 1,
        explanation: 'Індекс 0 відповідає елементу "червоний", а індекс 1 — елементу "зелений".'
    },
    {
        id: 5,
        level: 'easy',
        levelText: 'Початковий рівень',
        question: 'Який метод додає новий елемент саме в КІНЕЦЬ списку?',
        code: null,
        options: [
            'add()',
            'push()',
            'append()',
            'insert()'
        ],
        correct: 2,
        explanation: 'Метод append(x) додає новий елемент в самий кінець існуючого списку.'
    },

    // Середній рівень (6-10)
    {
        id: 6,
        level: 'medium',
        levelText: 'Середній рівень',
        question: 'Що буде виведено в результаті виконання наступної програми?',
        code: 'numbers = [10, 20, 30]
numbers.append(40)
print(len(numbers))',
        options: [
            '3',
            '4',
            '40',
            '[10, 20, 30, 40]'
        ],
        correct: 1,
        explanation: 'Спочатку список мав 3 елементи. Після додавання 40 методом append() довжина стала 4.'
    },
    {
        id: 7,
        level: 'medium',
        levelText: 'Середній рівень',
        question: 'Який результат покаже звернення до елемента за від'ємним індексом numbers[-1]?',
        code: 'numbers = [5, 15, 25, 35]',
        options: [
            'Перший елемент (5)',
            'Останній елемент (35)',
            'Передостанній елемент (25)',
            'Викличе помилкуSyntaxError'
        ],
        correct: 1,
        explanation: 'Від'ємні індекси в Python відраховують елементи з кінця. -1 повертає найостанніший елемент.'
    },
    {
        id: 8,
        level: 'medium',
        levelText: 'Середній рівень',
        question: 'Яка команда вставить рядок "banana" на ДРУГУ позицію (індекс 1) у список fruits?',
        code: null,
        options: [
            'fruits.insert(1, "banana")',
            'fruits.insert("banana", 1)',
            'fruits.append(1, "banana")',
            'fruits.add(1, "banana")'
        ],
        correct: 0,
        explanation: 'Метод insert(index, element) першим аргументом приймає індекс, куди треба вставити елемент.'
    },
    {
        id: 9,
        level: 'medium',
        levelText: 'Середній рівень',
        question: 'Що буде виведено в консоль після виконання коду?',
        code: 'items = ["a", "b", "c"]
items[0] = "z"
print(items)',
        options: [
            '["a", "b", "c", "z"]',
            '["z", "a", "b", "c"]',
            '["z", "b", "c"]',
            'Помилка: списки не можна змінювати'
        ],
        correct: 2,
        explanation: 'Списки є змінними. Операція items[0] = "z" замінює елемент з індексом 0 ("a") на "z".'
    },
    {
        id: 10,
        level: 'medium',
        levelText: 'Середній рівень',
        question: 'Яке булеве значення поверне вираз: "cat" in ["dog", "cat", "bird"]?',
        code: null,
        options: [
            'True',
            'False',
            'None',
            '1'
        ],
        correct: 0,
        explanation: 'Оператор in перевіряє наявність елемента у списку. Оскільки "cat" є в списку, результат True.'
    },

    // Достатній та високий рівень (11-15)
    {
        id: 11,
        level: 'hard',
        levelText: 'Високий рівень',
        question: 'Визначте значення змінної val після виконання наступних команд:',
        code: 'vals = [10, 20, 30, 40]
val = vals.pop(2)
print(val)',
        options: [
            '20',
            '30',
            '[10, 20, 40]',
            '40'
        ],
        correct: 1,
        explanation: 'Метод pop(2) видаляє елемент з індексом 2 (це 30) і повертає саме видалене значення.'
    },
    {
        id: 12,
        level: 'hard',
        levelText: 'Високий рівень',
        question: 'Яку суму буде виведено після завершення циклу?',
        code: 'numbers = [2, 4, 6]
total = 0
for x in numbers:
    total += x
print(total)',
        options: [
            '6',
            '12',
            '24',
            '0246'
        ],
        correct: 1,
        explanation: 'Цикл додає кожен елемент списку до total: 0 + 2 + 4 + 6 = 12.'
    },
    {
        id: 13,
        level: 'hard',
        levelText: 'Високий рівень',
        question: 'У чому полягає відмінність між методами remove() та pop()?',
        code: null,
        options: [
            'remove() видаляє за значенням, а pop() за індексом',
            'remove() видаляє за індексом, а pop() за значенням',
            'Всі відповіді неправильні, вони працюють однаково',
            'remove() повертає видалений елемент, а pop() ні'
        ],
        correct: 0,
        explanation: 'remove(val) шукає і видаляє елемент за його значенням, тоді як pop(idx) видаляє за індексом.'
    },
    {
        id: 14,
        level: 'hard',
        levelText: 'Високий рівень',
        question: 'Що відбудеться при спробі виконати даний код?',
        code: 'nums = [1, 2, 3]
print(nums[5])',
        options: [
            'Виведе None',
            'Виведе 0',
            'Викличе помилку IndexError: list index out of range',
            'Автоматично розширить список до 5 елементів'
        ],
        correct: 2,
        explanation: 'Звернення до індексу, якого не існує в списку, викликає виняток IndexError.'
    },
    {
        id: 15,
        level: 'hard',
        levelText: 'Високий рівень',
        question: 'Який вміст матиме список nums після виконання цих дій?',
        code: 'nums = [1, 2]
nums.append([3, 4])
print(len(nums))',
        options: [
            '4',
            '3',
            '2',
            'Помилка типом даних'
        ],
        correct: 1,
        explanation: 'Метод append([3, 4]) додає весь вкладений список як ОДИН елемент. Тому в списку стає 3 елементи: 1, 2 та [3, 4].'
    }
];

function initApp() {
    setupNavigation();
    loadSavedState();
    renderQuestion();
    renderTOCScrollSpy();
    updateResultView();
}

// Navigation Logic
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            navigateTo(targetSection);
        });
    });
}

function navigateTo(sectionId) {
    state.currentSection = sectionId;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-section') === sectionId);
    });

    // Toggle sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const activeSec = document.getElementById(sectionId);
    if (activeSec) {
        activeSec.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (sectionId === 'result') {
        updateResultView();
    }
}

// Theory TOC ScrollSpy & Smooth Scroll
function renderTOCScrollSpy() {
    document.querySelectorAll('.toc-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// Quiz Render & Interaction
function renderQuestion() {
    const q = quizQuestions[state.currentQuestionIndex];
    
    // Update Header info
    document.getElementById('current-q-num').textContent = `${state.currentQuestionIndex + 1} / ${quizQuestions.length}`;
    document.getElementById('current-score-val').textContent = state.score;
    document.getElementById('question-id-text').textContent = `Питання #${q.id}`;
    
    const badge = document.getElementById('question-level-badge');
    badge.textContent = q.levelText;
    badge.className = `level-badge badge-${q.level}`;

    // Question Title
    document.getElementById('question-text').textContent = q.question;

    // Code snippet visibility
    const codeBox = document.getElementById('question-code-box');
    const codeEl = document.getElementById('question-code');
    if (q.code) {
        codeEl.textContent = q.code;
        codeBox.classList.remove('hidden');
    } else {
        codeBox.classList.add('hidden');
    }

    // Progress fills
    const progressPercent = ((state.currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progressPercent}%`;

    // Options Rendering
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    const isAnswered = state.answers[state.currentQuestionIndex] !== null;
    const selectedOpt = state.answers[state.currentQuestionIndex];

    q.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (isAnswered) btn.classList.add('disabled');

        const prefix = String.fromCharCode(65 + idx); // A, B, C, D
        
        btn.innerHTML = `
            <span class="option-prefix">${prefix}</span>
            <span>${escapeHtml(optText)}</span>
        `;

        if (isAnswered) {
            if (idx === q.correct) {
                btn.classList.add('correct');
            } else if (idx === selectedOpt) {
                btn.classList.add('incorrect');
            }
        }

        btn.addEventListener('click', () => handleSelectOption(idx));
        optionsContainer.appendChild(btn);
    });

    // Feedback Rendering
    const feedbackBox = document.getElementById('feedback-box');
    if (isAnswered) {
        feedbackBox.classList.remove('hidden');
        const isCorrect = selectedOpt === q.correct;
        feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
        document.getElementById('feedback-status').textContent = isCorrect ? 'Правильно! 🎉' : 'Спробуй ще раз! ❌';
        document.getElementById('feedback-text').textContent = q.explanation;
    } else {
        feedbackBox.classList.add('hidden');
    }

    // Navigation buttons state
    document.getElementById('btn-prev-q').disabled = state.currentQuestionIndex === 0;
    
    const nextBtn = document.getElementById('btn-next-q');
    if (state.currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.textContent = 'Завершити та переглянути результат 📊';
    } else {
        nextBtn.textContent = 'Далі →';
    }

    renderDots();
}

function handleSelectOption(optIdx) {
    // Prevent double answering
    if (state.answers[state.currentQuestionIndex] !== null) return;

    state.answers[state.currentQuestionIndex] = optIdx;
    const q = quizQuestions[state.currentQuestionIndex];

    if (optIdx === q.correct) {
        state.score += 1;
    }

    saveState();
    renderQuestion();
    updateGlobalProgress();
}

function nextQuestion() {
    if (state.currentQuestionIndex < quizQuestions.length - 1) {
        state.currentQuestionIndex++;
        renderQuestion();
    } else {
        navigateTo('result');
    }
}

function prevQuestion() {
    if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
        renderQuestion();
    }
}

function renderDots() {
    const container = document.getElementById('question-dots-container');
    container.innerHTML = '';
    
    quizQuestions.forEach((q, idx) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        
        if (idx === state.currentQuestionIndex) dot.classList.add('active');
        
        const ans = state.answers[idx];
        if (ans !== null) {
            if (ans === q.correct) {
                dot.classList.add('answered-correct');
            } else {
                dot.classList.add('answered-incorrect');
            }
        }
        
        dot.addEventListener('click', () => {
            state.currentQuestionIndex = idx;
            renderQuestion();
        });
        
        container.appendChild(dot);
    });
}

// Global Progress Updating
function updateGlobalProgress() {
    const answeredCount = state.answers.filter(a => a !== null).length;
    const percent = Math.round((answeredCount / quizQuestions.length) * 100);
    
    document.getElementById('home-progress-percent').textContent = `${percent}%`;
    document.getElementById('home-progress-fill').style.width = `${percent}%`;
}

// Result Page View Management
function updateResultView() {
    const total = quizQuestions.length;
    const answeredCount = state.answers.filter(a => a !== null).length;
    const correctCount = state.score;
    const incorrectCount = answeredCount - correctCount;
    const percentage = Math.round((correctCount / total) * 100);

    // Set Date
    const today = new Date();
    document.getElementById('report-date').textContent = today.toLocaleDateString('uk-UA');

    // Input Name sync
    const nameInput = document.getElementById('student-name-input');
    nameInput.value = state.studentName;
    document.getElementById('print-student-name').textContent = state.studentName || 'Не вказано';

    // Numbers
    document.getElementById('stat-correct').textContent = `${correctCount} / ${total}`;
    document.getElementById('stat-incorrect').textContent = `${incorrectCount} / ${total}`;
    document.getElementById('stat-score').textContent = `${correctCount} балів`;
    document.getElementById('result-percent-val').textContent = `${percentage}%`;
    document.getElementById('stat-status').textContent = answeredCount === total ? 'Завершено' : 'В процесі';

    // Update Donut Gradient
    const donut = document.getElementById('donut-chart');
    donut.style.background = `conic-gradient(var(--primary) ${percentage}%, var(--bg-secondary) ${percentage}%)`;

    // Determine Evaluation Level
    const evalBox = document.getElementById('evaluation-box');
    const evalIcon = document.getElementById('eval-icon');
    const evalTitle = document.getElementById('eval-title');
    const evalDesc = document.getElementById('eval-description');

    evalBox.className = 'evaluation-card ';

    if (answeredCount === 0) {
        evalBox.classList.add('eval-neutral');
        evalIcon.textContent = '🎯';
        evalTitle.textContent = 'Пройдіть практичний тест';
        evalDesc.textContent = 'Дайте відповіді на 15 запитань у розділі «Практика», щоб отримати розширений висновок.';
    } else if (correctCount >= 13) {
        evalBox.classList.add('eval-excellent');
        evalIcon.textContent = '🏆';
        evalTitle.textContent = 'Відмінно!';
        evalDesc.textContent = 'Ти чудово володієш списками Python! Відмінна робота з індексацією, методами та циклами.';
    } else if (correctCount >= 10) {
        evalBox.classList.add('eval-good');
        evalIcon.textContent = '🌟';
        evalTitle.textContent = 'Дуже добре!';
        evalDesc.textContent = 'Ти впевнено працюєш зі списками! Зверни увагу на складніші методи видалення та індекси.';
    } else if (correctCount >= 7) {
        evalBox.classList.add('eval-fair');
        evalIcon.textContent = '📚';
        evalTitle.textContent = 'Непогано!';
        evalDesc.textContent = 'Є теми, які варто повторити. Рекомендуємо ще раз переглянути розділ «Теорія».';
    } else {
        evalBox.classList.add('eval-poor');
        evalIcon.textContent = '💡';
        evalTitle.textContent = 'Потрібно ще потренуватися!';
        evalDesc.textContent = 'Повтори теоретичний матеріал про індекси, append() та len(), після чого спробуй ще раз!';
    }
}

function updateStudentName(val) {
    state.studentName = val;
    document.getElementById('print-student-name').textContent = val || 'Не вказано';
    localStorage.setItem('py_student_name', val);
}

function restartQuiz() {
    if (confirm('Ви впевнені, що хочете скинути результати тесту та пройти його знову?')) {
        state.currentQuestionIndex = 0;
        state.answers = Array(15).fill(null);
        state.score = 0;
        saveState();
        renderQuestion();
        updateGlobalProgress();
        navigateTo('practice');
    }
}

// LocalStorage helpers
function saveState() {
    localStorage.setItem('py_quiz_answers', JSON.stringify(state.answers));
    localStorage.setItem('py_quiz_score', state.score.toString());
}

function loadSavedState() {
    const savedAns = localStorage.getItem('py_quiz_answers');
    const savedScore = localStorage.getItem('py_quiz_score');
    
    if (savedAns) {
        try {
            state.answers = JSON.parse(savedAns);
        } catch(e) {}
    }
    if (savedScore) {
        state.score = parseInt(savedScore, 10) || 0;
    }
    updateGlobalProgress();
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
