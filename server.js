const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/bot", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./user_data",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    const number = "919096041005";
    const message = "Auto message without click 🚀";

    const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;

    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 0,
    });

    console.log("WhatsApp opened");

    // ✅ WAIT for message box (important)
    const box = await page.waitForSelector('footer div[contenteditable="true"]');

    await delay(2000);

    // ✅ CLICK to focus (VERY IMPORTANT)
    await box.click();

    await delay(1000);

    // ✅ PRESS ENTER (auto send)
    await page.keyboard.press("Enter");

    console.log("Message sent automatically ✅");

    res.send("Message auto-sent!");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});