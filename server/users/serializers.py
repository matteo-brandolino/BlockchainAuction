from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name','last_name', 'email', 'password']
        #not returning pass only wrtie
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        #Extarct pass
        password = validated_data.pop('password', None)
        #instance without password
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password) #hash password
        instance.save()
        return instance

        