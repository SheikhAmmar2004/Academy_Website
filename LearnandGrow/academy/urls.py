from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path("submit-trial/", views.submit_trial, name="submit_trial"),
    path("submit-enrollment/", views.submit_enrollment, name="submit_enrollment"),
    path("submit-feedback/", views.submit_feedback, name="submit_feedback"),

]
