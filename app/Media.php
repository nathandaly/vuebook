<?php

namespace App;

/**
 * Class Media
 *
 * @package App
 */
class Media extends BaseModel
{
    /**
     * @var string
     */
    protected $table= 'media';

    /**
     * @return belongsToMany
     */
    public function postMedia()
    {
        return $this->belongsTo(PostMedia::class);
    }
}
