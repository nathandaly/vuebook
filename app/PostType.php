<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class PostType
 *
 * @package App
 */
class PostType extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_post_types';

    /**
     * @return HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
