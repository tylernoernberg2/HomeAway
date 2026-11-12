from django.http import JsonResponse

# Here's our API endpoint returning JsonResponse
def api_message(request):
    return JsonResponse({"message": "Hello from Django's API"})

