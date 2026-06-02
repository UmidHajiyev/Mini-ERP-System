from decimal import Decimal, InvalidOperation

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination

from inventory.models import Product
from inventory.serializers import ProductSerializer

from django.shortcuts import get_object_or_404
from django.db.models import F

from rest_framework.permissions import IsAuthenticated

class ProductListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.select_related("category").all()

        name = request.query_params.get("name")
        sku = request.query_params.get("sku")
        min_price = request.query_params.get("min_price")
        max_price = request.query_params.get("max_price")
        stock_status = request.query_params.get("stock_status")
        category_id = request.query_params.get("category_id")

        if name:
            products = products.filter(name__icontains=name)

        if sku:
            products = products.filter(sku__icontains=sku)

        try:
            if min_price:
                min_price = Decimal(min_price)
                products = products.filter(unit_price__gte=min_price)

            if max_price:
                max_price = Decimal(max_price)
                products = products.filter(unit_price__lte=max_price)

        except InvalidOperation:
            return Response(
                {"price": "min_price and max_price must be valid numbers."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if stock_status == "in_stock":
            products = products.filter(stock__gt=F("reorder_level"))

        elif stock_status == "low_stock":
            products = products.filter(
                stock__gt=0,
                stock__lte=F("reorder_level")
            )

        elif stock_status == "out_of_stock":
            products = products.filter(stock=0)

        elif stock_status:
            return Response(
                {"stock_status": "Allowed values: in_stock, low_stock, out_of_stock."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if category_id:
            products = products.filter(category_id=category_id)

        paginator = PageNumberPagination()
        paginator.page_size = 10

        paginated_products = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(paginated_products, many=True)

        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request):
        serializer = ProductSerializer(data = request.data)

        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
class ProductDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        product = get_object_or_404(Product.objects.select_related("category"), id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    def put(self, request, id):
        product = get_object_or_404(Product,id=id)
        serializer = ProductSerializer(product, data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
            
class LowStockProductAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        low_stock_products = Product.objects.select_related("category").filter(stock__lte=F("reorder_level"))

        serializer = ProductSerializer(low_stock_products,many=True)
        return Response(serializer.data)