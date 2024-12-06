<?php

namespace App\Domain;

enum OrderStatus: string {
    case CREATING = 'CREATING';
    case CREATED = 'CREATED';
    case SENT = 'SENT';
}