module Tests exposing (..)

import Test exposing (..)
import Expect


all : Test
all =
    describe "A Test Suite"
        [ test "A test" <|
            \() ->
                Expect.true "Expecting true to be true" True
        ]
