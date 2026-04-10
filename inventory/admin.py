from django.contrib import admin
from .models.category import Category
from .models.product import Product
from .models.warehouse import Warehouse
from .models.stock_movement import Stock_Movement


admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Warehouse)
admin.site.register(Stock_Movement)


