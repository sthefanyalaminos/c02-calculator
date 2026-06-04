# CO₂ Emission Calculator

[Traduzir para Português](https://github.com/sthefanyalaminos/c02-calculator/blob/main/README.md)

> An interactive web tool to estimate the environmental impact of travel, helping users make more conscious and sustainable transportation choices.

<div align="right">
<a href="https://sthefanyalaminos.github.io/c02-calculator/">Click here to access!</a>
</div>

<div align="center">
<img src="assets/readme_img1.png" height="400px" width="auto">
<img src="assets/readme_img2.png" height="400px" width="auto">
<img src="assets/readme_img3.png" height="400px" width="auto">
</div>

---

The **CO₂ Emission Calculator** is a front-end application that simulates the environmental impact of travel, estimating the amount of carbon emitted based on factors such as distance traveled, mode of transport, and trip profile.

The project was built to promote environmental awareness, giving users a clear comparison between different means of transportation and encouraging more sustainable everyday choices.

---

## Features

- **Automatic distance calculation** between origin and destination cities
- **Manual distance entry**, if preferred
- **Support for multiple transport modes:**
  - Bicycle
  - Car
  - Bus
  - Truck
- **Results display** with estimated CO₂ emitted (in kg)
- **Cross-modal comparison** to support more sustainable decisions
- **City autocomplete** to streamline form filling

---

## Technologies Used

- **HTML5** – semantic and accessible structure
- **CSS3** – responsive styling using the BEM methodology
- **JavaScript (ES6+)** – calculation logic, DOM manipulation, and interactivity

---

## Project Structure

```
calculadora-co2/
│
├── index.html              # Main application page
│
├── css/
│   └── style.css           # Application styles
│
└── js/
├── routes-data.js      # Route and distance database
├── config.js           # Settings and emission factors
├── calculator.js       # CO₂ calculation logic
├── ui.js               # User interface manipulation
└── app.js              # Initialization and orchestration
```

---

## How to Use

1. Type the **origin city** in the corresponding field;
2. Type the **destination city**;
3. The **distance will be filled in automatically**, or enable the manual entry option;
4. Select the desired **transport mode**;
5. Click **"Calculate Emission"**;
6. View the result and the comparison with other transport modes.

---

## Motivation

As environmental concerns continue to grow, understanding the impact of our travel choices is an important step toward sustainability. This project aims to make that information accessible and visual, encouraging people to reflect on lower-carbon transportation alternatives.

---

## Authorship

Developed by Sthefany Alaminos during the CI&T Bootcamp – From Prompt to Agent, hosted by DIO.