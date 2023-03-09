import Vector2D from './vector2d.mjs';

// Ready function that *should* work on most browsers.
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

function handlePointerDown(evt) {
    const {
        button,
        buttons,
        isPrimary,
        offsetX,
        offsetY,
        target
    } = evt;

    if (button === 0 && buttons === 1 && isPrimary) {
        beginVStick(this, offsetX, offsetY);
        // Listen for pointermove events and capture subsequent pointer events.
        this.addEventListener('pointermove', handlePointerMove);
        this.setPointerCapture(evt.pointerId);
        evt.stopPropagation();
    }
}

function handlePointerUp(evt) {
    const {
        offsetX,
        offsetY
    } = evt;

    endVStick(this, offsetX, offsetY);
    // Stop listening for pointermove events and release the previous capture.
    this.removeEventListener('pointermove', handlePointerMove);
    this.releasePointerCapture(evt.pointerId);
    evt.stopPropagation();
}

function handlePointerMove(evt) {
    const {
        button,
        buttons,
        isPrimary,
        offsetX,
        offsetY
    } = evt;

    if (button === -1 && buttons === 1 && isPrimary) {
        moveVStick(this, offsetX, offsetY);
        evt.stopPropagation();
    }
}

// Draws the virtual joystick.
function drawJoystick(target, pointerX, pointerY, drawCentered) {
    // Data for the parent control.
    const {
        offsetWidth: ctrlWidth,
        offsetHeight: ctrlHeight,
        clientLeft: ctrlLeft,
        clientTop: ctrlTop
    } = target;
    // Get the element that represents the joystick.
    const joystick = Array.from(target.children).find(el => el.classList.contains('vstick-stick'));
    // Get the radius of the joystick. Should allow for border thickness as well.
    const joyRadius = Math.min(joystick.offsetWidth, joystick.offsetHeight) * 0.5;
    // Get the radius of the parent control.
    const ctrlRadius = (Math.min(ctrlWidth, ctrlHeight) * 0.5) - joyRadius;
    // Find the center of the control.
    const ctr = new Vector2D(ctrlWidth * 0.5, ctrlHeight * 0.5);
    // Vector from the center of the control to the pointer position.
    const delta = Vector2D.subtract(new Vector2D(pointerX, pointerY), ctr);
    // Get the length and direction of the delta.
    const deltaLen = drawCentered ? 0 : delta.getLength();
    const joyDir = delta.normal();
    // Calculate the new joystick position within the parent control.
    // Ensures the joystick does not go beyond the control bounds.
    const joyPosition = ctr
        .add(joyDir.scale(Math.min(deltaLen, ctrlRadius)))
        .subtract({ x: joyRadius + ctrlLeft, y: joyRadius + ctrlTop });

    // Normalized values (-1.0..1.0) for the x- and y-axis.
    const value = {
        x: Math.max(Math.min(delta.x / ctr.x, 1), -1),
        y: Math.max(Math.min(delta.y / ctr.y, 1), -1)
    };

    if (joystick) {
        // Show the joystick in its new position.
        joystick.style.left = `${joyPosition.x}px`;
        joystick.style.top = `${joyPosition.y}px`;
    }

    // Return the joystick element and normalized values for further processing.
    return {
        joystick,
        value
    };
}

function beginVStick(target, pointerX, pointerY) {
    // Show the joystick at its new position and get the current value.
    const { joystick, value } = drawJoystick(target, pointerX, pointerY);

    // Raise a custom event with the current value.
    const event = new CustomEvent('beginvstick', {
        detail: { value }
    });
    target.dispatchEvent(event);

    if (joystick) {
        // Style the joystick as visible or active.
        joystick.classList.add('vstick-visible');
    }
}

function endVStick(target, pointerX, pointerY) {
    // Show the joystick at its new position and get the current value.
    const { joystick, value } = drawJoystick(target, pointerX, pointerY, true);

    // Raise a custom event with the current value.
    const event = new CustomEvent('endvstick', {
        detail: { value }
    });
    target.dispatchEvent(event);

    if (joystick) {
        // Remove the visible/active styles.
        joystick.classList.remove('vstick-visible');
    }
}

function moveVStick(target, pointerX, pointerY) {
    // Show the joystick at its new position and get the current value.
    const { joystick, value } = drawJoystick(target, pointerX, pointerY);

    // Raise a custom event with the current value.
    const event = new CustomEvent('movevstick', {
        detail: { value }
    });
    target.dispatchEvent(event);
}

// Handler for the 'beginvstick', 'movevstick' & 'endvstick' events.
function handleJoystickEvent(evt) {
    // Get the current value of the joystick.
    const { detail: { value } } = evt;

    // Find an element to display the value.
    const vstickSpan = document.querySelector('#vstick-value');

    if (vstickSpan) {
        vstickSpan.innerHTML = `x: ${value.x}, y: ${value.y}`;
    }
}

window.addJoystick = (selector, sizePx) => {
    // Create our own DOM.
    var vstickApp = document.querySelector(selector);

    if (vstickApp == null) return false;

    vstickApp.innerHTML = `
    <div class="vstick-container" style="width: ${sizePx}px; height: ${sizePx}px;">
      <div class="vstick">
        <div class="vstick-stick"></div>
      </div>
      <div class="memo">
        <span id="vstick-value"></span>
      </div>
    </div>
  `;

    // Find all the vsticks and listen for their events to get things going...
    // const vsticks = document.querySelectorAll('div.vstick');
    const vsticks = vstickApp.querySelectorAll('div.vstick');

    vsticks.forEach((element, index) => {
        element.addEventListener('pointerdown', handlePointerDown);
        element.addEventListener('pointerup', handlePointerUp);
        element.addEventListener('beginvstick', handleJoystickEvent);
        element.addEventListener('movevstick', handleJoystickEvent);
        element.addEventListener('endvstick', handleJoystickEvent);
    });

    return true;
};
