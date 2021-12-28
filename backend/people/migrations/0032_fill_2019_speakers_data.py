# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations

def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.create(
        name='Behzad Moshiri',
        picture='human_pictures/moshiri.jpg',
        degree='Professor, Tehran University',
        place='Adjunct Professor, Waterloo',
        bio='Behzad Moshiri received his B.Sc. degree in mechanical engineering from Iran University of Science and Technology (IUST) in 1984 and M.Sc. and Ph.D. degrees in control systems engineering from the University of Manchester, Institute of Science and Technology (UMIST), U.K. in 1987 and 1991 respectively. He joined the school of electrical and computer engineering, university of Tehran in 1992 where he is currently professor of control systems engineering. He has been the member of International Society of Information Fusion (ISIF) since 2002 and senior member of IEEE since 2006. He was visiting professor at the universities of Toronto, Waterloo and Ryerson, Canada, in 2009-2011. He has been as adjunct professor of department of ECE at the university of Waterloo since May 2014 until now as well as department of EECS at York University, Canada since August 2018 until now. He is now serving as the chair of IEEE control system chapter in Iran section since March 2019. He has also been a research fellow member of Waterloo Institute for Sustainable Energy (WISE), Canada since April 2019. He is the author/co-author of more than 360+ articles including 120+ journal papers and 20+ book chapters. His fields of research include advanced industrial control, advanced instrumentation systems and applications of data/information fusion in areas such as robotics, process control, mechatronics, information technology (IT), bioinformatics, intelligent transportation systems (ITS) and financial engineering.'
    )
    Speakers.objects.create(
        name='Omid Etesami',
        picture='human_pictures/omid-etesami.jpg',
        degree='Associate Professor',
        place='IPM',
        bio='Omid Etesami is a researcher at Institute for Research in Fundamental Sciences (IPM) in Iran. Previously he did his undergraduate studies at Sharif University of Technology, his PhD at University of California, Berkeley, and a postdoc at EPFL, Switzerland. As an undergraduate, he participated in programming competitions. During his PhD, he worked at Microsoft research and was supported by their PhD fellowship. Recently, his paper has been selected as a Best of 2014 paper in Computer Science by ACM Computing Reviews. His research interest is the use of probability and randomness in computer science, including pseudorandomness, error-correcting codes and one-way functions based on random graphs, using randomness in auction and differential privacy mechanisms, and aspects of average-case analysis.'
    )
    Speakers.objects.create(
        name='Amin Babadi',
        picture='human_pictures/amin_babadi.jpg',
        degree='Ph.D. candidate',
        place='Aalto University, Finland',
        bio='''Amin Babadi (امین بابادی in Persian) is a Ph.D. candidate at Department of Computer Science, Aalto University, Finland. He works under supervision of Prof. Perttu Hämäläinen. Amin is also a visiting researcher at Imager lab, University of British Columbia, Canada, where he works with Prof. Michiel van de Panne. His current research focuses on developing efficient, creative movement artificial intelligence (AI) for physically-simulated characters in multi-agent settings.
Prior to his Ph.D., Amin had ten years of experience in the video game industry. Specifically, he has worked on several commercial games from various genres including first-person shooter, two-player football, and classic adventure. In these projects, he has been responsible for different programming disciplines including AI, animation, gameplay, and physics.'''
    )
    Speakers.objects.create(
        name='Simin Oraee',
        picture='human_pictures/simin.jpg',
        degree='PhD student',
        place='Max Planck Institute',
        bio='''Simin Oraee (سیمین اورعی) is a PhD student at Max Planck Institute for Software Systems (MPI-SWS), working under supervision of Rupak Majumdar.
She is broadly interested in testing and model checking of distributed and concurrent systems. Before she joined MPI-SWS, she did an internship on symbolic model checking of reactive systems at Institute of Science and Technology (IST Austria) under supervision of Krishnendu Chatterjee.'''
    )
    Speakers.objects.create(
        name='Afra Abnar',
        picture='human_pictures/Afra_Abnar.jpg',
        degree='M.Sc at University of Alberta',
        place='Senior Software Developer at SAP',
        bio='Afra graduated (B.Sc.) in 2009 and continued her graduate studies in theoretical algorithms with Dr. Safari at SUT. She continued her graduate studies in Data Mining at University of Alberta in Canada. She is now working as a Senior Software Developer at SAP, a software company that builds enterprise software for businesses.'
    )
    Speakers.objects.create(
        name='Mohammad Mahdian',
        picture='human_pictures/Mohammad_Mahdian.jpg',
        degree='Ph.D',
        place='research scientist at the Google Research lab',
        bio='Mohammad Mahdian is a research scientist at the Google Research lab in New York, specializing in market algorithms. He has a Ph.D. from MIT, an M.Sc. from University of Toronto, and a B.Sc. from Sharif University of Technology. Prior to Google, he has worked at Yahoo! Research and Microsoft Research'
    )
    Speakers.objects.create(
        name='Morteza Saberi',
        picture='human_pictures/morteza_saberi.jpg',
        degree='Lecturer(Assistant Professor)',
        place='UTS, Sydney',
        bio='''Dr Morteza Saberi is currently a Lecturer (Assistant Professor) at the School of
Information, Systems and Modelling, UTS, Sydney. Prior to joining UTS, He was a
Lecturer at the UNSW, Business school and University of Tafresh’s Department of
Industrial Engineering. He has an outstanding research record and significant
capabilities in the area of business intelligence, data mining and applied machine
learning. He has published more than 180 papers in reputable academic journals
and conference proceedings such as Future Generation Computer Systems,
Knowledge-Based Systems, Computers &amp; Industrial Engineering, Fuzzy Sets and systems, IEEE-ACCESS, Applied Soft Computing, Enterprise Information Systems,
Business Process Management Journal, Journal of Manufacturing Systems, Journal
of Loss Prevention in the Process Industries, Technological Forecasting and Social
Change, Process Safety and Environmental Protection, Neurocomputing, Safety
science, Quality &amp; Quantity, Energy Policy, Applied Energy, Energy, AAA-I, WSDM &amp;
IJCAI. He has won over 20 national and international research awards and
recognitions till date from his research. In 2019, he has been selected as the filed
leader of evolutionary computing in Australia. He received three competitive grants
from Australian academy of science, DAAD and Australian Department of Industry,
Innovation and Science. He was awarded the first Place Dissertation Competition
from Sixth International Conference on Industrial Engineering and Operations
Management (IEOM) as an output of his PhD. He visited two top research institutes
in Germany: the Department of Information Systems (under Professor Martin
Theobald), Max Planck Institute, Saarbrucken, Germany and Information Systems
Group (under Professor Felix Naumann), Hasso Plattner Institute, Germany.'''
    )
    Speakers.objects.create(
        name='Shahriar Ebrahimi',
        picture='human_pictures/image1.png',
        degree='PhD Candidate',
        place='Sharif University of Technology',
        bio='Shahriar Ebrahimi have received his BSc and MSc degrees both from Sharif University of Technology (SUT), where he is currently a PhD Candidate of Computer Engineering under supervision of Dr. S. Bayat-Sarmadi. He is a full-time researcher in Secure and Smart Systems (3S) Lab in CE department of SUT. He was also a visiting researcher in Mainz (ZDV center) and Hamburg (DKRZ center) universities back in 2014 and 2016. His research interests include: Post-quantum cryptography, Lattice-based cryptography, Internet of Things (IoT) and Computer/Network Architecture and Security.'
    )
    Speakers.objects.create(
        name='Mohammad Mahmoody',
        picture='human_pictures/mohammad-mahmoudi.jpg',
        degree='Associate Professor',
        place='University of Virginia',
        bio="Mohammad Mahmoudi's research focuses on the foundations of Cryptography and its interplay with Computational Complexity and Adversarial Learning. He obtained his BS degree from the Computer Engineering Department of Sharif University in 2004 and got his Ph.D. from Princeton University in 2010. He then spent a few years at Cornell University as a postdoctoral associate before joining the University of Virginia as an assistant professor in 2010, where he is currently an associate professor of Computer Science."
    )
    Speakers.objects.create(
        name='Mozhgan Mirzaei',
        picture='human_pictures/mirzaee.jpg',
        degree='PhD student',
        place='University of California at San Diego',
        bio='Mozhgan Mirzaei is a last year PhD student at the University of California at San Diego, working under supervision of prof. Andrew Suk. She is interested in Combinatorics and Combinarial Geometry. She got her B.Sc degree in Mathematics from Sharif University of Technology under supervision of prof. Ebadollah Mahmoodian.'
    )
    Speakers.objects.create(
        name='Salman Abolfath Beygi',
        picture='human_pictures/salmanB.png',
        degree='Associate Professor',
        place='IPM',
        bio='His research interests include quantum computation and quantum information theory. He received B.Sc. from the Department of Mathematics at Sharif University of Technology in 2004. He received Ph.D. from the Department of Mathematics of MIT in 2009 under the supervision of Peter Shor. Before joining IPM, he was a postdoc at Institute for Quantum Information at Caltech. He is a member of the editorial advisory board of the Journal of Mathematical Physics.'
    )
    Speakers.objects.create(
        name='Moslem Noori',
        picture='human_pictures/moslemnoori_11WhYdt.jpg',
        degree='Ph.D, University of Alberta',
        place='Senior research scientist at 1QBit',
        bio='Moslem Noori received his bachelor’s degrees in electrical engineering and applied mathematics from Amirkabir University of Technology in 2005 and 2006, respectively. He then joined the Electrical Engineering Department at the University of Alberta where he obtained his M.Sc. in 2008 and his PhD in 2012. Moslem later finished two postdoctoral programs at the University of British Columbia and the University of Alberta and also spent a visiting period at Nokia Bell Labs. He was the recipient of several scholarships and awards including the Vanier Canada graduate scholarship, NSERC postdoctoral fellowship, and Alberta Innovates fellowship. He is currently a senior research scientist at 1QBit, a quantum computing company headquartered in Vancouver, and is also affiliated with the Microsoft Quantum team in Redmond.'
    )
    Speakers.objects.create(
        name='Mohammad Hossein Noranian',
        picture='human_pictures/WhatsApp_Image_2019-12-28_at_11.43.38.jpeg',
        degree='AI and IoT Business Coordinator',
        place='Fanap Corporation',
        bio='''Mohammad Hossein Noranian is a system engineer with electrical engineering background. He has PhD in Electrical Engineering - System and Control from KNTU and MSc. and BSc. in Electrical engineering - Control systems from IUST.
He is currently AI and IoT Business Coordinator in Fanap Corporation, as well as University Lecturer in Khatam University.'''
    )
    Speakers.objects.create(
        name='Krishna Gummadi',
        picture='human_pictures/download_N6FdSsp.jpeg',
        degree='Scientific director, head of the Networked Systems research group at Max Planck Institute',
        place='Max Planck Institute',
        bio="""Krishna Gummadi is a scientific director and head of the Networked Systems research group at the Max Planck Institute for Software Systems (MPI-SWS) in Germany. He also holds an honorary professorship at the University of Saarland. He received his Ph.D. (2005) and B.Tech. (2000) degrees in Computer Science and Engineering from the University of Washington and the Indian Institute of Technology, Madras, respectively.

Krishna's research interests are in the measurement, analysis, design, and evaluation of complex Internet-scale systems. His current projects focus on understanding and building social computing systems. Specifically, they tackle the challenges associated with (i) assessing the credibility of information shared by anonymous online crowds, (ii) understanding and controlling privacy risks for users sharing data on online forums, (iii) understanding, predicting and influencing human behaviors on social media sites (e.g., viral information diffusion), and (iv) enhancing fairness and transparency of machine (data-driven) decision making in social computing systems.

Krishna's work on online social networks, Internet access networks, and peer-to-peer systems has been widely cited and his papers have received numerous awards, including SIGCOMM Test of Time, Casper Bowden Privacy Enhancing Technologies (PET) Runners-Up Award, CNIL-INRIA Privacy Runners-Up Award, IW3C2 WWW Best Paper Honorable Mention, and Best Papers at NIPS ML & Law Symposium, ACM COSN, ACM/Usenix SOUPS, AAAI ICWSM, Usenix OSDI, ACM SIGCOMM IMC, ACM SIGCOMM CCR, and SPIE MMCN. He has also co-chaired AAAI's ICWSM 2016, IW3C2 WWW 2015, ACM COSN 2014, and ACM IMC 2013 conferences. He received an ERC Advanced Grant in 2017 to investigate "Foundations for Fair Social Computing"."""
    )
    Speakers.objects.create(
        name='Ehsan Emamjomeh-Zadeh',
        picture='human_pictures/photo_2019-12-15_20-16-24.jpg',
        degree='Ph.D',
        place='University of Southern California',
        bio='Ehsan received his B.Sc in Computer Engineering at Sharif University of Technology in 2013 and his Ph.D. in Computer Science at University of Southern California in 2019. In his Ph.D., under supervision of David Kempe and Shaddin Dughmi, his research was focused on theoretical computer science. More specifically, he has worked on game theory and online learning. Since August 2019, he is a research scientist at Facebook Inc.'
    )
    Speakers.objects.create(
        name='Hamed Saleh',
        picture='human_pictures/hamed-saleh.jpg',
        degree='PhD student',
        place='University of Maryland',
        bio='I am a PhD student in the Computer Science Department at the University of Maryland, advised by Prof. Hajiaghayi. I work on combinatorial problems in distributed/parallel models, in particular models with sublinear memory such as MPC. Prior to joining the University of Maryland, I earned my BS degrees in Computer Engineering at Sharif University of Technology.'
    )
    Speakers.objects.create(
        name='Meysam Alizadeh',
        picture='human_pictures/alizade.jpg',
        degree='Postdoctoral Research Associat',
        place='Princeton University',
        bio='Computational social scientist Mesysam Alizadeh has been harnessing the wealth of network and human social data available through social media platforms to understand the roots and spread of extremist ideology. In recent projects during his Ph.D. at George Mason University and postdoctoral fellowship at Indiana University Bloomington, Alizadeh has explored the moral and emotional factors underlying political extremism. He is also studying how extremism spreads on social media by analyzing the information sharing behavior of political extremists on Twitter. Currently, Meysam is a postdoctoral research associate at the Empirical Studies of Conflict Project at Princeton University and is studying foreign influence efforts on democratic elections. In this project, advised by Professor Jacob Shapiro, Meysam is using publicly available verified data sets of foreign online influence operations to train classifiers that can identify suspicious activities on social media.'
    )
    Speakers.objects.create(
        name='Ali Sharifi Zarchi',
        picture='human_pictures/ali_sharifi_h1nWSwX.jpg',
        degree='Assistant Professor',
        place='Sharif University of Technology, Royan Institute',
        bio='Ali Sharifi-Zarchi received his Bachelor and Master degrees from the Sharif University of Technology in Computer Engineering, and his Ph.D. degree in bioinformatics form the Institute of Biochemistry and Biophysics in the University of Tehran under the supervision of Dr. Mehdi Sadeghi and Dr. Hamid Pezeshk. Now he is doing bioinformatics research at Royan Institute and is an assistant prof. of bioinformatics at the department of computer engineering at the Sharif University of Technology.'
    )
    Speakers.objects.create(
        name='Reza Mohammadi',
        picture='human_pictures/reza.jpeg',
        degree='Co-Founder & Former Executive',
        place='Cafe Bazaar & Divar',
        bio='Reza received his B.Sc. in Computer Science from Sharif University of Technology in 2009. After multiple failed businesses, with his friends they launched Bazaar Android application store, which now serves more than 38 million users. In 2012 they launched Divar, a classified advertisement internet service on which hundreds of thousands of ads are published every day. In 2017, he left the company to study New Media and Digital Culture at the University of Amsterdam. Now, he is a Product Owner in an Amsterdam-based company called Machine2Learn.'
    )
    Speakers.objects.create(
        name='Sina Dehghani',
        picture='human_pictures/image6.jpg',
        degree='Postdoc',
        place='Mathematics department in IPM',
        bio='Sina Dehghani is currently a postdoc at Mathematics department in IPM. He received his PhD in computer science from University of Maryland. He works on the boundary of computer science and economics, and on designing and analysis of algorithms and games.'
    )
    Speakers.objects.create(
        name='Zahra Nazari',
        picture='human_pictures/zahra_nazari.png',
        degree='Research Scientist',
        place='Spotify',
        bio='Zahra Nazari is a Research Scientist at Spotify, New York. She has a Ph.D. in computer science from the University of Southern California. Her research interests include understanding and modeling human behavior in complex situations, in particular as applied to search and recommendation systems. Zahra has received her B.Sc. degree in Computer Science from the Amirkabir University of Technology and her M.Sc. degree from the University of Louisiana.'
    )
    Speakers.objects.create(
        name='Amir Najafi',
        picture='human_pictures/amir_najafi.jpg',
        degree='Ph.D. student',
        place='Sharif University of Technology',
        bio='Amir Najafi received his B.Sc. and M.Sc. degrees in Electrical Engineering from Sharif University of Technology, Tehran, Iran, in 2012 and 2015, respectively. He is currently a Ph.D. student at Computer Engineering Dept. of Sharif University of Technology. He was with the Broad Institute of MIT and Harvard, Boston, MA, in 2016 as a visiting research scholar, and interned at Preferred Networks Inc., Tokyo, Japan, in 2018. His research interests include machine learning theory, information theory and bioinformatics.'
    )
    Speakers.objects.create(
        name='Mahdi Safarnejad',
        picture='human_pictures/safarnejad.JPG',
        degree='PhD',
        place='Sharif University of Technology',
        bio='Mahdi Safarnejad Boroujeni is a Ph.D. student at the Sharif University of Technology. He is supervised by Dr. Mohammad Ghodsi. His Research involves approximation algorithms for edit distance and similar problems. He also received his Bachelor and Master degrees from the Sharif University of Technology in Computer Engineering.'
    )
    Speakers.objects.create(
        name='Mohammad Salehe',
        picture='human_pictures/Mohammad_Saleheh.jpg',
        degree='Ph.D. student',
        place='University of Toronto',
        bio='Mohammad Salehe is a Ph.D. student at Department of Computer Science, University of Toronto. He has received his bachelor and master degrees in Computer Engineering from Sharif University of technology. His research interests include Distributed Systems, Cloud Computing and Software Systems.'
    )
    Speakers.objects.create(
        name='Arash Pourdamghani',
        picture='human_pictures/Arash-ACM.jpg',
        degree='PhD student',
        place='New York University',
        bio='Arash Pourdamghani is a Ph.D. student at the New York University. His research involves Algorithmic Game Theory and other algorithmic problems. He also received his Bachelor  degree from the Sharif University of Technology in Computer Engineering.'
    )
    Speakers.objects.create(
        name='Meisam Razaviyayn',
        picture='human_pictures/meysam.jpg',
        degree='Assistant Professor',
        place='University of Southern California',
        bio='Meisam Razaviyayn is an assistant professor of Industrial and Systems Engineering and Computer Science at the University of Southern California. Prior to joining USC, he was a postdoctoral research fellow in the Department of Electrical Engineering at Stanford University. He received his PhD in Electrical Engineering with minor in Computer Science at the University of Minnesota under the supervision of Professor Tom Luo. He obtained his MS degree in Mathematics under the supervision of Professor Gennady Lyubeznik. Meisam Razaviyayn is the recipient of IEEE Data Science Workshop Best Paper Award in 2019, the Signal Processing Society Young Author Best Paper Award in 2014, and the finalist for Best Paper Prize for Young Researcher in Continuous Optimization in 2013 and 2016. His research interests include the design and analysis of large scale optimization algorithms arise in modern data science era.'
    )
    Speakers.objects.create(
        name='amirreza ahmadnejad',
        degree='Bsc',
        place='University of Esfahan',
        bio='TDB'
    )
    Speakers.objects.create(
        name='Hossein Hasani',
        degree='Ph.D',
        place='Sharif University of Technology',
        bio='.'
    )
    Speakers.objects.create(
        name='Aryan Yazdanpanah',
        degree='M.Sc',
        place='University of Tehran',
        bio='.'
    )
    Speakers.objects.create(
        name='Soroush Ebadian',
        degree='B.Sc',
        place='Sharif University of Technology',
        bio='.'
    )
    Speakers.objects.create(
        name='Elaheh Sobhani',
        degree='Ph.D',
        place='PhD student at electrical engineering department of Sharif university of Technology',
        bio='.'
    )
    Speakers.objects.create(
        name='Naeimeh Omidvar',
        degree='Postdoctoral',
        place='Sharif University of Technology',
        bio='.'
    )
    Speakers.objects.create(
        name='Amirreza Ahmadnejad-Ahmad Mahmoodian',
        degree='B.Sc, University of Esfahan',
        place='B.Sc, University of Esfahan',
        bio='.'
    )
    Speakers.objects.create(
        name='Alireza Rezvanian',
        degree='Teacher Assistant',
        place='University of Knowledge and Culture',
        bio='.'
    )
    Speakers.objects.create(
        name='Fatemeh Ghorbani',
        degree='B.Sc',
        place='Azzahra Univer.sity',
        bio='.'
    )
    Speakers.objects.create(
        name='Mostafa Khalili',
        degree='M.Sc',
        place='Kharazmi University',
        bio='.'
    )
    Speakers.objects.create(
        name='Hamid Hoorfar',
        degree='Ph.D',
        place='Amirkabir University of Technology (Tehran Polytechnic)',
        bio='.'
    )
    Speakers.objects.create(
        name='Mohammad Harooni',
        degree='M.Sc',
        place='-',
        bio='.'
    )
    Speakers.objects.create(
        name='Hesam Hafezossehe',
        degree='M.Sc',
        place='Iran University of Science and Technology',
        bio='.'
    )
    Speakers.objects.create(
        name='Mohammad Heidari',
        degree='M.Sc',
        place='tarbiat modares University of Tehran',
        bio='.'
    )
    Speakers.objects.create(
        name='Alireza Rezaei',
        picture='human_pictures/image2.jpg',
        degree='PhD candidate',
        place='University of Washington',
        bio='I am a PhD candidate in the Allen School of Computer Science and Engineering at the University of Washington, where I am very fortunate to be advised by Shayan Oveis Gharan. My primary research interests are determinantal point processes and their applications in machine learning and spectral graph theory. Prior to joining the University of Washington, I earned my BS degrees in Mathematics and Computer Engineering at Sharif University of Technology.'
    )
    Speakers.objects.create(
        name='Mohammad Heydari',
        picture='media/2020/speakers/Mohammad-Heydari.jpg',
        degree='Msc degree student',
        place='Tarbiat Modares University',
        bio='Mohammad Heydari is a Msc degree student in the School of Industrial and Systems Engineering at Tarbiat Modares University. His primary research interests are Big Data Analytics Techniques and their Application in Large Scale Social Networks. Previously He was a Msc degree student in Information Technology Engineering at Shahid Beheshti University, finished his Bsc degree in Software Engineering at Technical and Vocational University of Tehran and got his official diploma in Computer Software.'
    )
    Speakers.objects.create(
        name='Masoud Zamani',
        picture='human_pictures/2019-12-26_17.46.18.jpg',
        degree='head of High-tech Lab',
        place='Fanap Co',
        bio='Masoud Zamani is an AmirKabir MSc. Graduate and a futurist. He continuously researches and works on futures study field, especially on technological singularity. In this regard, he contributes to recognition of this concept by publishing on Journals, Newspapers, his website and also podcasts. Moreover, Masoud studied and researched on the future ethical and legal sides of technology as well. He has done divers projects in high-tech that varied from convergence of biotech, nanotech and cognitive science to blockchain and AI. He is currently head of High-tech Lab in Fanap Co.'
    )
    Speakers.objects.create(
        name='Mohammad Khalooei',
        picture='human_pictures/fullsizeoutput_1.jpeg',
        degree='PhD student',
        place='Amir Kabir University of technology',
        bio='Mohammad Khalooei is a Ph.D candidate at Amirkabir University of Technology (Tehran Polytechnic) in the department of computer engineering. He works at the Laboratory of Intelligence and Multimedia Processing of AUT. He is interested in artificial intelligence fields and working on vulnerability of deep neural network, adversarial machine learning and unsupervised learning in theoretical and also deployment phases. He also has some experiences in counseling on using deep neural networks for real data processing and joint international project.'
    )
    Speakers.objects.create(
        name='Neda Soltani',
        picture='human_pictures/wokshop1.jpg',
        degree='Ph.D. candidate',
        place='Amirkabir University of Technology',
        bio='Neda Soltani is a Ph.D. candidate at Amirkabir University of Technology, currently working on Quality of Experience in a Pervasive Computing Environment. She is interested in Data Science, which led her to SNA and has done research in this area.'
    )


def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.filter(name__in=['Behzad Moshiri', 'Omid Etesami', 'Amin Babadi', 'Simin Oraee', 'Afra Abnar', 'Mohammad Mahdian', 'Morteza Saberi', 'Shahriar Ebrahimi', 'Mohammad Mahmoody', 'Mozhgan Mirzaei', 'Salman Abolfath Beygi', 'Moslem Noori', 'Mohammad Hossein Noranian', 'Krishna Gummadi', 'Ehsan Emamjomeh-Zadeh', 'Hamed Saleh', 'Meysam Alizadeh', 'Ali Sharifi Zarchi', 'Reza Mohammadi', 'Sina Dehghani', 'Zahra Nazari', 'Amir Najafi', 'Mahdi Safarnejad', 'Mohammad Salehe', 'Arash Pourdamghani', 'Meisam Razaviyayn', 'amirreza ahmadnejad', 'Hossein Hasani', 'Aryan Yazdanpanah', 'Soroush Ebadian', 'Elaheh Sobhani', 'Naeimeh Omidvar', 'Amirreza Ahmadnejad-Ahmad Mahmoodian', 'Alireza Rezvanian', 'Fatemeh Ghorbani', 'Mostafa Khalili', 'Hamid Hoorfar', 'Mohammad Harooni', 'Hesam Hafezossehe', 'Mohammad Heidari', 'Alireza Rezaei', 'Mohammad Heydari', 'Masoud Zamani', 'Mohammad Khalooei', 'Neda Soltani']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0031_add_kianoosh_to_staff'),
        ('WSS', '0017_add_WSS_2019'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
