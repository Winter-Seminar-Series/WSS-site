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
        wss=wss,
        polymorphic_ctype=ctype,
        title='An introduction to Secret Sharing Schemes',
        audience='undergraduate and graduate students with interest in information theory and cryptography',
        abstract='''Secret sharing is an important information-theoretic cryptographic primitive. 
In this presentation, I will talk about some well-known long-standing open problem concerning the efficiency of secret sharing and discuss some recent result by the speaker on ideal and homomorphic secret sharing schemes.''',
        speaker=Speaker.objects.filter(name='Shahram Khazaei').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='How do neurons learn?',
        audience='',
        abstract='''Deep neural networks have achieved incredible performance in various domains by automatizing feature extraction with less need for conventional feature engineering. When neurons are well-connected and optimized, their performance goes beyond the human level for image processing. Yet, wiring and optimizing many neurons is a cumbersome engineering task.  Over 70 years of research and optimization breakthroughs have advanced the training of deep networks. In this talk, we will cover the main outcomes of these breakthroughs. The talk presents recent studies on batch normalization, the fundamental building of deep neural networks. Leveraging tools from Markov chain theory, we will shed light on the inner-workings of batch normalization for deep learning.''',
        speaker=Speaker.objects.filter(name='Hadi Daneshmand').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Robust Vision for Active Agents',
        audience='',
        abstract='''Artificial Intelligence seeks agents that can ‘perceive’ the world and ‘act’ accordingly. Despite remarkable progress toward this goal, computer vision solutions face a challenge in scaling to the complexity of the real world -- which often leads to reducing the operation domain of active agents to perceptually simplified ones, such as controlled spaces or video games. Additionally, the predominant approaches to developing vision solutions are in disconnect from action. I will present some of our efforts toward addressing these two core problems. I will show a mid-level vision module can notably improve the sample efficiency and generalization of active robotic agents. I will discuss how we learn such a mid-level vision, how we make it robust, and how we make it consistent.''',
        speaker=Speaker.objects.filter(name='Amir Zamir').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='PAC Learning of Gaussians and their mixtures',
        audience='',
        abstract='''Learning high-dimensional Gaussian distributions is one of the most basic problems in statistical estimation, for which the simple approach of finding the empirical mean and covariance can be adequate. However, this simple approach does not satisfy the modern requirements of data analysis such as privacy and robustness. We explore some recent advances in understanding the sample complexity and computational complexity of learning Gaussians and their mixtures under these constraints.''',
        speaker=Speaker.objects.filter(name='Hassan Ashtiani').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Exploring and Improving the Power-Efficiency and Reliability Trade-off of FPGA-based DNN Accelerators',
        audience='Master and PhD students and researchers in computer architecture',
        abstract='''This talk is about experimentally exploring and improving the power-efficiency and reliability trade-off in Field Programmable Gate Arrays (FPGA)-based Convolutional Neural Network (CNN) accelerators. More specifically, we empirically evaluate an undervolting technique, i.e., underscaling the circuit supply voltage below the nominal level, to improve the power-efficiency of CNN accelerators mapped to FPGAs. Undervolting below a safe voltage level can lead to timing faults due to excessive circuit latency increase. We evaluate the reliability-power trade-off for such accelerators. Specifically, we experimentally study the reduced-voltage operation of multiple components of real FPGAs, characterize the corresponding reliability behavior of CNN accelerators, propose techniques to minimize the drawbacks of reduced-voltage operation, and combine undervolting with architectural CNN optimization techniques, i.e., quantization and pruning. We investigate the effect of environmental temperature on the reliability-power trade-off of such accelerators. We perform experiments on several samples of modern Xilinx FPGA platforms with five state-of-the-art image classification CNN benchmarks. We achieve more than 3X power-efficiency (GOPs/W) gain via undervolting. 2.6X of this gain is the result of eliminating the voltage guardband region, i.e., the safe voltage region below the nominal level that is set by the FPGA vendor to ensure correct functionality in worst-case environmental and circuit conditions. 43% of the power-efficiency gain is due to further undervolting below the guardband, which comes at the cost of accuracy loss in the CNN accelerator. We evaluate an effective frequency underscaling technique that prevents this accuracy loss and find that it reduces the power-efficiency gain from 43% to 25%. Finally, we will discuss the further open problems in this area and propose several potential research directions.''',
        speaker=Speaker.objects.filter(name='Behzad Salami').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Self-Adjusting Networks: The Power of Choices in Datacenter Topology Design',
        audience='',
        abstract='''This talk is about experimentally exploring and improving the power-efficiency and reliability trade-off in Field Programmable Gate Arrays (FPGA)-based Convolutional Neural Network (CNN) accelerators. More specifically, we empirically evaluate an undervolting technique, i.e., underscaling the circuit supply voltage below the nominal level, to improve the power-efficiency of CNN accelerators mapped to FPGAs. Undervolting below a safe voltage level can lead to timing faults due to excessive circuit latency increase. We evaluate the reliability-power trade-off for such accelerators. Specifically, we experimentally study the reduced-voltage operation of multiple components of real FPGAs, characterize the corresponding reliability behavior of CNN accelerators, propose techniques to minimize the drawbacks of reduced-voltage operation, and combine undervolting with architectural CNN optimization techniques, i.e., quantization and pruning. We investigate the effect of environmental temperature on the reliability-power trade-off of such accelerators. We perform experiments on several samples of modern Xilinx FPGA platforms with five state-of-the-art image classification CNN benchmarks. We achieve more than 3X power-efficiency (GOPs/W) gain via undervolting. 2.6X of this gain is the result of eliminating the voltage guardband region, i.e., the safe voltage region below the nominal level that is set by the FPGA vendor to ensure correct functionality in worst-case environmental and circuit conditions. 43% of the power-efficiency gain is due to further undervolting below the guardband, which comes at the cost of accuracy loss in the CNN accelerator. We evaluate an effective frequency underscaling technique that prevents this accuracy loss and find that it reduces the power-efficiency gain from 43% to 25%. Finally, we will discuss the further open problems in this area and propose several potential research directions.''',
        speaker=Speaker.objects.filter(name='Stefan Schmid').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Language Level Support for Persistent Memory',
        audience='CS students',
        abstract='''Storing data structures in high-capacity byte-addressable persistent memory instead of DRAM or a storage device offers the opportunity to (1) reduce cost and power consumption compared with DRAM, (2) decrease the latency and CPU resources needed for an I/O operation compared with storage, and (3) allow for fast recovery as the data structure remains in memory after a machine failure. To achieve their desired performance and persistence goals, programmers must be conscious of the NVM hardware and explicitly interact with it. They need to understand details of all levels of modern computer systems, from the hardware and operating system, to the compiler, programming language, and the run-time libraries used by their programs.
Despite substantial research devoted to making persistent memory effective, there is a lack of rich language and compiler support for non-volatile memory. This work pursues the vision of facilitating the use of new hardware technologies without sacrificing performance. Towards reaching this vision, I extended the LLVM compiler infrastructure with a robust plugin architecture for persistent memory. My extensions support diverse language designs and memory features with high-performance failure-atomicity libraries integrated into a managed runtime environment.''',
        speaker=Speaker.objects.filter(name='Pantea Zardoshti').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Large scale graph monitoring or why an ant moving on a manifold can help in overall internet security.',
        audience='math and computer science students',
        abstract='''The monitoring of large dynamic networks is a major challenge for a wide range of applications. The complexity stems from properties of the underlying graphs, in which slight local changes can lead to sizable variations of global properties, e.g., under certain conditions, a single link cut that may be overlooked during monitoring can result in splitting the graph into two disconnected components. Moreover, it is often difficult to determine whether a change will propagate globally or remain local. In this presentation, we tackle the problem of real-time monitoring of dynamic large scale graphs by developing a geometric approach that leverages concept of Riemannian and differential geometry developed for the proof of Poincarré Theorem. We will illustrate the applications of the developed methods on the practical case of monitoring dynamic variations of global Internet using information provided by combining several BGP feeds. In particular, we use our method to detect major events and changes via the geometry of the embedding of the graph, where a major event is defined as an incident that either impacts a substantial number of prefixes or can be observed by numerous route monitors within a given period of time.''',
        speaker=Speaker.objects.filter(name='Kavé Salamatian').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='From Data to Decisions in Dynamic Environments',
        audience='Graduate students and researchers in computer science, operations research, mathematics, electrical engineerng, and related fields.',
        abstract='''A broad spectrum of applications, such as power systems operation, manufacturing, energy management, anomaly detection, and security, can be viewed as decision-making problems in uncertain and dynamic environments. This class of problems is naturally formulated in an optimization framework whose exact solution is often intractable. In this seminar, we consider tractable randomized (data-driven) counterparts of these programs and study a probabilistic bridge between these solutions and the original ones.''',
        speaker=Speaker.objects.filter(name='Peyman Mohajerin Esfahani').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='GANs vs. Maximum Likelihood: A Theoretical Comparison',
        audience='Students familiar with basic machine learning',
        abstract='''Since their introduction in 2014, generative adversarial networks (GANs) have achieved
state-of-the-art performance on a wide array of machine learning tasks, outperforming standard maximum likelihood-based methods. In this seminar, we compare and contrast the GAN and maximum likelihood approaches, and provide theoretical evidence that the game-based design of GANs could contribute to a superior generalization performance from training samples to unseen data in comparison to deep maximum likelihood methods such as autoregressive and flow-based models. Furthermore, we demonstrate that the common divergence/distance measures targeted by GANs are more suitable for learning multi-modal distributions than the KL-divergence optimized by maximum likelihood learners. We discuss several numerical results supporting our theoretical comparison of the GAN and maximum likelihood frameworks.''',
        speaker=Speaker.objects.filter(name='Farzan Farnia').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Bandit Learning of Nash equilibria in Multi-agent Games',
        audience='upper year undergrads, MS in EE, CS, COMM, MATH',
        abstract='''A rising challenge in control of large-scale control systems such as the electricity and the transportation networks is to address autonomous decision making of interacting agents, i.e. the subsystems, with local objectives while ensuring global system safety and performance. In this setting, a Nash equilibrium is a stable solution outcome in the sense that no agent finds it profitable to unilaterally deviate from her decision. Due to geographic distance, privacy concerns or simply the scale of these systems, each agent can only base her decision on local measurements. Hence, a fundamental question is: do agents learn to play a Nash equilibrium strategy based only on local information? I will discuss conditions under which we have an affirmative answer to this question and will present algorithms that achieve this learning task.''',
        speaker=Speaker.objects.filter(name='Maryam Kamgarpour').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Double-Authentication-Preventing Signatures: when you can cheat, but better not to!',
        audience='',
        abstract='''In this talk we will introduce a cryptographic primitive known
as Double Authentication Preventing Signature (DAPS).
In a traditional signature scheme, the signer can sign whatever they
want (as far as the message is in the right message space), this can
be dramatically dangerous for some applications.
In this talk we will review these sort of applications and show how DAPS
can be useful there. The main idea of DAPS is that if the signer does not
follow the rules of the protocol, its signing key would be revealed.
The protocol is designed in a way to make the signing key precious,
such that the signer will not risk losing it.''',
        speaker=Speaker.objects.filter(name='Azam Soleimanian').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Highly Concurrent Latency-Tolerant Register Files for GPUs',
        audience='',
        abstract='''Graphics Processing Units (GPUs) employ large register files to accommodate all active threads and accelerate context switching. Unfortunately, register files are a scalability bottleneck for future GPUs due to long access latency, high power consumption, and large silicon area provisioning. Prior work proposes hierarchical register file to reduce the register file power consumption by caching registers in a smaller register file cache. Unfortunately, this approach does not improve register access latency due to the low hit rate in the register file cache.

In this work, we propose the Latency-Tolerant Register File (LTRF) architecture to achieve low latency in a two-level hierarchical structure while keeping power consumption low. We observe that compile-time interval analysis enables us to divide GPU program execution into intervals with an accurate estimate of a warp’s aggregate register working-set within each interval. The key idea of LTRF is to prefetch the estimated register working-set from the main register file to the register file cache under software control, at the beginning of each interval, and overlap the prefetch latency with the execution of other warps. We observe that register bank conflicts while prefetching the registers could greatly reduce the effectiveness of LTRF. Therefore, we devise a compile-time register renumbering technique to reduce the likelihood of register bank conflicts. Our experimental results show that LTRF enables high-capacity yet long-latency main GPU register files, paving the way for various optimizations. As an example optimization, we implement the main register file with emerging high-density high-latency memory technologies, enabling 8× larger capacity and improving overall GPU performance by 34%.''',
        speaker=Speaker.objects.filter(name='Mohammad Sadrosadati').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Recent Advances in Open Set Recognition',
        audience='',
        abstract='''In this talk, I will give a brief overview of the Open Set Recognition (OSR) problem, where samples should be classified and those that could slightly deviate from the input distribution should be detected. I will next present some recent findings in my lab regarding this problem. Specifically, I will show that OSR could be dealt with using strong base classifiers along with augmentations that do not tend to introduce huge out-of-distribution shifts. Furthermore, I will introduce near distribution anomaly detection, where the anomaly class is conceptually close to the normal class. Most existing state-of-the-art anomaly detection techniques fail in this setup. I will present a framework that could potentially help in such setups.''',
        speaker=Speaker.objects.filter(name='Mohammad Hossein Rohban').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    titles = [
        'An introduction to Secret Sharing Schemes',
        'How do neurons learn?',
        'Robust Vision for Active Agents',
        'PAC Learning of Gaussians and their mixtures',
        'Exploring and Improving the Power-Efficiency and Reliability Trade-off of FPGA-based DNN Accelerators',
        'Self-Adjusting Networks: The Power of Choices in Datacenter Topology Design',
        'Language Level Support for Persistent Memory',
        'Large scale graph monitoring or why an ant moving on a manifold can help in overall internet security.',
        'From Data to Decisions in Dynamic Environments',
        'GANs vs. Maximum Likelihood: A Theoretical Comparison',
        'Bandit Learning of Nash equilibria in Multi-agent Games',
        'Double-Authentication-Preventing Signatures: when you can cheat, but better not to!',
        'Highly Concurrent Latency-Tolerant Register Files for GPUs',
        'Recent Advances in Open Set Recognition',
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0034_update_7th_speakers_data'),
        ('events', '0024_auto_20220210_0721'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
