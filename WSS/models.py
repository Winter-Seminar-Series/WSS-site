from django.db import models
from django.utils.safestring import mark_safe


class WSS(models.Model):
    year = models.PositiveSmallIntegerField()
    description = models.TextField()
    registration_link = models.URLField(null=True, blank=True)
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

    @property
    def main_image_url(self):
        return self.main_image.image.url

class Clip(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='clips', verbose_name='WSS')
    clip = models.FileField(upload_to='clips/')

    def __str__(self):
        return 'Clip'


class Image(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='images', verbose_name='WSS')
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return 'Image'


class Sponsor(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='sponsors')
    name = models.CharField(max_length=70)
    logo = models.ImageField(upload_to='logos/')
    is_main = models.BooleanField()

    def __str__(self):
        return self.name

    def logo_tag(self):
        return mark_safe('<img src={} width=40 height=40>'.format(self.logo.url))

    logo_tag.short_description = 'logo'


class ExternalLinkType(models.Model):
    logo_url = models.URLField()
    name = models.CharField(max_length=40)

    def __str__(self):
        return self.name

    def logo_tag(self):
        return mark_safe('<img src={} width=40 height=40>'.format(self.logo_url))

    logo_tag.short_description = 'logo'


class ExternalLink(models.Model):
    wss = models.ForeignKey(to=WSS, related_name='external_links')
    type = models.ForeignKey(to=ExternalLinkType)
    url = models.URLField()

    def __str__(self):
        return self.url
