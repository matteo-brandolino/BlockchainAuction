from django.db import models
from users.models import User
from django.db.models import signals
from django.dispatch import receiver 

class BidItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField(max_length=32)
    content = models.TextField()
    imgUrl = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    soldAt = models.DateTimeField(blank=True, null=True)
    finalPrice = models.FloatField(blank=True, null=True)


    def __str__(self):
        return f"{self.title} - {self.user.first_name} {self.user.last_name}" 

class BidItemAuthor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bidItem = models.ForeignKey(BidItem, on_delete=models.CASCADE)
    price = models.FloatField()
