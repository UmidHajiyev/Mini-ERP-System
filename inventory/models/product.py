from django.db import models
from .category import Category

class Product(models.Model):
    name = models.CharField(max_length=100)
    sku = models.CharField(max_length=100)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=10,decimal_places=2)
    reorder_level = models.IntegerField()
    description = models.TextField()

    def __str__(self):
        return self.name
    
    def update_product(self,name,sku,category_id,unit_price,reorder_level,description):
        self.name = name
        self.sku = sku
        self.category = Category.objects.get(id=category_id)
        self.unit_price = unit_price
        self.reorder_level = reorder_level
        self.description = description
        self.save()