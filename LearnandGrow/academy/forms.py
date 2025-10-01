from django import forms
from .models import TrialFormSubmission, EnrollmentFormSubmission

class TrialForm(forms.ModelForm):
    class Meta:
        model = TrialFormSubmission
        fields = "__all__"
        exclude = ["submitted_at"]


class EnrollmentForm(forms.ModelForm):
    class Meta:
        model = EnrollmentFormSubmission
        fields = "__all__"
        exclude = ["submitted_at"]
