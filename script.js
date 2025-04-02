const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemsList = document.getElementById('item-list');
const clearAllBtn = document.getElementById('clear');
const filterDiv = document.querySelector('.filter');
const sortbtn1 = document.getElementById('sort-btn1');
const sortbtn2 = document.getElementById('sort-btn2');
//let itemsFromStorageArr;
let isEditMode = false;

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

// add Item to list and local storage handler

const addListItem = (e) => {
  e.preventDefault();
  if (isEditMode) {
    const oldItem = itemsList.querySelector('.edit-mode');
    removeItemFromStorage(oldItem.textContent);
    //oldItem.classList.remove('.edit-mode');
    //oldItem.remove();
    //checkUI();
    isEditMode = false;
    const inputFormButton = itemForm.querySelector('button');
    inputFormButton.style.backgroundColor = 'black';
    inputFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Update item';
    filterDiv.querySelector('input').value = '';
  }
  const newItem = itemInput.value;
  const time = new Date();
  const itemObj = { name: newItem, adTime: time };
  newItem === ''
    ? alert('Please enter a valid name.')
    : (addItemToStorage(itemObj), displayItemsFromStorage());
  checkUI();
  itemInput.value = '';
  sortbtn1.style.background = 'black';
  sortbtn2.style.background = 'black';
};

// Update List Item

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

// remove individual list item from list and local storage handler

const removeListItem = (e) => {
  if (
    confirm(
      `Do you want to remove ${e.target.parentNode.parentElement.textContent} from the list?`
    )
  ) {
    //e.target.parentNode.parentElement.remove();
    removeItemFromStorage(e.target.parentNode.parentElement.textContent);
    displayItemsFromStorage();
    filterDiv.querySelector('input').value = '';
    itemInput.value = '';
    const inputFormButton = itemForm.querySelector('button');
    inputFormButton.style.backgroundColor = 'black';
    inputFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Update item';
    checkUI();
  }
  e.stopPropagation();
};

// clear All items handler

const clearAllItems = (e) => {
  if (confirm('Do you want to remove all items from the list?')) {
    //Array.from(itemsList.children).forEach((item) => item.remove());
    //localStorage.clear();
    localStorage.setItem('items', JSON.stringify([]));
    displayItemsFromStorage();
    sortbtn1.style.background = 'black';
    sortbtn2.style.background = 'black';
    //checkUI();
  }
};
// function sortAZ

const sortAZ = (e) => {
  e.preventDefault();
  const arr = JSON.parse(localStorage.getItem('items'));
  console.log('Sorting AZ');
  arr.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  localStorage.setItem('items', JSON.stringify(arr));
  displayItemsFromStorage();
  filterInput.value = '';
  sortbtn1.style.background = '#b02d2d';
  sortbtn2.style.background = '#4e4eb6';
};

//function sortDate

const sortDate = (e) => {
  e.preventDefault();
  const arr = JSON.parse(localStorage.getItem('items'));
  console.log('Sorting Date');

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
clearAllBtn.addEventListener('click', clearAllItems);
sortbtn1.addEventListener('click', sortAZ);
sortbtn2.addEventListener('click', sortDate);
