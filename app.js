
let reminders = [];

if ("Notification" in window) {
  Notification.requestPermission();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('✅ Service Worker registrerad!'))
    .catch(err => console.error('Service Worker-fel:', err));
}

if ("Notification" in window) {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log('Notifikationer tillåtna');
    } else {
      console.log('Notifikationer ej tillåtna');
    }
  });
}



function addReminder() {
  const time = document.getElementById('time').value;
  const message = document.getElementById('message').value;

  if (time && message) {
    reminders.push({ time, message });
    updateReminderList();
    document.getElementById('time').value = '';
    document.getElementById('message').value = '';
    scheduleNotification(time, message);
  } else {
    alert('Fyll i både tid och påminnelse!');
  }
}

function updateReminderList() {
  const reminderList = document.getElementById('reminder-list');
  reminderList.innerHTML = '';

  reminders.forEach((reminder, index) => {
    const li = document.createElement('li');

    const reminderText = document.createElement('span');
    reminderText.innerHTML = `⏰ <strong>${reminder.time}</strong> - ${reminder.message}`;

    const confirmButton = document.createElement('button');
    confirmButton.textContent = '✅ Bekräfta';
    confirmButton.className = 'confirm-btn';
    confirmButton.onclick = () => deleteReminder(index);

    const snoozeButton = document.createElement('button');
    snoozeButton.textContent = '⏳ Snooze';
    snoozeButton.className = 'snooze-btn';
    snoozeButton.onclick = () => snoozeReminder(index);

    const editButton = document.createElement('button');
    editButton.textContent = '✏️ Ändra';
    editButton.className = 'edit-btn';
    editButton.onclick = () => editReminder(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️ Ta bort';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteReminder(index);

    li.appendChild(reminderText);
    li.appendChild(confirmButton);
    li.appendChild(snoozeButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    reminderList.appendChild(li);
  });
}

function deleteReminder(index) {
  reminders.splice(index, 1);
  updateReminderList();
}

function snoozeReminder(index) {
  const reminder = reminders[index];
  setTimeout(() => {
    showNotification(reminder.message);
  }, 5 * 60 * 1000);
}

function editReminder(index) {
  const newTime = prompt("Ange ny tid (HH:MM)", reminders[index].time);
  if (newTime) {
    reminders[index].time = newTime;
    updateReminderList();
  }
}

function scheduleNotification(time, message) {
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(time.split(":")[0], time.split(":")[1], 0);

  const timeDiff = reminderTime - now;
  if (timeDiff > 0) {
    setTimeout(() => showNotification(message), timeDiff);
  }
}

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification("💊 Medicinsk Påminnelse", {
      body: message,
      icon: "icon.png"
    });
  }
}

document.getElementById('showInstructionsBtn').addEventListener('click', function() {
  document.getElementById('info-modal').style.display = 'block';
});

function closeModal() {
  document.getElementById('info-modal').style.display = 'none';
}