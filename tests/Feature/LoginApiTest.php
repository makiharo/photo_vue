<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * email passを受け取る
 * 認証成功後にリダイレクトする
 * だが今回は、登録ユーザーの情報を返却
 */
class LoginApiTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        // テストユーザー作成
        $this->user = factory(User::class)->create();
    }

    /**
     * @test
     */
    public function should_登録済みのユーザーを認証して返却する()
    {

        $response = $this->json('POST', route('login'), [
            'email' => $this->user->email,
            'password' => 'password',
        ]);

        // レスポンスが指定したJSONデータを持っていることを宣言。
        $response
            ->assertStatus(200)
            ->assertJson(['name' => $this->user->name]);

        // 指定したユーザーが認証されていることを宣言。
        $this->assertAuthenticatedAs($this->user);
    }
}
