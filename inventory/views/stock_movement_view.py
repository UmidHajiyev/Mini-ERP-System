from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from inventory.models import StockMovement
from inventory.serializers import StockMovementSerializer
from inventory.models import Product

from rest_framework.permissions import IsAuthenticated

class CreateStockMovementAPIView(APIView):

    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = StockMovementSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
class ProductStockMovementListAPIView(APIView):
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):

        product = get_object_or_404(Product,id=id)

        movements = StockMovement.objects.filter(product=product).order_by("-date")

        serializer = StockMovementSerializer(movements, many=True)

        return Response(serializer.data)
