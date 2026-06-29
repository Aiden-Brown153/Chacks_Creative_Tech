from rest_framework import serializers
from .models import Employee, Leave

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "__all__"

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = "__all__"
from .validators import validate_email, validate_date_range

class LeaveSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[validate_email])
    def validate(self, data):
        validate_date_range(data['start_date'], data['end_date'])
        return data
