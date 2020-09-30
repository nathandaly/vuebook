<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class PostMedia
 * @package App
 */
class PostMedia extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_post_media';

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
    public function media()
    {
        return $this->belongsTo(Media::class);
    }

}
