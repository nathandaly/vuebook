<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class PostFlag
 * @package App
 */
class PostFlag extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_post_flags';

    /**
     * @return BelongsTo
     */
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * @return BelongsTo
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * @return BelongsTo
     */
    public function flag()
    {
        return $this->belongsTo(Flag::class);
    }
}
