<?php

namespace App;

/**
 * Class PostGroup
 *
 * @package App
 */
class PostGroup extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'sf_post_groups';

    /**
     * @var array
     */
    protected $fillable = [
        'post_id',
        'group_id',
    ];
}
