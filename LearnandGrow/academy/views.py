from django.shortcuts import render
from django.db import models
from .models import Course, Teacher, Review, StudentProject, FAQ, Plan, Day, TimeSlot, Feedback
import requests
from django.core.cache import cache
from .forms import TrialForm, EnrollmentForm, FeedbackForm
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings


def get_user_country(request):
    """
    Get user's country from IP with fallback options
    """
    # Check for manual country selection (for testing)
    manual_country = request.GET.get('country')
    if manual_country:
        return manual_country
    
    ip = request.META.get('REMOTE_ADDR')
    
    # If localhost or private IP, default to Pakistan
    if ip in ['127.0.0.1', 'localhost'] or (ip and (ip.startswith('192.168.') or ip.startswith('10.'))):
        return "Pakistan"
    
    try:
        response = requests.get(f"https://ipapi.co/{ip}/json/", timeout=3)
        if response.status_code == 200:
            data = response.json()
            return data.get("country_name", "Pakistan")
    except:
        pass
    
    return "Pakistan"  # Default fallback

def home(request):
    featured_courses = Course.objects.filter(featured=True).order_by('?')[:6]
    featured_teachers = Teacher.objects.filter(featured=True).order_by('order')[:4]
    ceo = Teacher.objects.filter(is_ceo=True, featured=True).first()
    total_teachers = Teacher.objects.filter(featured=True).count()
    featured_reviews = Review.objects.filter(featured=True).order_by('-created_at')[:6]
    featured_student_projects = StudentProject.objects.filter(approved=True).order_by('order')[:12]
    faqs = FAQ.objects.all()
    feedback_form = FeedbackForm()

    
    # Get country and plans
    country = get_user_country(request)
    plans = Plan.objects.all().order_by('name', 'classes_per_week')
    
    # Determine if user is in Pakistan
    is_pakistan = country == "Pakistan"
    
    # Get days and time slots from database
    trial_days = Day.objects.filter(available_for_trial=True).order_by('order')
    enrollment_days = Day.objects.filter(available_for_enrollment=True).order_by('order')
    
    trial_times = TimeSlot.objects.filter(available=True).filter(
        models.Q(slot_type='trial') | models.Q(slot_type='both')
    ).order_by('order')
    
    enrollment_times = TimeSlot.objects.filter(available=True).filter(
        models.Q(slot_type='enrollment') | models.Q(slot_type='both')
    ).order_by('order')

    # Dropdown options (fallbacks in case database is empty)
    grades = range(1, 13)
    ages = range(6, 19)
    
    # If no days/times in database, use defaults
    if not trial_days.exists():
        trial_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    else:
        trial_days = [day.name for day in trial_days]
    
    if not enrollment_days.exists():
        enrollment_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    else:
        enrollment_days = [day.name for day in enrollment_days]
    
    if not trial_times.exists():
        trial_times = [
            "09:00-10:00", "10:00-11:00", "11:00-12:00",
            "12:00-13:00", "13:00-14:00", "14:00-15:00",
            "15:00-16:00", "16:00-17:00", "17:00-18:00",
            "18:00-19:00"
        ]
    else:
        trial_times = [timeslot.time_range for timeslot in trial_times]
    
    if not enrollment_times.exists():
        enrollment_times = [
            "09:00-10:00", "10:00-11:00", "11:00-12:00",
            "12:00-13:00", "13:00-14:00", "14:00-15:00",
            "15:00-16:00", "16:00-17:00", "17:00-18:00",
            "18:00-19:00"
        ]
    else:
        enrollment_times = [timeslot.time_range for timeslot in enrollment_times]

    # Calculate team statistics
    total_students_taught = sum(course.enrollments for course in Course.objects.all())
    avg_rating = 4.9
    years_experience = 50



    context = {
        'courses': featured_courses,
        'ceo': ceo,
        'total_teachers': total_teachers,
        'total_students_taught': total_students_taught,
        'avg_rating': avg_rating,
        'years_experience': years_experience,
        'reviews': featured_reviews,
        'featured_projects': featured_student_projects,
        'ages': ages,
        'days': trial_days,  # For backward compatibility (used in trial modal)
        'times': trial_times,  # For backward compatibility (used in trial modal)
        'faqs': faqs,
        'grades': grades,
        'plans': plans,
        'country': country,
        'is_pakistan': is_pakistan,
        # New context variables for separate control
        'trial_days': trial_days,
        'trial_times': trial_times,
        'enrollment_days': enrollment_days,
        'enrollment_times': enrollment_times,
        'feedback_form': feedback_form,

    }
    return render(request, 'home.html', context)

def submit_trial(request):
    if request.method == "POST":
        form = TrialForm(request.POST)
        if form.is_valid():
            trial = form.save()

            # 1. Send confirmation to parent
            parent_email = trial.contact_info   # assuming contact_info stores email/phone
            if "@" in parent_email:  # only if it's an email
                send_mail(
                    subject="✅ Free Trial Booked - Learn & Grow Digital",
                    message=f"Dear Parent,\n\nThank you for booking a free trial for {trial.student_name}. "
                            f"Our team will contact you shortly.\n\n- Learn & Grow Digital",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[parent_email],
                    fail_silently=True,
                )

            # 2. Send notification to admin
            send_mail(
                subject="📩 New Trial Form Submission",
                message=f"A new trial form was submitted:\n\n"
                        f"Student: {trial.student_name}\n"
                        f"Age: {trial.student_age}\n"
                        f"Course: {trial.course}\n"
                        f"Day: {trial.preferred_day}\n"
                        f"Time: {trial.preferred_time}\n"
                        f"Contact: {trial.contact_info}\n\n"
                        f"Check admin panel for full details.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )

            return JsonResponse({"success": True})
        return JsonResponse({"success": False, "errors": form.errors})



def submit_enrollment(request):
    if request.method == "POST":
        # Handle multiple preferred_days values
        preferred_days_list = request.POST.getlist('preferred_days')
        
        # Create a copy of POST data to modify
        post_data = request.POST.copy()
        
        # Replace preferred_days with the list
        if 'preferred_days' in post_data:
            # Remove the single value
            del post_data['preferred_days']
            # Add all values from the list
            for day in preferred_days_list:
                post_data.update({'preferred_days': day})
        
        form = EnrollmentForm(post_data, request.FILES)
        if form.is_valid():
            try:
                # Handle preferred_days conversion for JSONField
                enrollment = form.save(commit=False)
                if preferred_days_list:
                    enrollment.preferred_days = preferred_days_list
                enrollment.save()
                # Send confirmation to parent
                send_mail(
                    subject="✅ Enrollment Successful - Learn & Grow Digital",
                    message=f"Dear {enrollment.parent_name},\n\nYour child {enrollment.student_name} "
                            f"has been successfully enrolled in {enrollment.course}.\n\n"
                            f"Our team will contact you soon.\n\n- Learn & Grow Digital",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[enrollment.parent_email],
                    fail_silently=True,
                )

                # Send notification to admin
                send_mail(
                    subject="📩 New Enrollment Submission",
                    message=f"A new enrollment was submitted:\n\n"
                            f"Student: {enrollment.student_name}\n"
                            f"Grade: {enrollment.grade}\n"
                            f"Course: {enrollment.course}\n"
                            f"Plan: {enrollment.plan}\n"
                            f"Parent: {enrollment.parent_name}\n"
                            f"Contact: {enrollment.parent_contact}\n"
                            f"Email: {enrollment.parent_email}\n\n"
                            f"Check admin panel for full details.",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.ADMIN_EMAIL],
                    fail_silently=True,
                )

                
                print(f"Enrollment form saved: {enrollment}")  # Debug print
                return JsonResponse({"success": True})
            except Exception as e:
                print(f"Error saving enrollment form: {e}")  # Debug print
                return JsonResponse({"success": False, "errors": str(e)})
        else:
            print(f"Enrollment form errors: {form.errors}")  # Debug print
            return JsonResponse({"success": False, "errors": form.errors})
    return JsonResponse({"success": False, "errors": "Invalid request method"})

    
def submit_feedback(request):
    if request.method == "POST":
        form = FeedbackForm(request.POST, request.FILES)
        if form.is_valid():
            feedback = form.save()
            
            # Send notification to admin
            send_mail(
                subject="📝 New Feedback Submission",
                message=f"A new feedback was submitted:\n\n"
                        f"Name: {feedback.name}\n"
                        f"Age: {feedback.age}\n"
                        f"Role: {feedback.role}\n"
                        f"Country: {feedback.country}\n"
                        f"Feedback: {feedback.feedback_message}\n\n"
                        f"Check admin panel for full details.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
            
            return JsonResponse({"success": True})
        return JsonResponse({"success": False, "errors": form.errors})
    return JsonResponse({"success": False, "errors": "Invalid request method"})