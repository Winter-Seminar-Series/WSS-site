from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2019)
    ctype = ContentType.objects.get_for_model(Seminar)
    date = datetime(2020, 1, 2)

    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Data Fusion” an AI approach for decision making',
        audience='Experts in Control, Robotic, Mechatronic, IT, Industrial Systems Engineers',
        abstract='Multi-sensor array, usually referred to as Sensor/Data Fusion, is one of the absorbing topics in Artificial Intelligence and Machine Learning studies. Data fusion is a significant technique for detection, estimation and decision making.  A decision support system based on multi-sensor data fusion can be an effective solution to overcome the problems such as uncertainties in the context of situation awareness and threat analysis. The advantages of multiple-sensor data fusion in terms of cost, accuracy, and reliability will be explained in this talk. Generally, “Data Fusion” deals with the synergistic combination of data provided by various knowledge sources or sensors to provide a clear perception of a given scene or environment. The use of sensor/data fusion concept has advantages such as “Redundancy”, “Complementary”, “Timeliness” and “Less Costly Information”. Fusion characterization addressing the application domain, fusion objective, fusion process input-output (I/O) characteristics, and sensor suite configuration will be shown. In this presentation the different models and levels of Data Fusion will be presented. Among different data fusion methods, including the conventional and intelligent approaches, the various techniques coupled with their applications in Industrial Automation, Information Technology, Bioinformatics, Intelligent Transportation Systems (ITS) and Financial Engineering will be presented.',
        speaker=Speaker.objects.filter(name='Behzad Moshiri').last(),
        start_time=date + timedelta(hours=10, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Computational Concentration of Measure and Robust Learning',
        audience='',
        abstract='I will talk about the algorithmic version of the phenomenon of measure concentration: in many high dimensional probability spaces, for subsets of the space of non-negligible mass, most of the points in the space are very close to at least one point in the subset. We will give an algorithm called MUCIO (MUltiplicative Conditional Influence Optimizer) that efficiently finds one such point with high probability. Then we discuss the implication of this algorithm for the security of machine learning: how it may help an adversary change the distribution of the training set so that a classifier makes an error. This is joint work with Mohammad Mahmoody and Saeed Mahloujifar, and appears in SODA 2020.',
        speaker=Speaker.objects.filter(name='Omid Etesami').last(),
        start_time=date + timedelta(hours=10, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Animation Synthesis using Machine Learning',
        audience='Intermediate (for people interested in online/offline optimization, supervised learning and reinforcement learning)',
        abstract='''Automating character control in virtual environments is an increasingly popular approach for synthesizing procedural animation in video games. This requires a method that outputs, for each timestep, simulation actuation parameters such as joint torques or angles such that the character performs some desired movement. This poses a continuous optimization problem with high dimensionality and a large number of physics-based constraints.
This talk gives an overview of AI research for synthesizing procedural animations in games. The main focus of the talk will be on physics-based control; however, some of the kinematic-based methods will also be covered. The topic can be useful for people interested in online/offline optimization, supervised learning and reinforcement learning.''',
        speaker=Speaker.objects.filter(name='Amin Babadi').last(),
        start_time=date + timedelta(hours=10, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Random testing of distributed systems with guarantees',
        audience='',
        abstract='Distributed and concurrent applications often have subtle bugs that only get exposed under specific schedules. While these schedules may be found by systematic model checking techniques, in practice, model checkers do not scale to large systems. On the other hand, naive random exploration techniques often require a very large number of runs to find the specific interactions needed to expose a bug. In recent years, several random testing algorithms have been proposed that, on the one hand, exploit state-space reduction strategies from model checking and, on the other, provide guarantees on the probability of hitting bugs of certain Kinds.',
        speaker=Speaker.objects.filter(name='Simin Oraee').last(),
        start_time=date + timedelta(hours=11, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Microservice Architecture',
        audience='',
        abstract="It's hard to scale an application if we stick to monolithic architecture where all your business logic lives in a giant piece of software component. In this talk we are going to explain the microservice architecture and the trend of building more scalable and maintainable software.",
        speaker=Speaker.objects.filter(name='Afra Abnar').last(),
        start_time=date + timedelta(hours=11, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Fairness in Clustering Algorithms',
        audience='',
        abstract="Clustering is a fundamental problem in unsupervised machine learning. The goal of this problem is to partition a set of given data points so that similar points are grouped together. In this talk, I'll give an overview of several ways to formalize this problem and algorithms that have been proposed to solve them. Many applications of clustering require the solution to satisfy additional desirable properties such as fairness. I will give a formal definition of clustering with fairness, and present a number of recent results in this area.",
        speaker=Speaker.objects.filter(name='Mohammad Mahdian').last(),
        start_time=date + timedelta(hours=11, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Personalized Assortment Optimization for Online Retailer Considering Risk of Customers Churning',
        audience='This talk can be interesting for who looks for application of data driven optimization techniques in retailing.',
        abstract="""This talk can be interesting for who looks for application of data driven optimization
techniques in retailing.
In this work, we consider an e-tailer with heterogeneous customers both on their
preference and loyalty. Customer attrition plagues e-tailer and they should find a way
to address this issue since it has been studied that attracting new customers is more
costly rather than keeping the current one. However keeping unhappy customers is
not an easy task and sometime approaching them make the situation worst. Thus an
implicit approach in saving the unhappy and at risk customer is chosen in this paper.
We proposed a heuristic personalized assortment planning model by reserving items
with low inventory levels or high demand for at risk customers who may have a
stronger preference for those items. The survival model has been used to predict at
risk customers and their lifetime. The output of the survival model has been used in
the proposed dynamic programming model for the personalized assortment planning.""",
        speaker=Speaker.objects.filter(name='Morteza Saberi').last(),
        start_time=date + timedelta(hours=14, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='The Future of Cryptography: a Case-study of Lattice-based ones',
        audience='Good for anyone who is interested in security. Familiarity with basic cryptography aspects is helpful but not required.',
        abstract="Public key encryption (PKE) cryptography plays a big role in securing communication channels of internet. The security of every PKE scheme is usually based on a hard problem that has no polynomial time solution using any computational structure. However, widely used classic PKE schemes such as RSA or elliptic curve cryptography (ECC), are based on hard problems that have polynomial solutions using a quantum computer. Therefore, such PKE schemes will not be secure in post-quantum era. There exist different post-quantum PKE schemes, which rely on hard problems that do not have polynomial time solutions even using a quantum computer. Among post-quantum schemes, lattice-based cryptography and especially learning with errors (LWE) problem have gained high attention due to their low computational complexity. In addition, special cryptographic problems such as fully homomorphism have solutions based on LWE problem. In this talk, we are going to provide a general overview of lattice-based cryptography schemes and evaluate them compared to other PKE schemes.",
        speaker=Speaker.objects.filter(name='Shahriar Ebrahimi').last(),
        start_time=date + timedelta(hours=14, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Registration-Based Encryption',
        audience='Those who are interested in foundations of cryptography, but no mathematical or cryptographic background is assumed for this talk.',
        abstract="""Public-key encryption (PKE) has revolutionized cryptography, by allowing remote parties to communicate secretly. The down side of PKE is to maintain long lists of public keys in public-key directories. Identity-based encryption (IBE) gives a way around such lists by allowing one master public key and people's unique names (e.g., their email addresses) to be their public-key. The down side of IBE is that the issuer of the master public-key (and decryption keys) can decrypt all the messages, leading to the well-known key escrow problem with IBE. In this talk, I will introduce *registration* based encryption, which is a hybrid encryption method connecting IBE and PKE, getting (most) the benefits of both, without suffering from long key directories nor the key escrow problem.
 
Based on joint (TCC and PKC 2019) works with Sanjam Garg, Ahmadreza Rahimi, Mohammad Hajiabadi, and Sruthi Sekar.""",
        speaker=Speaker.objects.filter(name='Mohammad Mahmoody').last(),
        start_time=date + timedelta(hours=14, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Extremal Configurations in Point-Line Arrangements',
        audience='',
        abstract="""The famous Szemerédi-Trotter theorem states that any arrangement of n points and n lines in the plane determines O(n4/3) incidences, and this bound is tight. Although there are several proofs for the Szemerédi-Trotter theorem, our knowledge of the structure of the point-line arrangements maximizing the number of incidences is severely lacking. In this talk, we present some Turán-type results for point-line incidences. Let L1 and L2 be two sets of t lines in the plane and let P = {l1 ∩ l2 : l1 ∈ L1,l2 ∈ L2} be the set of intersection points between L1 and L2. We say that (P,L1 ∪ L2) forms a natural t × t grid if |P| = t2, and conv(P) does not contain the intersection point of some two lines in Li, for i = 1,2. For fixed t > 1, we show that any arrangement of n points and n lines in the plane that does not contain a natural t×t grid determines O(n 
43-ε) incidences, where ε = ε(t). We also provide a construction of n points and n lines in the plane that does not contain small cycles and determines superlinear number of incidences. This is joint work with Andrew Suk and Jacques Verstraete.""",
        speaker=Speaker.objects.filter(name='Mozhgan Mirzaei').last(),
        start_time=date + timedelta(hours=15, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Nonlocal Correlations in Networks',
        audience='',
        abstract="Nonlocality is one of the fascinating features of quantum mechanics. In particular, Bell's nonlocality completely changes our understanding of locality in physics and correlations in nature. In this talk, first Bell's nonlocality and its consequences in algorithms and complexity theory is reviewed. Then the general problem of nonlocality in networks is introduced. A main question here is whether network nonlocality results is correlations beyond Bell's setting or not. This question is answered affirmatively by presenting an explicit example in the triangle network. This talk is based on joint works with Marc-Olivier Renou, Yuyi Wang, Elisa Baumer, Sadra Boreiri, Nicolas Brunner and Nicolas Gisin. No particular knowledge of quantum mechanics is required to follow this talk.",
        speaker=Speaker.objects.filter(name='Salman Abolfath Beygi').last(),
        start_time=date + timedelta(hours=15, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='An application of quantum computing in chemistry',
        audience='',
        abstract="Quantum computing is likely to have far-reaching impact on different fields such as chemistry, optimization and artificial intelligence. In this talk, we start by a brief overview of quantum computing and then present an application of quantum computing to solve an important problem, called “conformational search”, in chemistry. For the conformational search problem, we propose a variable neighbourhood search heuristic where using the structure of a molecule, neighbourhoods are chosen to allow for optimization using a binary quadratic optimizer. The proposed method is well-suited for the use of devices such as quantum annealers. After carefully defining neighbourhoods, the method easily adapts to the size and topology of these devices.",
        speaker=Speaker.objects.filter(name='Moslem Noori').last(),
        start_time=date + timedelta(hours=15, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Complexities in AI Commercialization',
        audience='',
        abstract="""Most fresh engineers think that when the algorithm works, it equals to the problem is solved, but in real world solving a problem is more complex, specificly when you need to sell your solution.
In this presentation we want to know more on the complexities of delivering an AI solution to the customers and learn more what the customers require from your products.
Let's be involved and learn more together ...""",
        speaker=Speaker.objects.filter(name='Mohammad Hossein Noranian').last(),
        start_time=date + timedelta(hours=16, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Fairness in Machine Learning',
        audience='',
        abstract='TDB',
        speaker=Speaker.objects.filter(name='Krishna Gummadi').last(),
        start_time=date + timedelta(hours=16, minutes=15),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Online Learning',
        audience='',
        abstract="""In several games, information is asymmetric. Consider, for example, an auctioneer who knows more about the item than the bidders. In such scenarios, the parties who have additional information may benefit by "signaling" other parties some or all the information they have. Signaling, however, is not limited to auctions. The news each news agency broadcast to its audience and the recommendation letters each professor writes for her/his students are some other more relatable(!) examples of signaling in our life.

In this talk, we will model signaling more formally and, as much as time permits, discuss a simple probabilistic proof technique which is useful in a this context and many more. If you like brain teasers, we solve some together as well.""",
        speaker=Speaker.objects.filter(name='Ehsan Emamjomeh-Zadeh').last(),
        start_time=date + timedelta(days=1, hours=9, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Streaming and Massively Parellel Algorithms for Edge Coloring',
        audience='',
        abstract="""A valid edge-coloring of a graph is an assignment of “colors” to its edges such that no two incident edges receive the same color. The goal is to find a proper coloring that uses few colors. (Note that the maximum degree, ∆, is a trivial lower bound.) In this paper, we revisit this fundamental problem in two models of computation specific to massive graphs, the Massively Parallel Computations (MPC) model and the Graph Streaming model: 

Massively Parallel Computation: We give a randomized MPC algorithm that with high probability returns a ∆ + Õ(∆^{3/4}) edge coloring in O(1) rounds using O(n) space per machine and O(m) total space. The space per machine can also be further improved to n^{1−Ω(1)} if ∆ = n^{Ω(1)}. Our algorithm improves upon a previous result of Harvey et al. [SPAA 2018]. 

Graph Streaming: Since the output of edge-coloring is as large as its input, we consider a standard variant of the streaming model where the output is also reported in a streaming fashion. The main challenge is that the algorithm cannot “remember” all the reported edge colors, yet has to output a proper edge coloring using few colors. We give a one-pass Õ(n)-space streaming algorithm that always returns a valid coloring and uses 5.44∆ colors with high probability if the edges arrive in a random order. For adversarial order streams, we give another one-pass Õ(n)-space algorithm that requires O(∆^2) colors.""",
        speaker=Speaker.objects.filter(name='Hamed Saleh').last(),
        start_time=date + timedelta(days=1, hours=9, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Detecting Coordinated Influence Operation Content on Social Media',
        audience='Tailored for general audience. Familiarity with supervised machine learning methods is helpful but not required.',
        abstract="We study a platform-agnostic method of using available activity by coordinated influence operations on social media to detect and assess their ongoing activities. Our approach classifies the post-URL pair based on human-interpretable features without relying on user-level behavioral data. We test on data from all publicly available Twitter datasets of Chinese, Russian, and Venezuelan troll activity targeting the United States from late-2015 through 2019, and Reddit dataset of Russian influence effort during 2015 and 2016. Instead of following the conventional approach to train a classifier based on the entire dataset, we train classifiers on a monthly basis across each campaign to capture how changes in trolls activities impact the performance of our classifier over time. Prediction performances vary by month, country, platform, and experimental design, ranging from average F1 score of 0.75 to 0.94, and is robust to 1% false negative and false positive rates. Additional diagnostics test and policy implications and challenges will be discussed.",
        speaker=Speaker.objects.filter(name='Meysam Alizadeh').last(),
        start_time=date + timedelta(days=1, hours=9, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Addressing several biomedical problems using deep learning',
        audience='',
        abstract="In this talk, I will review the most recent findings of a group of great students in my lab, who employed deep learning techniques to address several important problems in single cell sequencing, cancer, and beyond.",
        speaker=Speaker.objects.filter(name='Ali Sharifi Zarchi').last(),
        start_time=date + timedelta(days=1, hours=10, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='A Journey into Media Studies from the Perspective of a Technical Person',
        audience='Interested in product design and/or humanities',
        abstract="""Setting objectives, measuring key results, and acting accordingly is a very effective method of making internet products. You can use today's data analysis tools to understand what your users want from your product, and act even in real time to deliver that to them. The problem is that the key metrics which are measured are usually indicators of short-term behaviour of the product users, and they don't answer important questions about what you are building, such as whether your product design is ultimately good for society.
I applied for a Master's programme in humanities to find a way to measure such important qualities in product design. In this talk, I will share my experience; how I didn't find an easy method for the aforementioned problem, and what was changed in me instead""",
        speaker=Speaker.objects.filter(name='Reza Mohammadi').last(),
        start_time=date + timedelta(days=1, hours=10, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Price of Competition and Dueling Games',
        audience='',
        abstract="""We study competition in a general framework introduced by Immorlica, Kalai, Lucier, Moitra,
Postlewaite, and Tennenholtz and answer their main open question. Immorlica
et al.  considered classic optimization problems in terms of competition and introduced a general
class of games called dueling games. They model this competition as a zero-sum game, where two
players are competing for a user’s satisfaction. In their main and most natural game, the ranking
duel, a user requests a webpage by submitting a query and players output an ordering over all
possible webpages based on the submitted query. The user tends to choose the ordering which
displays her requested webpage in a higher rank. The goal of both players is to maximize the
probability that her ordering beats that of her opponent and gets the user’s attention. Immorlica
et al. show this game directs both players to provide suboptimal search results. However, they
leave the following as their main open question: “does competition between algorithms improve or
degrade expected performance?" In this talk, we resolve
this question for the ranking duel and a more general class of dueling games.""",
        speaker=Speaker.objects.filter(name='Sina Dehghani').last(),
        start_time=date + timedelta(days=1, hours=10, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Recommender Systems Research: Advances, Pitfalls and Opportunities',
        audience='',
        abstract="This talk covers the evolution of recommender systems research, its current emphasis on short term engagement and the opportunities for providing long-term fulfilling experiences. I will ground this talk with the work conducted within Home and Search personalization efforts at Spotify.",
        speaker=Speaker.objects.filter(name='Zahra Nazari').last(),
        start_time=date + timedelta(days=1, hours=11, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Robustness to Adversarial Perturbations in Learning from Incomplete Data',
        audience='',
        abstract="What is the role of unlabeled data in an inference problem, when the presumed underlying distribution is adversarially perturbed? In this talk, I explain how we answer to this question by unifying two major learning frameworks: Semi-Supervised Learning (SSL) and Distributionally Robust Optimization (DRO). We develop a generalization theory for our framework based on a number of novel complexity measures, such as an adversarial extension of Rademacher complexity and its semi-supervised analogue. Moreover, our analysis is able to quantify the role of unlabeled data in the generalization process under a more general condition compared to existing works in SSL. Based on our framework, we also present a hybrid of DRL and EM algorithms that has a guaranteed convergence rate. When implemented with deep neural networks, our method shows a comparable performance to those of the state-of-the-art on a number of real-world benchmark datasets.",
        speaker=Speaker.objects.filter(name='Amir Najafi').last(),
        start_time=date + timedelta(days=1, hours=11, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Cloud Computing, Edge Computing and Beyond',
        audience='',
        abstract="""Cloud computing has revolutionized the way computation is provided to users in terms of flexibility, agility, reliability and economies. The cloud architecture generally means to consolidate computation and storage resources in centralized big data centers, put them under a single administration and then make them available as different kinds of well-defined services.
 
Edge computing expands the traditional cloud architecture with additional data center layers that provide computation and storage closer to the end user.  For example, a wide-area cloud data center which serves a large country can be augmented by a hierarchy of data centers that provide coverage at the city, neighborhood, and building level.  Edge Computing facilitates the next generation of mobile and IoT applications that require low latency or produce large volumes of data.
 
In this talk, we will review the evolution of cloud computing and edge computing over the last few years, present some recent work in the area of edge computing and discuss the opportunities that are predicted to become available in near future.""",
        speaker=Speaker.objects.filter(name='Mohammad Salehe').last(),
        start_time=date + timedelta(days=1, hours=15, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Edit Distance and LCS: Beyond Worst Case',
        audience='',
        abstract="""In the worst-case analysis of algorithms, the overall performance of an algorithm is summarized by its worst performance on any input. This approach has countless success stories. However, there are also major computational problems (like linear programming, clustering, and online caching) where the worst-case analysis framework does not provide any helpful advice on how to solve the problem. 

In this talk, we study improved algorithms for edit distance and longest common subsequence, which are among the most fundamental problems in combinatorial optimization, beyond their worst-case. The proposed algorithms obtain $1+o(1)$ approximate solutions for both problems in truly subquadratic time if the input satisfies a mild condition. In this setting, first, an adversary chooses one of the input strings. Next, this string is perturbed by a random procedure. Then the adversary chooses the second string arbitrarily after observing the perturbed one.""",
        speaker=Speaker.objects.filter(name='Mahdi Safarnejad').last(),
        start_time=date + timedelta(days=1, hours=11, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Algorithms and Games in Blockchain: Designing Verifiable Systems',
        audience='',
        abstract="""Blockchain is going to be one of the monetary systems of the future, on top of many other possible applications. But today's blockchain has various pitfalls and shortcomings, some are well-known, and some are not discovered yet. To name a few: some protocols use lots of resources, some can not provide useful functions, and in general, there is no formal framework that can provide general efficiency and consistency grantees.
In this talk, we will survey algorithmic methods that are suggested to overcome these challenges. More specifically, we take a look at how game-theoretic ideas can help us model the existing problems and provide mathematically and experimentally sound results.""",
        speaker=Speaker.objects.filter(name='Arash Pourdamghani').last(),
        start_time=date + timedelta(days=1, hours=15, minutes=45),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Learning via Non-Convex Min-Max Games',
        audience='',
        abstract="Recent applications that arise in machine learning have surged significant interest in solving min-max saddle point games. This problem has been extensively studied in the convex-concave regime for which a global equilibrium solution can be computed efficiently. In this talk, we study the problem in the non-convex regime and show that an ϵ-first order stationary point of the game can be computed  when one of the player’s objective can be optimized to global optimality efficiently.  We applied our algorithm to a fair classification problem of Fashion-MNIST dataset and observed that the proposed algorithm results in smoother training and better generalization.",
        speaker=Speaker.objects.filter(name='Meisam Razaviyayn').last(),
        start_time=date + timedelta(days=1, hours=15, minutes=45),
        duration=timedelta(minutes=45)
    )



def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2019)

    titles = [
        'Data Fusion” an AI approach for decision making',
        'Computational Concentration of Measure and Robust Learning',
        'Animation Synthesis using Machine Learning',
        'Random testing of distributed systems with guarantees',
        'Microservice Architecture',
        'Fairness in Clustering Algorithms',
        'Personalized Assortment Optimization for Online Retailer Considering Risk of Customers Churning',
        'The Future of Cryptography: a Case-study of Lattice-based ones',
        'Registration-Based Encryption',
        'Extremal Configurations in Point-Line Arrangements',
        'Nonlocal Correlations in Networks',
        'An application of quantum computing in chemistry',
        'Complexities in AI Commercialization',
        'Fairness in Machine Learning',
        'Online Learning',
        'Streaming and Massively Parellel Algorithms for Edge Coloring',
        'Detecting Coordinated Influence Operation Content on Social Media',
        'Addressing several biomedical problems using deep learning',
        'A Journey into Media Studies from the Perspective of a Technical Person',
        'Price of Competition and Dueling Games',
        'Recommender Systems Research: Advances, Pitfalls and Opportunities',
        'Robustness to Adversarial Perturbations in Learning from Incomplete Data',
        'Edit Distance and LCS: Beyond Worst Case',
        'Cloud Computing, Edge Computing and Beyond',
        'Algorithms and Games in Blockchain: Designing Verifiable Systems',
        'Learning via Non-Convex Min-Max Games'
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0032_fill_2019_speakers_data'),
        ('events', '0019_baseevent_calender_link'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
