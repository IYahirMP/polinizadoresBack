<?php declare(strict_types= 1);

namespace Tests\Controllers;

use Generator;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\CoversNothing;
use PHPUnit\Framework\Attributes\Test;
use Tests\Testcase;

class BloqueTaxonomicoTest extends TestCase{

    #[CoversNothing]
    public static function testTaxonomicoProvider(): Generator 
    {
        yield [1, '"id_bloque":1'];
        yield [2, '"id_bloque":2'];
    }

    #[Test]
    public function testAll(): void
    {

        $response = $this->get('/bloques-taxonomicos');

        $response->assertStatus(200);
    }

    #[Test]
    #[DataProvider('testTaxonomicoProvider')]
    public function testTaxonomicoFromDataProvider($taxonomicoId, $expectedResponse): void 
    {
        $response = $this->get('/bloques-taxonomicos/'.$taxonomicoId);

        $response->assertStatus(200);
        $response->assertSee($expectedResponse, false);
    }

}