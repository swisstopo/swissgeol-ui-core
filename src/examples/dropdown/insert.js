const container = document.querySelector('#dropdowns');

const box = document.createElement('div');
box.style.display = 'flex';
box.style.gap = '0.5rem';

const toggleButton = document.createElement('sgc-button');
toggleButton.size = 'small';

box.insertAdjacentHTML(
  'beforeend',
  `<template>
    <sgc-dropdown>
      <sgc-button style="width: auto">Inserted Dropdown</sgc-button>
      <sgc-dropdown-item>
        One
      </sgc-dropdown-item>
      <sgc-dropdown-item>
        Two
      </sgc-dropdown-item>
      <sgc-dropdown-item>
        Three
      </sgc-dropdown-item>
    </sgc-dropdown>
  </template>`,
);

let dropdown = null;

const insert = () => {
  toggleButton.innerText = 'Remove';
  toggleButton.color = 'primary';

  const template = box.querySelector('template');
  dropdown = template.content.cloneNode(true).querySelector('sgc-dropdown');
  box.appendChild(dropdown);
};

const remove = () => {
  toggleButton.innerText = 'Insert';
  toggleButton.color = 'secondary';
  dropdown?.remove();
  dropdown = null;
};

let isInserted = false;
toggleButton.onclick = () => {
  if (isInserted) {
    remove();
  } else {
    insert();
  }
  isInserted = !isInserted;
};
remove();

box.appendChild(toggleButton);
container.appendChild(box);
