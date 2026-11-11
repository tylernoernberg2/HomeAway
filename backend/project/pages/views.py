from django.shortcuts import render

def home(request):
    return render(request, 'pages/home.html')

def away(request):
    return render(request, 'pages/away.html')