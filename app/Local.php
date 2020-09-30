<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\belongsToMany;
use Illuminate\Database\Eloquent\Relations\hasOneThrough;

/**
 * Class Local
 *
 * @package App
 */
class Local extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'local_orgs';

    public function profile()
    {
        return $this->belongsToMany(Profile::class, ProfileLocal::class);
    }
    
/*
    public function role()
    {
        return $this->hasOneThrough(Role::class, ProfileLocal::class, 'localid', 'id');
    }
*/
}
