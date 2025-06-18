const form = document.getElementById('form');
const people = document.getElementById('people');
const custom = document.getElementById('custom');
const list = document.getElementById('radio-list');
const tipAmount = document.getElementById('tip-amount');
const total = document.getElementById('total');

let isCustomField = false;

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

list.addEventListener('click', (e) => {
  const target = e.target;
  if (target === custom) {
    list.querySelector('input:checked').removeAttribute('checked');
    isCustomField = true;
  } else {
    isCustomField = false;
  }
});

const getValuesFromForm = (form) => {
  const data = Object.fromEntries(new FormData(form));

  if (isCustomField) {
    delete data.tips;
  } else {
    delete data.custom;
  }

  Object.keys(data).forEach((key) => {
    if (!validateValue[key](data[key])) {
      throwError(key);
    }
  });

  return data;
};

people.addEventListener('change', () => {
  const data = getValuesFromForm(form);

  const isCustom = !!data.custom ? data.custom : data.tips;

  const tips = (data.bill * (isCustom / 100)) / data.people;
  const sum = data.bill / data.people;

  if (!tips && !sum) {
    return;
  }

  tipAmount.textContent = `$${tips.toFixed(2)}`;
  total.textContent = `$${sum.toFixed(2)}`;
});
