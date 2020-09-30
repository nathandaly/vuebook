<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class ProfileLocal
 *
 * @package App
 */
class ProfileLocal extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'profile_locals';

    /**
     * @return BelongsTo
     */
    public function local()
    {
        return $this->belongsTo(Local::class, 'id', 'localid');
    }

    /**
     * @return BelongsTo
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'id', 'roleid');
    }

    /**
     * Checks if the profile exists in the profile locals table
     *
     * @param bool $localId
     * @param bool $profileId
     * @param bool $centreId
     * @param bool $roleId
     * @return bool
     */
    public static function findProfileLocal($localId = false, $profileId = false, $centreId = false, $roleId = false)
    {
        if (in_array(false, func_get_args(), true)) {
            return false;
        }

        DB::enableQueryLog();

        return self::where([
            ['localid', $localId],
            ['profileid', $profileId],
            ['centreid', $centreId],
            ['roleid', $roleId],
        ])->first();
    }
}
