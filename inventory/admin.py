from django.contrib import admin
from .models.category import Category
from .models.product import Product
from .models.warehouse import Warehouse
from .models.stock_movement import StockMovement


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name","sku","category","unit_price","reorder_level","stock")
    search_fields = ("name","sku")
    list_filter = ("category",)

@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ("product","warehouse","quantity","movement_type","date","remaining_stock")
    search_fields = ("product__name","warehouse__name")
    list_filter = ("movement_type",)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
    search_fields = ("name",)

@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    list_display = ("name","location","manager")
    search_fields = ("name",)
