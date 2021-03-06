# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')

    wss = WSS.objects.get(year=2020)

    Seminar.objects.create(
        wss=wss,
        title='Nova:  A Lego Data Store for the Cloud',
        abstract='To improve elasticity, resource utilization, and failure handling in data centers, monolithic data stores will be disaggregated into network-attached components.  Moreover, applications will evolve to specify their desired throughput, response time, and availability requirements from the data store.  A lego data store will meet these requirements by scaling each of its elastic components independently.  This talk presents Nova-LSM as a first step towards this vision.  Nova-LSM is a component-based design of the LSM-tree using fast and high bandwidth networks such as RDMA.  Its components implement the following novel concepts.  First, they use RDMA to enable nodes of a shared-nothing architecture to share their disk bandwidth and storage.  Second, they construct ranges dynamically at runtime to parallelize compaction and boost performance.  Third, they scatter blocks of a file (SSTable) across an arbitrary number of disks and use power-of-d to scale.  Fourth, the logging component separates availability of log records from their durability.  These design decisions provide for an elastic system with well-defined knobs that control its performance and scalability characteristics.  We present performance results showing Nova-LSM scales and outperforms its monolithic counter-parts, LevelDB and RocksDB, by several orders of magnitude.  We plan to extend Nova-LSM with components that implement alternative data models, query and transaction processing.',
        speaker=Speaker.objects.filter(name='Shahram Ghandeharizadeh').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Algorithms vs. Mechanisms: Bayesian Blackbox Reductions in Mechanism Design',
        audience='Undergrad  and grad students in CE and Econ (or anyone else who is interested in algorithmic game theory)',
        abstract='When designing mechanisms for selfish agents (e.g., in an online marketplace), a triumph would be to achieve Incentive Compatibility (IC). A fundamental question is then the following: does running an IC mechanism require more computational resources than running an algorithm for the same problem? In other words, is there a general-purpose reduction to transform an algorithm into a mechanism to work as desired even when agents are strategic? Such a reduction, if it existed, would allow system designers to ignore issues of private information and strategic behavior, and instead focus on coming up with algorithms that achieve their objectives in an environment where all information is public. \nFor maximizing social welfare, the celebrated result of Vickrey [1961], Clarke [1971] and Groves [1973] gives such a general purpose transformation, but only if we can solve the non-strategic welfare problem optimally. In this talk, I show a general-purpose polynomial time blackbox reduction from Bayesian Incentive Compatible (BIC) mechanism design to Bayesian algorithm design for welfare maximization. This reduction can turn any arbitrary non-optimal algorithm, e.g., a heuristic working well in practice, into a BIC mechanism with negligible loss in expected social welfare. Unlike prior results, this reduction achieves exact Bayesian incentive compatibility for problems with multi-dimensional and continuous type spaces. The key technical barrier preventing exact incentive compatibility is the inevitable sampling error when estimating the output distribution of a mechanism, which typically precludes exact incentive compatibility. We overcome this barrier by generalizing the literature on "Bernoulli factories" in statistics and machine learning, a theory that describes how to generate new random coins from old ones only by sampling. During the talk, I will briefly elaborate on several steps of the reduction and shed insight on how to use Bernoulli factories.',
        speaker=Speaker.objects.filter(name='Rad Niazadeh').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='In-Database Machine Learning for End-to-End Data Analytics',
        audience='last year undergrad students and graduate students',
        abstract='We consider the problem of training machine learning models over multi-relational data. The mainstream approach is to first construct the training dataset using a feature extraction query over input database and then use a statistical software package of choice to train the model. In this talk, we introduce Iterative Functional Aggregate Queries (IFAQ), a framework that realizes an alternative approach. IFAQ treats the feature extraction query and the learning task as one program given in the IFAQ\'s domain-specific language, which captures a subset of Python commonly used in Jupyter notebooks for rapid prototyping of machine learning applications. The program is subject to several layers of IFAQ optimizations, such as algebraic transformations, loop transformations, schema specialization, data layout optimizations, and finally compilation into efficient low-level C++ code specialized for the given workload and data.',
        speaker=Speaker.objects.filter(name='Amir Shaikhha').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Submodular Maximization: From Theory to Practice',
        abstract='The emergence of datasets of an unprecedented scale across different scientific disciplines presents new computational challenges. To remedy the situation, there has been a lot of interest in using combinatorial structures and information measures that allow for efficient and fast computations. In many information gathering and data mining applications, the underlying utility function we aim to optimize has additional structures, which can add to the complexity of the problem and/or provide opportunities to find solutions efficiently. We will consider optimizing a general class of discrete functions, called submodular functions, that exhibit an intuitive diminishing returns property. In this talk, we present several submodularity related problems from both theoretical and application perspectives.',
        speaker=Speaker.objects.filter(name='Ehsan Kazemi').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Visual Intelligence for Transportation',
        abstract='Our laboratory pushes the limits of Artificial Intelligence (AI) in the context of transportation, mobility, and built environments. \nSelf-driving vehicles or delivery robots need to navigate crowded social scenes in close proximity with humans. Hence, they must understand social conventions, ethics and obey unwritten common-sense rules. Humans have an innate ability to “read” the behavior of others before making decisions. A machine should have the same capability to share the space with humans in a safe, efficient, and trustworthy manner. \nTo address this grand challenge of co-existence in the “last mile mobility”, we propose a new type of AI we call socially-aware AI: perception and planning augmented with social intelligence.  In other words, it is the ability to effectively perceive, navigate, and negotiate complex social interactions and environments. \nTechnically, our research brings together Computer Vision (Real-time Perception), Machine Learning (Deep learning) and Robotics (Crowd-Robot Interaction) to understand human behavior at every scale (enabling Autonomous Moving Agents and Digital Twins).',
        speaker=Speaker.objects.filter(name='Alexandre Alahi').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Walking the Boundary of Learning and Interaction',
        audience='background in machine learning',
        abstract='There have been significant advances in the field of robot learning in the past decade. However, many challenges still remain when considering how robot learning can advance interactive agents such as robots that collaborate with humans. This includes autonomous vehicles that interact with human-driven vehicles or pedestrians, service robots collaborating with their users at homes over short or long periods of time, or assistive robots helping patients with disabilities. This introduces an opportunity for developing new robot learning algorithms that can help advance interactive autonomy. \nIn this talk, I will discuss a formalism for human-robot interaction built upon ideas from representation learning. Specifically, I will first discuss the notion of latent strategies — low dimensional representations sufficient for capturing non-stationary interactions. I will then talk about the challenges of learning such representations when interacting with humans, and how we can develop data-efficient techniques that enable actively learning computational models of human behavior from demonstrations, preferences, or physical corrections. Finally, I will introduce an intuitive controlling paradigm that enables seamless collaboration based on learned representations, and further discuss how that can be used for further influencing humans.',
        speaker=Speaker.objects.filter(name='Dorsa Sadigh').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Neural anisotropy directions',
        audience='graduate students',
        abstract='One, somewhat overlooked, aspect of deep learning algorithms is their inductive bias in learning various tasks. Though many deep architectures have successfully been applied to many visual and linguistic tasks, we do not have a comprehensive set of tools to choose the right architecture for a given learning problem. Instead, we rely mainly on heuristics and trial-and-error to pick the right architecture. \nIn this talk, I start by focusing on a very simple problem, i.e., classifying a class of linearly separable distributions, and show that, depending on the direction of the discriminative feature of the distribution, many state-of-the-art deep convolutional neural networks (CNNs) have a surprisingly hard time solving this simple task. I show how the directional inductive bias of an architecture can be encapsulated by an orthonormal basis, coined as neural anisotropy directions (NADs). NADs, which are specific for each architecture and hence act as a signature, encode the preference of a network to separate the input data based on some particular features. I provide an efficient method to identify NADs for several CNN architectures and thus reveal their directional inductive biases.',
        speaker=Speaker.objects.filter(name='Seyed-Mohsen Moosavi-Dezfooli').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Recent Advances on the Anomaly Detection in Images',
        audience='undergraduate and graduate level CE, CS, and EE students',
        abstract='In my talk I will discuss some of the latest results about anomaly detection in images that are developed in my research team. This includes adversarially robust autoencoders, application of self-supervised methods and distillation to improve the performance of existing methods and solve some key challenges in them including unprincipled early stopping.',
        speaker=Speaker.objects.filter(name='Mohammad Hossein Rohban').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Understanding the role of training regimes continual training of neural networks',
        audience='Familiar with neural networks and deep learning',
        abstract='Deep neural network models face serious challenges in continual training due to catastrophic forgetting. It has attracted much attention lately, and several families of approaches have been proposed with different degrees of success. However, there has been limited understanding of the impact that different training regimes – learning rate, batch size, regularization method– can have on forgetting and the stability of the neural network model. We first observe that dropout is alleviating catastrophic forgetting by creating an implicit gating mechanism to promote model sparsity. More generally, we argue that these training regimes are influencing the geometrical properties and wideness of the local minima found for each task which play an important role in the overall degree of forgetting. Finally, we study the relation between these continual and multi task learning minima and show a linear connectivity between them. We exploit these findings to propose effective continual learning algorithms, for example, by constraining the sequentially learned minima to behave as the multitask solution.',
        speaker=Speaker.objects.filter(name='Mehrdad Farajtabar').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Measures of Dependence and Their Applications',
        audience='graduate students',
        abstract='A "measure of dependence" quantifies shared information between random variables. Measures of correlations arise in different contexts and serve different purposes. In this presentation, we take a comparative approach and survey a number of different measures of dependence and discuss their properties and applications across different scientific fields such as information theory, statistics, data science, and neuroscience.',
        speaker=Speaker.objects.filter(name='Amin Gohari').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='A Simple Measure Of Conditional Dependence',
        audience='people who do probability, statistics, machine learning or application of these. I think undergrad student can attend as well.',
        abstract='We propose a coefficient of conditional dependence between two random variables Y and Z given a set of other variables X1, . . . , Xp, based on an i.i.d. sample. The coefficient has a long list of desirable properties, the most important of which is that under absolutely no distributional assumptions, it converges to a limit in [0, 1], where the limit is 0 if and only if Y and Z are conditionally independent given X1, . . . , Xp, and is 1 if and only if Y is equal to a measurable function of Z given X1, . . . , Xp. Using this statistic, we devise a new variable selection algorithm, called Feature Ordering by Conditional Independence (FOCI), which is model-free, has no tuning parameters, and is provably consistent under sparsity assumptions. A number of applications to synthetic and real datasets are worked out.',
        speaker=Speaker.objects.filter(name='Mona Azadkia').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Going Off-the-Grid: Towards Non-convolutional Architectures for Image Recognition',
        audience='Student interested in deep learning',
        abstract='Convolutional networks are the workhorses of modern computer vision, thanks to their efficiency on hardware accelerators and the inductive biases suitable for processing and generating images. However, ConvNets distribute compute uniformly across the input, which makes them convenient to implement and train, but can be extremely computationally inefficient, especially on high-dimensional inputs such as video or 3D data. Moreover, representations extracted by ConvNets lack interpretability and systematic generalization.  In this talk,  I will present some of the recent work towards models that aim to avoid these shortcomings by respecting the sparse structure of the real world. I will talk about architectures for learning "object-centric representations"  and will present Vision Transformers, the large-scale non-convolutional models applied to real-world image recognition tasks.',
        speaker=Speaker.objects.filter(name='Mostafa Dehghani').last()
    )

    Seminar.objects.create(
        wss=wss,
        title='Learning via early stopping and untrained neural nets',
        audience='Student interested in deep learning',
        abstract='Modern neural networks are typically trained in an over-parameterized regime where the parameters of the model far exceed the size of the training data. Such neural networks in principle have the capacity to (over)fit any set of labels including significantly corrupted ones. Despite this (over)fitting capacity, over-parameterized networks have an intriguing robustness capability: they are surprisingly robust to label noise when first order methods with early stopping are used to train them. Even more surprising, one can remove noise and corruption from a natural image without using any training data what-so-ever, by simply fitting (via gradient descent) a randomly initialized, over-parameterized convolutional generator to a single corrupted image. In this talk I will first present theoretical results aimed at explaining the robustness capability of neural networks when trained via early-stopped gradient descent. I will then present results towards demystifying untrained networks for image reconstruction/restoration tasks such as denoising and those arising in inverse problems such as compressive sensing.',
        speaker=Speaker.objects.filter(name='Mahdi Soltanolkotabi').last()
    )
    
    Seminar.objects.create(
        wss=wss,
        title='Quantitative proteomics of the cancer cell line encyclopedia',
        audience='professionals and students interested in bioinformatics and computational biology',
        abstract='Proteins are essential agents of biological processes. To date, large-scale profiling of cell line collections including the Cancer Cell Line Encyclopedia (CCLE) has focused primarily on genetic information whereas deep interrogation of the proteome has remained out of reach. Here, we expand the CCLE through quantitative profiling of thousands of proteins by mass spectrometry across 375 cell lines from diverse lineages to reveal information undiscovered by DNA and RNA methods. We observe unexpected correlations within and between pathways that are largely absent from RNA. These were associated with sensitivity to knockdown of several different genes. These data in conjunction with the wider CCLE are a broad resource to explore cellular behavior and facilitate cancer research.',
        speaker=Speaker.objects.filter(name='Mahmoud Ghandi').last()
    )
    
    Seminar.objects.create(
        wss=wss,
        title='Sublinear Algorithms for (Delta+1) Vertex Coloring',
        abstract='In this talk, we will examine a classical graph coloring problem through the lens of sublinear algorithms — these are algorithms that use computational resources that are substantially smaller than the size of the input on which they operate. It is well-known that any graph with maximum degree Delta admits a proper vertex coloring with (Delta + 1) colors that can be found via a simple sequential greedy algorithm in linear time and space. But can one find such a coloring via a sublinear algorithm? We will present results that answer this question in the affirmative for several well-studied models of sublinear computation, most notably graph streaming and sublinear time algorithms. We obtain these results by proving a palette sparsification theorem which says that if every vertex independently samples O(log n) colors from the available Delta+1 colors, then almost certainly a (Delta + 1) coloring can be found using only the sampled colors. \nBased on joint work with Yu Chen and Sanjeev Khanna.',
        speaker=Speaker.objects.filter(name='Sepehr Assadi').last()
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2020)

    Seminar.objects.filter(wss=wss).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0010_fill_staff_data_again'),
        ('events', '0006_add_default_to_keynote'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
