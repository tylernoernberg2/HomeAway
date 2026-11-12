from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'pages/home.html')

def away(request):
    return render(request, 'pages/away.html')

# Here's our API endpoint returning JsonResponse
def api_message(request):
    return JsonResponse({"message": "Hello from Django's API"})