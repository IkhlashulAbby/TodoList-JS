const form = document.querySelector('.main-form');
const inputUser = document.getElementById('input-user');
const listGroup = document.querySelector('.list-group');
let list_item = [];

// local storage

if (localStorage.getItem('todolist items')) {
  const itemLocal = JSON.parse(localStorage.getItem('todolist items'));

  itemLocal.forEach((item) => {
    listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
        ${item}<span class="fs-5"><i class="bi bi-x-square-fill text-danger i-style" id="btn-delete"></i></span>
      </li>`;

    list_item.push(item);
  });
}

const manageLocalStorage = (action, item) => {
  switch (action) {
    case 'ADD':
      list_item.push(item);
      break;
    case 'DELETE':
      list_item = list_item.filter((todoItem) => {
        return todoItem != item;
      });
      break;
  }
  localStorage.setItem('todolist items', JSON.stringify(list_item));
};

//Todo List
form.addEventListener('submit', (e) => {
  if (inputUser.value.length) {
    listGroup.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
      ${inputUser.value}<span class="fs-5"><i class="bi bi-x-square-fill text-danger i-style" id="btn-delete"></i></span>
    </li>`;
  }

  //menambah item baru ke local storage
  manageLocalStorage('ADD', inputUser.value);

  inputUser.value = '';
  e.preventDefault();
});

listGroup.addEventListener('click', (e) => {
  if (e.target.id == 'btn-delete') {
    e.target.parentElement.parentElement.remove();
    manageLocalStorage('DELETE', e.target.parentElement.parentElement.textContent.trim());
  }
});

/* ==================== Dark Mode ==================== */
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
  dayNight.querySelector('i').classList.toggle('fa-sun');
  dayNight.querySelector('i').classList.toggle('fa-moon');
  document.body.classList.toggle('dark');
  document.querySelector('h1').classList.toggle('dark');
  document.querySelector('h2').classList.toggle('dark');
  document.querySelector('.card').classList.toggle('dark');
  document.querySelector('.btn').classList.toggle('dark');
});
window.addEventListener('load', () => {
  if (document.body.classList.contains('dark')) {
    dayNight.querySelector('i').classList.add('fa-sun');
  } else {
    dayNight.querySelector('i').classList.add('fa-moon');
  }
});
