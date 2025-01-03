# Image Scraper & Sender

A Chrome extension to scrape all images (including `<img>` elements and background images) from a webpage and either:

1. Send them to a Discord channel via a webhook.
2. Download them locally to your computer.

## Features

- Detects images loaded in `<img>` tags.
- Captures images set as CSS background images.
- Sends images directly to Discord using a webhook.
- Downloads images locally with one click.

## Installation

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable **Developer Mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension will appear in your Chrome toolbar with the name "Image Scraper & Sender."

## Usage

### Sending Images to Discord

1. Open the webpage containing the images you want to scrape.
2. Click on the **Image Scraper & Sender** extension icon in your toolbar.
3. Click **"Send Images to Discord"**.
4. Enter your Discord webhook URL when prompted.
5. The images will be sent to the specified Discord channel.

### Downloading Images Locally

1. Open the webpage containing the images you want to scrape.
2. Click on the **Image Scraper & Sender** extension icon in your toolbar.
3. Click **"Download Images"**.
4. The images will be downloaded as `.png` files to your `Downloads` folder.

## How It Works

The extension uses JavaScript to:
- Scrape all `<img>` elements on the webpage.
- Scrape CSS `background-image` styles applied to elements.
- Convert the images into base64 data (for `<img>` elements) or capture their URLs (for background images).
- Send the images to Discord via a webhook or download them locally.

## File Structure
````c
.
├── manifest.json     # Chrome extension manifest
├── popup.html        # Popup UI for the extension
├── popup.js          # JavaScript logic for the extension
├── icon.png          # Icon for the extension
└── README.md         # This file
````

## Requirements

- Google Chrome browser
- Discord webhook URL (for sending images to Discord)

## Adding a Discord Webhook

1. Go to your Discord server.
2. Navigate to **Server Settings > Integrations > Webhooks**.
3. Click **New Webhook**.
4. Copy the Webhook URL and save it for use in the extension.

## Troubleshooting

- **No images found**: Check if the webpage dynamically loads images or uses unusual methods to display them (e.g., canvas or non-standard tags).
- **Background images not captured**: Ensure that the `background-image` URLs are accessible from the webpage.
- **Discord webhook not working**: Double-check your webhook URL and ensure the server allows webhooks.
- **Icon not loading**: Make sure the `icon.png` file is in the root directory of the extension and is at least 128x128 pixels.

## Contributing

Feel free to fork this repository, create a new branch, and submit a pull request if you want to improve or extend the functionality of this extension.

## License

This project is licensed under the [MIT License](LICENSE).
