document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = 'https://api.spacexdata.com/v4/rockets';
  
    try {
      const response = await fetch(apiUrl);
      const rockets = await response.json();
  
      let currentIndex = 0;
  
      const updateTextContent = (selector, content) => {
        const element = document.querySelector(selector);
        if (element) {
          element.textContent = content;
        }
      };
  
      const updateRocketInfo = () => {
        const rocket = rockets[currentIndex];
  
        // Actualizar nav__left
        const rocketDetails = document.getElementById('rocketDetails');
        rocketDetails.innerHTML = `
          <h2>Rocket Details</h2>
          <div class="container__weight">
            <h3>Height</h3>
            <img src="../storage/image/height.png" referrerpolicy="no-referrer">
            <p>Meters: ${rocket.height.meters}</p>
            <p>||</p>
            <p>Feet: ${rocket.height.feet}</p>
          </div>
          <div class="container__weight">
            <h3>Diameter</h3>
            <img src="../storage/image/diameter.png" referrerpolicy="no-referrer">
            <p>Meters: ${rocket.diameter.meters}</p>
            <p>||</p>
            <p>Feet: ${rocket.diameter.feet}</p>
          </div>
          <div class="container__weight">
            <h3>Mass</h3>
            <img src="../storage/image/weight.png" referrerpolicy="no-referrer">
            <p>Kg: ${rocket.mass.kg}</p>
            <p>||</p>
            <p>Lb: ${rocket.mass.lb}</p>
          </div>
          <h2>Engines</h2>
          <div class="container__weight">
            <h4>ISP (Specific Impulse)</h4>
            <img src="../storage/image/weight.png" referrerpolicy="no-referrer">
            <p>Sea Level: ${rocket.engines.isp.sea_level}</p>
            <p>||</p>
            <p>Vacuum: ${rocket.engines.isp.vacuum}</p>
          </div>
          <div class="container__weight">
            <h4>Thrust</h4>
            <img src="../storage/image/weight.png" referrerpolicy="no-referrer">
            <p>Sea Level(kN): ${rocket.engines.thrust_sea_level.kN}</p>
            <p>||</p>
            <p>Sea Level(lbf): ${rocket.engines.thrust_sea_level.lbf}</p>
          </div>
          <div class="container__weight">
            <h4>Thrust Vacuum</h4>
            <img src="../storage/image/weight.png" referrerpolicy="no-referrer">
            <p>kN: ${rocket.engines.thrust_vacuum.kN}</p>
            <p>||</p>
            <p>lbf: ${rocket.engines.thrust_vacuum.lbf}</p>
          </div>
          <div class="container">
            <p><strong>Number of Engines:</strong> ${rocket.engines.number}</p>
            <p><strong>Engine type:</strong> ${rocket.engines.type}</p>
            <p><strong>Engine Version:</strong> ${rocket.engines.version}</p>
            <p><strong>Engine Layout:</strong> ${rocket.engines.layout}</p>
            <p><strong>Maximum Engine Loss:</strong> ${rocket.engines.engine_loss_max}</p>
            <p><strong>Propellant 1:</strong> ${rocket.engines.propellant_1}</p>
            <p><strong>Propellant 2:</strong> ${rocket.engines.propellant_2}</p>
            <p><strong>Thrust-to-Weight Ratio:</strong> ${rocket.engines.thrust_to_weight}</p>
          </div>
          <div class="container">
            <h2>Landing Legs</h2>
            <p><strong>Number of Landing Legs:</strong> ${rocket.landing_legs.number}</p>
            <p><strong>Landing Leg Material:</strong> ${rocket.landing_legs.material}</p>
          </div>
        `;
  
        // Actualizar nav__right
        const rocketDescription = document.getElementById('rocketDescription');
        rocketDescription.innerHTML = `
          <h2>Rocket Description</h2>
          <p>${rocket.description}</p>
          <h2>Rocket Stage Thrust Characteristics</h2>
          <h3>First Stage:</h3>
          <div class="container__weight">
            <h4>Sea Level Thrust:</h4>
            <img src="../storage/image/sea_level.png" referrerpolicy="no-referrer">
            <p>kN: ${rocket.first_stage.thrust_sea_level.kN}</p>
            <p>||</p>
            <p>lbf: ${rocket.first_stage.thrust_sea_level.lbf}</p>
          </div>
          <div class="container__weight">
            <h4>Vacuum Thrust:</h4>
            <img src="../storage/image/motor.png" referrerpolicy="no-referrer">
            <p>kN: ${rocket.first_stage.thrust_vacuum.kN}</p>
            <p>||</p>
            <p>lbf: ${rocket.first_stage.thrust_vacuum.lbf}</p>
          </div>
          <p>Reusable: ${rocket.first_stage.reusable ? 'Yes' : 'No'}</p>
          <p>Engines: ${rocket.first_stage.engines}</p>
          <p>Fuel Amount (tons): ${rocket.first_stage.fuel_amount_tons}</p>
          <p>Burn Time (sec): ${rocket.first_stage.burn_time_sec}</p>
          <h3>Second Stage:</h3>
          <div class="container__weight">
            <h4>Thrust:</h4>
            <img src="../storage/image/motor.png" referrerpolicy="no-referrer">
            <p>kN: ${rocket.second_stage.thrust.kN}</p>
            <p>||</p>
            <p>lbf: ${rocket.second_stage.thrust.lbf}</p>
          </div>
          <h4>Payloads:</h4>
          <div class="container__weight">
            <h4>Composite Fairing Height</h4>
            <img src="../storage/image/height.png" referrerpolicy="no-referrer">
            <p>Meters: ${rocket.second_stage.payloads.composite_fairing.height.meters}</p>
            <p>||</p>
            <p>Feet: ${rocket.second_stage.payloads.composite_fairing.height.feet}</p>
          </div>
          <div class="container__weight">
            <h4>Composite Fairing Diameter</h4>
            <img src="../storage/image/diameter.png" referrerpolicy="no-referrer">
            <p>Meters: ${rocket.second_stage.payloads.composite_fairing.diameter.meters}</p>
            <p>||</p>
            <p>Feet: ${rocket.second_stage.payloads.composite_fairing.diameter.feet}</p>
          </div>
          <div class="container">
            <h4>Rocket Characteristics:</h4>
            <p>Reusable: ${rocket.second_stage.reusable ? 'Yes' : 'No'}</p>
            <p>Engines: ${rocket.second_stage.engines}</p>
            <p>Fuel Amount (tons): ${rocket.second_stage.fuel_amount_tons}</p>
            <p>Burn Time (sec): ${rocket.second_stage.burn_time_sec}</p>
          </div>
        `;
  
        // Actualizar otros detalles del cohete
        updateTextContent('#rocketName', `Name: ${rocket.name}`);
        updateTextContent('#rocketType', `Type: ${rocket.type}`);
        updateTextContent('#rocketCost', `Cost Per Launch: ${rocket.cost_per_launch}`);
        updateTextContent('#rocketCountry', `Country: ${rocket.country}`);
        updateTextContent('#rocketCompany', `Company: ${rocket.company}`);
        updateTextContent('#rocketActive', `Active: ${rocket.active ? 'Yes' : 'No'}`);
  
        // Actualizar imagen
        const imageContainer = document.querySelector('#image_container');
        if (imageContainer) {
          imageContainer.innerHTML = '';
          rocket.flickr_images.forEach((image) => {
            const img = document.createElement('img');
            img.src = image;
            img.referrerPolicy = "no-referrer"; // Añadimos el atributo referrerPolicy
            imageContainer.appendChild(img);
          });
        }
      };
  
      // Inicializa el contenido con el primer cohete
      updateRocketInfo();
  
      // Navegar entre cohetes
      document.querySelector('#left_arrow').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + rockets.length) % rockets.length;
        updateRocketInfo();
      });
  
      document.querySelector('#right_arrow').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % rockets.length;
        updateRocketInfo();
      });
  
    } catch (error) {
      console.error("Error fetching rocket data: ", error);
    }
  });