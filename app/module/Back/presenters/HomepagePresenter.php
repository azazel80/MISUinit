<?php

namespace BackModule;

use App\Base\BasePresenter;

class HomepagePresenter extends BasePresenter
{
    public function renderDefault()
    {
        if (! isset($this->template->back)) {
            $this->template->back = false;
            $this->flashMessage("Klikněte na tlačítko!", "info");
            $this->redrawExample();
        }
    }

    public function handleTest()
    {
        $this->template->back = true;
        $this->flashMessage('Ajax funguje :o)', 'success');
        $this->redrawExample();
    }

    private function redrawExample(): void
    {
        $this->redrawControl('snFlash');
        $this->redrawControl('snButton');
    }
}
