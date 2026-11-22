from django.urls import path

from . import views

urlpatterns = [
    path("api/messages", views.api_messages, name="api_messages"),
    path(
        "api/messages/<int:message_id>",
        views.api_message_detail,
        name="api_message_detail",
    ),
]
