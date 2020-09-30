<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BaseModel
 *
 * @package App\Models
 */
class BaseModel extends Model
{
    const CREATED_AT = 'createddate';
    const UPDATED_AT = 'modifieddate';

    /**
     * @param string $key
     * @return mixed
     */
    public function getAttribute($key)
    {
        return parent::getAttribute(snake_case($key));
    }

    /**
     * @param string $key
     * @param mixed $value
     * @return mixed
     */
    public function setAttribute($key, $value)
    {
        return parent::setAttribute(snake_case($key), $value);
    }
}
