/**
 * Customized function from netteForms.js for Materialize Form validation design
 *
 * modified by Miroslav Suchanek
 **/
const Nette = require("nette-forms");
delete Nette['Nette.showFormErrors'];

Nette.showFormErrors = function(form, errors) {
    let messages = [],
        focusElem;

    for (let i = 0; i < errors.length; i++) {
        let elem = errors[i].element,
            message = errors[i].message;

        if (!Nette.inArray(messages, message)) {
            messages.push(message);

            let refElem = document.getElementsByName(elem.name);
            refElem[0].classList.add('invalid');

            if (!focusElem && elem.focus) {
                focusElem = elem;
            }
        }
    }

    if (messages.length) {

        if (focusElem) {
            focusElem.focus();
        }
    }
};
