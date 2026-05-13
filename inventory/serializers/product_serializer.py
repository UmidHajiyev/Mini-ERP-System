from rest_framework import serializers
from inventory.models import Product

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only = True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "sku",
            "description",
            "unit_price",
            "reorder_level",
            "stock",
            "category",
            "category_name",
        ]