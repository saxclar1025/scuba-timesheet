Survey.Survey.cssType = "bootstrap";
var surveyJSON = {
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "dropdown",
        "name": "User Group",
        "isRequired": true,
        "choices": [
         "user1",
         "user2",
         "user3"
        ],
        "choicesOrder": "desc"
       },
       {
        "type": "dropdown",
        "name": "Task",
        "choices": [
         "tanks",
         "hours",
         "all",
         "trips"
        ],
        "choicesOrder": "desc"
       },
       {
        "type": "multipletext",
        "name": "tanks",
        "visibleIf": "{Task} = \"tanks\"\n",
        "items": [
         {
          "name": "tank1",
          "inputType": "number"
         },
         {
          "name": "tank2",
          "inputType": "number"
         }
        ]
       },
       {
        "type": "multipletext",
        "name": "all",
        "visibleIf": "{Task} = \"all\"",
        "items": [
         {
          "name": "tank1",
          "inputType": "number"
         },
         {
          "name": "tank2",
          "inputType": "number"

         },
         {
          "name": "hours",
          "inputType": "number"
         },
         {
          "name": "trips",
          "inputType": "number"
         }
        ]
       },
       {
        "type": "multipletext",
        "name": "hours",
        "visibleIf": "{Task} = \"hours\"",
        "items": [
         {
          "name": "hours",
          "inputType": "number"
         }
        ]
       },
       {
        "type": "multipletext",
        "name": "Trips",
        "visibleIf": "{Task} = \"trips\"",
        "items": [
         {
          "name": "Trips",
          "inputType": "number"
         }
        ]
       }
      ]
     }
    ]
   }


function sendDataToServer(survey) {
    //send Ajax request to your web server.
    alert("The results are:" + JSON.stringify(survey.data));
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});