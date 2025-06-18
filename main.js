const form = document.getElementById('form');
const people = document.getElementById('people');
const custom = document.getElementById('custom');
const list = document.getElementById('radio-list');
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
  const element = document.getElementById(`${key}-error`);
  element.textContent = 'Can’t be zero';
};

const successInput = (key) => {
  const element = document.getElementById(`${key}-error`);
  element.textContent = '';
};

list.addEventListener('click', (e) => {
  const target = e.target;
  const isChecked = list.querySelector('input:checked');
  if (target === custom && isChecked) {
    isChecked.removeAttribute('checked');
  } else if (target.type === 'tips') {
    isChecked.setAttribute('checked', true);
  }
});

const getValuesFromForm = (form) => {
  const data = Object.fromEntries(new FormData(form));

  Object.keys(data).forEach((key) => {
    if (!validateValue[key](data[key])) {
      throwError(key);
    } else {
      successInput(key);
    }
  });

  return data;
};

const countTheBill = () => {
  const data = getValuesFromForm(form);

  const isCustom = data.custom ? data.custom : data.tips;

  const tips = (data.bill * (isCustom / 100)) / data.people;
  const sum = data.bill / data.people;


  if (!isFinite(tips) && !isFinite(sum)) return;

  tipAmount.textContent = `$${tips.toFixed(2)}`;
  total.textContent = `$${sum.toFixed(2)}`;
};

inputs.forEach((input) => {
  input.addEventListener('change', countTheBill);
});
