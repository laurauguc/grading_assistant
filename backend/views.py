#from django.shortcuts import render

#from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import GradingRubric
#from django.core import serializers

#import pathlib ## needed?
import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path
#import os
from django.conf import settings
#from . import utils
from .utils import DocxToMarkdownConverter

load_dotenv(Path(".env"))
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)


@api_view(['GET'])
def grade_with_gemini(request):
    """
    Grades a student assignment using a specified grading rubric and the Gemini AI model.

    Query Parameters:
    - student_assignment (str): The content of the student's assignment.
    - rubric_id (int): The ID of the grading rubric to be used.

    Returns:
    - A JSON response containing the graded assignment with a final grade and justification formatted as markdown.

    Possible Errors:
    - 400: Missing student_assignment or rubric_id in query parameters.
    - 404: Grading rubric file not found or rubric ID does not exist.
    """

    if 'student_assignment' in request.query_params.keys():
        student_assignment = request.query_params['student_assignment']
    else:
        return Response({'error': 'Missing student_assignment in query parameters'}, status=400)

    if 'rubric_content' in request.query_params.keys():
        rubric_content = request.query_params['rubric_content']
    else:
        if 'rubric_id' in request.query_params.keys():
            rubric_id = request.query_params['rubric_id']
        else:
            return Response({'error': 'Missing rubric_content and rubric_id in query parameters'}, status=400)
        rubric_with_metadata = GradingRubric.objects.get(id = rubric_id).__dict__
        rubric_path = os.path.join(settings.BASE_DIR,rubric_with_metadata['content'])

        if not os.path.exists(rubric_path):
            return Response({'error': 'Grading rubric file not found'}, status=404)

        with open(rubric_path, 'r') as file:
            rubric_content = file.read()

    model = genai.GenerativeModel('gemini-pro')

    prompt = """You are a teaching assistant, supporting the instructor with grading. \
    Use the grading rubric to grade the student response. \
    Format the output as markdown and include a final grade with justification. \

    Grading Rubric: {}

    Student Response: {}
    """.format(rubric_content, student_assignment)

    response = model.generate_content(prompt)


    return Response({'message': response.text })
    #return Response({'message': "Graded essay."})

@api_view(['GET'])
def obtain_rubric_names(request):
    """
    Retrieves the names and IDs of all available grading rubrics.

    Returns:
    - A JSON response containing a list of dictionaries, each with 'name' and 'id' of a grading rubric.

    Possible Errors:
    - 500: Internal server error if there's an issue retrieving the rubrics from the database.
    """

    try:
        rubric_names = GradingRubric.objects.values('name', 'id')
        return Response(rubric_names)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def obtain_rubric(request):
    """
    Retrieves the details of a specific grading rubric based on the provided ID.

    Query Parameters:
    - rubric_id (int): The ID of the grading rubric to be retrieved.

    Returns:
    - A JSON response containing the rubric details including the content of the rubric file.

    Possible Errors:
    - 400: Missing rubric_id in query parameters.
    - 404: Rubric with the specified ID not found or grading rubric file not found.
    - 500: Internal server error if there's an issue reading the rubric file.
    """

    rubric_id=request.query_params['rubric_id']
    if not rubric_id:
        return Response({'error': 'Missing rubric_id in query parameters'}, status=400)

    rubric_with_metadata = GradingRubric.objects.get(id = rubric_id).__dict__
    rubric_path = os.path.join(settings.BASE_DIR,rubric_with_metadata['content'])

    if not os.path.exists(rubric_path):
        return Response({'error': 'Grading rubric file not found'}, status=404)

    try:
        with open(rubric_path, 'r') as file:
            rubric_with_metadata['file_'] = file.read()
    except Exception as e:
            return Response({'error': str(e)}, status=500)

    del rubric_with_metadata['_state'] # remove this key to ensure the object is serializable

    return Response(rubric_with_metadata)

@api_view(['GET'])
def convert_docx_to_md(request):
    """
    Converts a DOCX file to Markdown content.

    Query Parameters:
    - docx_path (str): The path to the DOCX file to be converted.

    Returns:
    - A JSON response containing the converted Markdown content.

    Possible Errors:
    - 400: Missing or invalid docx_path in query parameters.
    - 404: DOCX file not found.
    - 500: Internal server error if there's an issue during the conversion process.
    """
    docx_path = request.query_params["docx_path"]

    if not docx_path:
        return Response({'error': 'Missing docx_path in query parameters'}, status=400)

    if not os.path.exists(docx_path):
        return Response({'error': 'DOCX file not found'}, status=404)

    try:
        converter = DocxToMarkdownConverter(docx_path)
        md_content = converter.convert()
        return Response(md_content)
    except Exception as e:
        return Response({'error': str(e)}, status=500)



    # delete commented line (temporarily here to provide example for testing)
    #docx_path = "/Users/laura/Desktop/grading_assistant/external_data/rubric_markdown_test/us_history_rubric_test.docx"
