from django.urls import path

from . import views

urlpatterns = [
    path('api/message', views.api_message, name='api_message'),
]