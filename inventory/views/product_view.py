from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from inventory.models import Product
from inventory.serializers import ProductSerializer

from django.shortcuts import get_object_or_404
from django.db.models import F

from rest_framework.permissions import IsAuthenticated

class ProductListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.select_related("category").all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
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
    
    def post(self, request, id):
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