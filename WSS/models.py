from django.db import models


class WSS(models.Model):
    year = models.PositiveSmallIntegerField()
    description = models.TextField()
    registrantion_link = models.URLField(null=True, blank=True)
    proposal_link = models.URLField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    main_clip = models.OneToOneField(to='Clip', null=True, blank=True, related_name='+')
    main_image = models.OneToOneField(to='Image', null=True, blank=True, related_name='+')

    class Meta:
        ordering = ('-year',)
        verbose_name = 'Winter Seminar Series'
        verbose_name_plural = 'Winter Seminar Series'

    def __str__(self):
        return 'WSS {}'.format(self.year)


class Clip(models.Model):
    clip = models.FileField(upload_to='clips/')
    wss = models.ForeignKey(to='WSS', related_name='clips')


class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    wss = models.ForeignKey(to='WSS', related_name='images')


class Sponsor(models.Model):
    name = models.CharField(max_length=70)
    logo = models.ImageField(upload_to='logos/')
    is_main = models.BooleanField()
    wss = models.ForeignKey(to='WSS', related_name='sponsors')

    def __str__(self):
        return self.name


class ExternalLinkType(models.Model):
    logoURL = models.URLField()
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name


class ExternalLink(models.Model):
    type = models.ForeignKey(to=ExternalLinkType)
    url = models.URLField()
    wss = models.ForeignKey(to=WSS, related_name='external_links')

    def __str__(self):
        return self.url
