'use strict';

// Код валидации формы
function validateForm(obj) {
    let inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach((el => {
        el.addEventListener('blur', validateInput, true);
        el.addEventListener('focus', removeError, true)
    }));
    let submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', submitFields);
    let form = document.getElementById(obj.formId);


    function removeError(){
        if (this.classList.contains(obj.inputErrorClass)){
            this.classList.remove(obj.inputErrorClass);
        }
    }
    //функцию ниже можно заменить на classList.toggle(obj.inputErrorClass, условие)
    function validateInput() {
        switch (this.getAttribute('data-validator')){
            case 'letters':
                this.classList.toggle(obj.inputErrorClass, !this.value.match(/[a-zA-Z]+|[а-яА-я]+/g));
                break;
            case 'number':
                if (this.getAttribute('data-validator-min') &&
                    this.getAttribute('data-validator-max')){
                     this.classList.toggle(obj.inputErrorClass, (Number(this.value) < this.getAttribute('data-validator-min') ||
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

    function submitFields(e){
        e.preventDefault();
        const checkInputs = elem => elem.classList.contains(obj.inputErrorClass);
        const checkEmpty = elem => elem.value.length == 0;
        let form = document.getElementById(obj.formId);
        let condition1 = inputs.some(checkInputs) || inputs.some(checkEmpty);
        form.classList.toggle(obj.formInvalidClass, condition1);



    }



 };
