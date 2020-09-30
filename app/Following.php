<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Following
 * @package App
 */
class Following extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_following';

    /**
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(Profile::class);
    }
}
