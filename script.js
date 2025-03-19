const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;
  newItem === ''
    ? alert('Please enter a valid name.')
    : itemList.appendChild(listItem(newItem));
  itemInput.value = '';
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  button.appendChild(createIcon('fa-solid fa-xmark'));
  return button;
};

const listItem = (newItem) => {
  const li = document.createElement('li');
  li.append(document.createTextNode(newItem));
  li.appendChild(createButton('remove-item btn-link text-red'));

  return li;
};

itemForm.addEventListener('submit', addItem);
