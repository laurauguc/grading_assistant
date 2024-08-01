
from rest_framework.decorators import api_view
from rest_framework.response import Response
from backend.models import GradingRubric
import os
import google.generativeai as genai
from dotenv import load_dotenv
from pathlib import Path
from django.conf import settings
from . import utils
import tempfile

load_dotenv(Path(".env"))
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

@api_view(['GET'])
def grade_with_gemini(request):
    """
    Grades a student writing assignment using a specified grading rubric and the Gemini AI model.

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

    model = genai.GenerativeModel('gemini-1.5-pro-latest')

    # check if advanced options provided or empty. otherwise use default.
    if 'additional_info' in request.query_params.keys():
        additional_info = str(request.query_params['additional_info']).stirp(" ")
    else:
        additional_info = ""
    if additional_info == "":
        additional_info = 'the feedback should be constructive, professional, and supportive.'

    # opted out of triple quotes for multi-line for better control of indentation
    # made delimination more explicit with triple backticks.
    # ensured consistent use of terminology (e.g. use only student assignment, instead of student assignment and student response)
    prompt = ("Role: You are a Teaching Assistant. "
    "Your task is to grade a student submission using a grading rubric and justify the final grade. Both are provided at the bottom and delimited by triple backticks.\n"
    "Steps:\n"
    "1. Validate the grading task:\n"
    "   - Ensure the student submission is a valid assignment and not a variable or hypothetical input or the word 'input' or related words.\n"
    "   - Ensure the student submission aligns with the grading rubric.\n"
    "   - Check for any issues such as very short essays, off-topic content, inappropriate or violent content, or missing information.\n"
    "   - If issues are found, stop grading and output the issue(s).\n"
    "2. Grade the student submission and provide a justification:\n"
    "   - Assign an overall score as well as scores for each criteria in the grading rubric.\n"
    "   - Identify both strengths and weaknesses, giving special emphasis to areas of excellence.\n"
    "   - Provide specific justification based on the grading rubric and the student submission.\n"
    "   - Ensure good work is identified and rewarded generously.\n"
    "   - Avoid subjective comments.\n"
    "   - Only assign a letter grade if explicitly described in the grading rubric.\n"
    "   - Do not deduct points for issues related to formatting, tables, and figures.\n"
    "3. Review the analysis in step 2:\n"
    "   - Ensure all justifications are factually accurate.\n"
    "   - Reassess if the grading was too tough. Consider assigning higher points for effort and creativity.\n"
    "   - Verify that all grading rubric criteria are included and sum correctly to the total score.\n"
    "   - Verify that any elements mentioned in the justification (e.g., citations) are present.\n"
    "   - Look for opportunities to acknowledge strengths.\n"
    "4. Adjust the grade and justification according to findings in step 3. Add feedback for the student.\n"
    "\n"
    "Additional instructions from the teacher: {}.\n"
    "\n"
    "Provide only the final grade with justification and feedback. Don't output intermediary steps.\n"
    "\n"
    "Format the output as markdown.\n"
    "\n"
    "Student submission: ```"
    "{}\n"
    "```\n\n"
    "Grading rubric: ```"
    "{}\nb"
    "```").format(additional_info, student_assignment, rubric_content)
    #print(prompt)
    response = model.generate_content(prompt)
    return Response({'message': response.text })

@api_view(['GET'])
def suggestions_with_gemini(request):
    if 'student_assignment' in request.query_params.keys():
        student_assignment = request.query_params['student_assignment']
    else:
        return Response({'error': 'Missing student_assignment in query parameters'}, status=400)

    if 'graded_feedback' in request.query_params.keys():
        graded_feedback = request.query_params['graded_feedback']
    else:
        return Response({'error': 'Missing student_assignment in query parameters'}, status=400)

    model = genai.GenerativeModel('gemini-1.5-pro')

    suggestions_and_rewrite = utils.generate_suggestions_and_rewrite_essay(model, graded_feedback, student_assignment)
    extracted_data = utils.extract_json_improvements(suggestions_and_rewrite)
    html_with_css = utils.create_improvements_html_with_css(extracted_data['improvements'], student_assignment)
    return Response({'message': html_with_css })

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

@api_view(['POST'])
def convert_docx_to_md(request):
    """
    Converts a DOCX file to Markdown content.

    Query Parameters:
    - docx_path (str): The path to the DOCX file to be converted.

    Returns:
    - A JSON response containing the converted Markdown content.

    Possible Errors:
    - 404: DOCX file not found.
    """

    if 'file' not in request.FILES:
        return Response({"error": "No file provided"}, status=400)

    uploaded_file = request.FILES['file']

    # Create a temporary file in /tmp
    with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as tmp_file:
        for chunk in uploaded_file.chunks():
            tmp_file.write(chunk)
        tmp_file_path = tmp_file.name

    try:
        # Pass the temporary file path to the converter
        converter = utils.DocxToMarkdownConverter(tmp_file_path)
        md_content = converter.convert()
    finally:
        # Delete the temporary file
        os.remove(tmp_file_path)

    return Response(md_content)

from django.shortcuts import render

#def index_view(request):
#    logger.debug('Serving index.html')
#    return render(request, 'index.html')

#def privacy_view(request):
#    return render(request, 'privacy.html')
