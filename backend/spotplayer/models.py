from django.db import models


class SpotPlayerCourse(models.Model):
    """A recorded course on SpotPlayer; a plan linked to one grants a licence for it when paid."""

    course_id = models.CharField(max_length=100)
    course_name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.course_name}'


class SpotPlayerLicense(models.Model):
    license_id = models.CharField(max_length=100)
    license_key = models.CharField(max_length=200)
    license_url = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.license_key}'


class SpotPlayerCourseLicense(models.Model):
    course = models.ForeignKey(SpotPlayerCourse, on_delete=models.CASCADE)
    license = models.ForeignKey(SpotPlayerLicense, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.course} - {self.license}'
