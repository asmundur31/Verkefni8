const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);
    
    // TODO láta hluti í _items virka
    for(let i=0; i<_items.children.length; i++){
      _items.children[i].children[0].addEventListener('change', finish);
      _items.children[i].children[1].addEventListener('click', edit);
      _items.children[i].children[1].addEventListener('keypress', commit);
      _items.children[i].children[2].addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    add(e.target.children[0].value)
    e.target.children[0].value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const element = e.target.nextElementSibling;
    if(this.checked){
      element.parentElement.classList.add('item--done');
    }
    else{
      element.parentElement.classList.remove('item--done');
    }
    console.log('færsla klárast');
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let input = el('input', 'item__text', 'keypress');
    input.classList.add('item__edit')
    input.type = 'text';
    input.value = e.target.innerHTML;
    e.target.parentElement.insertBefore(input, e.target.nextSibling);
    input.focus();
    e.target.remove();
    console.log('færslu breytt');
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(e.keyCode === ENTER_KEYCODE){
      let text = el('span', 'item__text', 'click');
      text.textContent = e.target.value;
      e.target.parentElement.insertBefore(text, e.target);
      e.target.remove();
      console.log('færslu breyting kláruð');
    }
  }
  
  // fall sem sér um að bæta við nýju item
  function add(value) {
    // b = /\S/.test(value)
    // b er satt ef value inniheldur a.m.k. 
    // eitt tákn sem er ekki bil, annars ósatt
    if(/\S/.test(value)){
      const item = document.createElement('li');
      item.classList.add('item');
      const input = el('input', 'item__checkbox', 'change');
      input.type = 'checkbox';
      const span = el('span', 'item__text', 'click');
      span.innerHTML = value;
      const button = el('button', 'item__button', 'delete');
      button.innerHTML = 'Eyða';
      item.appendChild(input);
      item.appendChild(span);
      item.appendChild(button);
      const parent = document.querySelector('.items');
      parent.appendChild(item);
      console.log('bætt við nýju item');
    }
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove();
    console.log('færslu eytt');
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.classList.remove();
    element.classList.add(className);
    if(clickHandler === 'change'){
      element.addEventListener(clickHandler, finish);
    }
    else if(clickHandler === 'click'){
      element.addEventListener('click', edit);
    }
    else if(clickHandler === 'keypress'){
      element.addEventListener('keypress', commit);
    }
    else if(clickHandler === 'delete'){
      element.addEventListener('click', deleteItem);
    }
    return element;
  }

  return {
    init: init
  }
})();
