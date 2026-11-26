import re
import unicodedata

from django.db import migrations

# The options of the profile form's university select (frontend/lib/profile-options.ts), each with the spellings
# that mean it: the select's own aliases, then short forms and misspellings found in the stored profiles.
UNIVERSITIES = {
    'Sharif University of Technology': (
        'SUT', 'Sharif', 'دانشگاه صنعتی شریف', 'شریف', 'sahrif university of technology', 'Sharif University of Tehran',
        'Sharif UT', 'Sharif U', 'sharif2', 'sharfi', 'sahrif', 'Sharing University of Technology',
        'Sharif Kish International Campus', 'SUTIC', 'Sharif University of Technology Kish international campus',
        'Sharif University of Tech. International Campus',
    ),
    'University of Tehran': ('UT', 'Tehran University', 'دانشگاه تهران', 'University of Tehran, College of Farabi'),
    'Amirkabir University of Technology': (
        'AUT', 'Amirkabir', 'Amir Kabir', 'Tehran Polytechnic', 'دانشگاه صنعتی امیرکبیر', 'امیرکبیر', 'پلی تکنیک تهران',
        'AmirKabir University Of Thechnology', 'AmirKabir UT', 'Amikabir', 'Amirkabir University of Tehran',
    ),
    'Iran University of Science and Technology': (
        'IUST', 'Iran University of Science & Technology', 'دانشگاه علم و صنعت ایران', 'علم و صنعت',
        'Iran University of Science and Tecnology', 'Iran Uinversity of Science and Technology',
        'Iran University f Science and Technology', 'Iran University of Sceince and Technology',
        'Iran University of Sience an Technology', 'Iran University of Sience and Technology',
        'Iran University of Science &Twchnology', 'University of Science and Technology of Iran',
    ),
    'Shahid Beheshti University': (
        'SBU', 'دانشگاه شهید بهشتی', 'شهید بهشتی', 'Shaheed Beheshti', 'Shahid behshti', 'Beheshti', 'Shahid beheshty',
        'shahid behesti', 'Shaid beheshti', 'Sbu university of iran',
    ),
    'Islamic Azad University': (
        'IAU', 'Azad University', 'دانشگاه آزاد اسلامی', 'دانشگاه آزاد', 'Islamic Azar university', 'Azard',
    ),
    'University of Isfahan': (
        'UI', 'Isfahan University', 'Esfahan University', 'دانشگاه اصفهان', 'isfahan university of insfahan',
        'University of Isfahan, Faculty of Mathematics and Computer Science, Khansar', 'Isfeham',
        'Isfahan University of Isfahan',
    ),
    'Isfahan University of Technology': (
        'IUT', 'Esfahan University of Technology', 'دانشگاه صنعتی اصفهان', 'صنعتی اصفهان',
    ),
    'K. N. Toosi University of Technology': (
        'KNTU', 'Khajeh Nasir', 'Khaje Nasir', 'Khajeh Nasir Toosi University of Technology',
        'دانشگاه صنعتی خواجه نصیرالدین طوسی', 'خواجه نصیر', 'خواجه نصیرالدین توسی',
        'Khaje Nasir Toosi University of Technology', 'KNTU ir', 'kntu - khaje nasir', 'K. N. Toosi', 'KN Toosi',
        'K.N.T', 'KNT', 'Khaje Nasir Toosi', 'khawje nasir toosi', 'khaje nasiredin e toosi', 'Khaje nasir - kntu',
        'KNTU of Technology', 'Khaje Nasir University of Technology', 'خواجه نصیرالدین طوسی', 'Khajeh Nasir Toosi',
    ),
    'Yazd University': ('دانشگاه یزد', 'Yzad university', 'uyazd'),
    'Kharazmi University': (
        'KHU', 'Khwarazmi University', 'Tarbiat Moallem University of Tehran', 'دانشگاه خوارزمی', 'خوارزمی', 'Khurazmi',
        'Kharazmy',
    ),
    'University of Tabriz': ('Tabriz University', 'دانشگاه تبریز'),
    'Allameh Tabataba’i University': (
        'ATU', 'Allameh Tabatabai University', 'Allameh Tabatabaei University', 'دانشگاه علامه طباطبایی',
        'علامه طباطبائی', 'Allameh Tabatabaii', 'Allameh', 'Alameh tabatabaie', 'Allameh Tabatabaee',
    ),
    'Alzahra University': ('Al Zahra University', 'دانشگاه الزهرا', 'الزهرا', 'Alzahra Tehran', 'Alzhahra'),
    'Arak University': ('University of Arak', 'دانشگاه اراک'),
    'Arak University of Technology': ('Arak Industrial University', 'دانشگاه صنعتی اراک'),
    'Ardakan University': ('University of Ardakan', 'دانشگاه اردکان'),
    'Art University of Isfahan': ('Isfahan Art University', 'دانشگاه هنر اصفهان'),
    'Azarbaijan Shahid Madani University': (
        'Azerbaijan Shahid Madani University', 'دانشگاه شهید مدنی آذربایجان', 'شهید مدنی آذربایجان', 'Shahid Madani',
        'Shahid madani of tabriz', 'شهید مدنی آذربایجام', 'Madani Azerbaijan University',
    ),
    'Babol Noshirvani University of Technology': (
        'NIT', 'BNUT', 'Noshirvani Institute of Technology', 'Babol University of Technology',
        'دانشگاه صنعتی نوشیروانی بابل', 'نوشیروانی', 'Nushirvano Babol', 'nooshirvani university',
    ),
    'Bu-Ali Sina University': (
        'BASU', 'Bu Ali Sina University', 'Buali Sina University', 'دانشگاه بوعلی سینا', 'بوعلی سینا', 'بو علی سینا',
    ),
    'Damghan University': ('University of Damghan', 'دانشگاه دامغان'),
    'Ferdowsi University of Mashhad': (
        'FUM', 'Ferdowsi', 'Ferdousi University of Mashhad', 'دانشگاه فردوسی مشهد', 'فردوسی مشهد',
    ),
    'Golestan University': ('University of Golestan', 'دانشگاه گلستان'),
    'Gonbad Kavous University': (
        'Gonbad Kavus University', 'Gonbad-e Kavus University', 'دانشگاه گنبد کاووس', 'گنبدکاووس',
    ),
    'Gorgan University of Agricultural Sciences and Natural Resources': (
        'GUASNR', 'Gorgan Agricultural University', 'دانشگاه علوم کشاورزی و منابع طبیعی گرگان',
    ),
    'Graduate University of Advanced Technology': (
        'GUAT', 'KGUT', 'Kerman Graduate University of Technology', 'دانشگاه تحصیلات تکمیلی صنعتی و فناوری پیشرفته',
        'تحصیلات تکمیلی کرمان', 'Kerman Graduate University of Advanced Technology',
    ),
    'Hakim Sabzevari University': ('HSU', 'Hakim Sabzevar University', 'دانشگاه حکیم سبزواری', 'حکیم سبزواری'),
    'Hamadan University of Technology': ('Hamedan University of Technology', 'دانشگاه صنعتی همدان'),
    'Hormozgan University': ('University of Hormozgan', 'دانشگاه هرمزگان'),
    'Ilam University': ('University of Ilam', 'دانشگاه ایلام'),
    'Imam Khomeini International University': (
        'IKIU', 'دانشگاه بین المللی امام خمینی', 'بین\u200cالمللی امام خمینی قزوین',
        'Qazvin International University of Imam Khomeini', 'Imam Khomeini University of Qazvin',
        'Imam Khomeini Qazvin', 'Imam Khomeini International University of Qazvin', 'ikiu gha',
    ),
    'Imam Reza International University': (
        'Imam Reza University', 'دانشگاه بین المللی امام رضا', 'بین\u200cالمللی امام رضا مشهد',
    ),
    'Institute for Advanced Studies in Basic Sciences': (
        'IASBS', 'Zanjan Graduate University of Basic Sciences', 'دانشگاه تحصیلات تکمیلی علوم پایه زنجان',
        'تحصیلات تکمیلی علوم پایه زنجان', 'Institute for Advanced Studies in Basic Siences',
    ),
    'Isfahan University of Medical Sciences': (
        'MUI', 'IUMS', 'Esfahan University of Medical Sciences', 'دانشگاه علوم پزشکی اصفهان', 'علوم پزشکی اصفهان',
        'Medical University of Isfahan',
    ),
    'Jahrom University': ('University of Jahrom', 'دانشگاه جهرم'),
    'Lorestan University': ('Luristan University', 'University of Lorestan', 'دانشگاه لرستان'),
    'Malek Ashtar University of Technology': (
        'MUT', 'Malek-Ashtar University', 'دانشگاه صنعتی مالک اشتر', 'مالک اشتر', 'مالک اشتر تهران',
    ),
    'Payame Noor University': (
        'PNU', 'Payam Noor University', 'Payam-e Noor University', 'دانشگاه پیام نور', 'پیام نور', 'پیام\u200cنور',
        'Peyam noor', 'پیام نور مرکز کرج', 'payame nour', 'Piam noor university', 'Payame Noor Zanjan',
    ),
    'Persian Gulf University': ('PGU', 'دانشگاه خلیج فارس', 'خلیج فارس'),
    'Qom University of Technology': ('QUT', 'دانشگاه صنعتی قم'),
    'Razi University': ('University of Razi', 'دانشگاه رازی', 'رازی کرمانشاه'),
    'Sadjad University of Technology': (
        'Sajjad University of Technology', 'Sadjad Institute of Higher Education', 'دانشگاه صنعتی سجاد', 'سجاد مشهد',
        'Sadjad University', 'دانشگاه سجاد',
    ),
    'Sahand University of Technology': ('دانشگاه صنعتی سهند', 'صنعتی سهند', 'Sahand'),
    'Semnan University': ('University of Semnan', 'دانشگاه سمنان'),
    'Shahid Bahonar University of Kerman': (
        'SBUK', 'Bahonar University', 'دانشگاه شهید باهنر کرمان', 'باهنر کرمان', 'Shahid Bahonar', 'Bahonar kerman',
        'Bahounar University',
    ),
    'Shahid Chamran University of Ahvaz': (
        'SCU', 'Ahwaz Shahid Chamran University', 'دانشگاه شهید چمران اهواز', 'چمران اهواز', 'Shahid Chamran',
        'Chamran university of ahvaz',
    ),
    'Shahid Rajaee Teacher Training University': (
        'SRTTU', 'Shahid Rajai University', 'دانشگاه تربیت دبیر شهید رجایی', 'تربیت دبیر شهید رجایی', 'رجایی',
        'Shahid Rajaee', 'Shahid Rajaei', 'Shahid rajaee tehran',
    ),
    'Shahrekord University': ('Shahr-e Kord University', 'دانشگاه شهرکرد'),
    'Shahrood University of Technology': (
        'Shahrud University of Technology', 'دانشگاه صنعتی شاهرود', 'صنعتی شاهرود', 'Shahroud university of technology',
    ),
    'Shiraz University': ('University of Shiraz', 'دانشگاه شیراز'),
    'Shiraz University of Technology': ('Shiraz Industrial University', 'دانشگاه صنعتی شیراز', 'صنعتی شیراز'),
    'Tabriz University of Medical Sciences': (
        'TBZMED', 'دانشگاه علوم پزشکی تبریز', 'علوم پزشکی تبریز', 'medical science university of tabriz',
    ),
    'Tarbiat Modares University': (
        'TMU', 'Tarbiat Modarres University', 'دانشگاه تربیت مدرس', 'تربیت مدرس', 'Tarbiat Moadares',
    ),
    'Tehran University of Medical Sciences': (
        'TUMS', 'دانشگاه علوم پزشکی تهران', 'علوم پزشکی تهران', 'Tehran University of medical science',
        'Tehran university of medical sceinces',
    ),
    'University of Birjand': ('Birjand University', 'دانشگاه بیرجند'),
    'University of Bojnord': ('Bojnourd University', 'Bojnurd University', 'دانشگاه بجنورد'),
    'University of Bonab': ('Bonab University', 'دانشگاه بناب'),
    'University of Guilan': ('Guilan University', 'Gilan University', 'University of Gilan', 'دانشگاه گیلان'),
    'University of Kashan': ('Kashan University', 'دانشگاه کاشان'),
    'University of Kurdistan': ('Kurdistan University', 'دانشگاه کردستان'),
    'University of Mazandaran': (
        'UMZ', 'Mazandaran University', 'دانشگاه مازندران', 'UMZ University of Babolsar', 'Mazandran',
    ),
    'University of Mohaghegh Ardabili': (
        'UMA', 'Mohaghegh Ardabili University', 'Mohaghegh Ardebili University', 'دانشگاه محقق اردبیلی', 'محقق اردبیلی',
        'Mohaghegh ardebil', 'mohagegh ardabili',
    ),
    'University of Qom': ('Qom University', 'دانشگاه قم'),
    'University of Science and Culture': (
        'USC', 'Science and Culture University', 'دانشگاه علم و فرهنگ', 'علم و فرهنگ',
    ),
    'University of Sistan and Baluchestan': ('USB', 'Sistan and Baluchistan University', 'دانشگاه سیستان و بلوچستان'),
    'University of Social Welfare and Rehabilitation Sciences': (
        'USWR', 'University of Rehabilitation Sciences and Social Health', 'دانشگاه علوم بهزیستی و توانبخشی',
        'دانشگاه علوم توانبخشی و سلامت اجتماعی',
    ),
    'University of Zabol': ('Zabol University', 'دانشگاه زابل'),
    'University of Zanjan': ('Zanjan University', 'دانشگاه زنجان'),
    'Urmia University': ('University of Urmia', 'Urumieh University', 'Orumiyeh University', 'دانشگاه ارومیه'),
    'Urmia University of Technology': ('UUT', 'Urumieh University of Technology', 'دانشگاه صنعتی ارومیه'),
    'Vali-e-Asr University of Rafsanjan': (
        'Vali Asr University of Rafsanjan', 'Valiasr University', 'دانشگاه ولی عصر رفسنجان', 'ولی\u200cعصر رفسنجان',
    ),
    'Other': ('Others', 'Not listed', 'سایر', 'دیگر'),
}

AZAD = 'Islamic Azad University'

# Words that don't tell universities apart. Any word starting with "univ" counts too, which covers its
# misspellings ("univercity", "universty").
FILLER = {'uni', 'of', 'the', 'دانشگاه'}
TECHNOLOGY = {'tech', 'tehc', 'techy', 'technolog', 'technolot', 'techmology', 'tachnology'}
LETTERS = str.maketrans({
    'ي': 'ی', 'ى': 'ی', 'ك': 'ک', 'ة': 'ه', 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', '‌': ' ', '&': ' and ',
    '’': '', "'": '', '‘': '', '`': '',
})


def _key(value, drop_parentheses):
    """What is left of a name once case, punctuation, spacing, Arabic or Persian letters and filler words are
    ignored: "Sharif university  of technology" and "SHARIF University of Technology" share a key."""
    value = unicodedata.normalize('NFKC', value).casefold().translate(LETTERS)
    if drop_parentheses:
        value = re.sub(r'\([^)]*\)?', ' ', value)
    words = []
    for word in re.split(r'[\W_]+', value):
        if not word or word in FILLER or word.startswith('univ'):
            continue
        words.append('technology' if word in TECHNOLOGY else word)
    return ''.join(words)


def _names_by_key():
    names = {}
    for name, aliases in UNIVERSITIES.items():
        for spelling in (name, *aliases):
            key = _key(spelling, drop_parentheses=False)
            if names.setdefault(key, name) != name:
                raise ValueError(f'{spelling!r} could mean {names[key]!r} or {name!r}')
    return names


def canonical(value, names):
    """The select option `value` is a spelling of, or None if it is not one (another university, a typo too far
    from any option, or junk). A note in parentheses, like "(IUST)" or "(Tehran Polytechnic)", is ignored unless
    it names an Islamic Azad branch: those have no option of their own and keep what was typed."""
    name = names.get(_key(value, drop_parentheses=False))
    if name:
        return name
    name = names.get(_key(value, drop_parentheses=True))
    return name if name != AZAD else None


def normalize_universities(apps, schema_editor):
    ParticipantInfo = apps.get_model('participant', 'ParticipantInfo')
    names = _names_by_key()
    values = ParticipantInfo.objects.exclude(university='').values_list('university', flat=True).distinct()
    for value in list(values):
        name = canonical(value, names)
        if name and name != value:
            ParticipantInfo.objects.filter(university=value).update(university=name)


class Migration(migrations.Migration):
    """Data fix. Profiles typed the university freely before the form switched to a select, so one university
    appears under many spellings ("Sharif", "sharif university of technology", "دانشگاه صنعتی شریف"). Rewrite
    each spelling to its select option, in profiles and in the snapshots registrations keep, so the profile form
    shows the option and the Grafana university chart counts one bar per university. Values that match no option
    stay as typed. One-way: the original spellings are not kept."""

    dependencies = [
        ('participant', '0007_cv'),
    ]

    operations = [migrations.RunPython(normalize_universities, migrations.RunPython.noop)]
