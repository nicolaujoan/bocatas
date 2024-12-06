<?php

test('that order hash id is generated', function () {
    $ALGO = "sha256";
    $data = "1fabricaJava06/12/2024"; // userId + username + today's date
    $order_id =  hash($ALGO, $data);
    expect($order_id)->toBeString();
});
