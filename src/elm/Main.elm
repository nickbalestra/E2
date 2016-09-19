module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App as Html
import Html.Events exposing (onClick)


-- component import example

import Components.Hello exposing (hello)


-- APP


main : Program Never
main =
    Html.beginnerProgram { model = model, view = view, update = update }



-- MODEL


type alias Model =
    Int


model : number
model =
    0



-- UPDATE


type Msg
    = NoOp
    | Increment
    | Reset


update : Msg -> Model -> Model
update msg model =
    case msg of
        NoOp ->
            model

        Increment ->
            model + 1

        Reset ->
            0



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container", style [ ( "margin-top", "30px" ), ( "text-align", "center" ) ] ]
        [ -- inline CSS (literal)
          div [ class "row" ]
            [ div [ class "col-xs-12" ]
                [ div [ class "jumbotron" ]
                    [ img [ src "static/img/elm.png", style styles.img ] []
                      -- inline CSS (via var)
                    , hello model
                      -- ext 'hello' component (takes 'model' as arg)
                    , button [ class "btn btn-primary btn-lg", onClick Increment ]
                        [ span [] [ text "FTW!" ] ]
                    , button [ class "btn btn-primary btn-lg", onClick Reset ]
                        [ span [] [ text "Reset!" ] ]
                    ]
                ]
            ]
        ]



-- CSS STYLES


styles : { img : List ( String, String ) }
styles =
    { img =
        [ ( "width", "25%" )
        , ( "border", "none" )
        ]
    }
