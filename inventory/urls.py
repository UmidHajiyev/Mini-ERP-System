from django.urls import path
from inventory.views import ProductListAPIView,ProductDetailAPIView
from inventory.views import CreateStockMovementAPIView
from inventory.views import ProductStockMovementListAPIView
from inventory.views import LowStockProductAPIView
from inventory.views import CategoryListCreateAPIView

urlpatterns = [
    path("products/",ProductListAPIView.as_view()),
    path("products/<int:id>/stock-movements/", ProductStockMovementListAPIView.as_view()),
    path("products/<int:id>",ProductDetailAPIView.as_view()),
    path("stock-movements/",CreateStockMovementAPIView.as_view()),
    path("low-stock/", LowStockProductAPIView.as_view()),
    path("categories/", CategoryListCreateAPIView.as_view()),
]