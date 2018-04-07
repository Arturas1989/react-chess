<?php
namespace ReactPgnChess;

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use ReactPgnChess\PgnChessGame;

require __DIR__  . '/../vendor/autoload.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new PgnChessGame()
        )
    ),
    3001
);

$server->run();
