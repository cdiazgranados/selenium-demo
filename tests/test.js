const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function test_case() {
  //create driver
  let driver = await new Builder().forBrowser("chrome").build();

  //send driver to website
  await driver.get("https://github.com");

  //grab and element from the page
  await driver.findElement(By.partialLinkText("Sign in")).click();

  console.log(await driver.getTitle());

  if ((await driver.getTitle()) === "GitHub: Let’s build from here · GitHub") {
    console.log("Test #1 success");
  } else {
    console.log("Test #1 failed");
    return;
  }

  await driver.findElement(By.name("login")).sendKeys("cdiazgranados");
  await driver
    .findElement(By.name("password"))
    .sendKeys("*********", Key.RETURN);

  if (
    await driver
      .findElement(By.className("flash-close js-flash-close"))
      .isDisplayed()
  ) {
    console.log("Test #2 success");
  }

  setInterval(function () {
    driver.quit();
  }, 10000);
}

test_case();
