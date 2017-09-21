module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode exposing (Decoder)


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , update = update
        , init = ( initialModel, Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


fetchColor : Cmd Msg
fetchColor =
    Http.send
        HandleNewColor
        (Http.get "http://localhost:3000/color" Json.Decode.string)



-- MODEL


type alias Model =
    { color : String
    }


initialModel : Model
initialModel =
    Model "#FFFFFF"



-- UPDATE


type Msg
    = ChangeColor
    | HandleNewColor (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeColor ->
            ( model, fetchColor )

        HandleNewColor (Ok color) ->
            ( { model | color = color }, Cmd.none )

        HandleNewColor (Err error) ->
            ( model, Cmd.none )



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container", style [ ( "height", "100%" ), ( "background-color", model.color ) ] ]
        [ div [ class "actions" ]
            [ button [ class "btn", onClick ChangeColor ]
                [ span [] [ text "Elm, Gimme Colors!" ] ]
            ]
        ]
