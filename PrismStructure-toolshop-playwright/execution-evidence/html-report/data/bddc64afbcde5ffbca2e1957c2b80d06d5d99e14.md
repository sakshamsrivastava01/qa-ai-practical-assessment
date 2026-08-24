# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\auth.spec.js >> AC1 - User Registration & Login @ui >> TC-UI-01 new user can register with valid details @smoke @regression
- Location: tests\ui\auth.spec.js:13:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\/login/
Received string:  "https://practicesoftwaretesting.com/auth/register"
Timeout: 8000ms

Call log:
  - Expect "toHaveURL" with timeout 8000ms
    18 × locator resolved to <html lang="en" data-beasties-container="">…</html>
       - unexpected value "https://practicesoftwaretesting.com/auth/register"

```

```yaml
- text: View the
- link "Documentation":
  - /url: https://testsmith-io.github.io/practice-software-testing/#/
- text: for this application. Practice Black Box Testing & Bug Hunting
- button "Testing Guide"
- button "🐛 Bug Hunting"
- navigation:
  - link "Practice Software Testing - Toolshop":
    - /url: /
    - img
  - menubar "Main menu":
    - menuitem "Home":
      - link "Home":
        - /url: /
    - menuitem "Categories":
      - button "Categories"
    - menuitem "Contact":
      - link "Contact":
        - /url: /contact
    - menuitem "Sign in":
      - link "Sign in":
        - /url: /auth/login
  - button "Select language": EN
- heading "Customer registration" [level=3]
- text: First name
- textbox "First name":
  - /placeholder: First name *
  - text: Naomie
- text: Last name
- textbox "Last name":
  - /placeholder: Your last name *
  - text: Roob
- text: Date of Birth *
- textbox "Date of Birth *":
  - /placeholder: YYYY-MM-DD
  - text: 1996-05-14
- text: Country
- combobox "Country":
  - option "Albania"
  - option "Åland Islands"
  - option "Algeria"
  - option "American Samoa"
  - option "Andorra"
  - option "Angola"
  - option "Anguilla"
  - option "Antarctica"
  - option "Antigua and Barbuda"
  - option "Argentina"
  - option "Armenia"
  - option "Aruba"
  - option "Australia"
  - option "Austria"
  - option "Azerbaijan"
  - option "Bahamas (the)"
  - option "Bahrain"
  - option "Bangladesh"
  - option "Barbados"
  - option "Belarus"
  - option "Belgium"
  - option "Belize"
  - option "Benin"
  - option "Bermuda"
  - option "Bhutan"
  - option "Bolivia (Plurinational State of)"
  - option "Bonaire, Sint Eustatius and Saba"
  - option "Bosnia and Herzegovina"
  - option "Botswana"
  - option "Bouvet Island"
  - option "Brazil"
  - option "British Indian Ocean Territory (the)"
  - option "Brunei Darussalam"
  - option "Bulgaria"
  - option "Burkina Faso"
  - option "Burundi"
  - option "Cabo Verde"
  - option "Cambodia"
  - option "Cameroon"
  - option "Canada"
  - option "Cayman Islands (the)"
  - option "Central African Republic (the)"
  - option "Chad"
  - option "Chile"
  - option "China"
  - option "Christmas Island"
  - option "Cocos (Keeling) Islands (the)"
  - option "Colombia"
  - option "Comoros (the)"
  - option "Congo (the Democratic Republic of the)"
  - option "Congo (the)"
  - option "Cook Islands (the)"
  - option "Costa Rica"
  - option "Croatia"
  - option "Cuba"
  - option "Curaçao"
  - option "Cyprus"
  - option "Czechia"
  - option "Côte d'Ivoire"
  - option "Denmark"
  - option "Djibouti"
  - option "Dominica"
  - option "Dominican Republic (the)"
  - option "Ecuador"
  - option "Egypt"
  - option "El Salvador"
  - option "Equatorial Guinea"
  - option "Eritrea"
  - option "Estonia"
  - option "Eswatini"
  - option "Ethiopia"
  - option "Falkland Islands (the) [Malvinas]"
  - option "Faroe Islands (the)"
  - option "Fiji"
  - option "Finland"
  - option "France"
  - option "French Guiana"
  - option "French Polynesia"
  - option "French Southern Territories (the)"
  - option "Gabon"
  - option "Gambia (the)"
  - option "Georgia"
  - option "Germany" [selected]
  - option "Ghana"
  - option "Gibraltar"
  - option "Greece"
  - option "Greenland"
  - option "Grenada"
  - option "Guadeloupe"
  - option "Guam"
  - option "Guatemala"
  - option "Guernsey"
  - option "Guinea"
  - option "Guinea-Bissau"
  - option "Guyana"
  - option "Haiti"
  - option "Heard Island and McDonald Islands"
  - option "Holy See (the)"
  - option "Honduras"
  - option "Hong Kong"
  - option "Hungary"
  - option "Iceland"
  - option "India"
  - option "Indonesia"
  - option "Iran (Islamic Republic of)"
  - option "Iraq"
  - option "Ireland"
  - option "Isle of Man"
  - option "Israel"
  - option "Italy"
  - option "Jamaica"
  - option "Japan"
  - option "Jersey"
  - option "Jordan"
  - option "Kazakhstan"
  - option "Kenya"
  - option "Kiribati"
  - option "Korea (the Democratic People's Republic of)"
  - option "Korea (the Republic of)"
  - option "Kuwait"
  - option "Kyrgyzstan"
  - option "Lao People's Democratic Republic (the)"
  - option "Latvia"
  - option "Lebanon"
  - option "Lesotho"
  - option "Liberia"
  - option "Libya"
  - option "Liechtenstein"
  - option "Lithuania"
  - option "Luxembourg"
  - option "Macao"
  - option "Madagascar"
  - option "Malawi"
  - option "Malaysia"
  - option "Maldives"
  - option "Mali"
  - option "Malta"
  - option "Marshall Islands (the)"
  - option "Martinique"
  - option "Mauritania"
  - option "Mauritius"
  - option "Mayotte"
  - option "Mexico"
  - option "Micronesia (Federated States of)"
  - option "Moldova (the Republic of)"
  - option "Monaco"
  - option "Mongolia"
  - option "Montenegro"
  - option "Montserrat"
  - option "Morocco"
  - option "Mozambique"
  - option "Myanmar"
  - option "Namibia"
  - option "Nauru"
  - option "Nepal"
  - option "Netherlands (the)"
  - option "New Caledonia"
  - option "New Zealand"
  - option "Nicaragua"
  - option "Niger (the)"
  - option "Nigeria"
  - option "Niue"
  - option "Norfolk Island"
  - option "Northern Mariana Islands (the)"
  - option "Norway"
  - option "Oman"
  - option "Pakistan"
  - option "Palau"
  - option "Palestine, State of"
  - option "Panama"
  - option "Papua New Guinea"
  - option "Paraguay"
  - option "Peru"
  - option "Philippines (the)"
  - option "Pitcairn"
  - option "Poland"
  - option "Portugal"
  - option "Puerto Rico"
  - option "Qatar"
  - option "Republic of North Macedonia"
  - option "Romania"
  - option "Russian Federation (the)"
  - option "Rwanda"
  - option "Réunion"
  - option "Saint Barthélemy"
  - option "Saint Helena, Ascension and Tristan da Cunha"
  - option "Saint Kitts and Nevis"
  - option "Saint Lucia"
  - option "Saint Martin (French part)"
  - option "Saint Pierre and Miquelon"
  - option "Saint Vincent and the Grenadines"
  - option "Samoa"
  - option "San Marino"
  - option "Sao Tome and Principe"
  - option "Saudi Arabia"
  - option "Senegal"
  - option "Serbia"
  - option "Seychelles"
  - option "Sierra Leone"
  - option "Singapore"
  - option "Sint Maarten (Dutch part)"
  - option "Slovakia"
  - option "Slovenia"
  - option "Solomon Islands"
  - option "Somalia"
  - option "South Africa"
  - option "South Georgia and the South Sandwich Islands"
  - option "South Sudan"
  - option "Spain"
  - option "Sri Lanka"
  - option "Sudan (the)"
  - option "Suriname"
  - option "Svalbard and Jan Mayen"
  - option "Sweden"
  - option "Switzerland"
  - option "Syrian Arab Republic"
  - option "Taiwan (Province of China)"
  - option "Tajikistan"
  - option "Tanzania, United Republic of"
  - option "Thailand"
  - option "Timor-Leste"
  - option "Togo"
  - option "Tokelau"
  - option "Tonga"
  - option "Trinidad and Tobago"
  - option "Tunisia"
  - option "Turkey"
  - option "Turkmenistan"
  - option "Turks and Caicos Islands (the)"
  - option "Tuvalu"
  - option "Uganda"
  - option "Ukraine"
  - option "United Arab Emirates (the)"
  - option "United Kingdom of Great Britain and Northern Ireland (the)"
  - option "United States Minor Outlying Islands (the)"
  - option "United States of America (the)"
  - option "Uruguay"
  - option "Uzbekistan"
  - option "Vanuatu"
  - option "Venezuela (Bolivarian Republic of)"
  - option "Viet Nam"
  - option "Virgin Islands (British)"
  - option "Virgin Islands (U.S.)"
  - option "Wallis and Futuna"
  - option "Western Sahara"
  - option "Yemen"
  - option "Zambia"
  - option "Zimbabwe"
- text: Choose your country and enter the postal code and house number. Street, city and state will be filled in automatically. Postal code
- textbox "Postal code":
  - /placeholder: Your Postcode *
  - text: "68384"
- text: House number
- textbox "House number":
  - /placeholder: e.g. 42 *
- alert: House number is required
- text: Street
- textbox "Street":
  - /placeholder: Your Street *
  - text: 6143 S College Street
- text: City
- textbox "City":
  - /placeholder: Your City *
  - text: South Manuela
- text: State
- textbox "State":
  - /placeholder: Your State *
  - text: Florida
- text: Phone
- textbox "Phone":
  - /placeholder: Your phone *
  - text: "9604000788"
- text: Email address
- textbox "Email address":
  - /placeholder: Your email *
  - text: qa.1787547998002.iutxaz@mailinator.com
- text: Password
- textbox "Password":
  - /placeholder: Your password
  - text: Welcome@2026
- button
- text: "Your password must:"
- list:
  - list:
    - listitem: Be at least 8 characters long
    - listitem: Contain both uppercase and lowercase letters
    - listitem: Include at least one number
    - listitem: "Have at least one special symbol (e.g., @, #, $, etc.)"
- text: "Password strength: Weak Moderate Strong Very Strong Excellent"
- button "Register"
- contentinfo:
  - text: This is a DEMO application (
  - link "GitHub repo":
    - /url: https://github.com/testsmith-io/practice-software-testing
  - text: ), used for software testing training purpose. |
  - link "Privacy Policy":
    - /url: /privacy
  - text: "| Banner photo by"
  - link "Barn Images":
    - /url: https://unsplash.com/@barnimages
  - text: "on"
  - link "Unsplash":
    - /url: https://unsplash.com/photos/t5YUoHW6zRo
  - text: . v2.4 | Built 2026-08-22 | Angular 20.0.5
- button "Open chat":
  - img
- button "Show live shop activity"
```

# Test source

```ts
  1  | // tests/ui/auth.spec.js
  2  | // AC1: User Registration & Login
  3  | // Covers: successful registration, successful login with registered
  4  | // credentials, profile verification, and negative login attempts.
  5  | const { test, expect } = require('@playwright/test');
  6  | const { RegisterPage } = require('../../src/pages/RegisterPage');
  7  | const { LoginPage } = require('../../src/pages/LoginPage');
  8  | const { HomePage } = require('../../src/pages/HomePage');
  9  | const { newUser } = require('../../src/utils/dataGenerator');
  10 | const seeded = require('../../test-data/users.json');
  11 | 
  12 | test.describe('AC1 - User Registration & Login @ui', () => {
  13 |   test('TC-UI-01 new user can register with valid details @smoke @regression', async ({ page }) => {
  14 |     const registerPage = new RegisterPage(page);
  15 |     const user = newUser();
  16 | 
  17 |     await registerPage.open();
  18 |     await registerPage.register(user);
  19 | 
  20 |     // Toolshop redirects to the login page with a success banner on success.
> 21 |     await expect(page).toHaveURL(/\/auth\/login/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  22 |     await expect(page.getByText(/registration complete|please proceed to login/i)).toBeVisible();
  23 |   });
  24 | 
  25 |   test('TC-UI-02 registration fails with duplicate / already-used email @regression', async ({ page }) => {
  26 |     const registerPage = new RegisterPage(page);
  27 |     const user = newUser({ email: seeded.seededUsers.customer1.email });
  28 | 
  29 |     await registerPage.open();
  30 |     await registerPage.register(user);
  31 | 
  32 |     await expect(registerPage.errors.first()).toBeVisible();
  33 |   });
  34 | 
  35 |   test('TC-UI-03 registered user can log in with valid credentials @smoke @regression', async ({ page }) => {
  36 |     const loginPage = new LoginPage(page);
  37 |     const homePage = new HomePage(page);
  38 |     const { email, password } = seeded.seededUsers.customer1;
  39 | 
  40 |     await loginPage.open();
  41 |     await loginPage.login(email, password);
  42 | 
  43 |     await expect(page).toHaveURL(/\/account|\/$/);
  44 |     await expect(homePage.accountMenu).toBeVisible();
  45 |   });
  46 | 
  47 |   test('TC-UI-04 login fails with an incorrect password @smoke @regression', async ({ page }) => {
  48 |     const loginPage = new LoginPage(page);
  49 |     const { email } = seeded.seededUsers.customer1;
  50 | 
  51 |     await loginPage.open();
  52 |     await loginPage.login(email, 'WrongPassword123');
  53 | 
  54 |     await expect(loginPage.error).toBeVisible();
  55 |     await expect(page).toHaveURL(/\/auth\/login/);
  56 |   });
  57 | 
  58 |   test('TC-UI-05 logged-in user can view and verify their profile information @regression', async ({ page }) => {
  59 |     const loginPage = new LoginPage(page);
  60 |     const homePage = new HomePage(page);
  61 |     const { email, password } = seeded.seededUsers.customer1;
  62 | 
  63 |     await loginPage.open();
  64 |     await loginPage.login(email, password);
  65 |     await homePage.accountMenu.click();
  66 |     await homePage.myProfileLink.click();
  67 | 
  68 |     await expect(page).toHaveURL(/\/account\/profile/);
  69 |     await expect(page.locator('[data-test="email"]')).toHaveValue(email);
  70 |   });
  71 | 
  72 |   // TC-UI-06 (sign-out) is covered as a manual test case in
  73 |   // FunctionalTestCase.csv rather than automated, to stay within the
  74 |   // 5-8 automated-cases-per-type limit set for this assessment.
  75 | });
  76 | 
```