<?php

namespace App;

/**
 * Class PostShare
 *
 * @package App
 */
class PostShare extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_post_shares';

    /**
     * @var array
     */
    protected $fillable = [
        'post_id',
        'profile_id',
    ];

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
