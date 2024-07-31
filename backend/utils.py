import docx
import os
import json
import pathlib
import google.generativeai as genai
from dotenv import load_dotenv, find_dotenv
from pathlib import Path
import re

class DocxToMarkdownConverter:
    """
    A class to convert DOCX files to Markdown format.

    This class provides methods to read a DOCX file, convert its content
    (including paragraphs and tables) to Markdown format, and save the
    converted content to a specified file path.
    """

    def __init__(self, docx_path):
        """
        Initialize the converter with paths to the DOCX file and the output Markdown file.

        Parameters:
        docx_path (str): Path to the DOCX file.
        md_path (str): Path to the output Markdown file.
        """
        self.docx_path = docx_path
        self.doc = None

    def read_word_file(self):
        """
        Read the DOCX file and store the Document object in the instance variable.
        """
        self.doc = docx.Document(self.docx_path)

    def convert_paragraph_to_md(self, paragraph):
        """
        Convert a DOCX paragraph to a Markdown formatted string.

        Parameters:
        paragraph (docx.text.paragraph.Paragraph): The paragraph to convert.

        Returns:
        str: The Markdown formatted paragraph.
        """
        md_text = paragraph.text.strip()
        if paragraph.style.name.startswith('Heading'):
            level = int(paragraph.style.name.split()[-1])
            md_text = f"{'#' * level} {md_text}"
        elif paragraph.style.name == 'Normal' and md_text:
            md_text = f"{md_text}\n"
        return md_text

    def convert_cell_to_md(self, cell):
        """
        Convert the content of a DOCX table cell to a Markdown formatted string.

        Parameters:
        cell (docx.table._Cell): The cell to convert.

        Returns:
        str: The Markdown formatted cell content.
        """
        md_lines = []
        for paragraph in cell.paragraphs:
            if paragraph.text.strip():  # Only add non-empty paragraphs
                md_lines.append(paragraph.text.strip())
        for inner_table in cell.tables:
            for inner_row in inner_table.rows: # changed here
                for inner_cell in inner_row.cells:
                    for paragraph in inner_cell.paragraphs:
                        md_lines.append(paragraph.text.strip(". "))
        cell_md = '. '.join(md_lines).strip()  # Join paragraphs with spaces
        return cell_md

    def convert_table_to_md(self, table):
        """
        Convert a DOCX table to a Markdown formatted string.

        Parameters:
        table (docx.table.Table): The table to convert.

        Returns:
        list: A list of strings representing the Markdown formatted table.
        """
        md_lines = []
        header = True
        for row in table.rows:
            row_data = [self.convert_cell_to_md(cell) for cell in row.cells]
            #row_data = [cell.text.strip() for cell in row.cells]
            if len(set(row_data)) == 1: # wide row
                md_lines.append("\n"+row_data[0]+"\n")
                header = True
            else:
                md_line = '| ' + ' | '.join(row_data) + ' |'
                md_lines.append(md_line)
                if header:
                    separator = '| ' + ' | '.join(['---'] * len(row_data)) + ' |'
                    md_lines.append(separator)
                    header = False
        return md_lines

    def convert_docx_to_md(self):
        """
        Convert the content of the DOCX Document object to Markdown format.

        Returns:
        str: The entire document content converted to Markdown format.
        """
        md_lines = []
        for element in self.doc.element.body:
            if isinstance(element, docx.oxml.CT_P):
                paragraph = docx.text.paragraph.Paragraph(element, self.doc)
                md_line = self.convert_paragraph_to_md(paragraph)
                if md_line:
                    md_lines.append(md_line)
            elif isinstance(element, docx.oxml.CT_Tbl):
                table = docx.table.Table(element, self.doc)
                md_table_lines = self.convert_table_to_md(table)
                md_lines.extend(md_table_lines)
        return "\n".join(md_lines)

    def convert(self):
        """
        Orchestrate the conversion of a DOCX file to Markdown format and save the result to a file.
        """
        if not os.path.exists(self.docx_path):
            raise FileNotFoundError(f"The file {self.docx_path} does not exist.")

        self.read_word_file()
        md_content = self.convert_docx_to_md()
        return md_content  # Return the Markdown content to the console

def format_suggestions_and_rewrite_prompt(grading_feedback, student_assignment):
    return f"""
    Based on the following grading feedback,

    1. Provide suggestions for improvement
    2. Rewrite the essay using the suggested improvements

    Grading Feedback:
    {grading_feedback}

    Student Assignment:
    {student_assignment}

    Take each improvement provided and identify,
    a. the smallest chunk of the original text where it was applied
    b. the criterion from the rubric. If the criterion is not available, use the category or create one.
    c. the reason for the suggested improvement

    Provide steps a, b, and c in the following JSON format:
    [
        {{"improvement": "improvement_1", "criterion_from_rubric": "criterion_from_rubric_1", "reason_for_suggestion": "reason_for_suggestion_1", "original_text": "original_text_1", "revised_text": "revised_text_1"}},
        ...
        {{"improvement": "improvement_n", "criterion_from_rubric": "criterion_from_rubric_n", "reason_for_suggestion": "reason_for_suggestion_n", "original_text": "original_text_n", "revised_text": "original_text_n"}}
    ]
    """

def generate_suggestions_and_rewrite_essay(model, grading_feedback, student_assignment):
    prompt = format_suggestions_and_rewrite_prompt(grading_feedback, student_assignment)

    response = model.generate_content(prompt)

    # Ensure the response streaming completes
    response.resolve()

    if response and response.text:
        #print("Full response from model:\n", response.text)  # Debugging statement
        return response.text
    else:
        #print("Error: No response from model")
        return None

def clean_json_string(json_string):
    # Remove Markdown formatting and trailing commas
    json_string = json_string.replace('```json', '').replace('```', '').strip()
    json_string = re.sub(r',\s*([}\]])', r'\1', json_string)  # Remove trailing commas before closing braces
    # Ensure all objects are closed properly
    json_string = re.sub(r'\s*}\s*{', '},{', json_string)
    # Add missing closing brackets if necessary
    if json_string.count('[') > json_string.count(']'):
        json_string += ']'
    if json_string.count('{') > json_string.count('}'):
        json_string += '}'
    return json_string

def extract_json_improvements(response):
    if response is None:
        print("Warning: No response provided for JSON extraction")
        return {'improvements': [], 'response_without_json': ''}
    try:
        json_match = re.search(r'\[\s*\{.*\}\s*\]', response, re.DOTALL)
        if not json_match:
            raise ValueError("No valid JSON found in response.")

        cleaned_json_string = clean_json_string(json_match.group(0))
        print("Cleaned JSON string:", cleaned_json_string)  # Debugging statement

        improvements = json.loads(cleaned_json_string)
        response_without_json = response.replace(json_match.group(0), '')
        return {'improvements': improvements, 'response_without_json': response_without_json}
    except (ValueError, json.JSONDecodeError) as e:
        print("Warning: issue extracting JSON from response:", e)
        print(f"Failed to decode JSON string: {response}")  # Print the entire response for debugging
        return {'improvements': [], 'response_without_json': response}

def create_improvements_html_with_css(improvements, original_text):
    """
    Displays the improvements in the original essay text with hover effects.
    Highlights the revised text in the essay and provides a tooltip with the details of the improvement.
    """
    if not improvements:
        return "Unable to generate the Detailed Feedback. Please check your inputs and try again."
    elif len(improvements) == 0:
        return "Unable to generate the Detailed Feedback. Please check your inputs and try again."
    css = """
    <style>
    .improvement-tooltip {
        position: relative;
        display: inline-block;
        cursor: pointer;
        background-color: yellow;
        margin-bottom: 10px;  /* Adds space between highlighted sections */
        padding: 5px;  /* Adds padding for better visibility */
        border: 1px solid black;  /* Adds a border to the highlighted section */
        border-radius: 4px;  /* Adds rounded corners */
    }
    .improvement-tooltip .tooltiptext {
        visibility: hidden;
        width: 300px;
        background-color: white;
        color: black;
        text-align: left;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%;
        margin-left: -150px;
    }
    .improvement-tooltip:hover .tooltiptext {
        visibility: visible;
    }
    </style>
    """

    html_content = original_text

    for improvement in improvements:
        original = improvement.get('original_text', '')
        revised = improvement.get('revised_text', '')
        improvement_text = improvement['improvement']
        reason_for_suggestion = improvement['reason_for_suggestion']
        criterion = improvement['criterion_from_rubric']

        tooltip_html = f"""
        <div class="improvement-tooltip">
            {revised}
            <span class="tooltiptext">
                <strong>Criterion:</strong> {criterion}<br>
                <strong>Improvement:</strong> {improvement_text}<br>
                <strong>Reason:</strong> {reason_for_suggestion}
            </span>
        </div>
        """

        if original:
            html_content = html_content.replace(original, tooltip_html)
        else:
            html_content = html_content + tooltip_html

    return css + html_content
    #display(HTML(css + html_content))
