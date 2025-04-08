// Get access to elements
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const filterInput = document.getElementById('filter');
const itemsList = document.getElementById('item-list');
const clearAllBtn = document.getElementById('clear');
const filterDiv = document.querySelector('.filter');
const sortbtn1 = document.getElementById('sort-btn1');
const sortbtn2 = document.getElementById('sort-btn2');
let isEditMode = false;

// Function to create a list item

const createListItem = (newItem, time) => {
  const li = document.createElement('li');
  li.addEventListener('click', updateListItem);
  li.append(document.createTextNode(newItem));
  const button = document.createElement('button');
  button.className = 'remove-item btn-link text-red';
  const icon = document.createElement('i');
  icon.className = 'fa-solid fa-xmark';
  icon.addEventListener('click', removeListItem);
  button.appendChild(icon);
  li.appendChild(button);
  li.setAttribute('title', `added ${time}`);

  return li;
};

// add item to local storage

const addItemToStorage = (itemObj) => {
  let itemsFromStorage;
  localStorage.getItem('items') === null
    ? (itemsFromStorage = [])
    : (itemsFromStorage = JSON.parse(localStorage.getItem('items')));

  if (
    itemsFromStorage.filter((item) => item.name === itemObj.name).length > 0
  ) {
    alert('entry exists.');
  } else {
    itemsFromStorage.push(itemObj);
  }

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  return;
};

//remove item from local storage

const removeItemFromStorage = (item) => {
  itemsFromStorageArr = JSON.parse(localStorage.getItem('items'));
  itemsFromStorageArr = itemsFromStorageArr.filter((i) => i.name !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorageArr));
};

// display items form local storage

const displayItemsFromStorage = () => {
  Array.from(itemsList.children).forEach((item) => item.remove());
  localStorage.getItem('items') === null
    ? (itemsFromStorageArr = [])
    : (itemsFromStorageArr = JSON.parse(localStorage.getItem('items')));
  itemsFromStorageArr.forEach((item) => {
    itemsList.appendChild(createListItem(item.name, item.adTime));
  });
  checkUI();
};

// handler to append an Item to the list and save to local storage

const addListItem = (e) => {
  e.preventDefault();
  const oldItem = itemsList.querySelector('.edit-mode');
  const newItem = itemInput.value;
  const time = new Date();
  const itemObj = { name: newItem, adTime: time };

  if (isEditMode) {
    isEditMode = false;
    const inputFormButton = itemForm.querySelector('button');
    inputFormButton.style.backgroundColor = 'black';
    inputFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
    filterDiv.querySelector('input').value = '';
    if (oldItem && newItem !== '') {
      removeItemFromStorage(oldItem.textContent);
    }
  }

  if (newItem === '') {
    alert('Please enter a valid name.');
    if (oldItem) {
      oldItem.classList.remove('edit-mode');
    }
  } else {
    addItemToStorage(itemObj);
    displayItemsFromStorage();
  }
  checkUI();
  itemInput.value = '';
  sortbtn1.style.background = 'black';
  sortbtn2.style.background = 'black';
};

// Handler to Update a List Item

const updateListItem = (e) => {
  isEditMode = true;

  itemsList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  e.target.classList.add('edit-mode');
  itemInput.value = e.target.textContent;
  const inputFormButton = itemForm.querySelector('button');
  inputFormButton.style.backgroundColor = 'green';
  inputFormButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
};

// Handler remove individual list item from list and local storage

const removeListItem = (e) => {
  if (
    confirm(
      `Do you want to remove ${e.target.parentNode.parentElement.textContent} from the list?`
    )
  ) {
    removeItemFromStorage(e.target.parentNode.parentElement.textContent);
    displayItemsFromStorage();
    filterDiv.querySelector('input').value = '';
    itemInput.value = '';
    const inputFormButton = itemForm.querySelector('button');
    inputFormButton.style.backgroundColor = 'black';
    inputFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
    checkUI();
  }
  e.stopPropagation();
};

// Handler to filter list items
const filterInputHandler = (e) => {
  const filterStr = e.target.value.toLowerCase();
  const items = itemsList.querySelectorAll('li');
  items.forEach((item) => {
    item.textContent.toLowerCase().includes(filterStr)
      ? (item.style.display = 'flex')
      : (item.style.display = 'none');
  });
};

// Handler to clear All list items

const clearAllItems = (e) => {
  if (confirm('Do you want to remove all items from the list?')) {
    localStorage.setItem('items', JSON.stringify([]));
    displayItemsFromStorage();
    sortbtn1.style.background = 'black';
    sortbtn2.style.background = 'black';
  }
};
// Handler to sort list items in alphabetical order

const sortAZ = (e) => {
  e.preventDefault();
  const arr = JSON.parse(localStorage.getItem('items'));
  arr.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  localStorage.setItem('items', JSON.stringify(arr));
  displayItemsFromStorage();
  filterInput.value = '';
  sortbtn1.style.background = '#b02d2d';
  sortbtn2.style.background = '#4e4eb6';
};

// Handler to sort list items based on time and date

const sortDate = (e) => {
  e.preventDefault();
  const arr = JSON.parse(localStorage.getItem('items'));
  arr.sort(
    (a, b) => Number(Date.parse(a.adTime)) - Number(Date.parse(b.adTime))
  );
  localStorage.setItem('items', JSON.stringify(arr));

  displayItemsFromStorage();
  filterInput.value = '';
  sortbtn1.style.background = '#4e4eb6';
  sortbtn2.style.background = '#b02d2d';
};
// function checkUI to show/hide irrelevant elements

const checkUI = () => {
  const items = itemsList.querySelectorAll('li');
  if (items.length < 2) {
    clearAllBtn.style.display = 'none';
    filterDiv.style.display = 'none';
    sortbtn1.style.display = 'none';
    sortbtn2.style.display = 'none';
  } else {
    clearAllBtn.style.display = 'block';
    filterDiv.style.display = 'block';
    sortbtn1.style.display = 'block';
    sortbtn2.style.display = 'block';
  }
};

checkUI();
itemForm.addEventListener('submit', addListItem);
filterInput.addEventListener('input', filterInputHandler);
clearAllBtn.addEventListener('click', clearAllItems);
sortbtn1.addEventListener('click', sortAZ);
sortbtn2.addEventListener('click', sortDate);
window.addEventListener('DOMContentLoaded', displayItemsFromStorage);
