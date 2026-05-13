from rest_framework import serializers
from inventory.models import StockMovement


class StockMovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockMovement

        fields=[
            "id",
            "product",
            "warehouse",
            "quantity",
            "movement_type",
            "date",
            "note",
        ]

        read_only_fields = ["id","date"]
