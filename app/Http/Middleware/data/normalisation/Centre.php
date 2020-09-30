<?php

namespace App\Http\Middleware\data\normalisation;

use App\AppConfig;
use App\Centre as LocalCentre;
use App\Http\Middleware\BaseApiMiddleware;
use Closure;
use Illuminate\Http\Request;

/**
 * Class Centre
 * @package App\Http\Middleware\data\normalisation
 */
class Centre extends BaseApiMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $appid = $request->data['appid'];
            $centreId = $request->data['centreid'];
            $request->request->add([
                'centre' => LocalCentre::find($centreId),
            ]);
            $style = '';
            if (!empty($request->data['appid'])) {
                $appid = $request->data['appid'];
                $app_config = AppConfig::where([
                    'appid' => $appid,
                    'config_key' => 'plugin_styles',
                ])->first();
                if (!is_null($app_config)) {
                    $plugin_styles = json_decode($app_config->config_value);
                    foreach ($plugin_styles->font_imports as $fontImports) {
                        $style .= '@import url("' . $fontImports . '"); ' . PHP_EOL;
                    }
                    foreach ($plugin_styles->tags as $key => $styles) {
                        $style .= $key . ' { ' . $styles . ' } ' . PHP_EOL;
                    }
                    foreach ($plugin_styles->classes as $key => $styles) {
                        $style .= $key . ' { ' . $styles . ' } ' . PHP_EOL;
                    }
                }
            }
            $request->request->add([
                'plugin_styles' => $style,
            ]);
        } catch (\RuntimeException $e) {
            return $this->respondError(
                'Centre normalisation error: ' . $e->getMessage()
            );
        }

        return $next($request);
    }
}
