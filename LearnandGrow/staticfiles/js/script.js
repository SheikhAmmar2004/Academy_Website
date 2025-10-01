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

// Modal functionality
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
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Hide form and show success message
        enrollmentForm.style.display = 'none';
        enrollmentSuccessMessage.style.display = 'block';

        // Reset form after 3 seconds and close modal
        setTimeout(function() {
            enrollmentForm.reset();
            enrollmentForm.style.display = 'block';
            enrollmentSuccessMessage.style.display = 'none';
            closeEnrollmentModal();
        }, 3000);
    });
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
            trialForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Hide form and show success message
                trialForm.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset form after 3 seconds and close modal
                setTimeout(function() {
                    trialForm.reset();
                    trialForm.style.display = 'block';
                    successMessage.style.display = 'none';
                    closeTrialModal();
                }, 3000);
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

