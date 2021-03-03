from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
from .models import BidItem
import asyncio
import json
import redis
client = redis.StrictRedis(host='127.0.0.1', port=6379, password='', db=0)

class WSConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("bid", self.channel_name)
        print(f"Added {self.channel_name}")

    # async def disconnect(self):
    #     await self.channel_layer.group_discard("bid", self.channel_name)
    #     print(f"Removed {self.channel_name} ")
    
    async def user_bid(self, event):
        await self.send_json(event)
        print(f"Got message {event} at {self.channel_name}")

class WSConsumerGet(WebsocketConsumer):
    def connect(self):
        self.accept()
        for key in client.scan_iter():
            key = [x.decode("utf-8") for x in client.lrange(key, 0, -1)]
            self.send(key[-1])
    