// Function to generate random 6-digit OTP
function generateOtp(fieldId) {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
  document.getElementById(fieldId).value = otp;
}

// Function to generate random 10-digit Transaction ID
function generateTransactionId(fieldId) {
  const txnId = Math.floor(1000000000 + Math.random() * 9000000000); // Generate a random 10-digit number
  document.getElementById(fieldId).value = txnId;
}

// Sync all dates with Login OTP Date
function syncDates() {
  const loginOtpDate = document.getElementById('loginOtpDate').value;
  document.getElementById('sendOtpDate').value = loginOtpDate;
  document.getElementById('txnOtpDate').value = loginOtpDate;
  document.getElementById('paidDate').value = loginOtpDate;
  document.getElementById('congratsDate').value = loginOtpDate;
}

// Function to dynamically add Webfile input fields
function addWebfileInput() {
  const currentInputs = document.querySelectorAll('[id^="webfile_"]');
  const lastInput = currentInputs[currentInputs.length - 1];

  // Check if the last Webfile Number field is empty or not exactly 12 characters
  if (lastInput.value.trim().length !== 12) {
    alert("Please complete the current Webfile Number with exactly 12 characters before adding a new one.");
    return; // Stop execution if the field is not exactly 12 characters
  }

  if (currentInputs.length < 5) {
    const inputField = document.createElement('div');
    inputField.innerHTML = `  
      <label>Webfile Number ${currentInputs.length + 1}: <input type="text" id="webfile_${currentInputs.length + 1}" maxlength="12" oninput="this.value = this.value.toUpperCase(); updatePaidAmount();" required></label><br><br>
    `;
    document.getElementById('webfileInputs').appendChild(inputField);
    updatePaidAmount(); // Update Paid Amount when a new Webfile is added
  } else {
    alert('Maximum 5 Webfile Numbers allowed');
  }
}

// Function to dynamically remove Webfile input fields
function removeWebfileInput() {
  const currentInputs = document.querySelectorAll('[id^="webfile_"]').length;
  if (currentInputs > 1) {
    const webfileInputs = document.getElementById('webfileInputs');
    webfileInputs.removeChild(webfileInputs.lastChild);
    updatePaidAmount(); // Update Paid Amount when a Webfile is removed
  } else {
    alert('Minimum 1 Webfile Number required');
  }
}

// Function to update Paid Amount based on the number of Webfile Numbers
function updatePaidAmount() {
  const currentInputs = document.querySelectorAll('[id^="webfile_"]').length;
  const paidAmount = 824 * currentInputs; // Calculate Paid Amount
  document.getElementById('paidAmount').value = paidAmount.toFixed(2); // Set Paid Amount
}

// Function to generate a random balance between 500 and 5000
function generateRandomBalance() {
  const randomBalance = (Math.random() * (5000 - 500) + 500).toFixed(2); // Random balance between 500 and 5000
  document.getElementById('netBalance').value = randomBalance;
}

// Function to format amount with comma if >= 1000
const formatAmount = (amount) => {
  const numericAmount = parseFloat(amount);
  if (numericAmount >= 1000) {
    return numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return numericAmount.toFixed(2);
};

// Function to format the appointment date and time slot
const formatAppointmentDateTime = (date, timeSlot) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0'); // e.g., "03"
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // e.g., "03"
  const year = String(dateObj.getFullYear()).slice(-2); // e.g., "25"
  return `${day}-${month}-${year}(${timeSlot})`; // e.g., "03-03-25(10:00-10:59)"
};

function generateXML() {
  const mobileNum = document.getElementById('mobileNum').value;
  if (!mobileNum || mobileNum.length !== 11) {
    alert("Please enter a valid 11-digit Applicant Mobile Number.");
    return;
  }

  // Check if all required fields are filled
  const requiredFields = document.querySelectorAll('[required]');
  let isValid = true;
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.border = '1px solid red';
    } else {
      field.style.border = '';
    }
  });

  if (!isValid) {
    alert("Please fill all required fields.");
    return;
  }

  // Validate OTP fields (must be exactly 6 digits)
  const otpFields = ['loginOtpCode', 'sendOtpCode', 'txnOtpCode'];
  for (const fieldId of otpFields) {
    const fieldValue = document.getElementById(fieldId).value;
    if (fieldValue.length !== 6) {
      alert(`Please enter exactly 6 digits for ${fieldId.replace('OtpCode', ' OTP Code')}.`);
      document.getElementById(fieldId).style.border = '1px solid red';
      return;
    } else {
      document.getElementById(fieldId).style.border = '';
    }
  }

  // Validate Transaction ID (must be exactly 10 digits)
  const txnIdValue = document.getElementById('txnId').value;
  if (txnIdValue.length !== 10) {
    alert("Please enter exactly 10 digits for Transaction ID.");
    document.getElementById('txnId').style.border = '1px solid red';
    return;
  } else {
    document.getElementById('txnId').style.border = '';
  }

  const dateToMillis = (dateTime) => new Date(dateTime).getTime();

  // Updated readableDate function to format as "Mar 02, 2025 6:14:10 PM"
  const readableDate = (dateTime) => {
    const date = new Date(dateTime);
    const month = date.toLocaleString('en-US', { month: 'short' }); // e.g., "Mar"
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day, e.g., "02"
    const year = date.getFullYear(); // e.g., "2025"
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric', // Use 'numeric' to avoid leading zero
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }); // e.g., "6:14:10 PM"
    return `${month} ${day}, ${year} ${time}`; // e.g., "Mar 02, 2025 6:14:10 PM"
  };

  // Function to format the date as "02-MAR-25 06:12:10 pm"
  const formatPaidMessageDate = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0'); // e.g., "02"
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // e.g., "MAR"
    const year = String(date.getFullYear()).slice(-2); // e.g., "25"
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toLowerCase(); // e.g., "06:12:10 pm"
    return `${day}-${month}-${year} ${time}`; // e.g., "02-MAR-25 06:12:10 pm"
  };

  // Generate Congratulations Messages for each Webfile Number
  const congratsMessages = [];
  const webfileInputs = document.querySelectorAll('[id^="webfile_"]');
  webfileInputs.forEach((input) => {
    const webfileNumber = input.value;
    const congratsMessage = `
      <sms protocol="0" address="IVAC FEES" date="${dateToMillis(document.getElementById('congratsDate').value + 'T' + document.getElementById('congratsTime').value)}" type="1" subject="null" body="Congratulations. IVAC Visa fee payment of ${webfileNumber} is successful. Your Appointment date is ${formatAppointmentDateTime(document.getElementById('appointmentDate').value, document.getElementById('appointmentTime').value)} Please visit IVAC within your slot time." toa="null" sc_toa="null" service_center="+8801801000622" read="1" status="-1" locked="0" date_sent="${dateToMillis(document.getElementById('congratsDate').value + 'T' + document.getElementById('congratsTime').value)}" sub_id="1" readable_date="${readableDate(document.getElementById('congratsDate').value + 'T' + document.getElementById('congratsTime').value)}" contact_name="(Unknown)"/>
    `;
    congratsMessages.push(congratsMessage);
  });

  const xml = `<?xml version='1.0' encoding='UTF-8' standalone='yes'?>\n
<smses count="${5 + webfileInputs.length}" backup_set="752b82cf-2cbb-464f-bdd4-ca51b5a5d194" backup_date="1740831114184" type="full">

<!-- Login OTP Message -->
<sms protocol="0" address="IVAC_BD" date="${dateToMillis(document.getElementById('loginOtpDate').value + 'T' + document.getElementById('loginOtpTime').value)}" type="1" subject="null" body="${document.getElementById('loginOtpCode').value} is your One-Time Password for IVAC login." toa="null" sc_toa="null" service_center="+8801700000600" read="1" status="-1" locked="0" date_sent="${dateToMillis(document.getElementById('loginOtpDate').value + 'T' + document.getElementById('loginOtpTime').value)}" sub_id="1" readable_date="${readableDate(document.getElementById('loginOtpDate').value + 'T' + document.getElementById('loginOtpTime').value)}" contact_name="(Unknown)" />

<!-- Send OTP Message -->
<sms protocol="0" address="IVAC_BD" date="${dateToMillis(document.getElementById('sendOtpDate').value + 'T' + document.getElementById('sendOtpTime').value)}" type="1" subject="null" body="${document.getElementById('sendOtpCode').value} is your one time password for verification" toa="null" sc_toa="null" service_center="+8801700000600" read="1" status="-1" locked="0" date_sent="${dateToMillis(document.getElementById('sendOtpDate').value + 'T' + document.getElementById('sendOtpTime').value)}" sub_id="1" readable_date="${readableDate(document.getElementById('sendOtpDate').value + 'T' + document.getElementById('sendOtpTime').value)}" contact_name="(Unknown)" />

<!-- Rocket Transaction OTP Message -->
<sms protocol="0" address="16216" date="${dateToMillis(document.getElementById('txnOtpDate').value + 'T' + document.getElementById('txnOtpTime').value)}" type="1" subject="null" body="Your security code for Rocket transaction is ${document.getElementById('txnOtpCode').value}." toa="null" sc_toa="null" service_center="+8801700000600" read="1" status="-1" locked="0" date_sent="${dateToMillis(document.getElementById('txnOtpDate').value + 'T' + document.getElementById('txnOtpTime').value)}" sub_id="1" readable_date="${readableDate(document.getElementById('txnOtpDate').value + 'T' + document.getElementById('txnOtpTime').value)}" contact_name="(Unknown)" />

<!-- Rocket Paid Message -->
<sms protocol="0" address="16216" date="${dateToMillis(document.getElementById('paidDate').value + 'T' + document.getElementById('paidTime').value)}" type="1" subject="null" body="Tk${formatAmount(document.getElementById('paidAmount').value)} paid through e-Commerce gateway. NetBal: Tk${formatAmount(document.getElementById('netBalance').value)} TxnId: ${document.getElementById('txnId').value} Date:${formatPaidMessageDate(document.getElementById('paidDate').value + 'T' + document.getElementById('paidTime').value)}. Don't share your PIN with anybody" toa="null" sc_toa="null" service_center="+8801700000600" read="1" status="-1" locked="0" date_sent="${dateToMillis(document.getElementById('paidDate').value + 'T' + document.getElementById('paidTime').value)}" sub_id="1" readable_date="${readableDate(document.getElementById('paidDate').value + 'T' + document.getElementById('paidTime').value)}" contact_name="(Unknown)" />

<!-- Congratulations Messages -->
${congratsMessages.join('\n')}

</smses>`;

  const blob = new Blob([xml], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${mobileNum}.xml`; // Rename file to only the applicant's mobile number
  link.click();

  // Clear the form after generating the XML file
  clearForm();
}

function clearForm() {
  document.getElementById('smsForm').reset();
  // Reset the Appointment Time Slot to its default value
  document.getElementById('appointmentTime').value = '10:00-10:59';
  // Reset Paid Amount to 824 (for 1 Webfile Number)
  document.getElementById('paidAmount').value = '824.00';
  // Clear Net Balance
  document.getElementById('netBalance').value = '';
  // Remove dynamically added Webfile inputs
  const webfileInputs = document.getElementById('webfileInputs');
  webfileInputs.innerHTML = '';
  // Add the first Webfile input back
  const inputField = document.createElement('div');
  inputField.innerHTML = `  
    <label>Webfile Number 1: <input type="text" id="webfile_1" maxlength="12" oninput="this.value = this.value.toUpperCase(); updatePaidAmount();" required></label><br><br>
  `;
  webfileInputs.appendChild(inputField);
}

// Initialize Paid Amount when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updatePaidAmount(); // Set initial Paid Amount
});
