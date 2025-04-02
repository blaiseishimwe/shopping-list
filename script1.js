const filterInput = document.getElementById('filter');

const filterInputHandler = (e) => {
  //e.preventDefault();
  const filterStr = e.target.value.toLowerCase();
  const items = itemsList.querySelectorAll('li');
  items.forEach((item) => {
    //console.log(item.style.display);
    item.textContent.toLowerCase().includes(filterStr)
      ? (item.style.display = 'flex')
      : (item.style.display = 'none');
  });
};
filterInput.addEventListener('input', filterInputHandler);

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
};

// display items form local storage

let itemsFromStorageArr;

const displayItemsFromStorage = () => {
  Array.from(itemsList.children).forEach((item) => item.remove());
  localStorage.getItem('items') === null
    ? (itemsFromStorageArr = [])
    : (itemsFromStorageArr = JSON.parse(localStorage.getItem('items')));
  //itemsFromStorageArr = JSON.parse(localStorage.getItem('items'));
  itemsFromStorageArr.forEach((item) => {
    itemsList.appendChild(createListItem(item.name, item.adTime));
  });
  checkUI();
};

//remove item from local storage

const removeItemFromStorage = (item) => {
  itemsFromStorageArr = JSON.parse(localStorage.getItem('items'));
  itemsFromStorageArr = itemsFromStorageArr.filter((i) => i.name !== item);
  localStorage.setItem('items', JSON.stringify(itemsFromStorageArr));
};

window.addEventListener('DOMContentLoaded', displayItemsFromStorage);
