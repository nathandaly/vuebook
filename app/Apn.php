<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Apn
 *
 * @package App
 */
class Apn extends BaseModel
{
    /**
     * @var string
     */
    protected $table = 'apn';

    /**
     * @return BelongsTo
     */
    public function device()
    {
        return $this->BelongsTo(Device::class, 'deviceid', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function profile()
    {
        return $this->BelongsTo(Profile::class, 'profileid', 'id');
    }

/*
	$this->db->select('d.token as device_token, d.device_os as os, d.device_make');
    $this->db->from('apn as a');
    $this->db->join('devices AS d', 'a.deviceid = d.id', 'left');
    $this->db->join('profile_status AS ps', 'a.profileid = ps.profileid AND a.centreid = ps.centreid', 'left');
    $this->db->where('a.profileid', $profileid);
    $this->db->where('ps.email_verified', 1);
    $this->db->where('ps.approved', 1);
    $this->db->where(sprintf('a.modifieddate > NOW() - INTERVAL %d DAY', $this->expired_token_day));
    $this->db->group_by('d.token');
*/

}
