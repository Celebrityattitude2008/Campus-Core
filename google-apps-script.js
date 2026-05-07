// Google Apps Script — Campus Core user sync
// Sheet columns: Timestamp | Name | Email | University | Department | Level | EmailSent
// Deploy as Web App: Execute as Me, Anyone can access (no sign-in required)

function sendWelcomeEmail() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[1];
    const email = row[2];
    const university = row[3];
    const department = row[4];
    const level = row[5];

    if (row[6] !== 'Sent') {
      const subject = 'Welcome to Campus Core!';
      const body = `Dear ${name},

Welcome to Campus Core! We're excited to have you join our student community.

Your account details:
- Name: ${name}
- Email: ${email}
- University: ${university}
- Department: ${department}
- Level: ${level}

If you have any questions, reach out at support@campuscore.app.

Best regards,
Campus Core Team`;

      MailApp.sendEmail(email, subject, body);
      sheet.getRange(i + 1, 7).setValue('Sent');
    }
  }
}

// doGet handles requests from the frontend (no CORS preflight unlike POST+JSON)
function doGet(e) {
  const params = e.parameter || {};
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    new Date(),
    params.name || '',
    params.email || '',
    params.university || '',
    params.department || '',
    params.level || '',
    'Pending'
  ]);

  const subject = 'Welcome to Campus Core!';
  const body = `Dear ${params.name},

Welcome to Campus Core! We're excited to have you join our student community.

Your account details:
- Name: ${params.name}
- Email: ${params.email}
- University: ${params.university}
- Department: ${params.department}
- Level: ${params.level}

If you have any questions, reach out at support@campuscore.app.

Best regards,
Campus Core Team`;

  if (params.email) {
    MailApp.sendEmail(params.email, subject, body);
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 7).setValue('Sent');
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// doPost kept for compatibility — now also handles university/department
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.email || '',
    data.university || '',
    data.department || '',
    data.level || '',
    'Pending'
  ]);

  const subject = 'Welcome to Campus Core!';
  const body = `Dear ${data.name},

Welcome to Campus Core!

- Name: ${data.name}
- Email: ${data.email}
- University: ${data.university}
- Department: ${data.department}
- Level: ${data.level}

Best regards,
Campus Core Team`;

  if (data.email) {
    MailApp.sendEmail(data.email, subject, body);
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 7).setValue('Sent');
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
