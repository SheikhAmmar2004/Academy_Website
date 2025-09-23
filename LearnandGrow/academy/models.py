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