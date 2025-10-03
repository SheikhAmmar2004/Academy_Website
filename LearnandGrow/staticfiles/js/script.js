// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    // Animate hamburger menu
    const hamburgers = menuBtn.querySelectorAll('.hamburger');
    if (mobileMenu.classList.contains('active')) {
        hamburgers[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        mobileMenu.classList.remove('active');
        menuBtn.classList.remove('active');
        
        // Reset hamburger menu
        const hamburgers = menuBtn.querySelectorAll('.hamburger');
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    });
});
      const swiper = new Swiper(".myCoursesSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".courses-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });

         const swiper2 = new Swiper(".reviewsSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".reviews-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });


// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = '#FDF8EE';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = '#FDF8EE';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.hero-text, .hero-illustration');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add click effects to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enrollment Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const enrollmentModal = document.getElementById('enrollmentModal');
    const closeEnrollmentButton = document.getElementById('closeEnrollmentModal');
    const enrollmentForm = document.getElementById('enrollmentForm');
    const enrollmentSuccessMessage = document.getElementById('enrollmentSuccess');
    const enrollmentCourseSelect = document.getElementById('enrollmentCourse');

    // Function to open enrollment modal
    function openEnrollmentModal(courseId = null) {
        enrollmentModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Pre-select and lock course if courseId provided
        if (enrollmentCourseSelect) {
            if (courseId) {
                for (let option of enrollmentCourseSelect.options) {
                    if (option.value === courseId) {
                        option.selected = true;
                        break;
                    }
                }
                enrollmentCourseSelect.setAttribute('disabled', 'disabled');
            } else {
                enrollmentCourseSelect.removeAttribute('disabled');
                enrollmentCourseSelect.selectedIndex = 0;
            }
        }
    }

    // Function to close enrollment modal
    function closeEnrollmentModal() {
        enrollmentModal.classList.remove('active');
        document.body.style.overflow = '';

        // Reset course field
        if (enrollmentCourseSelect) {
            enrollmentCourseSelect.removeAttribute('disabled');
            enrollmentCourseSelect.selectedIndex = 0;
        }
    }

    // Export function globally
    window.openEnrollmentModal = openEnrollmentModal;

    // Close modal when clicking on close button
    closeEnrollmentButton.addEventListener('click', closeEnrollmentModal);

    // Close modal when clicking outside modal content
    enrollmentModal.addEventListener('click', function(e) {
        if (e.target === enrollmentModal) {
            closeEnrollmentModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && enrollmentModal.classList.contains('active')) {
            closeEnrollmentModal();
        }
    });

    // Form submission
// Working Enrollment Form Submission
// Working Enrollment Form Submission
enrollmentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Create FormData and manually handle multiple values
    const formData = new FormData();
    const formElements = this.elements;
    
    // Add all form fields except preferred_days
    for (let element of formElements) {
        if (element.name && element.name !== 'preferred_days') {
            if (element.type === 'checkbox' || element.type === 'radio') {
                if (element.checked) {
                    formData.append(element.name, element.value);
                }
            } else if (element.type === 'file') {
                if (element.files.length > 0) {
                    formData.append(element.name, element.files[0]);
                }
            } else {
                formData.append(element.name, element.value);
            }
        }
    }
    
    // Handle preferred_days separately - add each checked value
    const preferredDaysCheckboxes = this.querySelectorAll('input[name="preferred_days"]:checked');
    preferredDaysCheckboxes.forEach(checkbox => {
        formData.append('preferred_days', checkbox.value);
    });

    console.log('Enrollment Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Send to Django backend
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCSRFToken() // Add this function if not exists
        }
    })
    .then(response => {
        console.log('Response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.success) {
            // Success - show message and reset
            enrollmentForm.style.display = 'none';
            enrollmentSuccessMessage.style.display = 'block';

            setTimeout(function() {
                enrollmentForm.reset();
                enrollmentForm.style.display = 'block';
                enrollmentSuccessMessage.style.display = 'none';
                closeEnrollmentModal();
                
                // Clear localStorage on successful submission
                localStorage.removeItem('enrollmentFormData');
            }, 3000);
        } else {
            // Show errors
            alert('Please check the form: ' + JSON.stringify(data.errors));
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alert('Network error. Please check your connection and try again.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Add CSRF token function if not exists
function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfToken ? csrfToken.value : '';
}
});


        // Modal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const modal = document.getElementById('trialModal');
            const closeButton = document.getElementById('closeModal');
            const trialForm = document.getElementById('trialForm');
            const successMessage = document.getElementById('successMessage');
            const courseSelect = document.getElementById('course');

            // Function to open modal
            function openTrialModal(courseId = null) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Pre-select and lock course if courseId provided
                if (courseSelect) {
                    if (courseId) {
                        for (let option of courseSelect.options) {
                            if (option.value === courseId) {
                                option.selected = true;
                                break;
                            }
                        }
                        courseSelect.setAttribute('disabled', 'disabled');
                    } else {
                        courseSelect.removeAttribute('disabled');
                        courseSelect.selectedIndex = 0;
                    }
                }
            }

            // Function to close modal
            function closeTrialModal() {
                modal.classList.remove('active');
                document.body.style.overflow = '';

                // Reset course field
                if (courseSelect) {
                    courseSelect.removeAttribute('disabled');
                    courseSelect.selectedIndex = 0;
                }
            }

            // Export function globally (for FAQ button or others)
            window.openTrialModal = openTrialModal;

            // Close modal when clicking on close button
            closeButton.addEventListener('click', closeTrialModal);

            // Close modal when clicking outside the modal content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeTrialModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeTrialModal();
                }
            });

            // Form submission
            // Working Trial Form Submission
            trialForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Debug: see what data is being collected
                const formData = new FormData(this);
                console.log('Trial Form Data:');
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }

                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Booking...';
                submitBtn.disabled = true;

                // Send to Django backend
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                })
                .then(response => {
                    console.log('Response status:', response.status);
                    return response.json();
                })
                .then(data => {
                    console.log('Response data:', data);
                    if (data.success) {
                        // Success - show message and reset
                        trialForm.style.display = 'none';
                        successMessage.style.display = 'block';

                        setTimeout(function() {
                            trialForm.reset();
                            trialForm.style.display = 'block';
                            successMessage.style.display = 'none';
                            closeTrialModal();
                        }, 3000);
                    } else {
                        // Show errors
                        alert('Please check the form: ' + JSON.stringify(data.errors));
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    alert('Network error. Please check your connection and try again.');
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            });
        });

// Course Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const courseModal = document.getElementById('courseModal');
    const closeCourseModal = document.getElementById('closeCourseModal');
    const modalTrialBtn = document.getElementById('modalTrialBtn');
    const modalEnrollBtn = document.getElementById('modalEnrollBtn');

    // Function to open course modal with specific course data
// Fix the openCourseModal function
// Course Modal functionality - More robust version
function openCourseModal(courseData) {
    
    // Basic validation
    if (!courseData || !courseData.title) {
        console.error('Invalid course data:', courseData);
        return;
    }
    
    // Populate modal with course data
    document.getElementById('modalCourseTitle').textContent = courseData.title || 'Course Title';
    document.getElementById('modalCourseTagline').textContent = courseData.tagline || "";
    document.getElementById('modalCourseDescription').textContent = courseData.description || "No description available.";
    document.getElementById('modalCourseDuration').textContent = courseData.duration || "Duration not specified";


    // Update learnings list
    const learningsList = document.getElementById('modalCourseLearnings');
    learningsList.innerHTML = '';
    
    if (courseData.learnings && courseData.learnings.length > 0) {
        courseData.learnings.forEach(learning => {
            if (learning && learning.trim()) {
                const li = document.createElement('li');
                li.textContent = learning;
                learningsList.appendChild(li);
            }
        });
    } else {
        learningsList.innerHTML = '<li>No learning outcomes specified</li>';
    }

    // Requirements (optional)
    const requirementsList = document.getElementById('modalCourseRequirements');
    requirementsList.innerHTML = '';
    
    if (courseData.requirements && courseData.requirements.length > 0) {
        courseData.requirements.forEach(req => {
            if (req && req.trim()) {
                const li = document.createElement('li');
                li.textContent = req;
                requirementsList.appendChild(li);
            }
        });
    } else {
        // Default requirements if none specified
        requirementsList.innerHTML = `
            <li>Laptop/PC with internet connection</li>
            <li>Age: 8-14 years</li>
            <li>No prior coding experience needed</li>
        `;
    }

    // FIXED: Projects handling with better error checking
    const projectsGrid = document.getElementById('modalCourseProjects');
    projectsGrid.innerHTML = '';
    
    // Check if projects data exists and handle it properly
    if (courseData.projects) {
        try {
            // If it's a string, parse it
            if (typeof courseData.projects === 'string') {
                if (courseData.projects.trim() === '') {
                    projectsGrid.innerHTML = '<p>No sample projects available</p>';
                    return;
                }
                
                // Parse the projects data (format: name||image_url||link@@name2||image_url2||link2)
                const projectItems = courseData.projects.split('@@');
                
                projectItems.forEach(projectStr => {
                    if (projectStr && projectStr.trim()) {
                        const [name, imageUrl, projectUrl] = projectStr.split('||');
                        
                        // Only create project item if we have a name
                        if (name && name.trim()) {
                            const projectItem = document.createElement('div');
                            projectItem.classList.add('project-item');
                            
                            // Create clickable project item if URL exists
                            if (projectUrl && projectUrl.trim()) {
                                projectItem.addEventListener('click', function() {
                                    window.open(projectUrl, '_blank');
                                });
                                projectItem.style.cursor = 'pointer';
                                projectItem.classList.add('has-link');
                            }
                            
                            projectItem.innerHTML = `
                                <div class="project-image">
                                    ${imageUrl && imageUrl.trim() ? 
                                        `<img src="${imageUrl}" alt="${name}" onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\'fas fa-image\'></i>';">` : 
                                        `<i class="fas fa-image"></i>`
                                    }
                                </div>
                                <div class="project-name">${name}</div>
                            `;
                            
                            projectsGrid.appendChild(projectItem);
                        }
                    }
                });
                
                // If we didn't add any projects, show message
                if (projectsGrid.children.length === 0) {
                    projectsGrid.innerHTML = '<p>No sample projects available</p>';
                }
            } 
            // If it's already an array (from JSON approach)
            else if (Array.isArray(courseData.projects)) {
                if (courseData.projects.length === 0) {
                    projectsGrid.innerHTML = '<p>No sample projects available</p>';
                    return;
                }
                
                courseData.projects.forEach(project => {
                    const projectItem = document.createElement('div');
                    projectItem.classList.add('project-item');
                    
                    // Create clickable project item if URL exists
                    if (project.url && project.url.trim()) {
                        projectItem.addEventListener('click', function() {
                            window.open(project.url, '_blank');
                        });
                        projectItem.style.cursor = 'pointer';
                        projectItem.classList.add('has-link');
                    }
                    
                    projectItem.innerHTML = `
                        <div class="project-image">
                            ${project.image && project.image.trim() ? 
                                `<img src="${project.image}" alt="${project.name}" onerror="this.style.display='none'; this.parentNode.innerHTML='<i class=\'fas fa-image\'></i>';">` : 
                                `<i class="fas fa-image"></i>`
                            }
                        </div>
                        <div class="project-name">${project.name || 'Unnamed Project'}</div>
                    `;
                    
                    projectsGrid.appendChild(projectItem);
                });
            }
            else {
                projectsGrid.innerHTML = '<p>No sample projects available</p>';
            }
        } catch (error) {
            console.error('Error parsing projects:', error);
            projectsGrid.innerHTML = '<p>Error loading projects</p>';
        }
    } else {
        projectsGrid.innerHTML = '<p>No sample projects available</p>';
    }

    // Show modal
    courseModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add active class for animation
    setTimeout(() => {
        courseModal.classList.add('active');
    }, 10);
}

    // Function to close course modal
    function closeCourseModalFunc() {
        courseModal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            courseModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    // Close modal when clicking on close button
    closeCourseModal.addEventListener('click', closeCourseModalFunc);

    // Close modal when clicking outside the modal content
    courseModal.addEventListener('click', function(e) {
        if (e.target === courseModal) {
            closeCourseModalFunc();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && courseModal.style.display === 'flex') {
            closeCourseModalFunc();
        }
    });


    // Enroll button click handler
    

    // Attach modal open to course info icons
    document.querySelectorAll('.view-details-btn').forEach(icon => {
        icon.addEventListener('click', function() {
    const courseCard = this.closest('.course-card');
    
    // Get data from data attributes
    const courseData = {
        id: courseCard.dataset.id,
        title: courseCard.dataset.title,
        tagline: courseCard.dataset.tagline,
        description: courseCard.dataset.description,
        duration: courseCard.dataset.duration,
        frequency: courseCard.dataset.frequency,
        batchSize: courseCard.dataset.batch,
        learnings: courseCard.dataset.learnings ? courseCard.dataset.learnings.split(',') : [],
        requirements: courseCard.dataset.requirements ? courseCard.dataset.requirements.split(',') : [],
        projects: courseCard.dataset.projects // Keep this as string for now
    };
    
    openCourseModal(courseData);
        });
    });
});
// FAQ Accordion Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // FAQ CTA buttons functionality
    const faqPrimaryBtn = document.querySelector('.btn-faq-primary');
    const faqSecondaryBtn = document.querySelector('.btn-faq-secondary');
    
    if (faqPrimaryBtn) {
        faqPrimaryBtn.addEventListener('click', function() {
            // Open the trial modal
            if (typeof openTrialModal === 'function') {
                openTrialModal();
            }
        });
    }
    
    if (faqSecondaryBtn) {
        faqSecondaryBtn.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}
document.addEventListener("DOMContentLoaded", function () {
        initFAQ();

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const viewMoreBtn = document.querySelector(".view-more-btn");
    const noProjectsMsg = document.querySelector(".no-projects-msg");
    const initialLimit = 3; // show only 3 by default
    let currentFilter = "all";
    let showingAll = false;

    // Function to apply filter
    function applyFilter(filter) {
        currentFilter = filter;
        showingAll = false; // reset view more/less

        let visibleCards = 0;

        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.classList.remove("hidden");

                if (visibleCards < initialLimit) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

                visibleCards++;
            } else {
                card.classList.add("hidden");
                card.style.display = "none";
            }
        });

        // Toggle No Projects message
        if (visibleCards === 0) {
            noProjectsMsg.style.display = "block";
            viewMoreBtn.classList.add("hidden");
        } else {
            noProjectsMsg.style.display = "none";

            // Toggle View More button
            if (visibleCards > initialLimit) {
                viewMoreBtn.classList.remove("hidden");
                viewMoreBtn.textContent = "View More";
            } else {
                viewMoreBtn.classList.add("hidden");
            }
        }
    }

    // Filter button click
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            applyFilter(btn.getAttribute("data-filter"));
        });
    });

    // View More / View Less button click
    viewMoreBtn.addEventListener("click", () => {
        let visibleCards = 0;

        projectCards.forEach(card => {
            const category = card.getAttribute("data-category");

            if (currentFilter === "all" || category === currentFilter) {
                if (showingAll) {
                    if (visibleCards < initialLimit) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                } else {
                    card.style.display = "block";
                }
                visibleCards++;
            }
        });

        showingAll = !showingAll;
        viewMoreBtn.textContent = showingAll ? "View Less" : "View More";
    });

    // Initial load
    applyFilter("all");
});
// ---------- Bank account details ----------
const accounts = {
  "JazzCash": { name: "Learn & Grow Digital", number: "0300-1111111" },
  "NayaPay": { name: "Learn & Grow Digital", number: "9876-543210" },
  "Payoneer": { name: "Learn & Grow Digital", number: "payoneer@email.com" }
};

function copyAccountNumber() {
  const text = document.getElementById("accountNumber").textContent;
  navigator.clipboard.writeText(text);
  alert("Account number copied!");
}

// ---------- Fee + Duration update ----------
function findPriceDisplay(plan, classes) {
  return document.querySelector(`.pricing-item[data-plan="${plan}"][data-classes="${classes}"]`);
}

function updateFeeAndDuration() {
  const selectedPlanEl = document.querySelector("input[name='plan']:checked");
  const classesSelect = document.getElementById("classesPerWeek");
  const classes = classesSelect ? classesSelect.value : null;
  const feeInput = document.getElementById("calculatedFee");
  const durationInput = document.getElementById("classDuration");

  console.log("updateFeeAndDuration called", { 
    selectedPlan: selectedPlanEl?.value, 
    classes: classes 
  });

  if (!selectedPlanEl || !classes) {
    if (feeInput) {
      feeInput.value = "(Auto-calculated)";
      feeInput.style.color = "#999"; // Gray color for placeholder
    }
    if (durationInput) {
      durationInput.value = "(Auto-set by plan)";
      durationInput.style.color = "#999";
    }
    return;
  }

  const plan = selectedPlanEl.value;

  // Duration
  if (durationInput) {
    durationInput.value = plan === "prime" ? "45 minutes" : "60 minutes";
   // durationInput.style.color = "#000"; // Black color for actual value
  }

  // Fee
  const pricingRow = findPriceDisplay(plan, classes);
  console.log("Pricing row found:", pricingRow);
  
  if (!pricingRow) {
    if (feeInput) {
      feeInput.value = "Not available";
      feeInput.style.color = "#ff0000"; // Red color for error
    }
    return;
  }

  // Get the display price
 let display = pricingRow.getAttribute("data-display") || 
                  pricingRow.dataset.display || 
                  "Price not found";
  
  console.log("Display price:", display);
  display = display.replace(/\s+/g, ' ').trim();

  
  if (feeInput) {
    feeInput.value = display;
   // feeInput.style.color = "#000"; // Black color for actual value
    
    // Force a DOM update - multiple methods
    feeInput.dispatchEvent(new Event('input', { bubbles: true }));
    feeInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    console.log("Fee input value set to:", feeInput.value);
  }
}

// ---------- Auto-save form ----------
const form = document.getElementById("enrollmentForm");
const formKey = "enrollmentFormData";

// Save form data to localStorage
if (form) {
  form.addEventListener("input", () => {
    const formData = new FormData(form);
    let obj = {};
    formData.forEach((value, key) => {
      if (obj[key]) {
        if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
        obj[key].push(value);
      } else {
        obj[key] = value;
      }
    });
        // Manually add preferred_days checkboxes
    const preferredDaysCheckboxes = form.querySelectorAll('input[name="preferred_days"]:checked');
    if (preferredDaysCheckboxes.length > 0) {
      obj['preferred_days'] = Array.from(preferredDaysCheckboxes).map(cb => cb.value);
    }
    localStorage.setItem(formKey, JSON.stringify(obj));
  });
}

// ---------- Initialize everything when DOM is loaded ----------
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded - initializing enrollment form");
  
  const planInputs = document.querySelectorAll("input[name='plan']");
  const classesSelect = document.getElementById("classesPerWeek");
  const bankBox = document.getElementById("bankDetails");
  const accountName = document.getElementById("accountName");
  const accountNumber = document.getElementById("accountNumber");
  const paymentRadios = document.querySelectorAll('input[name="payment_method"]');

  // Restore saved data
// Restore saved data
const saved = localStorage.getItem(formKey);
if (saved && form) {
  const obj = JSON.parse(saved);
  for (let key in obj) {
    const field = form.elements[key];
    if (!field) continue;

    if (field.type === "radio") {
      const input = form.querySelector(`[name="${key}"][value="${obj[key]}"]`);
      if (input) input.checked = true;
    } else if (field.type === "checkbox") {
      // Handle checkbox arrays (like preferred_days)
      if (Array.isArray(obj[key])) {
        obj[key].forEach(value => {
          const input = form.querySelector(`[name="${key}"][value="${value}"]`);
          if (input) input.checked = true;
        });
      } else {
        const input = form.querySelector(`[name="${key}"][value="${obj[key]}"]`);
        if (input) input.checked = true;
      }
    } else if (field.type === "file") {
      continue; // skip files
    } else if (field.length && field[0].tagName === "OPTION") {
      [...field.options].forEach(opt => {
        if (opt.value == obj[key]) opt.selected = true;
      });
    } else {
      field.value = obj[key];
    }
  }
}

  // Wire listeners for fee calculation
  if (planInputs) {
    planInputs.forEach(radio => {
      radio.addEventListener("change", updateFeeAndDuration);
    });
  }

  if (classesSelect) {
    classesSelect.addEventListener("change", updateFeeAndDuration);
  }

  // ---------- Payment details ----------
  if (paymentRadios) {
    paymentRadios.forEach(radio => {
      radio.addEventListener("change", function () {
        const selected = accounts[this.value];
        if (selected) {
          accountName.textContent = selected.name;
          accountNumber.textContent = selected.number;
          bankBox.style.display = "block";
        }
      });
    });
  }

  // If saved payment was selected, trigger its change
  const selectedPayment = form ? form.querySelector('input[name="payment_method"]:checked') : null;
  if (selectedPayment) selectedPayment.dispatchEvent(new Event("change"));

  // Run fee/duration calculation on initial load
  setTimeout(updateFeeAndDuration, 100);
});

// Clear storage on submit
if (form) {
  form.addEventListener("submit", () => {
    localStorage.removeItem(formKey);
  });
}

// Also add change listeners directly to the form elements as a backup
document.addEventListener('change', function(e) {
  if (e.target.name === 'plan' || e.target.id === 'classesPerWeek') {
    updateFeeAndDuration();
  }
});
// Feedback Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const feedbackModal = document.getElementById('feedbackModal');
    const openFeedbackBtn = document.getElementById('openFeedback');
    const closeFeedbackBtn = document.getElementById('closeFeedbackModal');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackSuccessMessage = document.getElementById('feedbackSuccessMessage');
    const uploadInput = document.getElementById('feedbackPictureUpload');
    const uploadPreview = document.getElementById('feedbackUploadPreview');
    const uploadContainer = document.getElementById('feedbackUploadContainer');
    
    // Open feedback modal
    if (openFeedbackBtn) {
        openFeedbackBtn.addEventListener('click', function() {
            feedbackModal.classList.add('active');
        });
    }
    
    // Close feedback modal
    if (closeFeedbackBtn) {
        closeFeedbackBtn.addEventListener('click', function() {
            feedbackModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === feedbackModal) {
            feedbackModal.classList.remove('active');
        }
    });
    
    // Handle form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    feedbackForm.style.display = 'none';
                    feedbackSuccessMessage.style.display = 'block';
                    
                    // Reset form after 3 seconds and close modal
                    setTimeout(function() {
                        feedbackForm.reset();
                        feedbackForm.style.display = 'block';
                        feedbackSuccessMessage.style.display = 'none';
                        feedbackModal.classList.remove('active');
                        uploadPreview.style.display = 'none';
                    }, 3000);
                } else {
                    alert('There was an error submitting your feedback. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your feedback. Please try again.');
            });
        });
    }
    
    // Handle image preview
    if (uploadInput) {
        uploadInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    alert('Please select an image file.');
                    this.value = '';
                    return;
                }
                
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Please select an image smaller than 5MB.');
                    this.value = '';
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    uploadPreview.src = e.target.result;
                    uploadPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
    }
});