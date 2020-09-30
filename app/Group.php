<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Group
 *
 * @package App
 */
class Group extends BaseModel
{
    /**
     * @return belongsToMany
     */
    public function posts()
    {
        return $this->belongsToMany(Post::class, PostGroup::class);
    }
}
