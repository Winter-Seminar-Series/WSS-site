from django.db import migrations

def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    date = datetime(2022, 2, 24)

    Seminar.objects.create(
        wss = wss,
        polymorphic_ctype = ctype,
        title = 'Securing the Next Billion Consumer Devices on the Edge',
        audience = 'open to all',
        abstract = '''In this talk, I aim to address a major challenge in the adoption of user-centred privacy-enhancing technologies: Can we leverage novel architectures to provide private, trusted, personalised, and dynamically- configurable models on consumer devices to cater for heterogeneous environments and user requirements? Importantly, such properties must provide assurances for the data integrity and model authenticity/trustworthiness, while respecting the privacy of the individuals taking part in training and improving such models. Innovation and adoption in this space require collaborations between device manufacturers, platform providers, network operators, regulators, and the users.''',
        speaker = Speaker.objects.filter(name='Hamed Haddadi').last(),
        start_time = date + timedelta(hours=10),
        duration = timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss = wss,
        polymorphic_ctype = ctype,
        title = 'The Implicit Graph Conjecture is False',
        audience = '',
        abstract = '''An implicit representation of an n-vertex graph G in a family F of graphs assigns to each vertex of G a binary code so that the adjacency between every pair of vertices can be determined only as a function of their codes. This function can depend on the family F but not on the individual graph G. In this talk we will discuss recent developments in the study of implicit representation of graphs, including recent joint work with Hamed Hatami, which refutes the Implicit Graph Conjecture. 

An implicit representation is called efficient if each vertex is given a code of length O(log n). Every family of graphs admitting such an efficient representation contains at most exp(O(n log(n))) graphs on n vertices, and thus has at most factorial speed of growth. The Implicit Graph Conjecture (IGC) states that, conversely, every hereditary graph family with at most factorial speed of growth admits an efficient implicit representation. 

In this talk, we show the existence of strong counterexamples to the Implicit Graph Conjecture. In particular, we establish the existence of hereditary graph families with at most factorial speed of growth that require codes of length polynomially large as a function of n.''',
        speaker = Speaker.objects.filter(name='Pooya Hatami').last(),
        start_time = date + timedelta(hours=10),
        duration = timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss = wss,
        polymorphic_ctype = ctype,
        title = 'Security of Cryptographic Implementations',
        audience = 'undergraduate and graduate students',
        abstract = '''The talk will review the basics of information security and cryptography, and focus on security of their implementations. More precisely, the basics of side-channel analysis attacks and mitigation techniques will be presented.''',
        speaker = Speaker.objects.filter(name='Amir Moradi').last(),
        start_time = date + timedelta(hours=10),
        duration = timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss = wss,
        polymorphic_ctype = ctype,
        title = 'Recent Advances in Multiparty Computation with Low Communication and Computation',
        audience = '',
        abstract = '''I will go over recent advances in two-party secure computation involving branching programs: where one party holds a branching program P and the other party holds an input x, and the goal is for the two parties to jointly compute P(x) without revealing any other information. I will mention applications of these results to such areas as Private Set Intersection (PSI) and Private-Information Retrieval (PIR). Such PSI and PIR protocols are used as critical components of various privacy-preserving technologies, such as those for contact tracing, password breaching, etc.''',
        speaker = Speaker.objects.filter(name='Mohammad Hajiabadi').last(),
        start_time = date + timedelta(hours=10),
        duration = timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss = wss,
        polymorphic_ctype = ctype,
        title = 'Toward mastering congestion control in the Internet with pragmatic learning-based approaches',
        audience = 'Anyone with a general background in computer networks and machine learning ',
        abstract = '''Whether you are among believers in machine learning or among nonbelievers, these days, you have heard a lot about a somehow seductive and revolutionary theme saying: let us replace classic designs with pure machine learning-based solutions. For instance, in the network community, there are different efforts to replace current congestion control heuristics with clean-slate learning-based ones. 

In this talk, I will not introduce yet another clean-slate learning-based design and I will not promote the revolutionary philosophy of replacing classic designs with learning-based ones! Instead, I will try to introduce a more pragmatic and evolutionary design philosophy for using learning-based techniques. 

To that end, I will show how learning-based techniques can be put wisely in harmony with classic heuristics in the context of congestion control. And how this harmony can lead to way higher performance and way lower overhead for the system compared to the clean-slate learning-based designs.''',
        speaker = Speaker.objects.filter(name='Soheil Abbasloo').last(),
        start_time = date + timedelta(hours=10),
        duration = timedelta(minutes=45)
    )

def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    titles = [
        'Securing the Next Billion Consumer Devices on the Edge',
        'The Implicit Graph Conjecture is False',
        'Security of Cryptographic Implementations',
        'Recent Advances in Multiparty Computation with Low Communication and Computation',
        'Toward mastering congestion control in the Internet with pragmatic learning-based approaches'
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0033_fill_7th_speakers_data'),
        ('events', '0022_fill_workshop_2019'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
