'use strict';

const addBtn = document.querySelector('.add__btn');
const clearBtn = document.querySelector('.list__clear-btn');
const addInput = document.querySelector('.add__input');
const list = document.querySelector('.list__body');
const modal = document.querySelector('.modal__wrapper');

const countsAmount = () => {
    const countOutput = document.querySelector('.count-output');
    countOutput.textContent = list.childElementCount;
}

window.onload = () => {
    const storage = localStorage.getItem('list');
    list.innerHTML = storage;
    const deleteBtns = document.querySelectorAll('.list-item__btn--delete');
    if (deleteBtns) {
        for (let key of deleteBtns) {
            key.addEventListener('click', onDeleteBtnClick);
        }
    }
    countsAmount();
}

const createListElement = () => {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    listItem.textContent = addInput.value;
    listItem.appendChild(createDeleteBtn());
    return listItem;
}

const createDeleteBtn = () => {
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('list-item__btn--delete');
    deleteBtn.addEventListener('click', onDeleteBtnClick);
    return deleteBtn;
}

const addToList = () => {
    list.appendChild(createListElement());
    addInput.value = '';
}

const removeListElement = (evt) => {
    const target = evt.target;
    target.parentNode.remove();
}

const onAddBtnClick = () => {
    addToList();
    useStorage();
    countsAmount();
}

const onDeleteBtnClick = (evt) => {
    removeListElement(evt);
    useStorage();
    countsAmount();
}

const useStorage = () => {
    const list = document.querySelector('.list__body');
    localStorage.setItem('list', list.innerHTML);
}

const showModal = () => {
    modal.style.display = 'block';
    const modalBtnYes = document.querySelector('.modal__btn--yes');
    const modalBtnNo = document.querySelector('.modal__btn--no');
    modalBtnYes.addEventListener('click', clearList);
    modalBtnNo.onclick = () => {
        modal.style.display = 'none';
    }
}

const clearList = () => {
    localStorage.clear();
    while (list.firstChild) {
        list.firstChild.remove()
    }
    modal.style.display = 'none';
    countsAmount();
}

addBtn.addEventListener('click', onAddBtnClick);
clearBtn.addEventListener('click', showModal);