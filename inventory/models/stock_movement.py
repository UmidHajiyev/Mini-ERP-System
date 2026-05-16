"""
Represents a stock movement in the inventory.
"""

from django.db import models
from .product import Product
from .warehouse import Warehouse
from django.core.exceptions import ValidationError

from django.utils import timezone

class StockMovement(models.Model):

    movement_types = [
        ("IN","In"),
        ("OUT","Out")
    ]
    #In tuples as first value django stores value in db as second one display them

    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    warehouse = models.ForeignKey(Warehouse,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    remaining_stock = models.PositiveIntegerField(editable=False)
    movement_type = models.CharField(max_length=3,choices=movement_types)
    date = models.DateTimeField(default=timezone.now)
    note = models.TextField()


    def check_stock(self):
        if self.movement_type == 'OUT' and self.quantity > self.product.stock:
            raise ValidationError("Not enough stock")
        
    def save(self, *args, **kwargs):
        if self.pk:
            raise ValidationError("Stock movements cannot be edited after creation")

        self.check_stock()

        if not self.pk:
            if self.movement_type == "IN":
                self.product.stock += self.quantity
            elif self.movement_type =="OUT":
                self.product.stock -=self.quantity
            self.remaining_stock = self.product.stock
            self.product.save()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError("Stock movements cannot be deleted.")


    def __str__(self):
        return f"{self.product.name} - {self.movement_type} - {self.quantity} | Remaining stock: {self.remaining_stock}"
