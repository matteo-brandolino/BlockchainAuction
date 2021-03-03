from django.urls import path
from .consumers import WSConsumer, WSConsumerGet

ws_urlpatterns = [
    path('ws/notifications', WSConsumer.as_asgi()),
    path('ws/actual_price', WSConsumerGet.as_asgi())
]