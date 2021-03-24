<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    /**
     * The users that belong to the Chat
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * The messages that belong to the Chat
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function messages()
    {
        return $this->belongsToMany(Message::class);
    }
}
