// Get references to the buttons and the moveable object
const moveButton = document.getElementById('moveButton');
const calibrationButton = document.getElementById('calibrationButton');
const moveToMidButton = document.getElementById('moveToMidButton');

const moveRightButton = document.getElementById('moveRightButton');
const moveToUpButton = document.getElementById('moveToUpButton');
const moveable = document.querySelector('.moveable');
const moveable1 = document.querySelector('.moveable1')
// Get references to the instruction section and the next button name
const instructionSection = document.getElementById('instructionSection');
const nextButtonName = document.getElementById('nextButtonName');
moveable1.style.display="none";
const microscopePosition = document.getElementById('moveToMicro');
// Store the initial position of the object
const initialPosition = { x: 295.66, y: 51.75 };
const mircoscopeButton = document.getElementById('moveToMicro');
const resultBtn = document.getElementById('result1');
// Track the current step in the sequence
let currentStep = 0;

// Disable all buttons initially except the first one
calibrationButton.disabled = true;
moveToMidButton.disabled = true;
moveRightButton.disabled = true;
// moveToUpButton.disabled = true;
mircoscopeButton.disabled = true;
resultBtn.disabled = true;
//THIS NEED  TO UN COMMENT
// Function to highlight the active button and update instructions
function updateUI() {
  moveButton.classList.remove('highlighted-button');
  calibrationButton.classList.remove('highlighted-button');
  moveToMidButton.classList.remove('highlighted-button');
  moveRightButton.classList.remove('highlighted-button');
  moveToUpButton.classList.remove('highlighted-button');
  switch (currentStep) {
    case 0:
      moveButton.classList.add('highlighted-button');
      nextButtonName.textContent = 'Calibration➡️';
      break;
    case 1:
      calibrationButton.classList.add('highlighted-button');
      nextButtonName.textContent = 'Calibration⬅️';
      break;
    case 2:
      moveToMidButton.classList.add('highlighted-button');
      nextButtonName.textContent = 'Microscope';
      break;
    case 3:
      moveRightButton.classList.add('highlighted-button');
      nextButtonName.textContent = 'Position Under Indenter';
      break;
    case 4:
      moveToUpButton.classList.add('highlighted-button');
      nextButtonName.textContent = 'Scratch';
      break;
      case 5:
        document.getElementById('moveToMicro').classList.add('highlighted-button');
        nextButtonName.textContent = 'Postion under Microscope';
        break;
     case 6 :
        document.getElementById('result1').classList.add('highlighted-button');
        nextButtonName.textContent = 'Postion under Microscope';
        break;
    default:
      break;
  }
}

// Function to enable the next button in the sequence
function enableNextButton() {
  currentStep++;
  switch (currentStep) {
    case 1:
      calibrationButton.disabled = false;
      break;
    case 2:
      moveToMidButton.disabled = false;
      break;
    case 3:
      moveRightButton.disabled = false;
      break;
    case 4:
      moveToUpButton.disabled = false;
      break;
    case 5:
      mircoscopeButton.disabled =false;
      break;
      case 6:
 resultBtn.disabled = false;
 break;
    default:
      break;
  }
  updateUI();
}

// Movement functions
function moveObjectsX() {
  moveable.style.transition = 'transform 5s ease';
  moveable.style.transform = `translateX(-60px) translateY(99px)`;
  moveable.addEventListener('transitionend', enableNextButton, { once: true });
  document.getElementById('calibrationRight').style.display='inline'
}

function calibrationMovement() {
  moveable.style.transition = 'transform 5s ease';
  moveable.style.transform = `translateX(-200px) translateY(100px)`;
  moveable.addEventListener('transitionend', enableNextButton, { once: true });
   document.getElementById('calibrationRight').innerText="Calibration ⬅️ – Moves the sample stage backward to fine-tune alignment.";
}

function moveToMid() {
  moveable.style.transition = 'transform 5s ease';
  moveable.style.transform = `translateX(-99px) translateY(100px)`;
  moveable.addEventListener('transitionend', enableNextButton, { once: true });
    document.getElementById('calibrationRight').innerText="Microscope – Activates the microscope view to focus and check the sample surface.";

}
microscopePosition.addEventListener('click', moveToMicro);

function moveToMicro() {
  calibrationButton.disabled = true;
moveToMidButton.disabled = true;
moveRightButton.disabled = true;
moveToUpButton.disabled = true;
  moveable.style.transition = 'transform 5s ease';
  moveable.style.transform = `translateX(-104px) translateY(57px)`;
  resultBtn.disabled =  false;
  resultBtn.classList.add('highlighted-button');
  mircoscopeButton.classList.remove('highlighted-button');
  moveable1.style.transition = 'transform 5s ease';
  moveable1.style.transform = `translateX(-86px) translateY(335.02px)`;
    nextButtonName.textContent = 'Output Observed From Microscope';
  moveable.addEventListener('transitionend', enableNextButton, { once: true });
    document.getElementById('calibrationRight').innerText="Microscope – Activates the microscope view to focus and observe the scratch";

}

function moveRight() {
  moveable.style.transition = 'transform 5s ease';
  moveable.style.transform = 'translateX(-135px) translateY(100px)';
  setTimeout(function () {
    moveable1.style.display = "block";
  }, 6000); // delay 3 seconds

   document.getElementById('calibrationRight').innerText="Position Under Indenter – Places the sample exactly under the indenter tip for testing.";
  // Wait for first transition to finish
  moveable.addEventListener(
    'transitionend',
    function handler() {
      // Remove this handler so it doesn't trigger again
      moveable.removeEventListener('transitionend', handler);

      // Apply second movement
      moveable.style.transition = 'transform 5s ease';
      moveable.style.transform = 'translateX(-135px) translateY(57px)';

      // If you still want to enable the button after the second move
      moveable.addEventListener('transitionend', enableNextButton, { once: true });
    }
  );
}

function moveToUp() {
  moveable.style.transition = 'transform 5s ease';
  moveable.style.transform = 'translateX(-135px) translateY(57px)';
  
  // After moving up, start pen rotation
  moveable.addEventListener(
    'transitionend',
    () => {
      enableNextButton();
      movePen(); // ✅ Start pen animation
    },
    { once: true }
  );
  document.getElementById('instruction-section').textContent = 'Postion under Microscope';
}

// Attach event listeners
moveButton.addEventListener('click', moveObjectsX);
calibrationButton.addEventListener('click', calibrationMovement);
moveToMidButton.addEventListener('click', moveToMid);
moveRightButton.addEventListener('click', moveRight);
// moveToUpButton.addEventListener('click', moveToUp);
moveToUpButton.addEventListener('click', movePen);
document.getElementById("moveToMidButton").addEventListener("click", function () {
  setTimeout(function () {
    document.getElementById("fixedDiv").style.display = "block";
  }, 4000); // delay 3 seconds
});

// ====================
// Pen animation function
// ====================
// function movePen() {
//   const pen = document.getElementById("penImg");
//   document.getElementById('scratchImage').style.display='block';
//     moveToUpButton.classList.remove('highlighted-button');
//     mircoscopeButton.disabled = false;
//     mircoscopeButton.classList.add('highlighted-button');
//   nextButtonName.textContent = 'Position under Microscope';
// document.getElementById('calibrationRight').innerText="Scratch – Starts the scratch process where the indenter moves across the sample surface.";
//   // Disc reference (from your transform)
//   const discX = 170.7; 
//   const discY = 100.9; 

//   // Approximate disc width (adjust as per your SVG disc size × scale)
//   const discWidth = 300;  

//   // Pen scaling
//   const scaleX = 0.1008;
//   const scaleY = 0.1008;

//   // Total animation duration (seconds)
//   const totalDuration = 2;

//   // Time for one left→right or right→left pass
//   const passDuration = 3;  

//   // Save initial position
//   const initialTransform = "matrix(0.1008 0 0 0.1008 250.7 100.9)";

//   let startTime = null;

//   function animate(time) {
//     if (!startTime) startTime = time;
//     const elapsed = (time - startTime) / 1000;

//     if (elapsed >= totalDuration) {
//       // Reset after totalDuration
//       pen.setAttribute("transform", initialTransform);
//       return;
//     }

//     // Find how many passes completed
//     const passProgress = (elapsed % passDuration) / passDuration; // 0 → 1
//     const passCount = Math.floor(elapsed / passDuration);

//     let x;
//     if (passCount % 2 === 0) {
//       // Left → Right
//       x = discX + passProgress * discWidth;
//     } else {
//       // Right → Left
//       x = discX + (1 - passProgress) * discWidth;
//     }

//     const y = discY; // keep vertical fixed

//     // Apply transform
//     pen.setAttribute("transform", `matrix(${scaleX} 0 0 ${scaleY} ${x} ${y})`);

//     requestAnimationFrame(animate);
//   }

//   requestAnimationFrame(animate);
// }


// function movePen() {
//   const pen = document.getElementById("penImg");
//   const nextButtonName = document.getElementById("nextButtonName");
//   const calibrationRight = document.getElementById("calibrationRight");
//   const scratchLine = document.getElementById("scratchLine");

//   // Update button and description
//   nextButtonName.textContent = "Position under Microscope";
//   calibrationRight.innerText =
//     "Scratch – Starts the scratch process where the indenter moves across the sample surface.";

//   // Disc reference (from your transform)
//   const discX = 170.7;
//   const discY = 100.9;

//   // Approximate disc width (adjust as per your SVG disc size × scale)
//   const discWidth = 300;

//   // Pen scaling
//   const scaleX = 0.1008;
//   const scaleY = 0.1008;

//   // Animation duration (seconds)
//   const duration = 3;

//   // === Define missing variables ===
//   const startX = 300.1961;        // where scratch starts
//   const lineY = 170.2041;         // vertical position of scratch line
//   const scratchLength = 200; // how long scratch should go
//   const scaledNibOffset = 650; // offset to align nib with line

//   // Position the pen so nib is on start point of the line
//   const penStartY = lineY - scaledNibOffset;
//   pen.setAttribute(
//     "transform",
//     `matrix(${scaleX} 0 0 ${scaleY} ${startX} ${penStartY})`
//   );

//   // Reset the line
//   scratchLine.setAttribute("x1", startX);
//   scratchLine.setAttribute("y1", lineY);
//   scratchLine.setAttribute("x2", startX);
//   scratchLine.setAttribute("y2", lineY);

//   let startTime = null;

//   function animate(time) {
//     if (!startTime) startTime = time;
//     const elapsed = (time - startTime) / 1000;
//     const progress = Math.min(elapsed / duration, 1);

//     // x where nib should be now
//     const x = startX + scratchLength * progress;
//     // y where the image’s top-left should be so nib sits on line
//     const y = lineY - scaledNibOffset;

//     // Move pen so nib touches the line
//     pen.setAttribute(
//       "transform",
//       `matrix(${scaleX} 0 0 ${scaleY} ${x} ${y})`
//     );

//     // Extend line end point to nib position
//     scratchLine.setAttribute("x2", x);
//     scratchLine.setAttribute("y2", lineY);

//     if (progress < 1) requestAnimationFrame(animate);
//   }

//   requestAnimationFrame(animate);
// }

function movePen() {
  
  const pen = document.getElementById("penImg");
  const scratchLine = document.getElementById("scratchLine");
 moveToUpButton.classList.remove('highlighted-button');
    mircoscopeButton.disabled = false;
    mircoscopeButton.classList.add('highlighted-button');
  nextButtonName.textContent = 'Position under Microscope';
document.getElementById('calibrationRight').innerText="Scratch – Starts the scratch process where the indenter moves across the sample surface.";
  // line start (x,y where the nib should sit)
  const startX = 250.1961;
  const lineY = 160.2041;

  // length to draw
  const scratchLength = 150;

  // pen scale
  const scaleX = 0.1000;
  const scaleY = 0.1000;

  // exact distance from top of original image to nib tip in pixels:
  // (open the image and measure from top edge down to the tip of the nib)
  const nibOffset = 650; // adjust this number until the nib sits on the line
  const scaledNibOffset = nibOffset * scaleY;

  // animation duration
  const duration = 3;

  // position the pen so nib is on the start point of the line
  const penStartY = lineY - scaledNibOffset;
  pen.setAttribute("transform",
    `matrix(${scaleX} 0 0 ${scaleY} ${startX} ${penStartY})`);

  // reset the line
  scratchLine.setAttribute("x1", startX);
  scratchLine.setAttribute("y1", lineY);
  scratchLine.setAttribute("x2", startX);
  scratchLine.setAttribute("y2", lineY);

  let startTime = null;

  function animate(time) {
    if (!startTime) startTime = time;
    const elapsed = (time - startTime) / 1000;
    const progress = Math.min(elapsed / duration, 1);

    // x where nib should be now
    const x = startX + scratchLength * progress;
    // y where the image’s top-left should be so that nib sits on line
    const y = lineY - scaledNibOffset;

    // move pen so nib touches the line
    pen.setAttribute("transform",
      `matrix(${scaleX} 0 0 ${scaleY} ${x} ${y})`);

    // extend line end point to nib position
    scratchLine.setAttribute("x2", x);
    scratchLine.setAttribute("y2", lineY);

    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


document.getElementById('reloadButton').addEventListener('click', function() {
    location.reload(); // Reloads the current page
});


    document.getElementById("result1").addEventListener("click", function () {
      document.getElementById("myContainer").style.display = "block";
    });


      const slideData = [
    {
      img: "2d.jpg",
      desc: "This is the 2D view of the Scratch Test Output."
    },
    {
      img: "3d.png",
      desc: "This is the 3D view of the Scratch Test Output."
    },
    {
      img: "X.png",
      desc: "X-Profile: is a cross-sectional line graph that shows the variation in surface height (Z-axis) along a horizontal line (X-axis)."
    },
    {
      img: "Y.png",
      desc: "Y-Profile: is a cross-sectional line graph that shows the variation in surface height (Z-axis) along a vertical line (Y-axis)."
    }
  ];

  function showSlider() {
    document.getElementById("myContainer").style.display = "block";
    changeSlide(); // Show first slide by default
  }

  function changeSlide(n) {
    const slide = slideData[n - 1];
    document.getElementById("sliderImage").src = slide.img;
    document.getElementById("sliderDescription").innerText = slide.desc;

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll(".img-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    // Add 'active' class to the clicked button
    buttons[n - 1].classList.add("active");
  }

const svgContainer = document.getElementById("svgContainer");
const elementName = document.getElementById("elementName");

svgContainer.addEventListener("mouseover", (e) => {
    if (e.target.dataset.name) {
        elementName.innerText = e.target.dataset.name;
        elementName.style.left = e.clientX + "-5px";
        elementName.style.top = e.clientY + "-4px";
        elementName.style.display = "block";
    }
});

svgContainer.addEventListener("mouseout", () => {
    elementName.style.display = "none";
});

  
// Initialize UI
updateUI();

