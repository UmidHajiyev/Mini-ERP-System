"""
Represents a product in the inventory.
"""

from django.db import models
from .category import Category

class Product(models.Model):
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=10,decimal_places=2)
    reorder_level = models.IntegerField()
    description = models.TextField()
    stock_level = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name
    