<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\belongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * Class Profile
 *
 * @package App
 */
class Profile extends Authenticatable
{
    use Notifiable;

    const CREATED_AT = 'createddate';
    const UPDATED_AT = 'modifieddate';

    /**
     * @var string
     */
    protected $table = 'profiles';

    /**
     * @var array
     */
    protected $fillable = [
        'api_token',
        'email',
        'firstname',
        'lastname',
        'phone',
    ];

    /**
     * @var array§
     */
    protected $hidden = [
        'password',
        'password0',
    ];

    public function locals()
    {
        return $this
            ->belongsToMany(
                Local::class,
                ProfileLocal::class,
                'profileid',
                'localid'
            )
            ->withPivot([
                'primary_local',
                'last_login',
                'centreid',
                'roleid',
            ]);
    }

    /**
     * @return HasMany
     */
    public function apn()
    {
        return $this->hasMany(Devices::class, 'profile_id');
    }

    /**
     * @return HasMany
     */
    public function devices()
    {
        return $this->hasMany(Devices::class, 'profile_id');
    }

    public function roles()
    {
        return $this
            ->belongsToMany(
                Role::class,
                ProfileLocal::class,
                'profileid',
                'roleid'
            )
            ->withPivot([
                'primary_local',
                'last_login',
                'centreid',
                'roleid',
            ]);
    }

    /**
     * @return HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class, 'profile_id');
    }

    /**
     * @return HasMany
     */
    public function followers()
    {
        return $this->hasMany(Followers::class, 'follower_id');
    }

    /**
     * @return HasMany
     */
    public function following()
    {
        return $this->hasMany(Following::class, 'following_id');
    }

    /**
     * @return belongsToMany
     */
    public function sharedPosts()
    {
        return $this->belongsToMany(Post::class, PostShare::class);
    }
}
