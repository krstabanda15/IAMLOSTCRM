const dashboardData = {
  appointments: [],
  revenue: {
    labels: [],
    values: []
  },
  serviceDistribution: {
    labels: [],
    values: []
  }
};

const YEAR_START = 1990;
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - YEAR_START + 1 }, (_, i) => String(currentYear - i));

const baseVehicleCatalog = {
  Toyota: ['Vios', 'Wigo', 'Yaris', 'Corolla Altis', 'Camry', 'Raize', 'Rush', 'Avanza', 'Innova', 'Fortuner', 'Hilux', 'Land Cruiser', 'Coaster', 'Hiace'],
  Honda: ['Brio', 'City', 'Civic', 'Accord', 'CR-V', 'HR-V', 'BR-V', 'Jazz', 'Mobilio'],
  Mitsubishi: ['Mirage', 'Mirage G4', 'Xpander', 'Montero Sport', 'Strada', 'L300', 'Outlander', 'ASX'],
  Nissan: ['Almera', 'Sylphy', 'Sentra', 'Navara', 'Terra', 'Patrol', 'Livina', 'Juke', 'Kicks'],
  Ford: ['Ranger', 'Everest', 'Territory', 'Explorer', 'Mustang', 'Expedition'],
  Isuzu: ['D-Max', 'mu-X', 'N-Series', 'F-Series'],
  Mazda: ['Mazda2', 'Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'CX-8', 'CX-9', 'BT-50', 'MX-5'],
  Suzuki: ['S-Presso', 'Celerio', 'Dzire', 'Swift', 'Ertiga', 'XL7', 'Jimny', 'APV', 'Carry'],
  Hyundai: ['Reina', 'Accent', 'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Stargazer', 'Staria', 'H-100'],
  Kia: ['Soluto', 'Stonic', 'Seltos', 'Sportage', 'Sorento', 'Carnival', 'Picanto', 'K2500'],
  Chevrolet: ['Spark', 'Sonic', 'Cruze', 'Trailblazer', 'Tracker', 'Suburban', 'Tahoe'],
  Subaru: ['XV', 'Forester', 'Outback', 'WRX', 'Levorg', 'BRZ', 'Evoltis'],
  Volkswagen: ['Santana', 'Lamando', 'T-Cross', 'Tiguan', 'Lavida'],
  BMW: ['1 Series', '2 Series', '3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X7', 'Z4'],
  'Mercedes-Benz': ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLA', 'GLC', 'GLE', 'GLS', 'V-Class'],
  Audi: ['A3', 'A4', 'A6', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT'],
  Lexus: ['IS', 'ES', 'LS', 'UX', 'NX', 'RX', 'GX', 'LX'],
  Peugeot: ['301', '508', '2008', '3008', '5008', 'Partner'],
  MG: ['MG3', 'MG5', 'MG6', 'ZS', 'HS', 'RX8', 'Extender'],
  Geely: ['Emgrand', 'Coolray', 'Azkarra', 'Okavango', 'GX3 Pro', 'PandA'],
  Chery: ['Tiggo 2', 'Tiggo 5X', 'Tiggo 7 Pro', 'Tiggo 8 Pro', 'Arrizo 5'],
  BYD: ['Seagull', 'Dolphin', 'Atto 3', 'Seal', 'Han', 'Tang', 'E6'],
  GAC: ['GS3', 'GS4', 'GS8', 'Empow', 'Emzoom', 'M8'],
  JAC: ['S2', 'S3', 'S4', 'T6', 'T8', 'M3'],
  Foton: ['Tornado', 'Thunder', 'Traveller', 'Toano', 'Transvan'],
  Tesla: ['Model 3', 'Model S', 'Model X', 'Model Y', 'Cybertruck'],
  'Land Rover': ['Defender', 'Discovery Sport', 'Discovery', 'Range Rover Evoque', 'Range Rover Velar', 'Range Rover Sport', 'Range Rover'],
  Volvo: ['S60', 'S90', 'XC40', 'XC60', 'XC90', 'V60'],
  Jeep: ['Wrangler', 'Cherokee', 'Grand Cherokee', 'Compass', 'Renegade'],
  Dodge: ['Charger', 'Challenger', 'Durango'],
  Ram: ['1500', '2500', '3500'],
  Mini: ['Cooper', 'Countryman', 'Clubman']
};

const vehicleCatalog = Object.fromEntries(
  Object.entries(baseVehicleCatalog).map(([brand, models]) => [
    brand,
    Object.fromEntries(models.map((model) => [model, [...yearOptions]]))
  ])
);

const dieselModelKeys = new Set([
  'Toyota|Fortuner', 'Toyota|Hilux', 'Toyota|Innova', 'Toyota|Land Cruiser', 'Toyota|Coaster', 'Toyota|Hiace',
  'Mitsubishi|Montero Sport', 'Mitsubishi|Strada', 'Mitsubishi|L300',
  'Nissan|Navara', 'Nissan|Terra', 'Nissan|Patrol',
  'Ford|Ranger', 'Ford|Everest',
  'Isuzu|D-Max', 'Isuzu|mu-X', 'Isuzu|N-Series', 'Isuzu|F-Series',
  'Mazda|BT-50',
  'Hyundai|Santa Fe', 'Hyundai|Staria', 'Hyundai|H-100',
  'Kia|Sorento', 'Kia|Carnival', 'Kia|K2500',
  'Chevrolet|Trailblazer',
  'Peugeot|Partner',
  'MG|Extender',
  'Foton|Tornado', 'Foton|Thunder', 'Foton|Traveller', 'Foton|Toano', 'Foton|Transvan',
  'Land Rover|Defender', 'Land Rover|Discovery Sport', 'Land Rover|Discovery',
  'Land Rover|Range Rover', 'Land Rover|Range Rover Sport', 'Land Rover|Range Rover Velar', 'Land Rover|Range Rover Evoque'
]);

const mixedFuelModelKeys = new Set(['Hyundai|Accent']);

const statusBadgeMap = {
  Confirmed: 'bg-success-subtle text-success-emphasis border border-success-subtle',
  'In Progress': 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
  Completed: 'bg-primary-subtle text-primary-emphasis border border-primary-subtle'
};

const navLinks = document.querySelectorAll('[data-view-target]');
const views = document.querySelectorAll('.crm-view');
const viewAllAppointmentsBtn = document.getElementById('viewAllAppointmentsBtn');
const goAppointmentsBtn = document.getElementById('goAppointmentsBtn');
const goCustomersBtn = document.getElementById('goCustomersBtn');

const recentAppointmentsBody = document.getElementById('recentAppointmentsBody');
const appointmentsTabBody = document.getElementById('appointmentsTabBody');
const customersBody = document.getElementById('customersBody');

const totalAppointmentsCount = document.getElementById('totalAppointmentsCount');
const confirmedAppointmentsCount = document.getElementById('confirmedAppointmentsCount');
const completedAppointmentsCount = document.getElementById('completedAppointmentsCount');
const totalCustomersCount = document.getElementById('totalCustomersCount');
const repeatCustomersCount = document.getElementById('repeatCustomersCount');
const customerSearchInput = document.getElementById('customerSearchInput');

const newAppointmentForm = document.getElementById('newAppointmentForm');
const modalElement = document.getElementById('newAppointmentModal');
const appointmentModal = new bootstrap.Modal(modalElement);
const appointmentToastElement = document.getElementById('appointmentToast');
const appointmentToastBody = document.getElementById('appointmentToastBody');
const appointmentToast = new bootstrap.Toast(appointmentToastElement, { delay: 2200 });

const customerInput = document.getElementById('customerInput');
const mobileInput = document.getElementById('mobileInput');
const addressInput = document.getElementById('addressInput');
const brandSelect = document.getElementById('brandSelect');
const modelSelect = document.getElementById('modelSelect');
const yearSelect = document.getElementById('yearSelect');
const fuelTypeInput = document.getElementById('fuelTypeInput');
const fuelTypeManualWrap = document.getElementById('fuelTypeManualWrap');
const fuelTypeManualSelect = document.getElementById('fuelTypeManualSelect');
const plateInput = document.getElementById('plateInput');
const serviceSelect = document.getElementById('serviceSelect');
const otherServiceWrap = document.getElementById('otherServiceWrap');
const serviceOtherInput = document.getElementById('serviceOtherInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const statusInput = document.getElementById('statusInput');

const today = new Date().toISOString().split('T')[0];
dateInput.min = today;
dateInput.value = today;

function switchView(viewId) {
  views.forEach((view) => view.classList.add('d-none'));
  navLinks.forEach((link) => link.classList.remove('active'));

  const activeView = document.getElementById(viewId);
  if (activeView) {
    activeView.classList.remove('d-none');
  }

  const activeLink = document.querySelector(`[data-view-target="${viewId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    switchView(link.dataset.viewTarget);
  });
});

if (viewAllAppointmentsBtn) {
  viewAllAppointmentsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    switchView('appointmentsView');
  });
}
if (goAppointmentsBtn) {
  goAppointmentsBtn.addEventListener('click', () => switchView('appointmentsView'));
}
if (goCustomersBtn) {
  goCustomersBtn.addEventListener('click', () => switchView('customersView'));
}

function populateSelect(select, options, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  options.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

function resetVehicleSelectors() {
  populateSelect(modelSelect, [], 'Select model');
  populateSelect(yearSelect, [], 'Select year');
  modelSelect.disabled = true;
  yearSelect.disabled = true;
}

function initializeVehicleSelectors() {
  populateSelect(brandSelect, Object.keys(vehicleCatalog), 'Select brand');
  resetVehicleSelectors();
  fuelTypeInput.value = '';
  fuelTypeManualWrap.classList.add('d-none');
  fuelTypeManualSelect.required = false;
  fuelTypeManualSelect.value = '';
}

function isMixedFuelModel(brand, model) {
  return mixedFuelModelKeys.has(`${brand}|${model}`);
}

function inferFuelType(brand, model, year) {
  if (!brand || !model || !year) {
    return '';
  }
  return dieselModelKeys.has(`${brand}|${model}`) ? 'Diesel' : 'Gasoline';
}

brandSelect.addEventListener('change', () => {
  const selectedBrand = brandSelect.value;
  fuelTypeInput.value = '';
  fuelTypeManualWrap.classList.add('d-none');
  fuelTypeManualSelect.required = false;
  fuelTypeManualSelect.value = '';

  if (!selectedBrand) {
    resetVehicleSelectors();
    return;
  }

  const models = Object.keys(vehicleCatalog[selectedBrand]);
  populateSelect(modelSelect, models, 'Select model');
  modelSelect.disabled = false;
  populateSelect(yearSelect, [], 'Select year');
  yearSelect.disabled = true;
});

modelSelect.addEventListener('change', () => {
  const selectedBrand = brandSelect.value;
  const selectedModel = modelSelect.value;
  fuelTypeInput.value = '';
  fuelTypeManualWrap.classList.add('d-none');
  fuelTypeManualSelect.required = false;
  fuelTypeManualSelect.value = '';

  if (!selectedBrand || !selectedModel) {
    populateSelect(yearSelect, [], 'Select year');
    yearSelect.disabled = true;
    return;
  }

  const years = vehicleCatalog[selectedBrand][selectedModel] || [];
  populateSelect(yearSelect, years, 'Select year');
  yearSelect.disabled = false;
});

yearSelect.addEventListener('change', () => {
  const selectedBrand = brandSelect.value;
  const selectedModel = modelSelect.value;
  const selectedYear = yearSelect.value;

  if (isMixedFuelModel(selectedBrand, selectedModel)) {
    fuelTypeInput.value = 'Mixed fuel model';
    fuelTypeManualWrap.classList.remove('d-none');
    fuelTypeManualSelect.required = true;
    return;
  }

  fuelTypeManualWrap.classList.add('d-none');
  fuelTypeManualSelect.required = false;
  fuelTypeManualSelect.value = '';
  fuelTypeInput.value = inferFuelType(selectedBrand, selectedModel, selectedYear);
});

serviceSelect.addEventListener('change', () => {
  const isOther = serviceSelect.value === 'Other';
  otherServiceWrap.classList.toggle('d-none', !isOther);
  serviceOtherInput.required = isOther;

  if (!isOther) {
    serviceOtherInput.value = '';
  }
});

function formatTimeTo12Hour(time24) {
  const [hoursText, minutes] = time24.split(':');
  const hours = Number(hoursText);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${String(hour12).padStart(2, '0')}:${minutes} ${suffix}`;
}

function formatDate(dateText) {
  const date = new Date(`${dateText}T00:00:00`);
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }).format(date);
}

function buildAppointmentRow(item, compact = false) {
  const badgeClass = statusBadgeMap[item.status] || 'bg-secondary-subtle text-secondary-emphasis border border-secondary-subtle';
  if (compact) {
    return `
      <td class="fw-semibold">${item.customer}</td>
      <td>${item.vehicle}</td>
      <td>${item.service}</td>
      <td>${item.date}</td>
      <td><span class="badge rounded-pill ${badgeClass}">${item.status}</span></td>
    `;
  }

  return `
    <td class="fw-semibold">${item.customer}</td>
    <td>${item.mobile}</td>
    <td>${item.vehicle}</td>
    <td>${item.fuelType}</td>
    <td>${item.plate}</td>
    <td>${item.service}</td>
    <td>${item.date}</td>
    <td>${item.time}</td>
    <td><span class="badge rounded-pill ${badgeClass}">${item.status}</span></td>
  `;
}

function renderRecentAppointments() {
  recentAppointmentsBody.innerHTML = '';
  const recent = dashboardData.appointments.slice(0, 5);

  if (recent.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="5" class="text-center text-secondary py-4">No appointments yet</td>';
    recentAppointmentsBody.appendChild(emptyRow);
    return;
  }

  recent.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = buildAppointmentRow(item, true);
    recentAppointmentsBody.appendChild(tr);
  });
}

function renderAppointmentsTab() {
  appointmentsTabBody.innerHTML = '';

  if (dashboardData.appointments.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="9" class="text-center text-secondary py-4">No appointments yet</td>';
    appointmentsTabBody.appendChild(emptyRow);
  } else {
    dashboardData.appointments.forEach((item) => {
      const tr = document.createElement('tr');
      tr.innerHTML = buildAppointmentRow(item, false);
      appointmentsTabBody.appendChild(tr);
    });
  }

  totalAppointmentsCount.textContent = String(dashboardData.appointments.length);
  confirmedAppointmentsCount.textContent = String(dashboardData.appointments.filter((a) => a.status === 'Confirmed').length);
  completedAppointmentsCount.textContent = String(dashboardData.appointments.filter((a) => a.status === 'Completed').length);
}

function getCustomersSummary() {
  const map = new Map();

  dashboardData.appointments.forEach((appointment) => {
    const key = `${appointment.customer}|${appointment.mobile}`;
    const existing = map.get(key) || {
      customer: appointment.customer,
      mobile: appointment.mobile,
      address: appointment.address || '-',
      vehicles: new Set(),
      visits: 0,
      lastServiceDate: appointment.date
    };

    existing.vehicles.add(appointment.vehicle);
    existing.visits += 1;
    existing.lastServiceDate = appointment.date;
    if (appointment.address) {
      existing.address = appointment.address;
    }

    map.set(key, existing);
  });

  return Array.from(map.values()).map((item) => ({
    ...item,
    vehicleCount: item.vehicles.size
  }));
}

function renderCustomers(filterText = '') {
  customersBody.innerHTML = '';
  const allCustomers = getCustomersSummary();
  const normalized = filterText.trim().toLowerCase();
  const filteredCustomers = normalized
    ? allCustomers.filter((item) => item.customer.toLowerCase().includes(normalized) || item.mobile.includes(normalized))
    : allCustomers;

  totalCustomersCount.textContent = String(allCustomers.length);
  repeatCustomersCount.textContent = String(allCustomers.filter((c) => c.visits > 1).length);

  if (filteredCustomers.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="6" class="text-center text-secondary py-4">No customers found</td>';
    customersBody.appendChild(emptyRow);
    return;
  }

  filteredCustomers.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="fw-semibold">${item.customer}</td>
      <td>${item.mobile}</td>
      <td>${item.address || '-'}</td>
      <td>${item.vehicleCount}</td>
      <td>${item.visits}</td>
      <td>${item.lastServiceDate}</td>
    `;
    customersBody.appendChild(tr);
  });
}

if (customerSearchInput) {
  customerSearchInput.addEventListener('input', () => {
    renderCustomers(customerSearchInput.value);
  });
}

function renderAll() {
  renderRecentAppointments();
  renderAppointmentsTab();
  renderCustomers(customerSearchInput ? customerSearchInput.value : '');
}

newAppointmentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!newAppointmentForm.checkValidity()) {
    newAppointmentForm.classList.add('was-validated');
    return;
  }

  const customer = customerInput.value.trim();
  const mobile = mobileInput.value.trim();
  const address = addressInput.value.trim();
  const vehicle = `${brandSelect.value} ${modelSelect.value} ${yearSelect.value}`.trim();
  const fuelType = fuelTypeManualSelect.required ? fuelTypeManualSelect.value : fuelTypeInput.value;
  const plate = plateInput.value.trim().toUpperCase();
  let service = serviceSelect.value.trim();
  if (service === 'Other') {
    service = serviceOtherInput.value.trim();
  }
  const date = dateInput.value;
  const time = timeInput.value;
  const status = statusInput.value;

  dashboardData.appointments.unshift({
    customer,
    mobile,
    address,
    vehicle,
    fuelType,
    plate,
    service,
    date: formatDate(date),
    time: formatTimeTo12Hour(time),
    status
  });

  renderAll();
  newAppointmentForm.reset();
  newAppointmentForm.classList.remove('was-validated');
  initializeVehicleSelectors();
  dateInput.value = today;
  statusInput.value = 'Confirmed';
  serviceSelect.value = '';
  fuelTypeInput.value = '';
  fuelTypeManualWrap.classList.add('d-none');
  fuelTypeManualSelect.required = false;
  fuelTypeManualSelect.value = '';
  otherServiceWrap.classList.add('d-none');
  serviceOtherInput.required = false;
  serviceOtherInput.value = '';
  appointmentModal.hide();

  appointmentToastBody.textContent = `${customer} booked ${service} on ${formatDate(date)}.`;
  appointmentToast.show();
});

modalElement.addEventListener('shown.bs.modal', () => {
  customerInput.focus();
});

modalElement.addEventListener('hidden.bs.modal', () => {
  newAppointmentForm.classList.remove('was-validated');
});

initializeVehicleSelectors();
renderAll();
switchView('dashboardView');

const revenueLabels = dashboardData.revenue.labels;
const revenueValues = dashboardData.revenue.values;

const revenueCtx = document.getElementById('revenueChart');
new Chart(revenueCtx, {
  type: 'line',
  data: {
    labels: revenueLabels,
    datasets: [{
      label: 'Revenue (PHP)',
      data: revenueValues,
      borderColor: '#0e7490',
      backgroundColor: 'rgba(14, 116, 144, 0.15)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointBackgroundColor: '#0e7490'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `\u20B1${value}`
        }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: revenueValues.length > 0 }
    }
  }
});

const serviceLabels = dashboardData.serviceDistribution.labels;
const serviceValues = dashboardData.serviceDistribution.values;

const serviceCtx = document.getElementById('serviceChart');
new Chart(serviceCtx, {
  type: 'doughnut',
  data: {
    labels: serviceLabels.length ? serviceLabels : ['No data'],
    datasets: [{
      data: serviceValues.length ? serviceValues : [1],
      backgroundColor: serviceValues.length
        ? ['#0e7490', '#f97316', '#22c55e', '#e11d48']
        : ['#cbd5e1'],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        enabled: serviceValues.length > 0
      }
    }
  }
});
