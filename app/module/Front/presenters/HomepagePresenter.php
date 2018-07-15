<?php

namespace FrontModule;

use App\Base\BasePresenter;
use Nette\Application\UI\Form;
use Nette\Utils\DateTime;
use Nette\Utils\Html;
use Nette\Utils\Strings;

class HomepagePresenter extends BasePresenter
{
    public function renderDefault(): void
    {
        $this->template->datetime = new DateTime();
    }

    public function handleRedraw(): void
    {
        $this->redrawControl('testSnippet');
    }

    protected function createComponentUserForm(): Form
    {
        $form = new Form();

        $form->addText('username', 'Uživatelské jméno')
            ->setRequired('Uživatelské jméno je povinné');

        $form->addEmail('email', 'E-mail')
            ->addFilter(function ($email) {
                return Strings::lower($email);
            })
            ->addRule($form::REQUIRED, 'E-mail je povinný')
            ->addRule($form::PATTERN, 'Toto není validní e-mail', "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}");

        $form->addSubmit('send', 'Odeslat');

        $form->onValidate[] = function (Form $form) {
            if (Strings::endsWith($form->values->email, '@domena.tld')) {
                $form->addError(sprintf('Koncová doména @domena.tld není povolena (%s)', $form->values->email));
            }
        };

        $form->onSubmit[] = function (Form $form) {
            $this->redrawControl('Error');
            $this->redrawControl('Ok');
        };

        $form->onSuccess[] = function () {
            // Some handling on success...
        };

        return $form;
    }
}
