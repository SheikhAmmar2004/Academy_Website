from django import forms
from .models import TrialFormSubmission, EnrollmentFormSubmission, Feedback

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


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['name', 'age', 'role', 'feedback_message', 'picture', 'country']
        widgets = {
            'feedback_message': forms.Textarea(attrs={
                'placeholder': 'Please share your experience, suggestions, or any thoughts you have...',
                'rows': 4
            }),
            'country': forms.TextInput(attrs={
                'placeholder': 'Enter your country'
            }),
        }
