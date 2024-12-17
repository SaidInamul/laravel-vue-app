<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $body = fake()->words(255, true);
        return [
            //
            'user_id' => User::factory(),
            'title' => fake()->words(5, true),
            'body' => $body,
            'teaser' => Str::words($body, 10, '...'),
        ];
    }
}
