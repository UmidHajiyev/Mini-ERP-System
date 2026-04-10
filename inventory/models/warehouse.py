"""
Represents a warehouse in the inventory.
"""

from django.db import models
from django.conf import settings

class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,null=True,blank=True)
    #settings.AUTH_USER_MODEL means current user model. It can be default one or custom one.



    def __str__(self):
        return self.name
