<?php


namespace App\Http\Controllers;

use App\Http\Requests\Api\DataRequest;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\View\View;

/**
 * Class SpaController
 * @package App\Http\Controllers
 */
class SpaController extends BaseController
{
    /**
     * @return View
     */
    public function index(): View
    {
        return view('spa');
    }
}
