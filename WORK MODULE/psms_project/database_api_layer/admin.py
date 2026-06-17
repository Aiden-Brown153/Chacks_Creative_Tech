from django.contrib import admin
from .models import Employee

# Customize how Employee records appear in the admin list
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "department")

admin.site.register(Employee, EmployeeAdmin)

