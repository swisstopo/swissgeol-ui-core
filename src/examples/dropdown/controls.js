const controls = document.querySelector('#controls');

function changePosition(event) {
  const position = event.target.value === 'default' ? null : event.target.value;
  document.querySelectorAll('sgc-dropdown').forEach((dropdown) => {
    dropdown.position = position;
  });
}

controls.insertAdjacentHTML(
  'beforeend',
  `<label style="display: flex; flex-direction: column;">
    Position
    <select onchange="changePosition(event)">
      <option value="default" selected>default</option>
      <option value="top">top</option>
      <option value="bottom">bottom</option>
      <option value="left">left</option>
      <option value="right">right</option>
    </select>
  </label>`,
);

function changeAlignment(event) {
  const align = event.target.value === 'default' ? null : event.target.value;
  document.querySelectorAll('sgc-dropdown').forEach((dropdown) => {
    dropdown.align = align;
  });
}

controls.insertAdjacentHTML(
  'beforeend',
  `<label style="display: flex; flex-direction: column;">
    Alignment
    <select onchange="changeAlignment(event)">
      <option value="default" selected>default</option>
      <option value="start">start</option>
      <option value="end">end</option>
      <option value="center">center</option>
    </select>
  </label>`,
);
