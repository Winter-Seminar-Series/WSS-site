from random import Random
from itertools import groupby

from django.shortcuts import get_object_or_404
from django.views.generic.detail import DetailView
from django.http import HttpResponse
from django.shortcuts import redirect
from pandas._libs import json
from zeep import Client

from WSS.mixins import FooterMixin, WSSWithYearMixin
from WSS.models import WSS, Exhibitor, Grade, Reservatore


class HomeView(FooterMixin, DetailView):
    template_name = 'WSS/home.html'
    context_object_name = 'wss'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['selected_seminars'] = self.object.non_keynote_seminars.order_by('?')[:8]
        return context

    def get_object(self, queryset=None):
        if 'year' in self.kwargs:
            return get_object_or_404(WSS, year=int(self.kwargs['year']))
        return WSS.objects.first()


class SeminarsListView(FooterMixin, DetailView):
    template_name = 'WSS/seminars_list.html'
    model = WSS
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))


class WorkshopsListView(FooterMixin, DetailView):
    template_name = 'WSS/workshops_list.html'
    model = WSS
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))


class StaffListView(FooterMixin, DetailView):
    template_name = 'WSS/staff_list.html'
    model = WSS
    context_object_name = 'wss'

    def get_object(self, queryset=None):
        return get_object_or_404(WSS, year=int(self.kwargs['year']))


class GalleryImageView(FooterMixin, WSSWithYearMixin, DetailView):
    template_name = 'WSS/gallery_images.html'


class GalleryVideoView(FooterMixin, WSSWithYearMixin, DetailView):
    template_name = 'WSS/gallery_videos.html'


class ScheduleView(FooterMixin, WSSWithYearMixin, DetailView):
    template_name = 'WSS/schedule.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        wss = self.object
        all_events = wss.events.filter(start_time__isnull=False)

        context['pre_wss_events'] = all_events.filter(start_time__date__lt=wss.start_date)
        main_events = all_events.exclude(start_time__date__lt=wss.start_date)

        # Important: I assumed that events with same start_time will have same end_time
        events_by_day = groupby(groupby(main_events, lambda event: event.start_time),
                                lambda group: group[0].date())

        # Surprising bug made me do this! I have know idea why I should reiterate events_by_day!
        context['events_by_day'] = []
        for date, events_by_time in events_by_day:
            print(date)
            _events_by_time = []
            for time, events in events_by_time:
                _events_by_time.append((time, list(events)))  # OMG! casting to list is important!!
            context['events_by_day'].append((date, _events_by_time))
        return context


MERCHANT = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
client = Client('https://www.zarinpal.com/pg/services/WebGate/wsdl')
description = "توضیحات مربوط به تراکنش را در این قسمت وارد کنید"  # Required
EMAIL = 'email@example.com'  # Optional
mobile = '09123456789'  # Optional
CallbackURL = 'http://localhost:8000/verify/'  # Important: need to edit for realy server.


def send_request(request, grade):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content = body['content']
    name = content['name']
    email = content['email']
    family = content['family']
    grade = grade
    level = content['level']
    phone_number = content['phone_number']
    exh = Exhibitor.objects.all().get(email=email)
    if exh is None or exh.payment_status == 'OK':
        return HttpResponse('ثبت نام انجام شده است')
    gr = Grade.objects.all().get(grade=grade)
    price = gr.price
    cap = gr.capacity
    if cap <= 0:
        # todo redirect to RESERVE
        pass
    
    payment_id = Random().randint(0, 100000000000)
    exh = Exhibitor(name=name, email=email, family=family, grade=grade, level=level, phone_number=phone_number, 
                    payment_id=payment_id)
    exh.save()
    result = client.service.PaymentRequest(MERCHANT, price, description, EMAIL, mobile,
                                           CallbackURL + '?paymentid=' + payment_id)
    if result.Status == 100:
        return redirect('https://www.zarinpal.com/pg/StartPay/' + str(result.Authority))
    else:
        return HttpResponse('Error code: ' + str(result.Status))


def verify(request, paymentid):
    exh = Exhibitor.objects.all().get(payment_id=paymentid)
    gr = Grade.objects.all().get(exh.grade)
    gr.capacity -= 1
    gr.save()
    if exh is None:
        return HttpResponse('پرداخت با خطا مواجه شد. با پشتیبانی تماس بگیرید.')
    
    if request.GET.get('Status') == 'OK':
        result = client.service.PaymentVerification(MERCHANT, request.GET['Authority'], gr.price)
        if result.Status == 100:
            exh.payment_status = 'OK'
            return HttpResponse('Transaction success.\nRefID: ' + str(result.RefID))
        elif result.Status == 101:
            return HttpResponse('Transaction submitted : ' + str(result.Status))
        else:
            return HttpResponse('Transaction failed.\nStatus: ' + str(result.Status))
    else:
        return HttpResponse('Transaction failed or canceled by user')


def reserve(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    content = body['content']
    name = content['name']
    family = content['family']
    email = content['email']
    Reservatore(name=name, email=email, family=family).save()
    return HttpResponse('درصورت وجود ظرفیت مازاد به شما اطلاع رسانی خواهیم کرد.')
