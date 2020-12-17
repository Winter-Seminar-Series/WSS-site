# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2020)
    ctype = ContentType.objects.get_for_model(Seminar)

    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Two Facets of Learning Robust Models: Fundamental Limits and Generalization to Natural Out-of-Distribution Inputs',
        audience='The talk would be relevant to whoever is interested in machine learning'
        abstract='In this talk, we will focus on the recently-emerged field of (adversarially) robust learning. The talk will be self-contained and no particular background on robust learning will be needed. The field began by the observation that modern learning models, despite the breakthrough performance, remain fragile to seemingly innocuous changes in the data such as small, norm-bounded perturbations of the input data. In response, various training methodologies have been developed for enhancing robustness. However, it is fair to say that our understanding in this field is still at its infancy and several key questions remain widely open. We will consider two such questions. \n(1) Fundamental limits: It has been repeatedly observed that improving robustness to perturbed inputs (robust accuracy) comes at the cost of decreasing the accuracy on benign inputs (standard accuracy), leading to a fundamental tradeoff between these often competing objectives. Complicating matters further, recent empirical evidence suggests that a variety of other factors (size and quality of training data, model size, etc.) affect this tradeoff in somewhat surprising ways. In the first part of the talk, we will develop a precise and comprehensive understanding of such tradeoffs in the context of the simple yet foundational problem of linear regression. \n(2) Robustness to other types of out-of-distribution inputs: There are other sources of fragility for deep learning that are arguably more common and less studied. Indeed, natural variation such as lighting or weather conditions or device imperfections can significantly degrade the accuracy of trained neural networks, proving that such natural variation presents a significant challenge. To this end, in the second part of the talk we propose a paradigm shift from perturbation-based adversarial robustness toward a new framework called  "model-based robust deep learning". Using this framework, we will provide general training algorithms that improve the robustness of neural networks against natural variation in data. We will show the success of this framework to improve robustness of modern learning models consistently against many types of natural out-of-distribution inputs and across a variety of commonly-used datasets.',
        speaker=Speaker.objects.filter(name='Hamed Hassani').last()
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Machine Learning, Robotic Imaging and Augmented Reality for Computer Assisted Interventions',
        audience='Curious and creative novices and experts'
        abstract='In this talk, I will present an overview of our most recent advancements in Robotic Imaging, Machine Leaning and Medical Augmented Reality. I will first discuss the particular requirements for intra-operative imaging and visualization. I will then present some of our latest results in intra-operative multimodal robotic imaging and its translation to clinical applications. I will then discuss the impact of research advancement in machine learning on medical imaging and computer assisted intervention. I will finally present some applications of virtual and augmented reality in the medical domain. Starting by the current deployment of AR and VR technology within medical education, I discuss its current and future impact on surgery, surgical education and training. I will then review the first deployment of augmented reality into operating rooms in the last two decades and present some of our latest achievements in this field.',
        speaker=Speaker.objects.filter(name='Nassir Navab').last()
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2020)

    titles = [
        'Two Facets of Learning Robust Models: Fundamental Limits and Generalization to Natural Out-of-Distribution Inputs',
        'Machine Learning, Robotic Imaging and Augmented Reality for Computer Assisted Interventions',
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0027_add_new_speakers_2020'),
        ('events', '0010_baseevent__url_allow_blank'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
