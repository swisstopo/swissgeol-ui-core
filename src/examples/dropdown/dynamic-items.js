(() => {
  document.querySelector('#dropdowns').insertAdjacentHTML(
    'beforeend',
    `<sgc-dropdown id="dynamic-items">
      <sgc-button id="dynamic-item-trigger" style="width: auto">Dynamic Items</sgc-button>
      <sgc-dropdown-item id="dynamic-content">
        Dynamic Content
      </sgc-dropdown-item>
      <sgc-dropdown-item id="dynamic-attributes">
        Dynamic Attributes
      </sgc-dropdown-item>
    </sgc-dropdown>`,
  );

  const dropdown = document.querySelector('#dynamic-items');
  const trigger = document.querySelector('#dynamic-item-trigger');

  let isOpen = false;
  const toggleOpen = (isNowOpen) => {
    isOpen = isNowOpen;
    dropdown.isOpen = isOpen;
    trigger.isActive = isOpen;
  };

  trigger.addEventListener('buttonClick', () => {
    toggleOpen(!isOpen);
  });
  dropdown.addEventListener('sgcToggle', (event) => {
    toggleOpen(event.detail);
  });

  let direction = 1;
  const dynamicItems = [];
  setInterval(() => {
    if (direction === 1) {
      const item = document.createElement('sgc-dropdown-item');
      item.innerHTML = `Dynamic Item #${dynamicItems.length + 1}`;
      dropdown.append(item);
      dynamicItems.push(item);
    } else {
      dynamicItems[0].remove();
      dynamicItems.splice(0, 1);

      for (let i = 0; i < dynamicItems.length; i++) {
        dynamicItems[i].innerHTML = `Dynamic Item #${i + 1}`;
      }
    }
    if (dynamicItems.length === 0 || dynamicItems.length === 4) {
      direction *= -1;
    }
  }, 750);

  const dynamicContentItem = dropdown.querySelector('#dynamic-content');
  let j = 0;
  setInterval(() => {
    j += 1;
    switch (j) {
      case 0:
        dynamicContentItem.innerHTML = `Dynamic Content`;
        break;
      case 1:
        dynamicContentItem.innerHTML = `Dynamic Content?`;
        break;
      case 2:
        dynamicContentItem.innerHTML = `DYNAmic cONTeNT!`;
        j = -1;
        break;
    }
  }, 1000);

  const dynamicAttributesItem = dropdown.querySelector('#dynamic-attributes');
  setInterval(() => {
    dynamicAttributesItem.classList.toggle('is-highlighted');
  }, 500);
})();
