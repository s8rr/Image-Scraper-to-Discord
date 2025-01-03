document.getElementById("sendToDiscord").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: scrapeImages
    },
    async (results) => {
      const images = results[0].result;
      if (images.length === 0) {
        document.getElementById("status").innerText = "No images found!";
        return;
      }
      const webhookUrl = prompt("Enter your Discord webhook URL:");
      if (!webhookUrl) return;

      for (const image of images) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `Image: ${image}`,
            username: "Image Scraper Bot"
          })
        });
      }
      document.getElementById("status").innerText = "Images sent to Discord!";
    }
  );
});

document.getElementById("downloadImages").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: scrapeImages
    },
    (results) => {
      const images = results[0].result;
      if (images.length === 0) {
        document.getElementById("status").innerText = "No images found!";
        return;
      }
      images.forEach((image) => {
        chrome.downloads.download({ url: image });
      });
      document.getElementById("status").innerText = "Images downloaded!";
    }
  );
});

function scrapeImages() {
  const images = Array.from(document.images).map((img) => img.src);
  return images;
}
