<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Entity;
use App\Models\Supplier;
use App\Models\Modelo;
use App\Models\Allocation;

class Asset extends Model
{
    use HasFactory;

    protected $table = 'assets';

    protected $fillable = [
        'id',
        'numb_inv',
        'date_purch',
        'state',
        'numb_ser',
        'cond',
        'floor',
        'ala',
        'ci',
        'brand_id',
        'cat_id',
        'supplier_id',
        'ent_id',
        'unit_id',
        'model_id',
        'previous_unit_id',
        'previous_ent_id',
        'previous_ci',

    ];

    public static $rules = [
        'numb_inv' => [
            'required',
            'integer',
            'digits:6',
            'unique:assets,numb_inv',
            'regex:/^0/',
        ],
    ];


    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'cat_id');
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class, 'ent_id');
    }

    public function suppliers()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }


    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }

    public function units()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function previousUnit()
    {
        return $this->belongsTo(Unit::class, 'previous_unit_id');
    }

    public function modelo()
    {
        return $this->belongsTo(Modelo::class, 'model_id');
    }

    public static function boot()
    {
        parent::boot();

        // Listen for the 'updating' event
        static::updating(function ($unit) {
            // Check if unit_id attribute is being updated
            if ($unit->isDirty('unit_id')) {
                // Store the current unit_id value in previous_unit_id
                $unit->previous_unit_id = $unit->getOriginal('unit_id');
            }

            // Check if ent_id attribute is being updated
            if ($unit->isDirty('ent_id')) {
                // Store the current ent_id value in previous_ent_id
                $unit->previous_ent_id = $unit->getOriginal('ent_id');
            }
            if ($unit->isDirty('ci')) {
                $unit->previous_ci = $unit->getOriginal('ci');
            }
        });
    }
}
