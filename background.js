// Liste aller zu blockierenden GAFAM-Domains
const blockedDomains = [
  // Google
  "google.com", "google.*", "youtube.com", "gmail.com", "googleapis.com",
  "googletagmanager.com", "google-analytics.com", "android.com",
  "blogger.com", "doubleclick.net",
  // Apple
  "apple.com", "icloud.com", "itunes.com", "apple-mapkit.com",
  // Facebook/Meta
  "facebook.com", "instagram.com", "whatsapp.com", "messenger.com",
  "oculus.com",
  // Amazon
  "amazon.com", "aws.amazon.com", "twitch.tv", "amazon-adsystem.com",
  // Microsoft
  "microsoft.com", "linkedin.com", "github.com", "office.com", "bing.com",
  "microsoftonline.com", "azure.com", "skype.com", "xbox.com"
];

// Standardmäßig aktiviert
let isActive = true;

function blockRequest(details) {
  if (!isActive) return { cancel: false };

  for (const domain of blockedDomains) {
    if (details.url.includes(domain)) {
      // Umleitung zur lokalen blocked.html
      return {
        redirectUrl: browser.extension.getURL("blocked.html")
      };
    }
  }
  return { cancel: false };
}

// Registriere den Request-Blocker
browser.webRequest.onBeforeRequest.addListener(
  blockRequest,
  { urls: ["<all_urls>"] },
  ["blocking"]
);

// Speichere den Status (ein/aus)
browser.storage.local.get("active").then((data) => {
  if (data.active !== undefined) {
    isActive = data.active;
  }
});

// Höre auf Änderungen des Status
browser.storage.onChanged.addListener((changes) => {
  if (changes.active) {
    isActive = changes.active.newValue;
  }
});