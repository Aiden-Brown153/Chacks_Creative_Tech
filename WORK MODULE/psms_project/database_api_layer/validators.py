from rest_framework import serializers
from datetime import date

# ✅ Check if email format is valid
def validate_email(value):
    if "@" not in value or "." not in value:
        raise serializers.ValidationError("Invalid email format.")
    return value

# ✅ Check if required fields are present
def validate_required_fields(data, required_fields):
    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            raise serializers.ValidationError(f"{field} is required.")
    return data

# ✅ Check if start_date is before end_date
def validate_date_range(start_date, end_date):
    if start_date > end_date:
        raise serializers.ValidationError("Start date cannot be after end date.")
    return start_date, end_date

