from django.conf.urls import include, url,patterns
from .views import *

urlpatterns = [
    url(r'^$',Index),
]