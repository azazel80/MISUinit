<?php declare(strict_types = 1);

namespace App;

use Nette\Application\IRouter;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;

class RouterFactory
{

	/**
	 * @return IRouter
	 */
	public static function createRouter(): IRouter
	{
		$router = new RouteList;

        // Back
        $router[] = new Route('admin/<presenter>/<action>/<id>', [
            'module' => 'Back',
            'presenter' => 'Homepage',
            'action' => 'default',
            'id' => NULL,
        ]);
        // Front
        $router[] = new Route('<presenter>/<action>/<id>', [
            'module' => 'Front',
            'presenter' => 'Homepage',
            'action' => 'default',
            'id' => NULL,
        ]);

		return $router;
	}
}
