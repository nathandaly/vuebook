<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class CommentsFlag
 * @package App
 */
class CommentsFlag extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_comment_flags';

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
    public function comments()
    {
        return $this->belongsTo(Comments::class, 'comment_id');
    }

    /**
     * @return BelongsTo
     */
    public function flag()
    {
        return $this->belongsTo(Flag::class);
    }
}
