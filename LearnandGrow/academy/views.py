from django.shortcuts import render
from .models import Course, Teacher, Review, StudentProject, FAQ, Plan
import requests
from django.core.cache import cache

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
    
    # Get country and plans
    country = get_user_country(request)
    plans = Plan.objects.all().order_by('name', 'classes_per_week')
    
    # Determine if user is in Pakistan
    is_pakistan = country == "Pakistan"
    
    # Dropdown options
    grades = range(1, 13)
    ages = range(6, 19)
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    times = [
        "09:00-10:00", "10:00-11:00", "11:00-12:00",
        "12:00-13:00", "13:00-14:00", "14:00-15:00",
        "15:00-16:00", "16:00-17:00", "17:00-18:00",
        "18:00-19:00"
    ]

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
        'days': days,
        'times': times,
        'faqs': faqs,
        'grades': grades,
        'plans': plans,  # Keep the original plans queryset
        'country': country,
        'is_pakistan': is_pakistan,  # Add this for easy template checking
    }
    return render(request, 'home.html', context)