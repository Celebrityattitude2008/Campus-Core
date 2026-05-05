import os
import re

# Change to the directory
os.chdir(r'c:\Users\paula\Documents\biu-archive-works')

files = [f for f in os.listdir('.') if f.endswith('.html')]
updated = 0

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace all .html references with clean URLs
    # Simple replacements for each file
    replacements = [
        ('href="index.html"', 'href="index"'),
        ('href="login.html"', 'href="login"'),
        ('href="sign.html"', 'href="sign"'),
        ('href="resetpassword.html"', 'href="resetpassword"'),
        ('href="profile.html"', 'href="profile"'),
        ('href="viewprofile.html"', 'href="viewprofile"'),
        ('href="admin.html"', 'href="admin"'),
        ('href="cgpa.html"', 'href="cgpa"'),
        ('href="calendar.html"', 'href="calendar"'),
        ('href="note.html"', 'href="note"'),
        ('href="chatbot.html"', 'href="chatbot"'),
        ('href="assignment.html"', 'href="assignment"'),
        ('href="discussions.html"', 'href="discussions"'),
        ('href="download.html"', 'href="download"'),
        ('href="hall.html"', 'href="hall"'),
        ('href="news.html"', 'href="news"'),
        ('href="pq.html"', 'href="pq"'),
        ('href="skillswap.html"', 'href="skillswap"'),
        ('href="subscriptions.html"', 'href="subscriptions"'),
        ('href="support.html"', 'href="support"'),
        ('data-page="index.html', 'data-page="index'),
        ('data-page="calendar.html', 'data-page="calendar'),
        ('data-page="note.html', 'data-page="note'),
        ('data-page="chatbot.html', 'data-page="chatbot'),
        ('data-page="profile.html', 'data-page="profile'),
        ("window.location.href = 'index.html'", "window.location.href = 'index'"),
        ("window.location.href = 'login.html'", "window.location.href = 'login'"),
        ('window.location.href = "index.html"', 'window.location.href = "index"'),
        ('window.location.href = "login.html"', 'window.location.href = "login"'),
    ]
    
    for old, new in replacements:
        content = content.replace(old, new)
    
    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✓ Updated: {file}')
        updated += 1

print(f'\nDone: {updated} files updated')
