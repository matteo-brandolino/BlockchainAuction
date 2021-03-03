from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BidItemSerializer, BidItemAuthorSerializer
from rest_framework.exceptions import ErrorDetail
from .models import BidItem
from django.utils import timezone
from django.db.models import Q
import json
from .utils import *

import redis
client = redis.StrictRedis(host='127.0.0.1', port=6379, password='', db=0)
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class CreateBidItemView(APIView):
   def post(self, request):
       serializer = BidItemSerializer(data=request.data)
       serializer.is_valid(raise_exception=True)
       serializer.save()
       return Response(serializer.data)

class GetBidItemsView(APIView):
    def get(self, request):
        bidItems = BidItem.objects.filter(soldAt=None).order_by('-createdAt')
        response = []
        for bidItem in bidItems:
            response.append(
                {
                    'id': bidItem.id,
                    'user': f"{bidItem.user.first_name} {bidItem.user.last_name}",
                    'title': bidItem.title,
                    'content': bidItem.content,
                    'imgUrl': bidItem.imgUrl,
                    'createdAt': bidItem.createdAt,
                    'soldAt': bidItem.soldAt,
                    'finalPrice': bidItem.finalPrice,

                }
            )
        return Response(response)

class GetSoldBidItemsView(APIView):
    def get(self, request):
        bidItems = BidItem.objects.filter(~Q(soldAt=None)).order_by('-createdAt')
        response = []
        for bidItem in bidItems:
            response.append(
                {
                    'id': bidItem.id,
                    'user': f"{bidItem.user.first_name} {bidItem.user.last_name}",
                    'title': bidItem.title,
                    'content': bidItem.content,
                    'imgUrl': bidItem.imgUrl,
                    'createdAt': bidItem.createdAt,
                    'soldAt': bidItem.soldAt,
                    'finalPrice': bidItem.finalPrice,

                }
            )
        return Response(response)

class SoldtemView(APIView):
    def post(self, request, pk):
        BidItem.objects.filter(id=pk).update(soldAt=timezone.now(), finalPrice=request.data['actualPrice'])
        bidItem = BidItem.objects.filter(id=pk).first()
        serializer = BidItemSerializer(bidItem)

        response = Response()
    
        hash = sendTransaction(json.dumps(serializer.data))

        response.data = {
            'hash': hash
        }
        return response

class CreateBidItemAuthorView(APIView):
   def post(self, request, pk):

        minimum_price = client.lindex(pk, -1)
        if minimum_price and float(request.data['price']) <  float(minimum_price.decode('UTF-8')):
            raise ErrorDetail('Bid not sufficient')

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "bid", {
                "type": "user.bid",
                "event": "New Bid",
                "data": request.data,
                
            }
        )
        client.rpush(pk, float(request.data['price']))
        
        last_price = client.lindex(pk, -1)
        return Response(last_price)
