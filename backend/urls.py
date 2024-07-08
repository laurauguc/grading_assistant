from django.urls import path
from . import views

urlpatterns = [
    path('grade-with-gemini/', views.grade_with_gemini, name = 'grade_with_gemini'),
    path('obtain-rubric-names/', views.obtain_rubric_names, name = 'obtain_rubric_names'),
    path('obtain-rubric/', views.obtain_rubric, name = 'obtain_rubric'),
    path('convert-docx-to-md/', views.convert_docx_to_md, name = 'convert_docx_to_md')
]
