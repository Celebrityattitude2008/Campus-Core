// Google Apps Script code to send welcome emails when new user added to Google Sheet
// This script assumes the sheet has columns: Timestamp, Name, Email, Level

function sendWelcomeEmail() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // Assuming first row is headers
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const timestamp = row[0];
    const name = row[1];
    const email = row[2];
    const level = row[3];

    // Check if email sent (assume column 5 is 'EmailSent')
    if (row[4] !== 'Sent') {
      // Send email
      const subject = 'Welcome to Campus Core!';
      const body = `Dear ${name},

Welcome to Campus Core! We're excited to have you join our community.

Your account details:
- Name: ${name}
- Email: ${email}
- Level: ${level}

If you have any questions, feel free to reach out.

Best regards,
Campus Core Team`;

      MailApp.sendEmail(email, subject, body);

      // Mark as sent
      sheet.getRange(i + 1, 5).setValue('Sent');
    }
  }
}

// To trigger automatically, set up a time-driven trigger for sendWelcomeEmail

// Alternatively, for real-time, use a doPost function if calling from Firebase
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Append new user
  sheet.appendRow([new Date(), data.name, data.email, data.level, 'Pending']);

  // Send email immediately
  const subject = 'Welcome to Campus Core!';
  const body = `Dear ${data.name},

Welcome to Campus Core! We're excited to have you join our community.

Your account details:
- Name: ${data.name}
- Email: ${data.email}
- Level: ${data.level}

If you have any questions, feel free to reach out.

Best regards,
Campus Core Team`;

  MailApp.sendEmail(data.email, subject, body);

  // Mark as sent
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 5).setValue('Sent');

  return ContentService
    .createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}