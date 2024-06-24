from django.contrib import admin

# Register your models here.
from .models import GradingRubric

@admin.register(GradingRubric)
class GradingRubricAdmin(admin.ModelAdmin):
    list_display = ["name", "class_name", "level", "language", "writing_type", "country"]
