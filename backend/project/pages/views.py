import json

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import (
    csrf_exempt,  # Used temporarilly for PUT and POST requests, which would be rejected otherwise
)

messages = [
    {
        "id": 1,
        "title": "Home",
        "message": "This is the Home page!",
    },
    {
        "id": 2,
        "title": "Away",
        "message": "This is the Away page!",
    },
]

next_message_id = 3


# Helper function to validate message data
def validate_message(data):
    if not isinstance(data, dict):
        return "Request body must be a JSON object"

    title = data.get("title")
    message = data.get("message")

    if not isinstance(title, str) or not isinstance(message, str):
        return "Title and message must be strings"

    return None


@csrf_exempt
def api_messages(request):
    global next_message_id

    if request.method == "GET":
        return JsonResponse({"messages": messages})

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            validation_error = validate_message(data)
            if validation_error:
                return JsonResponse(
                    {"error": validation_error},
                    status=400,  # Bad Request
                )

            title = data.get("title")
            message = data.get("message")

            new_message = {
                "id": next_message_id,
                "title": title,
                "message": message,
            }

            messages.append(new_message)
            next_message_id += 1
            return JsonResponse(
                new_message, status=201
            )  # Status 201 = Created resource

        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON"},
                status=400,  # Bad Request
            )

    return JsonResponse(
        {"error": "Only GET and POST are supported!"},
        status=405,  # Method Not Allowed
    )


@csrf_exempt
def api_message_detail(request, message_id):
    message_index = next(
        (
            index
            for index, message in enumerate(messages)
            if message["id"] == message_id
        ),
        None,
    )

    if message_index is None:
        return JsonResponse(
            {"error": "Message not found"},
            status=404,  # Not Found
        )

    if request.method == "DELETE":
        messages.pop(message_index)
        return HttpResponse("Message deleted", status=200)

    if request.method == "GET":
        return JsonResponse(messages[message_index])

    if request.method == "PUT":
        try:
            data = json.loads(request.body)

            validation_error = validate_message(data)
            if validation_error:
                return JsonResponse(
                    {"error": validation_error},
                    status=400,  # Bad Request
                )

            title = data.get("title")
            message = data.get("message")

            updated_message = {
                "id": message_id,
                "title": title,
                "message": message,
            }

            messages[message_index] = updated_message
            return JsonResponse(updated_message)

        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON"},
                status=400,  # Bad Request
            )

    return JsonResponse(
        {"error": "Only GET, PUT, and DELETE are supported!"},
        status=405,  # Method Not Allowed
    )

    # Can test with PUT and POST using curl:
    # Example for POST:
    # curl -X POST -H "Content-Type: application/json" -d '{"title": "New Title", "message": "New Message"}' http://127.0.0.1:3000/api/messages
    # Example for PUT: (change first entry demarked by /1)
    # curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Title", "message": "Updated Message"}' http://127.0.0.1:3000/api/messages/1
