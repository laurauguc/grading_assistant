from django.shortcuts import render
from django.http import JsonResponse

def grade(request):
    return JsonResponse({'status': 'done'})

