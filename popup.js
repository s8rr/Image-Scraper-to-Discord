document.getElementById("sendToDiscord").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: scrapeAllImages,
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
        if (image.startsWith("data:image")) {
          // Send base64-encoded images
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: "Image uploaded:",
              username: "Image Scraper Bot",
              embeds: [{ image: { url: image } }],
            }),
          });
        } else {
          // Send URLs for background images
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              content: `Background Image URL: ${image}`,
              username: "Image Scraper Bot",
            }),
          });
        }
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
      function: scrapeAllImages,
    },
    (results) => {
      const images = results[0].result;
      if (images.length === 0) {
        document.getElementById("status").innerText = "No images found!";
        return;
      }
      images.forEach((image, index) => {
        if (image.startsWith("data:image")) {
          const a = document.createElement("a");
          a.href = image;
          a.download = `image-${index + 1}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
      document.getElementById("status").innerText = "Images downloaded!";
    }
  );
});

// Function to scrape all images, including background images
function scrapeAllImages() {
  const images = [];

  // Scrape all <img> elements
  document.querySelectorAll("img").forEach((img) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      images.push(canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("Error processing <img>: ", img.src, error);
    }
  });

  // Scrape elements with background images
  document.querySelectorAll("*").forEach((element) => {
    const bgImage = window.getComputedStyle(element).backgroundImage;
    if (bgImage && bgImage.startsWith("url(")) {
      const url = bgImage.slice(5, -2); // Extract URL from `url("...")`
      images.push(url);
    }
  });

  return images;
}
