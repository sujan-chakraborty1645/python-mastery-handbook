/**
 * Python Mastery Handbook - Main Application
 * 
 * This script handles:
 * - Loading chapter content from Markdown files
 * - Navigation between chapters
 * - Theme switching
 * - Search functionality
 * - Progress tracking
 * - Mobile navigation
 */

class PythonHandbook {
    constructor() {
        // Core properties
        this.currentChapter = 'welcome';
        this.completedChapters = new Set();
        this.cachedChapters = {}; // Cache to store loaded chapters
        
        // Chapter configuration
        this.chapters = [
            'welcome', 'setup', 'variables', 'type-hints', 'cli-project', 
            'strings', 'lists', 'fundamentals', 'dictionaries', 'conditionals', 'loops',
            'functions', 'generators', 'classes', 'inheritance', 'dataclasses', 
            'async', 'decorators', 'web-api', 'higher-order-functions', 'oop', 'advanced-oop',
            'working-with-data', 'error-handling', 'modules-packages', 'context-managers', 'fastapi', 'cli-automation',
            'data-scientific-python', 'modern-python-practices'
        ];
        
        // Map chapter IDs to markdown filenames
        this.chapterMap = {
            'welcome': '01-welcome',
            'setup': '02-setup',
            'variables': '03-variables',
            'type-hints': '04-type-hints',
            'cli-project': '05-cli-project',
            'strings': '06-strings',
            'lists': '07-lists',
            'fundamentals': '07b-python-fundamentals',
            'generators': '11b-python-generators',
            'dictionaries': '08-dictionaries',
            'conditionals': '09-conditionals',
            'loops': '10-loops',
            'functions': '11-functions',
            'classes': '12-classes',
            'inheritance': '13-inheritance',
            'dataclasses': '14-dataclasses',
            'async': '15-async',
            'decorators': '16-decorators',
            'web-api': '17-web-api',
            'higher-order-functions': '20-higher-order-functions',
            'oop': '21-object-oriented-programming',
            'advanced-oop': '22-advanced-oop',
            'working-with-data': '23-working-with-data',
            'error-handling': '24-error-handling',
            'modules-packages': '25-modules-packages',
            'context-managers': '26-context-managers',
            'fastapi': '27-fastapi',
            'cli-automation': '28-cli-automation',
            'data-scientific-python': '29-data-scientific-python',
            'modern-python-practices': '30-modern-python-practices'
        };
        
        // Initialize the application
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Setup event handlers
        this.setupTheme();
        this.setupNavigation();
        this.setupSearch();
        this.setupCodeCopy();
        this.setupProgressTracking();
        this.setupMobileNavigation();
        this.setupChapterCompletion();
        
        // Initialize progress
        this.updateProgress();
        
        // Set initial active chapter
        this.loadAndShowChapter(this.currentChapter);
    }

    /**
     * Theme switcher between light and dark mode
     */
    setupTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        // Get initial theme preference
        const savedTheme = this.getThemePreference();
        html.setAttribute('data-color-scheme', savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-color-scheme', newTheme);
            this.saveThemePreference(newTheme);
            
            // Add smooth transition effect
            html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                html.style.transition = '';
            }, 300);
        });
    }

    /**
     * Get user's theme preference (light or dark)
     */
    getThemePreference() {
        // Use system preference as default
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Save user's theme preference
     */
    saveThemePreference(theme) {
        // In a real app, we'd use localStorage
        // For this demo, we'll just keep it in memory
        this.currentTheme = theme;
    }

    /**
     * Setup chapter navigation using links, buttons and keyboard
     */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const nextButtons = document.querySelectorAll('.next-chapter');
        const prevButtons = document.querySelectorAll('.prev-chapter');
        
        // Handle nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const chapter = link.dataset.chapter;
                const sectionId = link.getAttribute('href');
                this.navigateToChapter(chapter, sectionId);
            });
        });
        
        // Handle next/previous buttons
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const nextChapter = button.dataset.next;
                this.navigateToChapter(nextChapter);
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const prevChapter = button.dataset.prev;
                this.navigateToChapter(prevChapter);
            });
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (e.altKey) {
                        e.preventDefault();
                        this.navigateToPreviousChapter();
                    }
                    break;
                case 'ArrowRight':
                    if (e.altKey) {
                        e.preventDefault();
                        this.navigateToNextChapter();
                    }
                    break;
                case '/':
                    if (!e.target.matches('input, textarea')) {
                        e.preventDefault();
                        this.openSearch();
                    }
                    break;
                case 'Escape':
                    this.closeSearch();
                    break;
            }
        });
    }

    /**
     * Navigate to a specific chapter
     */
    navigateToChapter(chapterId, sectionId = null) {
        if (!chapterId) return;
        
        const sameChapter = chapterId === this.currentChapter;
        
        if (!sameChapter) {
            this.currentChapter = chapterId;
            this.loadAndShowChapter(chapterId);
            this.updateActiveNavLink(chapterId);
            
            // If we're navigating to a specific section, wait for content to load
            if (sectionId) {
                setTimeout(() => this.scrollToSection(sectionId), 300);
            } else {
                this.scrollToTop();
            }
        } else if (sectionId) {
            // If already on the same chapter, just scroll to the section
            this.scrollToSection(sectionId);
        }
    }
    
    /**
     * Scroll to a specific section within the current chapter
     */
    scrollToSection(sectionId) {
        if (!sectionId) return;
        
        const sectionElement = document.querySelector(sectionId);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            this.updateActiveSectionLink(sectionId);
        }
    }
    
    /**
     * Update the active section link in the sidebar
     */
    updateActiveSectionLink(sectionId) {
        // Remove active class from all section links
        document.querySelectorAll('.nav-link[href^="#fastapi-"]').forEach(link => {
            link.classList.remove('section-active');
        });
        
        // Add active class to current section link
        const activeSectionLink = document.querySelector(`a[href="${sectionId}"]`);
        if (activeSectionLink) {
            activeSectionLink.classList.add('section-active');
        }
    }

    /**
     * Navigate to the next chapter in sequence
     */
    navigateToNextChapter() {
        const currentIndex = this.chapters.indexOf(this.currentChapter);
        if (currentIndex < this.chapters.length - 1) {
            this.navigateToChapter(this.chapters[currentIndex + 1]);
        }
    }

    /**
     * Navigate to the previous chapter in sequence
     */
    navigateToPreviousChapter() {
        const currentIndex = this.chapters.indexOf(this.currentChapter);
        if (currentIndex > 0) {
            this.navigateToChapter(this.chapters[currentIndex - 1]);
        }
    }

    /**
     * Update active state of navigation links
     */
    updateActiveNavLink(chapterId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current nav link
        const activeLink = document.querySelector(`[data-chapter="${chapterId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    /**
     * Scroll to the top of the content area
     */
    scrollToTop() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Load and display a chapter's content from Markdown file
     */
    loadAndShowChapter(chapterId) {
        // Check if we already have this chapter loaded in cache
        if (this.cachedChapters[chapterId]) {
            this.displayChapterContent(chapterId, this.cachedChapters[chapterId]);
            return;
        }

        // Show loading state
        this.showLoadingIndicator(chapterId);

        // Construct the markdown file path based on the chapter
        const markdownFileName = this.chapterMap[chapterId];
        if (!markdownFileName) {
            console.error(`No markdown file mapping for chapter: ${chapterId}`);
            return;
        }

        // Fetch the markdown file
        const markdownPath = `./chapters/${markdownFileName}.md`;
        
        fetch(markdownPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load chapter: ${response.status}`);
                }
                return response.text();
            })
            .then(markdown => {
                // Parse the markdown content
                const html = this.convertMarkdownToHtml(markdown);
                
                // Cache the HTML for future use
                this.cachedChapters[chapterId] = html;
                
                // Display the chapter
                this.displayChapterContent(chapterId, html);
            })
            .catch(error => {
                console.error(`Error loading chapter ${chapterId}:`, error);
                const errorHtml = `
                    <div class="chapter-content">
                        <h1>Error Loading Chapter</h1>
                        <p>Sorry, we couldn't load the chapter content. Please try again later.</p>
                        <p>Error details: ${error.message}</p>
                    </div>
                `;
                this.displayChapterContent(chapterId, errorHtml);
            });
    }
    
    /**
     * Show loading indicator while chapter is loading
     */
    showLoadingIndicator(chapterId) {
        // Create or get container for the chapter
        let chapterContainer = document.getElementById(chapterId);
        
        if (!chapterContainer) {
            // Create a new container if it doesn't exist
            chapterContainer = document.createElement('div');
            chapterContainer.id = chapterId;
            chapterContainer.className = 'chapter';
            document.querySelector('.main-content').appendChild(chapterContainer);
        }
        
        // Hide all chapters
        document.querySelectorAll('.chapter').forEach(chapter => {
            chapter.classList.remove('active');
        });
        
        // Show loading indicator
        chapterContainer.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading chapter content...</p>
            </div>
        `;
        chapterContainer.classList.add('active');
    }
    
    /**
     * Display chapter content in the UI
     */
    displayChapterContent(chapterId, html) {
        // Create or get container for the chapter content
        let chapterContainer = document.getElementById(chapterId);
        
        if (!chapterContainer) {
            // Create a new container if it doesn't exist
            chapterContainer = document.createElement('div');
            chapterContainer.id = chapterId;
            chapterContainer.className = 'chapter';
            document.querySelector('.main-content').appendChild(chapterContainer);
        }
        
        // Hide all chapters
        document.querySelectorAll('.chapter').forEach(chapter => {
            chapter.classList.remove('active');
        });
        
        // Update chapter content and show it
        chapterContainer.innerHTML = html;
        chapterContainer.classList.add('active');
        
        // Re-run syntax highlighting for the new chapter
        if (window.Prism) {
            window.Prism.highlightAllUnder(chapterContainer);
        }
        
        // Set up code copy buttons
        this.setupCodeCopyForChapter(chapterContainer);
        
        // Set up navigation buttons
        this.setupChapterNavigation(chapterId, chapterContainer);
    }
    
    /**
     * Set up next/previous navigation for a chapter
     */
    setupChapterNavigation(chapterId, container) {
        const currentIndex = this.chapters.indexOf(chapterId);
        
        // Create navigation div if it doesn't exist
        let navDiv = container.querySelector('.chapter-navigation');
        if (!navDiv) {
            navDiv = document.createElement('div');
            navDiv.className = 'chapter-navigation';
            container.appendChild(navDiv);
        } else {
            navDiv.innerHTML = ''; // Clear existing navigation
        }
        
        // Add previous button if not the first chapter
        if (currentIndex > 0) {
            const prevChapter = this.chapters[currentIndex - 1];
            const prevButton = document.createElement('button');
            prevButton.className = 'btn btn--secondary prev-chapter';
            prevButton.dataset.prev = prevChapter;
            prevButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Previous
            `;
            prevButton.addEventListener('click', () => this.navigateToChapter(prevChapter));
            navDiv.appendChild(prevButton);
        }
        
        // Add next button if not the last chapter
        if (currentIndex < this.chapters.length - 1) {
            const nextChapter = this.chapters[currentIndex + 1];
            const nextButton = document.createElement('button');
            nextButton.className = 'btn btn--primary next-chapter';
            nextButton.dataset.next = nextChapter;
            nextButton.innerHTML = `
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            `;
            nextButton.addEventListener('click', () => this.navigateToChapter(nextChapter));
            navDiv.appendChild(nextButton);
        }
        
        // Add completion checkbox
        const footerDiv = document.createElement('div');
        footerDiv.className = 'chapter-footer';
        footerDiv.innerHTML = `
            <label class="chapter-complete">
                <input type="checkbox" class="chapter-checkbox" data-chapter="${chapterId}" ${this.completedChapters.has(chapterId) ? 'checked' : ''}>
                <span>Mark as complete</span>
            </label>
        `;
        container.appendChild(footerDiv);
        
        // Add event listener to the checkbox
        const checkbox = footerDiv.querySelector('.chapter-checkbox');
        checkbox.addEventListener('change', (e) => {
            this.toggleChapterCompletion(chapterId, e.target.checked);
        });
    }
    
    /**
     * Convert markdown to HTML using marked.js
     */
    convertMarkdownToHtml(markdown) {
        // Configure marked.js renderer
        const renderer = new marked.Renderer();
        
        // Store original heading renderer
        const originalHeadingRenderer = renderer.heading;
        
        // Override heading renderer to add IDs for FastAPI sections
        renderer.heading = (text, level) => {
            let id = '';
            
            // Generate IDs for FastAPI chapter sections
            if (this.currentChapter === 'fastapi') {
                if (text.includes('Introduction to FastAPI') && level <= 2) {
                    id = ' id="fastapi"';
                } else if (text.includes('Setting Up FastAPI') && level <= 2) {
                    id = ' id="fastapi-setup"';
                } else if (text.includes('Request Validation with Pydantic') && level <= 2) {
                    id = ' id="fastapi-pydantic"';
                } else if (text.includes('Path Parameters and Query Parameters') && level <= 2) {
                    id = ' id="fastapi-parameters"';
                } else if (text.includes('Response Models') && level <= 2) {
                    id = ' id="fastapi-responses"';
                } else if (text.includes('Form Data and File Uploads') && level <= 2) {
                    id = ' id="fastapi-forms"';
                } else if (text.includes('HTTP Status Codes and Error Handling') && level <= 2) {
                    id = ' id="fastapi-errors"';
                } else if (text.includes('Dependency Injection') && level <= 2) {
                    id = ' id="fastapi-dependency"';
                } else if (text.includes('Security and Authentication') && level <= 2) {
                    id = ' id="fastapi-security"';
                } else if (text.includes('Middleware') && level <= 2) {
                    id = ' id="fastapi-middleware"';
                } else if (text.includes('Background Tasks') && level <= 2) {
                    id = ' id="fastapi-tasks"';
                } else if (text.includes('Project: URL Shortener API') && level <= 2) {
                    id = ' id="fastapi-project"';
                }
            }
            
            return `<h${level}${id}>${text}</h${level}>`;
        };
        
        // Customize code blocks to add language label and copy button
        renderer.code = (code, language) => {
            const escapedCode = this.escapeHtml(code);
            const languageClass = language ? ` class="language-${language}"` : '';
            const copyButton = `<button class="copy-btn" data-code="${this.escapeHtml(code.trim())}">Copy</button>`;
            
            return `<div class="code-block-wrapper">
                <div class="code-header">
                    ${language ? `<span class="code-language">${language}</span>` : ''}
                    ${copyButton}
                </div>
                <pre><code${languageClass}>${escapedCode}</code></pre>
            </div>`;
        };
        
        // Use marked.js to convert markdown to HTML
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        });
        
        const html = marked.parse(markdown);
        return `<div class="chapter-content">${html}</div>`;
    }
    
    /**
     * Helper method to escape HTML special characters
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, char => map[char]);
    }

    /**
     * Setup code copy functionality
     */
    setupCodeCopy() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                const code = e.target.dataset.code;
                this.copyToClipboard(code, e.target);
            }
        });
    }
    
    /**
     * Setup code copy buttons for a specific chapter
     */
    setupCodeCopyForChapter(container) {
        const copyButtons = container.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const code = e.target.dataset.code;
                this.copyToClipboard(code, e.target);
            });
        });
    }

    /**
     * Copy code to clipboard
     */
    async copyToClipboard(text, button) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            
            // Show success feedback
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('copied');
            }, 2000);
            
        } catch (err) {
            console.warn('Failed to copy text: ', err);
            
            // Show error feedback
            button.textContent = 'Failed';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        }
    }

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchBtn = document.getElementById('searchBtn');
        const searchModal = document.getElementById('searchModal');
        const searchClose = document.getElementById('searchClose');
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        searchBtn.addEventListener('click', () => this.openSearch());
        searchClose.addEventListener('click', () => this.closeSearch());
        
        // Close modal when clicking outside
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                this.closeSearch();
            }
        });
        
        // Handle search input
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });
        
        // Handle search result clicks
        searchResults.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.search-result-item');
            if (resultItem) {
                const chapterId = resultItem.dataset.chapter;
                this.navigateToChapter(chapterId);
                this.closeSearch();
            }
        });
    }

    /**
     * Open the search modal
     */
    openSearch() {
        const searchModal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        
        searchModal.classList.remove('hidden');
        searchInput.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close the search modal
     */
    closeSearch() {
        const searchModal = document.getElementById('searchModal');
        const searchInput = document.getElementById('searchInput');
        
        searchModal.classList.add('hidden');
        searchInput.value = '';
        document.getElementById('searchResults').innerHTML = '';
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    /**
     * Perform search based on user query
     */
    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        
        if (!query.trim()) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = this.searchContent(query.toLowerCase());
        this.displaySearchResults(results);
    }

    /**
     * Search the content index for matching results
     */
    searchContent(query) {
        const results = [];
        
        for (const [chapterId, data] of Object.entries(this.searchIndex)) {
            const score = this.calculateSearchScore(query, data);
            if (score > 0) {
                results.push({
                    chapterId,
                    title: data.title,
                    score,
                    snippet: this.generateSnippet(query, data.content)
                });
            }
        }
        
        return results.sort((a, b) => b.score - a.score).slice(0, 8);
    }

    /**
     * Calculate relevance score for search results
     */
    calculateSearchScore(query, data) {
        const titleText = data.title.toLowerCase();
        const contentText = data.content.toLowerCase();
        let score = 0;
        
        // Exact matches in title get highest score
        if (titleText.includes(query)) {
            score += 100;
        }
        
        // Word matches in title
        const queryWords = query.split(/\s+/);
        queryWords.forEach(word => {
            if (word.length < 2) return; // Skip short words
            if (titleText.includes(word)) score += 50;
            if (contentText.includes(word)) score += 10;
        });
        
        return score;
    }

    /**
     * Generate a relevant text snippet for search results
     */
    generateSnippet(query, content) {
        const words = content.split(/\s+/);
        const queryWords = query.split(/\s+/);
        
        // Find first occurrence of any query word
        let startIndex = 0;
        for (let i = 0; i < words.length; i++) {
            if (queryWords.some(qWord => words[i].includes(qWord))) {
                startIndex = Math.max(0, i - 10);
                break;
            }
        }
        
        const snippet = words.slice(startIndex, startIndex + 20).join(' ');
        return snippet.length < content.length ? snippet + '...' : snippet;
    }

    /**
     * Display search results in the UI
     */
    displaySearchResults(results) {
        const searchResults = document.getElementById('searchResults');
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--color-text-secondary);">No results found</div>';
            return;
        }
        
        const html = results.map(result => `
            <div class="search-result-item" data-chapter="${result.chapterId}">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-snippet">${result.snippet}</div>
            </div>
        `).join('');
        
        searchResults.innerHTML = html;
    }

    /**
     * Setup progress tracking
     */
    setupProgressTracking() {
        // Initialize progress from completed chapters
        this.updateProgress();
    }

    /**
     * Setup mobile navigation
     */
    setupMobileNavigation() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        
        sidebarToggle?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.toggle('open');
            document.body.classList.toggle('sidebar-open');
        });
        
        // Close sidebar when clicking on a nav link on mobile
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('open');
                    document.body.classList.remove('sidebar-open');
                }
            });
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 768 && 
                sidebar.classList.contains('open') && 
                !sidebar.contains(e.target) && 
                e.target !== sidebarToggle) {
                sidebar.classList.remove('open');
                document.body.classList.remove('sidebar-open');
            }
        });
        
        // Create mobile bottom navigation
        this.createMobileBottomNav();
    }
    
    /**
     * Create mobile bottom navigation bar
     */
    createMobileBottomNav() {
        // Only create if it doesn't already exist
        if (document.querySelector('.mobile-bottom-nav')) {
            return;
        }
        
        const bottomNav = document.createElement('nav');
        bottomNav.className = 'mobile-bottom-nav';
        
        // Home button
        const homeButton = document.createElement('a');
        homeButton.className = 'mobile-nav-item';
        homeButton.href = '#welcome';
        homeButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path d="M9 22V12h6v10"/>
            </svg>
            <span>Home</span>
        `;
        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToChapter('welcome');
        });
        
        // Previous chapter button
        const prevButton = document.createElement('a');
        prevButton.className = 'mobile-nav-item';
        prevButton.href = '#';
        prevButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Previous</span>
        `;
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToPreviousChapter();
        });
        
        // Next chapter button
        const nextButton = document.createElement('a');
        nextButton.className = 'mobile-nav-item';
        nextButton.href = '#';
        nextButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <span>Next</span>
        `;
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToNextChapter();
        });
        
        // Add all buttons to navigation
        bottomNav.appendChild(homeButton);
        bottomNav.appendChild(prevButton);
        bottomNav.appendChild(nextButton);
        
        // Add navigation to body
        document.body.appendChild(bottomNav);
    }

    /**
     * Setup chapter completion tracking
     */
    setupChapterCompletion() {
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('chapter-checkbox')) {
                const chapterId = e.target.dataset.chapter;
                const isCompleted = e.target.checked;
                
                this.toggleChapterCompletion(chapterId, isCompleted);
            }
        });
        
        // Add scroll listener for FastAPI section navigation
        document.querySelector('.main-content').addEventListener('scroll', () => {
            if (this.currentChapter === 'fastapi') {
                this.updateSectionHighlightOnScroll();
            }
        });
    }
    
    /**
     * Update active section highlight based on scroll position
     */
    updateSectionHighlightOnScroll() {
        // Only proceed if we're in the FastAPI chapter
        if (this.currentChapter !== 'fastapi') return;
        
        const sections = [
            { id: '#fastapi', element: document.getElementById('fastapi') },
            { id: '#fastapi-setup', element: document.getElementById('fastapi-setup') },
            { id: '#fastapi-pydantic', element: document.getElementById('fastapi-pydantic') },
            { id: '#fastapi-parameters', element: document.getElementById('fastapi-parameters') },
            { id: '#fastapi-responses', element: document.getElementById('fastapi-responses') },
            { id: '#fastapi-forms', element: document.getElementById('fastapi-forms') },
            { id: '#fastapi-errors', element: document.getElementById('fastapi-errors') },
            { id: '#fastapi-dependency', element: document.getElementById('fastapi-dependency') },
            { id: '#fastapi-security', element: document.getElementById('fastapi-security') },
            { id: '#fastapi-middleware', element: document.getElementById('fastapi-middleware') },
            { id: '#fastapi-tasks', element: document.getElementById('fastapi-tasks') },
            { id: '#fastapi-project', element: document.getElementById('fastapi-project') }
        ].filter(section => section.element !== null); // Filter out sections that don't exist
        
        if (sections.length === 0) return;
        
        // Find the section currently in view
        const scrollPosition = document.querySelector('.main-content').scrollTop;
        let currentSection = sections[0].id;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section.element.offsetTop <= scrollPosition + 100) {
                currentSection = section.id;
            }
        }
        
        this.updateActiveSectionLink(currentSection);
    }

    /**
     * Toggle chapter completion status
     */
    toggleChapterCompletion(chapterId, isCompleted) {
        if (isCompleted) {
            this.completedChapters.add(chapterId);
        } else {
            this.completedChapters.delete(chapterId);
        }
        
        this.updateProgress();
        this.updateNavLinkCompletion(chapterId, isCompleted);
    }

    /**
     * Update navigation link to show completion status
     */
    updateNavLinkCompletion(chapterId, isCompleted) {
        const navLink = document.querySelector(`[data-chapter="${chapterId}"]`);
        if (navLink) {
            if (isCompleted) {
                navLink.classList.add('completed');
            } else {
                navLink.classList.remove('completed');
            }
        }
    }

    /**
     * Update overall progress indicator
     */
    updateProgress() {
        const totalChapters = this.chapters.length;
        const completedCount = this.completedChapters.size;
        const percentage = Math.round((completedCount / totalChapters) * 100);
        
        const progressFill = document.getElementById('overallProgress');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${percentage}% Complete`;
        }
    }
    
    /**
     * Build search index for all chapters 
     */
    searchIndex = {
        'welcome': {
            title: 'Welcome to Python Mastery Handbook',
            content: 'python javascript developers clean syntax powerful ecosystem web development data science ai learning fast hands-on projects'
        },
        'setup': {
            title: 'Setup & Installation',
            content: 'python installation windows macos homebrew pip package management virtual environment requirements.txt npm comparison'
        },
        'variables': {
            title: 'Variables & Data Types',
            content: 'variables data types str int float bool none javascript comparison type checking isinstance conversion'
        },
        'strings': {
            title: 'Strings',
            content: 'string methods formatting f-strings concatenation slicing python vs javascript template literals'
        },
        'lists': {
            title: 'Lists & Tuples',
            content: 'lists tuples arrays javascript methods append extend slice indexing comprehensions immutable mutable'
        },
        'dictionaries': {
            title: 'Dictionaries & Sets',
            content: 'dictionaries sets objects maps javascript keys values methods get items unique collections'
        },
        'conditionals': {
            title: 'Conditionals',
            content: 'if else elif conditional statements boolean logic comparison operators and or not javascript'
        },
        'loops': {
            title: 'Loops',
            content: 'for while loops iteration range enumerate javascript for-of for-in while do-while break continue'
        },
        'functions': {
            title: 'Functions',
            content: 'functions def parameters arguments return lambda arrow functions javascript default parameters kwargs'
        },
        'classes': {
            title: 'Classes & Objects',
            content: 'classes objects oop __init__ constructor methods attributes self this javascript class comparison'
        },
        'inheritance': {
            title: 'Inheritance',
            content: 'inheritance super method overriding polymorphism extends javascript class inheritance prototype'
        },
        'type-hints': {
            title: 'Type Hints',
            content: 'type hints typing annotations optional union list dict typescript comparison static typing mypy'
        },
        'dataclasses': {
            title: 'Dataclasses',
            content: 'dataclasses decorator fields __post_init__ frozen typescript interfaces javascript classes'
        },
        'async': {
            title: 'Async Programming',
            content: 'async await asyncio promises javascript asynchronous programming coroutines event loop aiohttp'
        },
        'decorators': {
            title: 'Decorators',
            content: 'decorators function decorators class decorators @property @staticmethod @classmethod higher order functions'
        },
        'cli-project': {
            title: 'CLI Tool Project',
            content: 'cli command line click library commander.js node.js arguments options weather tool file analysis'
        },
        'web-api': {
            title: 'Web API Project',
            content: 'web api fastapi flask express.js javascript rest api endpoints json swagger documentation'
        }
    }
}

// Initialize the handbook when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pythonHandbook = new PythonHandbook();
});
