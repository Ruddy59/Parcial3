from django.db import models

class Tipo(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    class Meta:
        ordering = ('nombre',)

class Animal(models.Model):
    nombre = models.CharField(max_length=100)
    entorno = models.CharField(max_length=100)
    peso = models.DecimalField(decimal_places=2,max_digits=5)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre
    class Meta:
        ordering = ('nombre',)
