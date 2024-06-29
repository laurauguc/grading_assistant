from django.shortcuts import render

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import GradingRubric
from django.core import serializers

import pathlib ## needed?
import os
import google.generativeai as genai
from dotenv import load_dotenv, find_dotenv
from pathlib import Path
import os
from django.conf import settings

load_dotenv(Path(".env"))
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)


@api_view(['GET'])
def grade_with_gemini(request):
    student_assignment = request.query_params['student_assignment']
    rubric_id = request.query_params['rubric_id']
    grading_rubric = GradingRubric.objects.get(id = rubric_id).content

    model = genai.GenerativeModel('gemini-pro')

    prompt = """You are a teaching assistant, supporting the instructor with grading. \
    Use the grading rubric to grade the student response. \
    Format the output as markdown and include a final grade with justification. \

    Grading Rubric: {}

    Student Response: {}
    """.format(grading_rubric, student_assignment)

    response = model.generate_content(prompt)


    return Response({'message': response.text })
    #return Response({'message': "Graded essay."})

@api_view(['GET'])
def obtain_rubric_names(request):
    rubric_names = GradingRubric.objects.values('name', 'id')
    #rubric_names = [i[0] for i in rubric_names] # flattening list
    return Response(rubric_names)


@api_view(['GET'])
def obtain_rubric(request):
    # obtain rubric based on ID
    rubric_id=request.query_params['rubric_id']
    #rubric = GradingRubric.objects.get(id = rubric_id)
    rubric = GradingRubric.objects.get(id = rubric_id).__dict__
    rubric['file_'] = open(os.path.join(settings.BASE_DIR,rubric['content'])).read()

    del rubric['_state'] # need to remove this created key in order for object to be serializable
    return Response(rubric)
