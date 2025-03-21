const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemsList = document.getElementById('item-list');
const clearAllBtn = document.getElementById('clear');
const filterDiv = document.querySelector('.filter');

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  icon.addEventListener('click', removeItem);
  return icon;
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  button.appendChild(createIcon('fa-solid fa-xmark'));
  return button;
};

const listItem = (newItem) => {
  const time = new Date();
  const li = document.createElement('li');
  li.append(document.createTextNode(newItem));
  li.appendChild(createButton('remove-item btn-link text-red'));
  li.setAttribute('title', `added at ${time}`);

  return li;
};

// add Item handler

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;
  newItem === ''
    ? alert('Please enter a valid name.')
    : itemsList.appendChild(listItem(newItem));
  checkUI();
  itemInput.value = '';
};

// remove individual item handler

const removeItem = (e) => {
  if (
    confirm(
      `Do you want to remove ${e.target.parentNode.parentElement.textContent} from the list?`
    )
  ) {
    e.target.parentNode.parentElement.remove();
    checkUI();
  }
};

// clear All items handler

const clearAllItems = (e) => {
  if (confirm('Do you want to remove all items from the list?')) {
    Array.from(itemsList.children).forEach((item) => item.remove());
    e.target.remove();
    checkUI();
  }
};

// function checkUI to show/hide irrelevant elements

const checkUI = () => {
  const items = itemsList.querySelectorAll('li');
  if (items.length < 2) {
    clearAllBtn.style.display = 'none';
    filterDiv.style.display = 'none';
  } else {
    clearAllBtn.style.display = 'block';
    filterDiv.style.display = 'block';
  }
};

itemForm.addEventListener('submit', addItem);
clearAllBtn.addEventListener('click', clearAllItems);
window.addEventListener('DOMContentLoaded', checkUI);
