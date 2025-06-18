const form = document.getElementById('form');
const people = document.getElementById('people');
const custom = document.getElementById('custom');
const list = document.getElementById('radio-list');
const items = document.querySelectorAll('.form__radio-item');
const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');
const inputs = document.querySelectorAll('input');

const validateValue = {
  bill: (value) => !!Number(value.trim()),
  people: (value) => !!Number(value.trim()),
  custom: (value) => !!Number(value.trim()),
  tips: (value) => !!Number(value.trim()),
};

const throwError = (key) => {
  if (key === 'custom') return true;
  const element = document.getElementById(`${key}-error`);
  element.textContent = 'Can’t be zero';
};

const successInput = (key) => {
  if (key === 'custom') return true;
  const element = document.getElementById(`${key}-error`);
  element.textContent = '';
};

list.addEventListener('click', (e) => {
  const target = e.target;
  const isChecked = list.querySelector('input:checked');
  if (target === custom && isChecked) {
    isChecked.removeAttribute('checked');
  } else if (target.name === 'tips') {
    items.forEach((item) => {
      if (item === target) {
        item.setAttribute('checked', true);
      } else {
        item.removeAttribute('checked');
      }
    });
  }
});

const getValuesFromForm = (form) => {
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
  Object.keys(data).forEach((key) => {
    if (!validateValue[key](data[key])) {
      throwError(key);
    } else {
      successInput(key);
    }
  });

  return data;
};

const countTheBill = (e) => {
  const data = getValuesFromForm(form);

  if (e.target.name === 'tips') {
    custom.value = '';
    delete data.custom;
  }

  const isCustom = data.custom ? data.custom : data.tips;

  const tips = (data.bill * (isCustom / 100)) / data.people;
  const sum = data.bill / data.people;

  if (!isFinite(tips) && !isFinite(sum)) return;

  tipAmount.textContent = `$${tips.toFixed(2)}`;
  total.textContent = `$${(sum + tips).toFixed(2)}`;
};

inputs.forEach((input) => {
  input.addEventListener('change', countTheBill);
});
