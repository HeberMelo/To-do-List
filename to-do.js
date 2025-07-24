const newTaskInput = document.getElementById('newTask');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('themeToggle');
const toggleCircle = document.getElementById('toggleCircle');
const themeIcon = document.getElementById('themeIcon');

let tasks = [];
let currentFilter = 'all';
let darkMode = false;

function renderTasks() {
  taskList.innerHTML = '';
  tasks
    .filter(task => {
      if (currentFilter === 'completed') return task.completed;
      if (currentFilter === 'active') return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-3';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.className = 'w-5 h-5 accent-blue-500';
      checkbox.onchange = () => {
        task.completed = !task.completed;
        renderTasks();
      };

      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white';

      left.appendChild(checkbox);
      left.appendChild(span);

      const right = document.createElement('div');
      right.className = 'space-x-3';

      const editBtn = document.createElement('button');
      editBtn.className = 'text-yellow-500 hover:text-yellow-600';
      editBtn.innerHTML = '✏️';
      editBtn.setAttribute('aria-label', 'Editar');
      editBtn.onclick = () => {
        const newText = prompt('Editar tarea:', task.text);
        if (newText !== null && newText.trim() !== '') {
          task.text = newText.trim();
          renderTasks();
        }
      };

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️';
      deleteBtn.className = 'text-red-500 hover:text-red-600';
      deleteBtn.setAttribute('aria-label', 'Eliminar');
      deleteBtn.onclick = () => {
        tasks.splice(index, 1);
        renderTasks();
      };

      right.appendChild(editBtn);
      right.appendChild(deleteBtn);

      li.appendChild(left);
      li.appendChild(right);
      taskList.appendChild(li);
    });
}

addTaskBtn.onclick = () => {
  const text = newTaskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    newTaskInput.value = '';
    renderTasks();
  }
};

newTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskBtn.click();
});

filterBtns.forEach(btn => {
  btn.onclick = () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  };
});

themeToggle.onclick = () => {
  document.documentElement.classList.toggle('dark');
  darkMode = !darkMode;
  themeToggle.classList.toggle('toggle-dark');
  themeIcon.textContent = darkMode ? '🌙' : '☀️';
};

renderTasks();
