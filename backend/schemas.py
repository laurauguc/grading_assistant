
# response schema for specific areas for improvment
response_format_improvements = response_format={
    "type": "json_schema",
    "json_schema": {
      "name": "writing_improvements",
      "strict": True,
      "schema": {
        "type": "object",
        "properties": {
          "improvements": {
            "type": "array",
            "description": "A list of suggested writing improvements.",
            "items": {
              "type": "object",
              "properties": {
                "improvement": {
                  "type": "string",
                  "description": "A concise description of the suggested change."
                },
                "original_text": {
                  "type": "string",
                  "description": "The exact excerpt from the student's assignment where the improvement applies."
                },
                "criterion_from_rubric": {
                  "type": "string",
                  "description": "The related criterion from the high-level feedback that justifies the suggestion."
                },
                "reason_for_suggestion": {
                  "type": "string",
                  "description": "A clear explanation of why the improvement is necessary or beneficial."
                },
                "examples": {
                    "type": "string",
                    "description": "Example(s) implementation idea of the improvement."
                }
              },
              "required": [
                "improvement",
                "original_text",
                "criterion_from_rubric",
                "reason_for_suggestion",
                "examples"
              ],
              "additionalProperties": False
            }
          }
        },
        "required": [
          "improvements"
        ],
        "additionalProperties": False
      }
    }
  }


response_format_strengths = response_format = response_format={
    "type": "json_schema",
    "json_schema": {
      "name": "writing_strengths",
      "strict": True,
      "schema": {
        "type": "object",
        "properties": {
          "strengths": {
            "type": "array",
            "description": "A list of specific strengths in writing assignments.",
            "items": {
              "type": "object",
              "properties": {
                "strength": {
                  "type": "string",
                  "description": "A concise description of the strength."
                },
                "original_text": {
                  "type": "string",
                  "description": "The exact excerpt from the student's assignment where the improvement applies."
                },
                "criterion_from_rubric": {
                  "type": "string",
                  "description": "The related criterion from the high-level feedback that justifies the suggestion."
                },
                "comments": {
                  "type": "string",
                  "description": "additional reinforcement, clarification, or advice."
                },
              },
              "required": [
                "strength",
                "original_text",
                "criterion_from_rubric",
                "comments",
              ],
              "additionalProperties": False
            }
          }
        },
        "required": [
          "strengths"
        ],
        "additionalProperties": False
      }
    }
  }
