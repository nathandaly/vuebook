<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Comments
 *
 * @package App
 */
class Comments extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_comments';

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
}
