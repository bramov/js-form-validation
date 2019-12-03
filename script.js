'use strict';

// Код валидации формы.

function validateForm(options) {
    //ниже - интересная замена Array.from с использованием es6
    const inputs = [...document.querySelectorAll('input')];
    //вешаем на каждый инпут обработчиков blur/focus
    inputs.forEach((el => {
        el.addEventListener('blur', validateInput, true);
        el.addEventListener('focus', removeError, true)
    }));
    //вешаем обработчиков на кнопку <button>
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', submitFields);

    //убираем класс ошибки при фокусе на инпут
    function removeError(){
        if (this.classList.contains(options.inputErrorClass)){
            this.classList.remove(options.inputErrorClass);
        }
    }

    //проверяем инпуты и вешаем/убираем класс ошибки при blur
    //всего три типа валидатора - letters, numbers, regexp
    //в переменные xxxMatch помещаем шаблон регулярного выражения и соотносим с помощью match
    function validateInput() {
        switch (this.dataset.validator){
            case 'letters':
                let lettersMatch = !this.value.match(/^[a-zа-яё]+$/i);
                this.classList.toggle(options.inputErrorClass, lettersMatch);
                break;
            case 'number':
                if (this.dataset.validatorMin &&
                    this.dataset.validatorMax){
                     //в качестве второго аргумента в метод toggle передаем условия
                     //первым условием проверяем неравенство длины строки нулю, так как Number('') == 0
                    let numberMinMaxMatch = this.value.length === 0 || isNaN(this.value) ||
                         Number(this.value) < this.dataset.validatorMin ||
                         Number(this.value) > this.dataset.validatorMax;
                     this.classList.toggle(options.inputErrorClass, numberMinMaxMatch);
                } else {
                    let numberMatch = !this.value.match(/^-?\d+$/i)
                    this.classList.toggle(options.inputErrorClass, numberMatch);
                }
                break;
            case 'regexp':
                let regexpMatch = !this.value.match(this.dataset.validatorPattern)
                this.classList.toggle(options.inputErrorClass, regexpMatch);
                break;
        }
    }

    //проверяем все инпуты по нажатию на кнопку
    function submitFields(e){
        e.preventDefault();
        //проверяем, есть ли пустые (незаполненные) инпуты
        const isEmpty = elem => elem.value.length == 0;
        const form = document.getElementById(options.formId);

        //проверяем только те элементы, которые имеют мета-атрибут 'data-required'
        if (inputs.some(isEmpty)){
            inputs.forEach(el => {
                if (el.dataset.hasOwnProperty('required')) validateInput.call(el);
                //если человек в начале заполнил инпут неправильно, а потом удалил value,
                //то имеет смысл убрать inputErrorClass, хотя это и не прописано в ТЗ
                else if (el.value.length === 0) el.classList.remove(options.inputErrorClass);
            });
        };
        const isNotValid = elem => elem.classList.contains(options.inputErrorClass);

        //если хотя бы один из инпутов красный (если не пустой), то форма заполнена неправильно
        //поэтому ставим класс formValid/formInvalid
        form.classList.toggle(options.formValidClass, !inputs.some(isNotValid));
        form.classList.toggle(options.formInvalidClass, inputs.some(isNotValid));


    }



 };
