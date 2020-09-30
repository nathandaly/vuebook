<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Centre
 *
 * @package App
 */
class Centre extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'centres';

    /**
     * @return HasMany
     */
    public function locals()
    {
        return $this->hasMany(Local::class, 'centreid', 'id')
            ->orderBy('name');
    }

    /**
     * Get the roles for the centre
     */
    public function roles()
    {
        return $this->hasMany(Role::class, 'centreid', 'id')
            ->orderBy('typeid');
    }
}
