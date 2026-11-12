from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('away/', views.away, name='away'),
    path('api/message', views.api_message, name='api_message'),
]