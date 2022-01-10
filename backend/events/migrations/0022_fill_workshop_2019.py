from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    Workshop = apps.get_model('events', 'Workshop')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2019)
    ctype = ContentType.objects.get_for_model(Workshop)
    date = datetime(2019, 12, 28)

    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Modeling Diversity in Machine Learning Using Determinantal Point Processes',
        audience='',
        speaker=Speaker.objects.filter(name='Alireza Rezaei').last(),
        syllabus="""A wide variety of machine learning tasks can be cast as an instance of the “subset selection” problem. Given a large dataset of items, the goal of subset selection is to find a small subset which is a good representative of the original data. In particular, the selected subset is expected to preserve the diversity of data. As an example, consider a search task: Given a large number of images or documents, we want to select a subset that are relevant to a user query and also diverse. Note that, diversity is important because many queries can have multiple meanings and aspects, e.g.  “apple” can refer to the name of a company or a fruit. 
Another application is product recommendation where retailers with a large
inventory need to pick a small subset of their products which are likely to attract customers. To this end, this selected subset not only should contain highly rated products, but also needs to include diverse items.

In this workshop, we consider different notions of diversity and will see how they can be employed to mathematically formulate the problem of choosing a diverse subset of items. In particular, we study determinantal point processes (DPP) as a family of probabilistic models which have recently gained a lot of attention to model diversity. We begin with their applications, and then discuss algorithms for several fundamental tasks related to DPPs, focusing on the problem of sampling from DPPs. 

In the final part, I introduce strongly Rayleigh measures, and discuss their basic properties. This family of distributions are in fact generalization of DPPs which are very well-studied in the mathematics community and understanding their properties can be very helpful to gain more insights about DPPs.""",
        start_time=date + timedelta(hours=16),
        duration=timedelta(hours=3)
    )
    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Sensor / Data Fusion, Theoretical and Practical issues',
        audience='',
        speaker=Speaker.objects.filter(name='Behzad Moshiri').last(),
        syllabus="""Multi-sensor array, usually referred to as Sensor/Data Fusion, is one of the absorbing topics in Artificial Intelligence and Machine Learning studies. The advantages of multiple-sensor data fusion in terms of cost, accuracy, and reliability will be explained in this workshop. Generally, “Data Fusion” deals with the synergistic combination of data provided by various knowledge sources or sensors to provide a clear perception of a given scene or environment. The use of sensor/data fusion concept has advantages such as “Redundancy”, “Complementary”, “Timeliness” and “Less Costly Information.”Fusion characterization addressing the application domain, fusion objective, fusion process input-output (I/O) characteristics, and sensor suite configuration will be shown. In this workshop the different models and levels of Data Fusion will be presented. Different data fusion methods, including the conventional and intelligent approaches with their application in Sensor/Data Fusion, Industrial Automation, Information Technology, Bioinformatics, Transportation Systems (ITS), and Financial Engineering will be presented. Typical examples using data fusion toolboxes will be shown.""",
        start_time=date + timedelta(days=1, hours=16),
        duration=timedelta(hours=3)
    )
    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Discovering Latent Patterns in Academic Collaboration Network based on Community Detection Approach',
        audience='',
        speaker=Speaker.objects.filter(name='Mohammad Heydari').last(),
        syllabus="""Network Science has a broad demand in various academic fields and industries. This workshop is a primary introduction to Social Network Analysis using Python and NetworkX, a powerful and mature python library for the creation, manipulation, and study of the structure, dynamics, and functions of complex networks. This graph library is suitable for operation on large real world graphs: e.g., graphs in excess of 10 million nodes and 100 million edges. Due to its dependence on a pure Python "dictionary of dictionary" data structure, NetworkX is a reasonably efficient, very scalable, highly portable framework for network and social network analysis. Based on professionals experience in the network science field, the combination of mentioned tools could be effectively beneficial. It is crucial for contributors in this workshop to have a fundamental knowledge of Python and Network Science methods""",
        start_time=date + timedelta(days=2, hours=16),
        duration=timedelta(hours=3)
    )
    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Choose to be a Wizard or a Muggle? Journey towards an Exponential world.',
        audience='',
        speaker=Speaker.objects.filter(name='Masoud Zamani').last(),
        syllabus="""We live in turbulent and yet amazing era, the paradoxical co-exist of opportunities and threats. Truth is nobody (literally Nobody) in the world could predict the future anymore. Accessing to vast amount of data and knowledge, a way better distributed opportunities and resources led to a state that innovation paces cannot be contained or predicted no more?
so what should we do? How to choose our career path? How to upgrade our skills to match the market requirement? And the most important question is: how to predict the Future?
I have no clear answer! but I can show how the best people in the world solve this problem and make great contribution.
Join me on this workshop and we might create something that no one ever has.""",
        start_time=date + timedelta(days=3, hours=14),
        duration=timedelta(hours=2)
    )
    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Robustness of Deep Neural Networks',
        audience='',
        speaker=Speaker.objects.filter(name='Mohammad Khalooei').last(),
        syllabus="""Nowadays, Deep neural networks are the most popular approach which we see its usage in different applications and tasks. As day growth its usage in different tasks, checking the vulnerability of these networks is being a very important fundamental issue.
Therefore, analyzing of each machine learning model (such as neural network) for its vulnerability, is a useful task to assess the usage of that in critical situations.
In this session, We try to cover the key definition step's of vulnerability of deep neural networks and its defense strategies against simplest vulnerability at first.
Then when the minds are boiled, we try to implement and test them in a practical manner. Also, covering a teamwork remote session for more collaboration is available at the end of the session.""",
        start_time=date + timedelta(days=3, hours=16),
        duration=timedelta(hours=3)
    )
    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Incidence Theorem and Its Applications',
        audience='',
        speaker=Speaker.objects.filter(name='Mozhgan Mirzaei').last(),
        syllabus="""Szemerédi-Trotter theorem, one of the Erdős-like cornerstone in geometry, states that any ar- rangement of n points and n lines in the plane determines O(n4/3) incidences. In this workshop, we go over some proofs of Szemerédi-Trotter theorem and also review some applications in com- binatorial geometry and additive combinatorics such as unit distance problem and sum-product theorem. We also discuss some major open problems in this direction.""",
        start_time=date + timedelta(days=4, hours=16),
        duration=timedelta(hours=3)
    )
    Workshop.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Social Network Analysis with Gephi',
        audience='',
        speaker=Speaker.objects.filter(name='Neda Soltani').last(),
        syllabus="""Social Networks have grown into our lives so that we may not be able to live properly without them. However, speaking about Social Network Analysis is not limited to studying online websites and mobile applications we use for networking. SNA covers also converting complex problems to graphs and analyzing them as entities (nodes) and relationships (edges). This workshop aims at first, covering a brief introduction to SNA and then applying that brief knowledge within one of the most known software: Gephi. Gephi is free multi-platform software written in Java. It is called Photoshop for graphs. Therefore, we expect a visually convenient way of analyzing graphs.""",
        start_time=date + timedelta(days=4, hours=16),
        duration=timedelta(hours=3)
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Workshop = apps.get_model('events', 'Workshop')
    wss = WSS.objects.get(year=2019)

    titles = [
        'Modeling Diversity in Machine Learning Using Determinantal Point Processes',
        'Sensor / Data Fusion, Theoretical and Practical issues',
        'Discovering Latent Patterns in Academic Collaboration Network based on Community Detection Approach',
        'Choose to be a Wizard or a Muggle? Journey towards an Exponential world.',
        'Robustness of Deep Neural Networks',
        'Incidence Theorem and Its Applications',
        'Social Network Analysis with Gephi'
    ]

    Workshop.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('events', '0021_fill_postersession_2019'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
