<?php

namespace App\Base;

use Nette\Application\UI\Presenter;

/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Presenter
{
    protected function startup()
    {
        parent::startup();

        if ($this->isAjax()) {
            $this->redrawControl('flashMessages');
        }
    }
}
