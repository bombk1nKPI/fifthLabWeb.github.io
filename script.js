
function swapContent() {
  const navContent = document.querySelector('.nav-content');
  const otherContent = document.querySelector('.other-content');
  if (navContent && otherContent) {
    const tempContent = navContent.innerHTML;
    navContent.innerHTML = otherContent.innerHTML;
    otherContent.innerHTML = tempContent;
    console.log('Контент успішно обмінено!');
  } else {
    console.error('Не знайдено один з елементів');
  }
}

function calculateParallelogramArea() {
  const base = 10;
  const height = 10;
  const area = base * height;
  const mainContent = document.querySelector('.main-content');
  {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'parallelogram-result';
    resultDiv.innerHTML = `
      <h3>Площа паралелограма</h3>
      <p>Основа: ${base}</p>
      <p>Висота: ${height}</p>
      <p><strong>Площа: ${area}</strong></p>
    `;
    mainContent.appendChild(resultDiv);
  }
}

function createMaxDigitForm() {
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    const form = document.createElement('form');
    form.id = 'max-digit-form';
    const label = document.createElement('label');
    label.setAttribute('for', 'natural-number');
    label.textContent = 'Введіть натуральне число:';
    const input = document.createElement('input');
    input.type = 'number';
    input.id = 'natural-number';
    input.name = 'natural-number';
    input.min = '0';
    input.required = true;
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'Знайти максимальну цифру';
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    mainContent.appendChild(form);
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const value = input.value.trim();
      if (!/^[0-9]+$/.test(value)) {
        alert('Введіть коректне натуральне число!');
        return;
      }
      const maxDigit = Math.max(...value.split('').map(Number));
      alert('Максимальна цифра: ' + maxDigit);
      document.cookie = 'maxDigit=' + maxDigit + '; path=/';
    });
  }
}
}

function createAlignmentForm() {
  const mainContent = document.querySelector('.main-content');
function createAlignmentForm() {
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    const formContainer = document.createElement('div');
    formContainer.id = 'alignment-form-container';
    const title = document.createElement('h3');
    title.textContent = 'Налаштування вирівнювання блоків';
    formContainer.appendChild(title);
    const form = document.createElement('form');
    form.id = 'alignment-form';
    const blocks = [
      { id: 'aside-left', label: 'Лівий sidebar (aside.left)', selector: 'aside.left .left-content' },
      { id: 'aside-right', label: 'Правий sidebar (aside.right)', selector: 'aside.right .right-content' },
      { id: 'main-content', label: 'Основний контент (div.main-content)', selector: '.main-content' }
    ];
    blocks.forEach(block => {
      const fieldset = document.createElement('fieldset');
      const legend = document.createElement('legend');
      legend.textContent = block.label;
      fieldset.appendChild(legend);
      const rightAlignDiv = document.createElement('div');
      const rightRadio = document.createElement('input');
      rightRadio.type = 'radio';
      rightRadio.name = block.id;
      rightRadio.value = 'right';
      rightRadio.id = `${block.id}-right`;
      const rightLabel = document.createElement('label');
      rightLabel.setAttribute('for', `${block.id}-right`);
      rightLabel.textContent = ' Вирівнювання по правому краю';
      rightAlignDiv.appendChild(rightRadio);
      rightAlignDiv.appendChild(rightLabel);
      fieldset.appendChild(rightAlignDiv);
      const defaultAlignDiv = document.createElement('div');
      const defaultRadio = document.createElement('input');
      defaultRadio.type = 'radio';
      defaultRadio.name = block.id;
      defaultRadio.value = 'default';
      defaultRadio.id = `${block.id}-default`;
      defaultRadio.checked = true;
      const defaultLabel = document.createElement('label');
      defaultLabel.setAttribute('for', `${block.id}-default`);
      defaultLabel.textContent = ' За замовчуванням (по центру)';
      defaultAlignDiv.appendChild(defaultRadio);
      defaultAlignDiv.appendChild(defaultLabel);
      fieldset.appendChild(defaultAlignDiv);
      form.appendChild(fieldset);
    });
    formContainer.appendChild(form);
    mainContent.appendChild(formContainer);
    blocks.forEach(block => {
      const radios = document.querySelectorAll(`input[name="${block.id}"]`);
      radios.forEach(radio => {
        radio.addEventListener('mouseout', function() {
          if (this.checked) {
            const element = document.querySelector(block.selector);
            if (element) {
              if (this.value === 'right') {
                element.style.alignItems = 'flex-end';
                element.style.textAlign = 'right';
              } else {
                element.style.alignItems = 'center';
                element.style.textAlign = 'center';
              }
              localStorage.setItem(block.id, this.value);
              console.log(`Збережено ${block.id}: ${this.value}`);
            }
          }
        });
      });
    });
  }
}
}

function restoreAlignmentSettings() {
  const blocks = [
    { id: 'aside-left', selector: 'aside.left .left-content' },
    { id: 'aside-right', selector: 'aside.right .right-content' },
    { id: 'main-content', selector: '.main-content' }
  ];
  blocks.forEach(block => {
    const savedValue = localStorage.getItem(block.id);
    if (savedValue) {
      const element = document.querySelector(block.selector);
      if (element) {
        if (savedValue === 'right') {
          element.style.alignItems = 'flex-end';
          element.style.textAlign = 'right';
        } else {
          element.style.alignItems = 'center';
          element.style.textAlign = 'center';
        }
        const radio = document.querySelector(`input[name="${block.id}"][value="${savedValue}"]`);
        if (radio) {
          radio.checked = true;
        }
        console.log(`Відновлено ${block.id}: ${savedValue}`);
      }
    }
  });
}

function createNumberedListForm(targetBlock) {
  const existingForm = document.getElementById('numbered-list-form-container');
  if (existingForm) {
    existingForm.remove();
  }
  
  const formContainer = document.createElement('div');
  formContainer.id = 'numbered-list-form-container';
  formContainer.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border: 2px solid #007acc;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
    max-width: 500px;
    width: 90%;
  `;
  
  const title = document.createElement('h3');
  title.textContent = `Створення нумерованого списку для блоку: ${targetBlock.className}`;
  title.style.marginTop = '0';
  formContainer.appendChild(title);
  
  const listItemsContainer = document.createElement('div');
  listItemsContainer.id = 'list-items-container';
  formContainer.appendChild(listItemsContainer);
  
  addListItemInput(listItemsContainer);
  
  const addItemBtn = document.createElement('button');
  addItemBtn.type = 'button';
  addItemBtn.textContent = '+ Додати пункт';
  addItemBtn.style.cssText = 'margin: 10px 5px 10px 0; padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;';
  addItemBtn.addEventListener('click', () => addListItemInput(listItemsContainer));
  formContainer.appendChild(addItemBtn);
  
  const saveBtn = document.createElement('button');
  saveBtn.type = 'button';
  saveBtn.textContent = 'Зберегти список';
  saveBtn.style.cssText = 'margin: 10px 5px; padding: 8px 15px; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;';
  saveBtn.addEventListener('click', () => saveNumberedList(targetBlock, listItemsContainer, formContainer));
  formContainer.appendChild(saveBtn);
  
  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Скасувати';
  cancelBtn.style.cssText = 'margin: 10px 5px; padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;';
  cancelBtn.addEventListener('click', () => formContainer.remove());
  formContainer.appendChild(cancelBtn);
  
  const overlay = document.createElement('div');
  overlay.id = 'form-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  `;
  overlay.addEventListener('click', () => {
    formContainer.remove();
    overlay.remove();
  });
  
  document.body.appendChild(overlay);
  document.body.appendChild(formContainer);
}

function addListItemInput(container) {
  const itemDiv = document.createElement('div');
  itemDiv.style.cssText = 'margin: 10px 0; display: flex; gap: 10px; align-items: center;';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'list-item-input';
  input.placeholder = 'Введіть текст пункту списку';
  input.style.cssText = 'flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;';
  
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.textContent = '✕';
  removeBtn.style.cssText = 'padding: 8px 12px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;';
  removeBtn.addEventListener('click', () => {
    if (container.children.length > 1) {
      itemDiv.remove();
    } else {
      alert('Має бути хоча б один пункт списку!');
    }
  });
  
  itemDiv.appendChild(input);
  itemDiv.appendChild(removeBtn);
  container.appendChild(itemDiv);
}

function saveNumberedList(targetBlock, listItemsContainer, formContainer) {
  const inputs = listItemsContainer.querySelectorAll('.list-item-input');
  const items = [];
  
  inputs.forEach(input => {
    const value = input.value.trim();
    if (value) {
      items.push(value);
    }
  });
  
  if (items.length === 0) {
    alert('Додайте хоча б один пункт списку!');
    return;
  }
  
  const ol = document.createElement('ol');
  ol.style.cssText = 'margin: 15px 0; padding-left: 25px; text-align: left;';
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.style.cssText = 'margin: 5px 0;';
    ol.appendChild(li);
  });
  
  targetBlock.appendChild(ol);
  
  const blockClass = targetBlock.className;
  const storageKey = `numberedList_${blockClass}`;
  
  let storedLists = JSON.parse(localStorage.getItem(storageKey) || '[]');
  
  storedLists.push({
    items: items,
    timestamp: new Date().toISOString()
  });
  
  localStorage.setItem(storageKey, JSON.stringify(storedLists));
  
  console.log(`Список збережено в localStorage для блоку: ${blockClass}`);
  
  formContainer.remove();
  document.getElementById('form-overlay')?.remove();
  
  alert('Список успішно створено та збережено!');
}

function initializeSelectHandlers() {
  const blocks = [
    document.querySelector('aside.left .left-content'),
    document.querySelector('aside.right .right-content'),
    document.querySelector('.main-content'),
    document.querySelector('.nav-content'),
    document.querySelector('.other-content')
  ];
  blocks.forEach(block => {
    if (block) {
      block.style.userSelect = 'text';
      block.style.cursor = 'text';
      block.addEventListener('mouseup', function() {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        if (selectedText.length > 0) {
          const range = selection.getRangeAt(0);
          if (this.contains(range.commonAncestorContainer)) {
            console.log('Виділено текст в блоці:', this.className);
            createNumberedListForm(this);
          }
        }
      });
    }
  });
}

function clearNumberedListsFromStorage() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('numberedList_')) {
      localStorage.removeItem(key);
      console.log(`Видалено з localStorage: ${key}`);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  clearNumberedListsFromStorage();
  function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const maxDigit = getCookie('maxDigit');
  if (maxDigit !== undefined) {
    alert('Збережене значення у cookies: ' + maxDigit + '\nПісля натискання ОК дані будуть видалені з cookies.');
    document.cookie = 'maxDigit=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('Cookies видалено. Натисніть ОК для перезавантаження сторінки.');
    location.reload();
    return;
  }

  swapContent();
  calculateParallelogramArea();
  createMaxDigitForm();
  createAlignmentForm();
  setTimeout(restoreAlignmentSettings, 100);
  initializeSelectHandlers();
});
