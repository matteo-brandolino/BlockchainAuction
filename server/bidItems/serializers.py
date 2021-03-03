from rest_framework import serializers
from .models import BidItem, BidItemAuthor

class BidItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BidItem
        fields = ['id', 'user','title', 'content', 'imgUrl', 'createdAt', 'soldAt', 'finalPrice']

class BidItemAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = BidItemAuthor
        fields = ['id', 'user', 'bidItem', 'price']
