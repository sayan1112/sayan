// ...existing code...
const API_KEY = "c7236d36debb4636a18170654262201";
const DEFAULT_CITY = "pune";

const inputEl = document.querySelector("input");
const searchBtn = document.getElementById("search");

const temperatureEl = document.querySelector(".temperature");
const locationEl = document.querySelector(".location");
const timeEl = document.querySelector(".time");
const dayEl = document.querySelector(".day");
const dateEl = document.querySelector(".date");
const conditionEl = document.querySelector(".condition");
const iconImgEl = document.querySelector(".icon img");

function safeText(el, text) {
  if (!el) return;
  el.textContent = text ?? "";
}

function formatLocaltime(localtime) {
  // API gives "YYYY-MM-DD HH:MM"
  if (!localtime) return { date: "--", time: "--", day: "--" };
  const [datePart, timePart] = localtime.split(" ");
  const dt = new Date(`${datePart}T${timePart}:00`);
  const day = dt.toLocaleDateString(undefined, { weekday: "long" });
  return { date: datePart, time: timePart, day };
}

async function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(
    API_KEY
  )}&q=${encodeURIComponent(city)}&aqi=no`;

  const resp = await fetch(url);
  const data = await resp.json().catch(() => null);

  if (!resp.ok) {
    const msg = data && data.error && data.error.message ? data.error.message : `HTTP ${resp.status}`;
    throw new Error(msg);
  }
  if (data && data.error) {
    throw new Error(data.error.message || "Unknown API error");
  }
  return data;
}

function updateUI(data) {
  if (!data || !data.location || !data.current) return;

  const loc = data.location;
  const cur = data.current;

  safeText(temperatureEl, `${cur.temp_c.toFixed(1)} °C`);
  safeText(locationEl, `${loc.name}${loc.region ? ", " + loc.region : ""}, ${loc.country}`);

  const lt = formatLocaltime(loc.localtime);
  safeText(timeEl, lt.time);
  safeText(dayEl, lt.day);
  safeText(dateEl, lt.date);

  safeText(conditionEl, cur.condition?.text ?? "--");

  let iconUrl = cur.condition?.icon ?? "";
  if (iconUrl.startsWith("//")) iconUrl = "https:" + iconUrl;
  if (iconImgEl && iconUrl) {
    iconImgEl.src = iconUrl;
    iconImgEl.alt = cur.condition?.text ?? "weather";
    iconImgEl.style.display = "";
  } else if (iconImgEl) {
    iconImgEl.style.display = "none";
  }
}

function setLoading(isLoading) {
  if (searchBtn) searchBtn.disabled = isLoading;
  if (isLoading) {
    safeText(temperatureEl, "Loading...");
    safeText(conditionEl, "");
  }
}

async function handleSearch(city) {
  if (!city) {
    alert("Enter city name");
    return;
  }
  setLoading(true);
  try {
    const data = await fetchWeather(city);
    updateUI(data);
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to fetch weather data");
  } finally {
    setLoading(false);
  }
}

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const city = (inputEl?.value || "").trim() || DEFAULT_CITY;
    handleSearch(city);
  });
}

if (inputEl) {
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBtn?.click();
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const initial = (inputEl?.value || "").trim() || DEFAULT_CITY;
  handleSearch(initial);
});