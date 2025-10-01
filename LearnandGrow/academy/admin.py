from django.contrib import admin
from .models import Course, Teacher, Review, Project, StudentProject, FAQ, CourseCategory,Plan, Day, TimeSlot,TrialFormSubmission,EnrollmentFormSubmission



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

class DayAdmin(admin.ModelAdmin):
    list_display = ['name', 'available_for_trial', 'available_for_enrollment', 'order']
    list_editable = ['available_for_trial', 'available_for_enrollment', 'order']
    list_filter = ['available_for_trial', 'available_for_enrollment']

class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ['time_range', 'slot_type', 'available', 'order']
    list_editable = ['slot_type', 'available', 'order']
    list_filter = ['slot_type', 'available']

# READ-ONLY ADMIN FOR FORM SUBMISSIONS (Delete only, no edit/add)
class TrialFormSubmissionAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'student_age', 'course', 'preferred_day', 'preferred_time', 'country', 'contact_info', 'submitted_at']
    list_filter = ['submitted_at', 'course', 'preferred_day']
    search_fields = ['student_name', 'contact_info', 'country']
    readonly_fields = [f.name for f in TrialFormSubmission._meta.fields]
    
    # Remove actions dropdown
    actions = None
    
    # Permissions: NO ADD, NO EDIT, YES DELETE
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return True  # Allow delete

class EnrollmentFormSubmissionAdmin(admin.ModelAdmin):
    list_display = ['student_name', 'grade', 'course', 'plan', 'classes_per_week', 'parent_name', 'submitted_at']
    list_filter = ['submitted_at', 'course', 'plan', 'payment_method']
    search_fields = ['student_name', 'parent_name', 'parent_email', 'parent_contact']
    readonly_fields = [f.name for f in EnrollmentFormSubmission._meta.fields]
    
    # Remove actions dropdown
    actions = None
    
    # Permissions: NO ADD, NO EDIT, YES DELETE
    def has_add_permission(self, request):
        return False
    
    def has_change_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return True  # Allow delete
    
    def display_preferred_days(self, obj):
        """Display preferred days in a readable format"""
        if obj.preferred_days:
            if isinstance(obj.preferred_days, list):
                return ', '.join(obj.preferred_days)
            else:
                return obj.preferred_days
        return "No days selected"
    display_preferred_days.short_description = 'Preferred Days'

admin.site.register(Plan, PlanAdmin)
admin.site.register(CourseCategory, CourseCategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Project)  
admin.site.register(StudentProject, StudentProjectAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(Day, DayAdmin)
admin.site.register(TimeSlot, TimeSlotAdmin)
# Register form submissions with read-only admin
admin.site.register(TrialFormSubmission, TrialFormSubmissionAdmin)
admin.site.register(EnrollmentFormSubmission, EnrollmentFormSubmissionAdmin)