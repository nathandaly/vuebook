<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class PostReaction
 * @package App
 */
class PostReaction extends BaseModel
{
    /**
     * @var string
     */
    protected $table= 'sf_post_reactions';

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

    public function reaction()
    {
        return $this->belongsTo(Reaction::class);
    }
}
