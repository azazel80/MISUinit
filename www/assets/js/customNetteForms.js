/**
 * Customized function from netteForms.js for Bootstrap 4 Form validation design
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

            let refElem = document.getElementsByName(elem.name),
                errorElem = refElem[0].nextElementSibling;

            errorElem.innerText = message;

            if (!focusElem && elem.focus) {
                focusElem = elem;
            }
        }
    }

    if (messages.length) {
        form.classList.add('was-validated');

        if (focusElem) {
            focusElem.focus();
        }
    }
};
