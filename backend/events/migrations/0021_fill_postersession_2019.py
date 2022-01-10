from django.db import migrations


def forwards(apps, schema_editor):
    PosterSession = apps.get_model('events', 'PosterSession')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2019)
    ctype = ContentType.objects.get_for_model(PosterSession)

    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Smartphones That Reads Minds',
        audience='',
        abstract="""Speech communication in acoustic environments with more than one speaker can be extremely challenging for hearing- impaired listeners. Assistive hearing devices have seen substantial progress in suppressing background noises that are acoustically different from speech but they cannot enhance a target speaker without knowing which speaker the listener is conversing with. Recent discoveries of the properties of speech representation in the human auditory cortex have shown an enhanced representation of the attended speaker relative to unattended sources. These findings have motivated the prospect of a brain controlled assistive hearing device to constantly monitor the brainwaves of a listener and compare them with sound sources in the environment to determine the most likely talker that a subject is attending to . Then, this device can amplify the attended speaker relative to others to facilitate hearing that speaker in a crowd. This process is termed auditory attention decoding.
Multiple challenging problems, including nonintrusive methods
for neural data acquisition and optimal decoding methods for
accurate and rapid detection of attentional focus, must be
resolved to realize a brain-controlled assistive hearing device.
In addition, we have only a mixture of sound sources in
realistic situations that can be recorded with one or more
microphones. Because the attentional focus of the subject is
determined by comparing the brainwaves of the listener with each sound source,
; in this process,
However, this approach
requires multiple microphones and can be beneficial only when ample spatial separation exists between the target and interfering speakers. An alternative and possibly complementary method is to leverage the recent success in automatic speech separation algorithms that use deep neural network models .In one such approach, neural networks were trained to separate a pretrained, closed set of speakers from mixed audio. Next, separated speakers were compared with neural responses to determine the attended speaker, who was then amplified and added to the mixture.
OBJECTIVES
To alleviate the limitation, we propose a causal, speaker-independent automatic speech separation algorithm that can generalize to unseen speakers, meaning that the separation of speakers can be performed without any prior training on target speakers. Speaker-independent speech separation has been one of the most difficult speech processing problems to solve. In recent years, several solutions have been proposed to address this problem.
One such approach is the deep attractor network (DAN). DAN performs source separation by projecting the time-frequency (T-F) (spectrogram) representation of a mixed audio signal into a high-dimensional space in which the representation of the speakers becomes more separable. Compared with the alternative speaker-independent approaches , DAN is advantageous in that it performs an end-to-end separation, meaning the entire process
of speaker separation is learned together. However, DAN was proposed for noncausal
speech separation, meaning that the algorithm required an entire utterance to perform
the separation. In real-time applications, such as in a hearing device, a causal,
low-latency algorithm is required to prevent perceivable distortion of the signal. In this study,
we address the problem of speaker-independent AAD
DAN [online DAN (ODAN)] Because this system can generalize to new speakers, it overcomes a major.
limitation of the previous AAD approach that required training on the target speakers. The proposed AAD framework enhances the subjective and objective quality of perceiving the attended speaker in a multi-talker (M-T) mixture. By combining
recent advances in automatic speech processing and brain-computer interfaces, we can help people with hearing impairment communicate more easily.
Model
DNN architecture
We used a common deep neural network architecture that consists of two stages: feature extraction and feature summation. In this framework, a high-dimensional representation of
the input is first calculated (feature extraction), which is then used to regress the output of the model (feature summation). The feature summation and feature extraction networks are optimized jointly together during the training phase. In all models examined, the feature summation step consisted of a two-layer fully connected network
with L2 regularization, dropout, batch normalization, and nonlinearity
in each layer.
We study five different architectures for the feature extraction part
of the network: the fully connected network, the locally connected network (LCN),
convolutional neural network (CNN), FCN + CNN, and FCN + LCN. In the combined networks, we concatenated the output of two parallel paths, which were fed into the summation network. For FCN, the windowed neural responses were flattened and fed to a multilayer FCN. However, in LCN and CNN, all the extracted features were of the same size as the input, meaning that we did not use flattening, stride convolution, or down sampling prior to the input layer or between the two consecutive layers. Instead, the final output of the multilayer LCN or CNN was flattened prior to feeding the output into the feature summation network.
The optimal network structure was found separately for the auditory spectrogram and vocoder parameters using an ablation study. For auditory spectrogram reconstruction, we directly regressed the 128 frequency bands using a multilayer FCN model for feature extraction .This architecture, however, was not plausible for reconstructing vocoder parameters due to the high-dimensionality and statistical variability of the vocoder parameters. To remedy this, we used a deep autoencoder network to find a compact representation of the 516-dimensional vocoder parameters (consisting of 513 spectral envelopes, pitch, voiced-unvoiced, and band periodicity). We confirmed that decoding the AEC features performed significantly better than decoding the vocoder parameters directly. To carry out decoding, we used a multilayer FCN, in which the number of the nodes changed in a descending (encoder) and then ascending order (decoder). The bottleneck layer of such a network (or the output of the encoder part of the pre-trained AEC) can be used as a low-dimensional reconstruction target by employing the neural network model, from which the vocoder parameters can be estimated using the decoder part of the AEC. We chose the number of nodes in the bottleneck layer to be 256, because it maximized both the objective reconstruction accuracy, and the subjective assessment of the reconstructed sound.
Conclusion
We hope use non-invasive technologies attack to the skin as well as a new kind of microphone he is been building that incredibly good at separating different voices so we are creating a smarter microphone that can
separate the sources our device does this better than any exists today and can do it in real time
during a conversation it uses a form of artificial intelligence called Neural Network models
loosely based on the neurons in the brain the next generation of the hearing aids that
we are trying to create so they monitor the brain of person to decide who that person
is talking to and amplify the sound source that’s most similar to the brain rate our hope is that in the next five years this will become into a real product the more we learn about the brain the better our machines become whether its helping your phone understand you or helping those with hearing impairments understand their friends at a party ..
About Us
We are two old friends who have been in elementary and middle school together and now study in two different fields.
One is electrical-telecommunication engineering and the other is computer-software engineering
We were born in Shahrekord, Iran. In university we found that both of us always been thinking about future, ways to create new things that can improve people's lives, becoming a successful person and generally finding our own path in life.
About one years we start discussing brought a new type of headphone for our smartphones. Eventually, we came to the
    
 
  
 
 automatically separate the sound sources in the environment to detect the attended source and subsequently amplify it.
a practical AAD system needs to
   One solution that has been proposed to address this problem is beamforming
neural signals are used to
 steer a beamformer to amplify the sounds arriving from the location of the target speaker.
  Although this method
 can help a subject interact with known speakers, such as family members, this approach is limited in generalization to
 new, unseen speakers, making it ineffective if the subject converses with a new person, in addition to the difficulty of
 scaling up to a large number of speakers.""",
        speaker=Speaker.objects.filter(name='amirreza ahmadnejad').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Surround Modulation: A Bio-inspired Connectivity Structure for Convolutional Neural Networks',
        audience='',
        abstract="Numerous neurophysiological studies have revealed that a large number of the primary visual cortex neurons operate in a regime called surround modulation. Surround modulation has a substantial effect on various perceptual tasks, and it also plays a crucial role in the efficient neural coding of the visual cortex. Inspired by the notion of surround modulation, we designed new excitatory-inhibitory connections between a unit and its surrounding units in the convolutional neural network (CNN) to achieve a more biologically plausible network. Our experiments show that this simple mechanism can considerably improve both the performance and training speed of traditional CNNs in visual tasks. We further explore additional outcomes of the proposed structure. We first evaluate the model under several visual challenges, such as the presence of clutter or change in lighting conditions and show its superior generalization capability in handling these challenging situations. We then study possible changes in the statistics of neural activities such as sparsity and decorrelation and provide further insight into the underlying efficiencies of surround modulation. Experimental results show that importing surround modulation into the convolutional layers ensues various effects analogous to those derived by surround modulation in the visual cortex.",
        speaker=Speaker.objects.filter(name='Hossein Hasani').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Do you share your personally useless information if others may benefit from it?',
        audience='',
        abstract="Information is personally useless if its beholder cannot benefit from it unless she shares it with those who can exploit that information to increase their outcome. We study sharing such information in a non-strategic and non-competitive setting, where selfish and cooperative motives align together. Although sharing information is cost-free, the experimental results and computational modeling reveal that almost half of the subjects have a negative tendency toward sharing their personally useless information. In addition, sharing personally useless information is not correlated with subjects’ personality traits, their sensitivity to fairness of opportunities, and their level of cooperation. However, the more subjects believe others cooperate in the Public Goods Game, the more they share information for free to others. Surprisingly, when subjects are rewarded and get access to the information directly by their action, they share less information; they prefer to give partial information more than guaranteeing their confederates’ success even at the cost of less profit for themselves and the difference between sharing in rewarded and non-rewarded conditions is negatively correlated with subject’s openness. Furthermore, the computational modeling revealed that subjects’ decisions and their reaction times are best described by the model of self and other-regarding behavior rather than models of fairness. The subjects sensitivity to others’ payoffs in the model is correlated with their belief about others’ cooperation in PGG. Thus, under the assumption of value-based decision making, the results show that self and other-regarding utility functions can make subjects irrational in terms of payoff-maximizing.",
        speaker=Speaker.objects.filter(name='Aryan Yazdanpanah').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='A Simple Randomized Algorithm for All Nearest Neighbors',
        audience='',
        abstract="Given a set P of n points in the plane, the all nearest neighbors problem asks for finding the closest point in P for each point in the set. The following folklore algorithm is used for the problem in practice: pick a line in a random direction, project all points onto the line, and then search for the nearest neighbor of each point in a small vicinity of that point on the line. It is widely believed that the expected number of points needed to be checked by the algorithm in the vicinity of each point is O( √ n) on average. We confirm this conjecture in affirmative by providing a careful analysis on the expected number of comparisons made by the algorithm. We also present a matching lower bound, showing that our analysis is essentially tight.",
        speaker=Speaker.objects.filter(name='Soroush Ebadian').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Text mining with constraint tensor decomposition',
        audience='',
        abstract="Text mining, as a special case of data mining, refers to the estimation of knowledge or parameters necessary for certain purposes, such as unsupervised clustering by observing various documents. In this context, the topic of a docu- ment can be seen as a hidden variable, and words are multi-view variables related to each other by a topic. The main goal in this paper is to estimate the probability of topics, and conditional probability of words given topics. To this end, we use non negative Canonical Polyadic (CP) decomposition of a third order moment tensor of observed words.",
        speaker=Speaker.objects.filter(name='Elaheh Sobhani').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Distributed Stochastic Optimization Framework for Large-Scale Non-Convex Stochastic Problems',
        audience='',
        abstract="We consider the problem of stochastic optimization, where the objective function is in terms of the expectation of a (possibly non-convex) cost function that is parametrized by a random variable. While the convergence speed is highly critical for many emerging applications, most existing stochastic optimization methods suffer from slow convergence. Furthermore, the emerging technology of parallel computing has motivated an increasing demand for designing new stochastic optimization schemes that can handle parallel optimization for implementation in distributed systems. We propose a fast parallel stochastic optimization framework that can solve a large class of possibly non-convex stochastic optimization problems that may arise in applications with multi-agent systems. In the proposed method, each agent updates its associated control variable in parallel, by solving a low-complexity convex sub-problem independently. The convergence of the proposed method to the optimal solution for convex problems and to a stationary point for general non-convex problems is established. The proposed algorithm can be applied to solve a large class of optimization problems arising in important applications from various fields, such as machine learning and wireless networks. As a representative application of our proposed stochastic optimization framework, we focus on large-scale support vector machines and demonstrate how our algorithm can efficiently solve this problem, especially in modern applications with huge datasets. Using popular real-world datasets, numerical results show that the proposed method can significantly outperform the state-of-the-art methods in the literature in terms of the convergence speed while having the same or lower complexity and storage requirement.",
        speaker=Speaker.objects.filter(name='Naeimeh Omidvar').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Smartphones That Reads Minds',
        audience='',
        abstract="""Speech communication in acoustic environments with more than one speaker can be extremely challenging for hearing-impaired listeners. Assistive hearing devices have seen substantial progress in suppressing background noises that are acoustically different from speech but they cannot enhance a target speaker without knowing which speaker the listener is conversing with. Recent discoveries of the properties of speech representation in the human auditory cortex have shown an enhanced representation of the attended speaker relative to unattended sources. These findings have motivated the prospect of a brain controlled assistive hearing device to constantly monitor the brainwaves of a listener and compare them with sound sources in the environment to determine the most likely talker that a subject is attending to. Then, this device can amplify the attended speaker relative to others to facilitate hearing that speaker in a crowd. This process is termed auditory attention decoding. Multiple challenging problems, including nonintrusive methods for neural data acquisition and optimal decoding methods for accurate and rapid detection of attentional focus, must be resolved to realize a brain-controlled assistive hearing device. In addition, we have only a mixture of sound sources in realistic situations that can be recorded with one or more microphones. Because the attentional focus of the subject is determined by comparing the brainwaves of the listener with each sound source, a practical AAD system needs to automatically separate the sound sources in the environment to detect the attended source and subsequently amplify it. One solution that has been proposed to address this problem is beamforming; in this process, neural signals are used to steer a beamformer to amplify the sounds arriving from the location of the target speaker. However, this approach requires multiple microphones and can be beneficial only when ample spatial separation exists between the target and interfering speakers. An alternative and possibly complementary method is to leverage the recent success in automatic speech separation algorithms that use deep neural network models.
In one such approach, neural networks were trained to separate a pretrained, closed set of speakers from mixed audio. Next, separated speakers were compared with neural responses to determine the attended speaker, who was then amplified and added to the mixture. Although this method can help a subject interact with known speakers, such as family members, this approach is limited in generalization to new, unseen speakers, making it ineffective if the subject converses with a new person, in addition to the difficulty of scaling up to a large number of speakers.""",
        speaker=Speaker.objects.filter(name='Amirreza Ahmadnejad-Ahmad Mahmoodian').last()
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='شبکه های اجتماعی تصادفی',
        audience='',
        abstract="از آنجا که در شبکه های اجتماعی فعالیتهای فراوانی توسط کاربران وجود دارد، مدلهایی که پویایی و ماهیت متغیر در زمان را برای تحلیل در نظر میگیرند به دنیای واقعی نزدیکتر هستند. در این ارائه هدف معرفی گرافهای استوکستیک و مدلهای مبتنی بر زمان متغیر برای تحلیل شبکه های اجتماعی است.",
        speaker=Speaker.objects.filter(name='Alireza Rezvanian').last(),
        is_persian=True
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='کاربرد جدید کپچا',
        audience='',
        abstract="کپچا برنامه ای است که وبسایت ها را دربرابر ربات ها، با ایجاد تست هایی که انسان میتواند به راحتی حل کند اما ماشین نمیتواند ، محافظت میکند.به عنوان مثال انسان میتواند متنی را که از حالت طبیعی خودش خارج شده بخواند اما ربات نمیتواند. کپچا )تست تورینگ عمومی به کامپیوتر ها و انسانها به جزکدها(است که تعیین می کند که آیا یک درخواست یا ارسال آنلاین توسط یک انسان یا یک کامپیوتر بوده است یا خیر.با پیشرفت هوش مصنوعی به نظر میرسد که کپچاها به روزهای پایانی عمر خودشان نزدیک شدند اما شاید بتوان از آنها در جایگاه و کاربرد متفاوتی استفاده کرد.",
        speaker=Speaker.objects.filter(name='Fatemeh Ghorbani').last(),
        is_persian=True
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='تشخيص پولشويي با استفاده از تجزيه دادهاي توپولوژيكي',
        audience='',
        abstract="در اين تحقيق با استفاده از الگوريتم محاسبه پايداري از مجموعه ابزارهاي تحليل داده هاي توپولوژيكي جهت تشخيص موارد مشكوك و دسته بندي داده ها استفاده خواهد شد كه مرحله نهايي كار بر عهده يك الگوريتم يادگيري ماشين خواهد بود.",
        speaker=Speaker.objects.filter(name='Mostafa Khalili').last(),
        is_persian=True
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='نگهبانی با رویت پذیری متعامد',
        audience='',
        abstract="در این ارائه ما به بررسی مساله گالری هنر تحت رویت پذیری متفاوت می پردازیم، پیچیدگی زمانی و حافظه ای آن را مورد بررسی قرار می دهیم و الگوریتمهایی برای انواعی از چندضلعی ها بیان میکنیم.",
        speaker=Speaker.objects.filter(name='Hamid Hoorfar').last(),
        is_persian=True
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='بررسی و ارائه یک روش اصلاح تسهیم بندی در افزونگی Nand',
        audience='',
        abstract="مقاله مذکور سعی در ارائه یک روش تحمل پذیری خطا با استفاده از دروازه های منطقی NAND دارد.در اين مقاله دستگاه های نانو مقیاس در حال ظهور که دارای حساسیت بالاتری نسبت به تاثیرات خارجی هستند مورد بررسی قرار گرفته است . این روش باعث می شود این مدل دستگاه ها در معرض گسل های ( شکست یا خطا ) گذرا در نیمه رساناها همچون اکسید فلز در CMOS شوند. تکنیک تسهیم بندی nand با تسهیم بندی xnor افزایش کارایی داشته و با وجود خطاهای گذرا دستگاه همچنان کار می کند ، پس طراحی قابل اعتماد برای تحمل خطا در چنین سیستم هایی ضروری است . در این روش با اصلاح تسهیم بندی nand ، با افزونگی ها که برای جایگزینی voter به سیستم افزوده شده را با گیت xnor جابه جا کردیم . این تکنیک نشان می دهد که تسهیم بندی nand با سربار افزونگی ، کارائی بالایی دارد و این روش نسبت به روش های قبل توانسته تعداد بیشماری خطا را نسبت به طرح قبل همچون گیت xor پوشش دهد . در این پیشنهاد تحمل خطا مطابق ارزیابی موجود ابزار را بیشتر پوشش داده است .",
        speaker=Speaker.objects.filter(name='Mohammad Harooni').last(),
        is_persian=True
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='پایش بلند مدت سیگنال های الکتروکاردیوگرام 12 کاناله با استفاده از الگوریتم های یادگیری ماشین',
        audience='',
        abstract="هدف این پژوهش ارایه مدلی برای پایش بلند مدت سیگنال‌های الکتروکاردیوگرام ( ECG) و تشخیص نقطه تغییر با استفاده از روش های یادگیری ماشین است. سیگنال‌های ECG به طور معمول ۱۲ کاناله می باشند که هر کانال یک دید متفاوتی از عملکرد قلب فرد نشان می‌دهد. پس از جداسازی هر دوره سیگنال ECG و اعمال فیلتر برای رفع نویز و انحراف از خط پایه، سیگنال‌های پیش پردازش شده را با یک تنسور با مرتبه سه با ابعاد ضربان قلب در نقاط نمونه در کانال نمایش می‌دهیم. از آنجاییکه ابعاد تنسور بالا می‌باشد با استفاده از روش تحلیل مؤلفه اصلی تابعی چند متغیره وزن دار ( WMFPCA)، اولا کاهش بعد میدهیم، ثانیا همبستگی بین کانال‌های مختلف و همچنین تغییرات هر کانال را با اختصاص دادن وزن به هر تابع ویژه مرتبط با هر کانال در نظر میگیریم. امتیازات حاصل شده از WMFPCA را به یک روش تشخیص نقطه تغییر بدون نظارت می‌دهیم و با انجام شبیه سازی مونت کارلو محدوده کنترل را تعیین میکنیم. سپس در فاز دوم داده‌های جدید را در دراز مدت پایش می‌کنیم.",
        speaker=Speaker.objects.filter(name='Hesam Hafezossehe').last(),
        is_persian=True
    )
    PosterSession.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='ساخت شبکه همکاری دانشگاه های ایران با محوریت تشخیص اجتماعات',
        audience='',
        abstract="ساخت شبکه همکاری دانشگاه های ایران با محوریت تشخیص اجتماعات با استفاده از الگوریتم لوین و تحلیل داده های جمع آوری شده از ریسرچ گیت",
        speaker=Speaker.objects.filter(name='Mohammad Heidari').last(),
        is_persian=True
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    PosterSession = apps.get_model('events', 'PosterSession')
    wss = WSS.objects.get(year=2019)

    titles = [
        'Smartphones That Reads Minds',
        'Surround Modulation: A Bio-inspired Connectivity Structure for Convolutional Neural Networks',
        'Do you share your personally useless information if others may benefit from it?',
        'A Simple Randomized Algorithm for All Nearest Neighbors',
        'Text mining with constraint tensor decomposition',
        'Distributed Stochastic Optimization Framework for Large-Scale Non-Convex Stochastic Problems',
        'Smartphones That Reads Minds',
        'شبکه های اجتماعی تصادفی',
        'کاربرد جدید کپچا',
        'تشخيص پولشويي با استفاده از تجزيه دادهاي توپولوژيكي',
        'نگهبانی با رویت پذیری متعامد',
        'بررسی و ارائه یک روش اصلاح تسهیم بندی در افزونگی Nand',
        'پایش بلند مدت سیگنال های الکتروکاردیوگرام 12 کاناله با استفاده از الگوریتم های یادگیری ماشین',
        'ساخت شبکه همکاری دانشگاه های ایران با محوریت تشخیص اجتماعات'
    ]

    PosterSession.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):
    dependencies = [
        ('events', '0020_fill_seminars_2019'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
