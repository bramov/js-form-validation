'use strict';

// Код валидации формы
function validateForm(obj) {
    let inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach((el => {
        el.addEventListener('blur', validateInput, true);
        el.addEventListener('focus', removeError, true)
    }));

    function removeError(){
        if (this.classList.contains(obj.inputErrorClass)){
            this.classList.remove(obj.inputErrorClass);
        }
    }

    function validateInput() {
        switch (this.getAttribute('data-validator')){
            case 'letters':
                if (!this.value.match(/[a-zA-Z]+|[а-яА-я]+/g)) {
                    this.classList.add(obj.inputErrorClass);
                } else {
                    this.classList.remove(obj.inputErrorClass);
                }
                break;
            case 'number':
                if (this.getAttribute('data-validator-min') &&
                    this.getAttribute('data-validator-max')){
                     if (this.value >= this.getAttribute('data-validator-min') &&
                         this.value <= this.getAttribute('data-validator-max')){
                         this.classList.remove(obj.inputErrorClass);
                     } else {
                         this.classList.add(obj.inputErrorClass);
                     }
                } else {
                    if (!this.value.match(/\d/g)){
                        this.classList.add(obj.inputErrorClass);
                    } else {
                        this.classList.remove(obj.inputErrorClass);
                    }
                }
                break;
            case 'regexp':
                if (!this.value.match(this.getAttribute('data-validator-pattern'))){
                    this.classList.add(obj.inputErrorClass);
                } else {
                    this.classList.remove(obj.inputErrorClass);
                }
                break;
        }
    }

    //inputs[2].addEventListener('blur', checkRegEx);



 };
