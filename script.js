'use strict';

// Код валидации формы
function validateForm(obj) {
    const inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach((el => {
        el.addEventListener('blur', validateInput, true);
        el.addEventListener('focus', removeError, true)
    }));
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', submitFields);
    //const form = document.getElementById(obj.formId);

    //убираем класс ошибки при фокусе на инпут
    function removeError(){
        if (this.classList.contains(obj.inputErrorClass)){
            this.classList.remove(obj.inputErrorClass);
        }
    }

    //проверяем инпут и вешаем/убираем класс ошибки
    function validateInput() {
        switch (this.getAttribute('data-validator')){
            case 'letters':
                this.classList.toggle(obj.inputErrorClass, !this.value.match(/[a-zA-Z]+|[а-яА-я]+/g));
                break;
            case 'number':
                if (this.getAttribute('data-validator-min') &&
                    this.getAttribute('data-validator-max')){
                     //в качестве второго аргумента в функцию передаем условия
                     //первым условием проверяем неравенство длины строки нулю, так как Number('') == 0
                     this.classList.toggle(obj.inputErrorClass, (this.value.length == 0 || isNaN(this.value) ||
                                                                 Number(this.value) < this.getAttribute('data-validator-min') ||
                                                                 Number(this.value) > this.getAttribute('data-validator-max')));
                } else {
                    this.classList.toggle(obj.inputErrorClass, !this.value.match(/^\d+$/g));
                }
                break;
            case 'regexp':
                this.classList.toggle(obj.inputErrorClass, !this.value.match(this.getAttribute('data-validator-pattern')));
                break;
        }
    }

    //проверяем все инпуты по нажатию на кнопку
    function submitFields(e){
        e.preventDefault();
        const isEmpty = elem => elem.value.length == 0;
        const form = document.getElementById(obj.formId);

        //проверяем только те элементы, которые имеют мета-атрибут 'data-required'
        if (inputs.some(isEmpty)){
            inputs.forEach(el => {
                if (el.dataset.hasOwnProperty('required')) validateInput.call(el);
            });
        };
        const isNotValid = elem => elem.classList.contains(obj.inputErrorClass);

        //если хотя бы один из инпутов красный, то форма заполнена неправильно.
        form.classList.toggle(obj.formValidClass, !inputs.some(isNotValid));
        form.classList.toggle(obj.formInvalidClass, inputs.some(isNotValid));

    }



 };
