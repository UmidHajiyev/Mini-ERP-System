"""
Represents a category in the inventory.
"""


from django.db import models
from django.shortcuts import get_object_or_404

class Category(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name
    

        
