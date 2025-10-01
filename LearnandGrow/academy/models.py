from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify


class CourseCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    tagline = models.CharField(max_length=255, blank=True, help_text="Short tagline for the course")
    description = models.TextField()

    duration = models.CharField(max_length=50, help_text="e.g., '60 min / class' or '3 months'")
    enrollments = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='courses/')
    featured = models.BooleanField(default=False)

    category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True, blank=True)
    age_range = models.CharField(max_length=20, help_text="e.g., 'Ages 10–15'", blank=True)
    rating = models.FloatField(validators=[MinValueValidator(1.0), MaxValueValidator(5.0)], default=4.0)

    # CSV-style text fields (simple, quick)
    learnings = models.TextField(blank=True, help_text="Comma-separated list of learning outcomes")
    requirements = models.TextField(blank=True, help_text="Comma-separated list of requirements")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    # helpers to return lists (strip whitespace)
    def get_learnings_list(self):
        return [item.strip() for item in (self.learnings or "").split(",") if item.strip()]

    def get_requirements_list(self):
        return [item.strip() for item in (self.requirements or "").split(",") if item.strip()]

    def stars(self):
        return range(self.rating)


class Project(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    url = models.URLField(blank=True, help_text="Link to view the project")
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.course.title} - {self.name}"


class Teacher(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=200)
    bio = models.TextField()
    mission = models.TextField(blank=True, help_text="Mission statement (for CEO only)")
    title = models.CharField(max_length=200, blank=True, help_text="Professional title (e.g., 'Founder & CEO')")
    is_ceo = models.BooleanField(default=False, help_text="Mark as CEO/Founder")
    image = models.ImageField(upload_to='teachers/')
    tag = models.CharField(max_length=100, blank=True)
    instagram = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Review(models.Model):
    author = models.CharField(max_length=100)
    age = models.PositiveIntegerField(blank=True, null=True)
    role = models.CharField(max_length=100, blank=True)
    text = models.TextField()
    image = models.ImageField(upload_to='reviews/', blank=True, null=True)
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=5
    )
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.author}"

    def stars(self):
        return range(self.rating)

# models.py (append this near other models)
class StudentProject(models.Model):
    CATEGORY_CHOICES = [
        ('games', 'Games'),
        ('websites', 'Websites'),
        ('apps', 'Apps'),
        ('animations', 'Animations'),
        ('other', 'Other'),
    ]

    course = models.ForeignKey(Course, on_delete=models.SET_NULL, related_name='student_projects', null=True, blank=True)
    title = models.CharField(max_length=200)
    student_name = models.CharField(max_length=100, blank=True)
    student_age = models.PositiveIntegerField(blank=True, null=True)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES, default='games')
    description = models.TextField(blank=True)
    tools_used = models.CharField(max_length=255, blank=True, help_text="Comma-separated tools e.g. Scratch, Python")
    image = models.ImageField(upload_to='student_projects/', blank=True, null=True)
    demo_url = models.URLField(blank=True, help_text="Optional demo or video link")
    approved = models.BooleanField(default=False, help_text="Only approved projects show on public site")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} — {self.student_name or 'Student'}"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0, help_text="Controls display order")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question


class Plan(models.Model):
    PLAN_TYPES = [
        ('premier', 'Premier'),
        ('prime', 'Prime'),
    ]
    
    name = models.CharField(max_length=50, choices=PLAN_TYPES)
    classes_per_week = models.IntegerField()
    price_pkr = models.IntegerField()
    price_usd = models.IntegerField()

    def __str__(self):
        return f"{self.get_name_display()} - {self.classes_per_week} classes/week"


class Day(models.Model):
    name = models.CharField(max_length=20, unique=True)
    available_for_trial = models.BooleanField(default=True)
    available_for_enrollment = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return self.name

class TimeSlot(models.Model):
    TIME_SLOT_TYPE_CHOICES = [
        ('trial', 'Free Trial'),
        ('enrollment', 'Full Enrollment'),
        ('both', 'Both'),
    ]
    
    time_range = models.CharField(max_length=20)  # e.g., "09:00-10:00"
    slot_type = models.CharField(max_length=20, choices=TIME_SLOT_TYPE_CHOICES, default='both')
    available = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        unique_together = ['time_range', 'slot_type']
    
    def __str__(self):
        return f"{self.time_range} ({self.get_slot_type_display()})"


class TrialFormSubmission(models.Model):
    student_name = models.CharField(max_length=100)
    student_age = models.PositiveIntegerField()
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    preferred_day = models.CharField(max_length=20)
    preferred_time = models.CharField(max_length=50)
    country = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=150)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Trial: {self.student_name} ({self.course})"


class EnrollmentFormSubmission(models.Model):
    student_name = models.CharField(max_length=100)
    grade = models.CharField(max_length=50)
    student_photo = models.ImageField(upload_to="student_photos/", blank=True, null=True)

    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    plan = models.CharField(max_length=20, choices=[("prime", "Prime"), ("premier", "Premier")])
    classes_per_week = models.PositiveSmallIntegerField()
    class_duration = models.CharField(max_length=50, blank=True, null=True)
    calculated_fee = models.CharField(max_length=50, blank=True, null=True)

    preferred_days = models.TextField(help_text="Comma-separated preferred days")
    preferred_time_slot = models.CharField(max_length=50)

    parent_name = models.CharField(max_length=100)
    parent_contact = models.CharField(max_length=50)
    parent_email = models.EmailField()

    payment_method = models.CharField(max_length=20, choices=[
        ("JazzCash", "JazzCash"),
        ("NayaPay", "NayaPay"),
        ("Payoneer", "Payoneer"),
    ])
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    payment_screenshot = models.ImageField(upload_to="payment_screenshots/", blank=True, null=True)

    special_notes = models.TextField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Enrollment: {self.student_name} ({self.course})"
