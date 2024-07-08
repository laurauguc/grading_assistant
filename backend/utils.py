import docx
import os

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
            row_data = [cell.text.strip() for cell in row.cells]
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
