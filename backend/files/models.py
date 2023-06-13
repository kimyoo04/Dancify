from django.db import models


class File(models.Model):
    title = models.CharField(max_length=50)
    path = models.FileField(upload_to="uploaded_files/")
