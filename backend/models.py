from django.db import models

class GradingRubric(models.Model):
    WRITING_TYPES_CHOICES = [('C', 'Creative Writing'), ('A', 'Academic Writing'), ('E', 'Expository Writing'),
                        ('D', 'Descriptive'), ('N', 'Narrative'),  ('O', 'Other'), ('U', 'Unspecified')]

    name = models.CharField(max_length=100)
    class_name = models.CharField(max_length=50, blank = True)
    #submitter = models.CharField(max_length=100, blank = True)
    level = models.CharField(max_length=40, blank = True)
    language = models.CharField(max_length=50)
    description = models.TextField(blank = True)
    content = models.FileField(upload_to="rubrics") # markdown of rubric. More info on FileField: https://docs.djangoproject.com/en/5.0/topics/files/
    last_updated = models.DateTimeField()
    writing_type = models.CharField(max_length=1, choices=WRITING_TYPES_CHOICES, default = "U")
    country = models.CharField(max_length=50, blank = True)
    notes = models.TextField(blank = True)

    def __str__(self):
        return self.name
