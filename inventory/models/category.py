"""
Represents a category in the inventory.
"""


from django.db import models
from django.shortcuts import get_object_or_404

class Category(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    

    def update_category(self,name,description):
        """
        Updates the category and saves it.
        """
        self.name = name
        self.description = description
        self.save()

        
