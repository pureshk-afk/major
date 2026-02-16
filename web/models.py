from django.db import models
from django .utils.text import slugify
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100, unique=True)
    main_image = models.ImageField(upload_to='products/main/')

    def save(self,  *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Collection(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=250, blank=True)
    main_image = models.ImageField(upload_to='products/main/')

    def __str__(self):
        return self.name
    

class Product(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100, unique=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    collection = models.ForeignKey(Collection, null=True, on_delete=models.SET_NULL, related_name='products', blank=True, default=None)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, max_length=512)
    main_image = models.ImageField(upload_to='products/main/')
    length = models.DecimalField(max_digits=10, decimal_places=2)
    height= models.DecimalField(max_digits=10, decimal_places=2)
    width = models.DecimalField(max_digits=10, decimal_places=2)
    style = models.CharField(max_length=50)
    material = models.CharField(max_length=100)
    length = models.DecimalField(max_digits=10, decimal_places=2)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self,  *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class Project(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, max_length=512)
    main_image = models.ImageField(upload_to='products/main/')

    def save(self,  *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class Review(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, max_length=512)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/extra/')

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/extra/')