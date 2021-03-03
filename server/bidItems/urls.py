from django.urls import path
from .views import CreateBidItemView, GetBidItemsView, GetSoldBidItemsView, SoldtemView, CreateBidItemAuthorView

urlpatterns = [
    path('create', CreateBidItemView.as_view()),
    path('all', GetBidItemsView.as_view()),
    path('all_sold', GetSoldBidItemsView.as_view()),
    path('update/<pk>', SoldtemView.as_view()),
    path('place_a_bid/<pk>', CreateBidItemAuthorView.as_view()),
]