<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Followers
 * @package App
 */
class Followers extends BaseModel
{
    /**
     * @var string
     */
    protected $table= 'sf_followers';

    /**
     * @return BelongsTo
     */
    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}
