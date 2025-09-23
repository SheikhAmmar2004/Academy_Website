from django.contrib import admin
from .models import Course, Teacher, Review, Project, StudentProject, FAQ, CourseCategory,Plan



class ProjectInline(admin.TabularInline):
    model = Project
    extra = 1
    fields = ('name', 'image', 'url', 'order')
    ordering = ('order',)


class StudentProjectInline(admin.TabularInline):
    model = StudentProject
    extra = 1
    fields = ('title', 'student_name', 'student_age', 'category', 'approved', 'order')
    ordering = ('order',)

class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)

class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category','age_range', 'duration', 'featured')
    list_filter = ('featured','category')
    search_fields = ('title', 'description', 'tagline')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectInline, StudentProjectInline]  # Added StudentProjectInline


class TeacherAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'featured', 'order')
    list_editable = ('order', 'featured')
    list_filter = ('featured',)
    search_fields = ('name', 'role', 'bio')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'role', 'title', 'bio', 'image')
        }),
        ('CEO/Leadership', {
            'fields': ('is_ceo', 'mission'),
            'description': 'Fill mission field only for CEO/Founder'
        }),
        ('Social & Settings', {
            'fields': ('tag', 'instagram', 'linkedin', 'featured', 'order')
        }),
    )


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'age', 'role', 'rating', 'featured')
    list_filter = ('rating', 'featured')
    search_fields = ('author', 'text')


class StudentProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'student_name', 'student_age', 'category', 'course', 'approved', 'order')
    list_editable = ('approved', 'order')
    list_filter = ('category', 'approved', 'course')
    search_fields = ('title', 'student_name', 'tools_used', 'description')

class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order')
    list_editable = ('order',)
    search_fields = ('question', 'answer')

class PlanAdmin(admin.ModelAdmin):
    list_display = ("name", "classes_per_week", "price_pkr", "price_usd")
    list_filter = ("name", "classes_per_week")
    search_fields = ("name",)
    ordering = ("name", "classes_per_week")

    fieldsets = (
        ("Plan Information", {
            "fields": ("name", "classes_per_week")
        }),
        ("Pricing", {
            "fields": ("price_pkr", "price_usd")
        }),
    )

admin.site.register(Plan, PlanAdmin)
admin.site.register(CourseCategory, CourseCategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Project)  
admin.site.register(StudentProject, StudentProjectAdmin)
admin.site.register(FAQ, FAQAdmin)

