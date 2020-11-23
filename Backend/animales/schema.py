import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from animales.models import Tipo, Animal


# Graphene automáticamente mapeara los campos del modelo Tipo en un nodo TipoNode.
# Esto se configura en la Meta clase 
class TipoNode(DjangoObjectType):
    class Meta:
        model= Tipo    

# Se hace lo mismo con el modelo Animal
class AnimalNode(DjangoObjectType):
    class Meta:
        model = Animal

#Querys para retorno de datos 
class Query(graphene.ObjectType):
    tipo = graphene.Field(TipoNode, id=graphene.Int())
    animal = graphene.Field(AnimalNode, id=graphene.Int())
    tipos = graphene.List(TipoNode)
    animales = graphene.List(AnimalNode)

    def resolve_tipo(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Tipo.objects.get(pk=id)
        return None

    def resolve_animal(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Animal.objects.get(pk=id)

        return None

    def resolve_tipos(self, info, **kwargs):
        return Tipo.objects.all()

    def resolve_animales(self, info, **kwargs):
        return Animal.objects.all()


class TipoInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()

class AnimalInput(graphene.InputObjectType):
    id = graphene.ID()
    nombre = graphene.String()
    entorno = graphene.String()
    peso = graphene.Decimal()
    tipo = graphene.Int()

class CreateTipo(graphene.Mutation):
    class Arguments:
        input = TipoInput(required=True)

    ok = graphene.Boolean()
    Tipo = graphene.Field(TipoNode)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        tipo_instance = Tipo(
          nombre=input.nombre
          )
        tipo_instance.save()
        return CreateTipo(ok=ok, tipo=tipo_instance)

class CreateAnimal(graphene.Mutation):
    class Arguments:
        input = AnimalInput(required=True)

    ok = graphene.Boolean()
    Animal = graphene.Field(AnimalNode)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        animal_instance = Animal(
          nombre=input.nombre,
          entorno=input.entorno,
          peso=input.peso,
          tipo=input.tipo
          )
        animal_instance.save()
        return CreateAnimal(ok=ok, animal=animal_instance)

class Mutation(graphene.ObjectType):
    create_tipo = CreateTipo.Field()
    create_animal = CreateAnimal.Field()
