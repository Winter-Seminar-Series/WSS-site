from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    Seminar.objects.filter(wss=wss, speaker__name='Stefan Schmid')\
        .update(abstract='''Datacenter network traffic is growing explosively, and next-generation workloads, e.g., related to machine learning and artificial intelligence, are likely to further push networks towards their capacity limits. While over the last years, several interesting new datacenter network architectures have been proposed to improve the efficiency and performance of datacenter networks, these networks typically have in common that their topology is fixed and cannot be reconfigured to the traffic demand they serve.

In this talk, I will discuss a different approach to operate networks: reconfigurable “self-adjusting” networks whose topology adjusts to the workload in an online manner. Reconfigurable networks are enabled by emerging optical technologies, allowing to quickly change the physical topology at runtime. This technology also introduces a vision of demand-aware networks which tap a new optimization opportunity: empirical and measurement studies show that traffic workloads feature spatial and temporal structure, which in principle could be exploited by reconfigurable networks. However, while the technology of such reconfigurable networks is evolving at a fast pace, these networks lack theoretical foundations: models, metrics, and algorithms – we have fallen behind the curve. The objective of this talk is to help bridge this gap, and introduce a rich and potentially impactful research area. We first discuss technological enablers and report on motivating empirical studies. Our main focus then is on the new models and algorithmic and practical challenges introduced by this field. In particular, we will review existing algorithms and complexity results, report on early prototypes, and highlight future research directions.''')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    Seminar.objects.filter(wss=wss, speaker__name='Stefan Schmid')\
        .update(abstract='''This talk is about experimentally exploring and improving the power-efficiency and reliability trade-off in Field Programmable Gate Arrays (FPGA)-based Convolutional Neural Network (CNN) accelerators. More specifically, we empirically evaluate an undervolting technique, i.e., underscaling the circuit supply voltage below the nominal level, to improve the power-efficiency of CNN accelerators mapped to FPGAs. Undervolting below a safe voltage level can lead to timing faults due to excessive circuit latency increase. We evaluate the reliability-power trade-off for such accelerators. Specifically, we experimentally study the reduced-voltage operation of multiple components of real FPGAs, characterize the corresponding reliability behavior of CNN accelerators, propose techniques to minimize the drawbacks of reduced-voltage operation, and combine undervolting with architectural CNN optimization techniques, i.e., quantization and pruning. We investigate the effect of environmental temperature on the reliability-power trade-off of such accelerators. We perform experiments on several samples of modern Xilinx FPGA platforms with five state-of-the-art image classification CNN benchmarks. We achieve more than 3X power-efficiency (GOPs/W) gain via undervolting. 2.6X of this gain is the result of eliminating the voltage guardband region, i.e., the safe voltage region below the nominal level that is set by the FPGA vendor to ensure correct functionality in worst-case environmental and circuit conditions. 43% of the power-efficiency gain is due to further undervolting below the guardband, which comes at the cost of accuracy loss in the CNN accelerator. We evaluate an effective frequency underscaling technique that prevents this accuracy loss and find that it reduces the power-efficiency gain from 43% to 25%. Finally, we will discuss the further open problems in this area and propose several potential research directions.''')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0035_add_new_7th_speaker_data'),
        ('events', '0026_add_new_seminar_7th'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
