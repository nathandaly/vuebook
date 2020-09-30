<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\belongsToMany;

/**
 * Class Role
 *
 * @package App
 */
class Role extends BaseModel
{
    public function profile()
    {
        return $this->belongsToMany(Profile::class, ProfileLocal::class);
    }

}
