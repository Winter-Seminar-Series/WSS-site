from django.utils.translation import ugettext_lazy as _
from jet.dashboard import modules
from jet.dashboard.dashboard import Dashboard


class IndexDashboard(Dashboard):
    columns = 2

    def init_with_context(self, context):
        self.available_children.append(modules.LinkList)
        self.children.append(modules.LinkList(
            'About Creators of this Website',
            children=[
                {
                    'title': 'Kianoosh Abbasi',
                    'url': 'http://ce.sharif.edu/~kabbasi',
                    'external': True,
                },
                {
                    'title': 'Arya Kowsary',
                    'url': 'http://ce.sharif.edu/~akowsary',
                    'external': True,
                },
                {
                    'title': 'Amirreza Mozayyeni',
                    'url': 'http://ce.sharif.edu/~amozayani',
                    'external': True,
                },
            ],
            column=0,
            order=0
        ))
        self.children.append(modules.LinkList(
            'Useful Links',
            children=[
                {
                    'title': 'Tank Trouble',
                    'url': 'http://www.tanktrouble.com/',
                    'external': True,
                },
                {
                    'title': 'SSC Website',
                    'url': 'http://ssc.ce.sharif.edu/',
                    'external': True,
                },
                {
                    'title': 'Webelopers Website',
                    'url': 'http://webelopers.ce.sharif.edu',
                    'external': True,
                },
                {
                    'title': 'Codeforces',
                    'url': 'http://codeforces.com',
                    'external': True,
                },
            ],
            column=1,
            order=0
        ))
